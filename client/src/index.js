const MAIN_SCENE = AFRAME.scenes[0];
const PLAYER = document.querySelector('#player');

function setupNetworking() {
  const serverUrl = process.env.NODE_ENV === 'production' ? 'TODO' : 'http://localhost:3000';
  const shouldDebug = process.env.NODE_ENV === 'production' ? false : true;
  MAIN_SCENE.setAttribute('networked-scene', {
    'serverURL': serverUrl,
    'debug': shouldDebug
  });
}

setupNetworking();
