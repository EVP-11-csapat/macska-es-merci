import axios from 'axios';
import './index.css'
import { init } from './secret.js'

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

let rand = sfc32(0, 0, 0, 0);

axios.get('https://random.org/integers/?num=4&format=plain&rnd=new&min=-1000000000&max=1000000000&col=1&base=10',
{
  headers: {
    'Content-Type': 'text/plain',
    'Access-Control-Allow-Origin': '*'
  }
})
.then(function (response) {
  const [a, b, c, d] = response.data.split('\n')
  rand = sfc32(a, b, c, d)
  console.log('Random.org API has been used');
});

function simulate() {
  const doors = [0, 1, 2]

  const prizeIndex = Math.floor(Math.random() * 3)
  const playerIndex = Math.floor(Math.random() * 3)

  let removableDoors = doors.filter((door) => (door != prizeIndex && door != playerIndex))

  const removedDoor = (removableDoors.length > 1) ? removableDoors[Math.floor(Math.random() * 2)] : removableDoors[0]
  const switchDoor = doors.filter((door) => door != playerIndex && door != removedDoor)[0]

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
// console.log(rand());