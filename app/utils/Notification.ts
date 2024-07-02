
export const requestNotificationPermission = async (): Promise<void> => {
    if (!('Notification' in window)) {
      console.error('This browser does not support desktop notifications.');
      return;
    }
  
    if (Notification.permission !== 'granted') {
      await Notification.requestPermission();
    }
  };
  
  export const sendNotification = (title: string, options?: NotificationOptions): void => {
    if (Notification.permission === 'granted') {
      new Notification(title, options);
    }
  };
  