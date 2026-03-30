export function isPushSupported() {
  return "serviceWorker" in navigator && "PushManager" in window;
}

export function getNotificationPermission() {
  return typeof Notification !== "undefined"
    ? Notification.permission
    : "denied";
}

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export async function subscribeToPush() {
  const registration = await navigator.serviceWorker.ready;
  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(
      "BNcKnL7L9csxDtxZOt4VZ6bpkwAUWs7GtfHbRatCtGTjmjjKlex1b90lSOSDLN7WpLE3YZMGBoC2f9Hs7xfFAa4",
    ),
  });
  return subscription;
}

export async function getExistingSubscription() {
  const registration = await navigator.serviceWorker.ready;
  return registration.pushManager.getSubscription();
}

export async function unsubscribeFromPush(subscription) {
  return subscription.unsubscribe();
}
