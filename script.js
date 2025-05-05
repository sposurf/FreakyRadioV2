// /script.js

// 1) Register service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/public/service-worker.js')
    .then(() => console.log('SW registered'))
    .catch(console.error);
}

// 2) Setup Media Session API
const audio = document.getElementById('player');
if ('mediaSession' in navigator) {
  navigator.mediaSession.metadata = new MediaMetadata({
    title:  'Freaky Radio',
    artist: 'Live Streaming',
    artwork: [
      { src: '/logo-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/logo-512.png', sizes: '512x512', type: 'image/png' }
    ]
  });
  navigator.mediaSession.setActionHandler('play',  () => audio.play());
  navigator.mediaSession.setActionHandler('pause', () => audio.pause());
}

// 3) beforeinstallprompt per Chrome
let deferredPrompt;
const installBtn = document.getElementById('installBtn');
window.addEventListener('beforeinstallprompt', e => {
  e.preventDefault();
  deferredPrompt = e;
  installBtn.style.display = 'block';
});
installBtn.addEventListener('click', async () => {
  installBtn.style.display = 'none';
  deferredPrompt.prompt();
  const choice = await deferredPrompt.userChoice;
  console.log('Install outcome:', choice.outcome);
  deferredPrompt = null;
});

// 4) Autoplay al caricamento (opzionale, potrebbe servire un tocco utente)
audio.addEventListener('canplay', () => {
  // audio.play();
});