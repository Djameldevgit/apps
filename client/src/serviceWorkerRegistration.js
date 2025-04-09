// src/serviceWorkerRegistration.js

export function register(onUpdate) {
  if ('serviceWorker' in navigator) {
    // Registra el SW sin esperar al evento 'load'
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('Service Worker registrado:', registration.scope);
        
        // Verifica actualizaciones del SW
        registration.onupdatefound = () => {
          const installingWorker = registration.installing;
          installingWorker.onstatechange = () => {
            if (installingWorker.state === 'installed') {
              if (navigator.serviceWorker.controller) {
                onUpdate?.(); // Notifica que hay una actualización
              }
            }
          };
        };
      })
      .catch(error => {
        console.error('Error en el registro:', error);
      });
  }
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(registration => {
      registration.unregister();
    });
  }
}

// ===== NUEVO: Lógica para permisos y badges ===== //
export async function requestNotificationPermission() {
  if (!('Notification' in window) || !('setAppBadge' in navigator)) {
    console.warn('Este navegador no soporta Badge API');
    return false;
  }

  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      await navigator.setAppBadge(1); // Muestra un badge con "1"
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error al solicitar permisos:', error);
    return false;
  }
}