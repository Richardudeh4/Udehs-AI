import { useToast } from "@/src/components/ui/use-toast";
import { AddDomainSchema } from "@/src/schemas/settings.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {UploadClient} from  "@uploadcare/upload-client"
import { usePathname } from "next/navigation";
import { onIntegrateDomain } from "@/src/actions/settings";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form"
const upload = new UploadClient({
    publicKey: process.env.NEXT_PUBLIC_UPLOAD_CARE_PUBLIC_KEY as string,
})

export const useDomain = () => {
    const {register, handleSubmit, formState: {errors}, reset} = useForm<FieldValues>({
        resolver: zodResolver(AddDomainSchema),
    })
    const pathName = usePathname();
    const { toast } = useToast()
    const [loading, setLoading] =useState<boolean>(false)
    const [ isDomain, setIsDomain ] = useState<string | undefined>(undefined)
    const router = useRouter();

    useEffect(() => {
            setIsDomain(pathName.split('/').pop())
    },[pathName])
    const onAddDomain = handleSubmit(async(values: FieldValues) => {
        setLoading(true);
        const uploaded = await upload.uploadFile(values.image[0])
        const domain = await onIntegrateDomain(values.domain, uploaded.uuid)
        if(domain){
            reset()
            setLoading(false)
            toast({
                title: domain.status == 200 ? 'Success' : 'Error',
                description: domain.message,
            })
            router.refresh();
        }
    })
    return{
        register,
        onAddDomain,
        errors,
        loading,
        isDomain
    }
 }