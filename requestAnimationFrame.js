function now() {
  const time = process.hrtime()

  return time[0] * 1000 + time[1] / 1000000
}

function animate() { 
  process.send('start')

  let counter = 0;
  let nextTick = now();
  let lastTick = now();

  // maxFrames used for debugging 
  while (counter < MAX_FRAMES) {
    counter++

    while (now() < nextTick) {
      // Waste time
    }

    process.send(now());

    nextTick += TIMESTEP;

    lastTick = now();
  }
}

const MAX_FRAMES = 500; // ELAPSED / TIMESTEP
const TIMESTEP = 1000 / 60;

const start = now()
animate()
const elapsed = (now() - start) / 1000;
console.log('rAF FPS: ', MAX_FRAMES / elapsed)
