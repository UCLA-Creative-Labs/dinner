/* eslint-disable no-undef, no-unused-vars */
const _AFRAME = AFRAME; // so that ESLint doesn't complain about AFRAME being undefined
const MAIN_SCENE = _AFRAME.scenes[0];
const PLAYER = document.querySelector('#player');
/* eslint-enable no-undef, no-unused-vars */

function setupNetworking() {
  const serverUrl = process.env.NODE_ENV === 'production' ? 'http://yummy-server.creativelabsucla.com/' : 'http://localhost:3000';
  const shouldDebug = process.env.NODE_ENV === 'production' ? false : true;
  MAIN_SCENE.setAttribute('networked-scene', {
    serverURL: serverUrl,
    debug: shouldDebug,
  });
}

setupNetworking();
