/* eslint-disable no-undef, no-unused-vars */
const _AFRAME = AFRAME; // so that ESLint doesn't complain about AFRAME being undefined
const MAIN_SCENE = _AFRAME.scenes[0];

const PLAYER = document.querySelector('#player');
const ENVIRONMENT = document.querySelector('#environment');
const LOADER = document.querySelector('#loader');
const ICON = document.querySelector('#lottie');

const anim = lottie.loadAnimation({
  container: ICON,
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: 'assets/ding.json',
});
/* eslint-enable no-undef, no-unused-vars */

// Loader
document.addEventListener('DOMContentLoaded', () => {
  ENVIRONMENT.addEventListener('model-loaded', () => {
    LOADER.classList.add('fade');
    setTimeout(() => {
      LOADER.style.display = 'none';
    }, 1000);
  });
});

function setupNetworking() {
  const serverUrl = process.env.NODE_ENV === 'production' ? 'https://chef.creativelabsucla.com/' : 'http://localhost:3000';
  const shouldDebug = process.env.NODE_ENV === 'production' ? false : true;
  MAIN_SCENE.setAttribute('networked-scene', {
    serverURL: serverUrl,
    debug: shouldDebug,
  });
}

setupNetworking();
