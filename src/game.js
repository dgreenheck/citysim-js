import { createScene } from './scene.js';
import { createCity } from './city.js';

export function createGame() {
  const scene = createScene();
  const city = createCity(16);

  scene.initialize(city);
  scene.onObjectSelected = (selectedObject) => {
    const coords = selectedObject.userData;
    console.log(`selected object: ${JSON.stringify(coords)}`)
    console.log(`city data: ${JSON.stringify(city.data[coords.x][coords.y])}`)
  };

  document.addEventListener('mousedown', scene.onMouseDown.bind(scene), false);
  document.addEventListener('mouseup', scene.onMouseUp.bind(scene), false);
  document.addEventListener('mousemove', scene.onMouseMove.bind(scene), false);
  document.addEventListener('contextmenu', (event) => event.preventDefault(), false);

  const game = {
    update() {
      city.update();
      scene.update(city);
    }
  }

  setInterval(() => {
    game.update();
  }, 1000)

  scene.start();

  return game;
}