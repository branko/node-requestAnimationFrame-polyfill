function now() {
  const time = process.hrtime()

  return time[0] * 1000 + time[1] / 1000000
}

function animate() { 
  let counter = 0;
  let nextTick = now() + TIMESTEP;
  let lastTick = now();

  // maxFrames used for debugging 
  while (counter < MAX_FRAMES) {
    counter++

    while (now() < nextTick) {
      // Waste time
    }

    process.send('frame');


    nextTick += TIMESTEP;

    lastTick = now();
  }
}

const FPS = 60
const TIMESTEP = 1000 / FPS;
const ELAPSED = 10000;
const MAX_FRAMES = ELAPSED / TIMESTEP

animate()
