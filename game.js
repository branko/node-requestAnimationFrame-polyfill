const { fork } = require('child_process');
const requestAnimationFrameChild = fork('requestAnimationFrame.js')

function now() {
  const time = process.hrtime()

  return time[0] * 1000 + time[1] / 1000000
}

const FPS = 60
const TIMESTEP = 1000 / FPS;
const MAX_FRAMES = 500 // ELAPSED / TIMESTEP;

const callbacks = []
let start;
let counter = 0;


requestAnimationFrameChild.on('message', msg => {
  if (msg === 'start') {
    start = now();

    animate()
  } else {
    const cb = callbacks.shift()
    cb && cb();
  }
})

requestAnimationFrameChild.on('close', msg => {
  console.log('requestAnimationFrameChild Closed')
})

requestAnimationFrame = cb => callbacks.push(cb)

function animate() {
  counter++

  if (counter === MAX_FRAMES) {
    const elapsed = now() - start
    console.log("child FPS: ", counter / (elapsed / 1000))
    return
  }

  requestAnimationFrame(animate)
}

