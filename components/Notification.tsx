"use client";
import { useEffect, useState } from 'react';
import { Button } from './ui/button';
const Notification = () => {
  const [subscription, setSubscription] = useState<PushSubscription | null>(null);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      run().catch(error => console.error(error));
    }
  }, []);

  const run = async () => {
    // Register Service Worker
    const registration = await navigator.serviceWorker.register('/service-worker.js', {
      scope: '/',
    });

    // Request Notification Permission
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
      throw new Error('Permission not granted for Notification');
    }

    // Subscribe User to Push Notifications
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array('YOUR_PUBLIC_VAPID_KEY'),
    });

    setSubscription(subscription);
  };

  const urlBase64ToUint8Array = (base64String: string) => {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  };

  const scheduleTask = async (type: 'one-time' | 'recurring', time: string, message: string) => {
    if (!subscription) return;

    const response = await fetch('/api/tasks', {
      method: 'POST',
      body: JSON.stringify({ type, time, message, subscription }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    console.log(data);
  };

  return (
    <div>
      <h1>Notification Example</h1>
      <p>Allow notifications to receive reminders.</p>
      <div className='flex flex-row space-x-10'>
      <Button onClick={() => scheduleTask('one-time', '2024-07-01T10:00:00Z', 'One-time Task Notification')}>
        Schedule One-Time Task
      </Button>
      <Button onClick={() => scheduleTask('recurring', '*/5 * * * *', 'Recurring Task Notification')}>
        Schedule Recurring Task
      </Button>
      </div>
      
    </div>
  );
};

export default Notification;
