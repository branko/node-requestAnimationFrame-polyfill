function now() {
  const time = process.hrtime()

  return time[0] * 1000 + time[1] / 1000000
}

const TIMESTEP = 1000 / 30;
const FIVE_SECONDS_IN_MS = 5000;
let counter = 0;

let nextTick = now() + TIMESTEP;
let lastTick = now();
let maxFrames = FIVE_SECONDS_IN_MS / TIMESTEP

function animate() {  
  while (counter < maxFrames) {
    counter++

    while (now() < nextTick) {
      // Waste time
      console.log((nextTick - now()) / TIMESTEP)
    }

    process.send('frame');

    nextTick += TIMESTEP;
    // console.log(now() - lastTick)

    lastTick = now();
  }
}

animate()
