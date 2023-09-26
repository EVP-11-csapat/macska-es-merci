import './index.css'
import { init } from './secret.js'

function cyrb128(str) {
  let h1 = 1779033703, h2 = 3144134277,
      h3 = 1013904242, h4 = 2773480762;
  for (let i = 0, k; i < str.length; i++) {
      k = str.charCodeAt(i);
      h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
      h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
      h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
      h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
  }
  h1 = Math.imul(h3 ^ (h1 >>> 18), 597399067);
  h2 = Math.imul(h4 ^ (h2 >>> 22), 2869860233);
  h3 = Math.imul(h1 ^ (h3 >>> 17), 951274213);
  h4 = Math.imul(h2 ^ (h4 >>> 19), 2716044179);
  h1 ^= (h2 ^ h3 ^ h4), h2 ^= h1, h3 ^= h1, h4 ^= h1;
  return [h1>>>0, h2>>>0, h3>>>0, h4>>>0];
}

function sfc32(a, b, c, d) {
  return function() {
    a >>>= 0; b >>>= 0; c >>>= 0; d >>>= 0; 
    var t = (a + b) | 0;
    a = b ^ b >>> 9;
    b = c + (c << 3) | 0;
    c = (c << 21 | c >>> 11);
    d = d + 1 | 0;
    t = t + d | 0;
    c = c + t | 0;
    return (t >>> 0) / 4294967296;
  }
}

let seed = cyrb128(Date.now().toLocaleString());

let rand = sfc32(seed[0], seed[1], seed[2], seed[3]);

function reseed() {
  if (rand() > 0.7) {
    seed = cyrb128(Date.now().toLocaleString());
    rand = sfc32(seed[0], seed[1], seed[2], seed[3]);
  }
}


function simulate() {
  const doors = [0, 1, 2]

  const prizeIndex = Math.floor(rand() * 3)
  const playerIndex = Math.floor(rand() * 3)

  let removableDoors = doors.filter((door) => (door != prizeIndex && door != playerIndex))

  const removedDoor = (removableDoors.length > 1) ? removableDoors[Math.floor(rand() * 2)] : removableDoors[0]
  const switchDoor = doors.filter((door) => door != playerIndex && door != removedDoor)[0]

  reseed();
  if (switchDoor === prizeIndex) return true
  if (playerIndex === prizeIndex) return false
  console.log('Something went wrong')
}


document.querySelector('#app').innerHTML = `
  <div class="container">
    <img class="cat" src="./img/macska.webp" alt="Macska" />
      <main class="main_content" id="mainContent">
        <button id="sim">Szimuláció</button>
        <p class="text" id="result"></p>
      </main>
    <img class="car" src="./img/merci.webp" alt="Merci" />
  </div>
  <a href="http://vanilla-js.com" target="_blank">
    <img
      class="badge"
      src="https://img.shields.io/badge/vanilla-js-yellow"
      alt="Powered by Vanilla JS"
    />
  </a>
`;

const mainContent = document.getElementById('mainContent');
const gomb = document.getElementById('sim');

gomb.addEventListener('click', function () {
  let staying = 0
  let switching = 0
  for (let index = 0; index < 100000; index++) {
      if (simulate()) switching++
      else staying++
  }

  const result = document.getElementById('result')
  result.textContent = `100 000 szimulációból ${staying} alkalommal a maradás és ${switching} alkalommal a cserélés nyert.`
});

// build wont reference this correctly in css
// workaround
document.body.style.backgroundImage = "url('./img/background.webp')";

init();
console.log(rand());