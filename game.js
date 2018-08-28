
const { fork } = require('child_process');

const callbacks = []

const requestAnimationFrameChild = fork('requestAnimationFrame.js')

requestAnimationFrameChild.on('message', msg => {
  const cb = callbacks.shift()
  cb && cb();
})

requestAnimationFrameChild.on('close', msg => {
  console.log('requestAnimationFrameChild Closed')
})

global.requestAnimationFrame = (cb) => {
  callbacks.push(cb);
}

function now() {
  const time = process.hrtime()

  return time[0] * 1000 + time[1] / 1000000
}

const animate = () => {
  counter++

  if (counter === MAX_FRAMES) {
    const elapsed = now() - start
    console.log("Final count: ", counter)
    console.log("Elapsed time: ", elapsed)
    console.log("FPS: ", counter / (elapsed / 1000))
    return
  }

  callbacks.push(animate)
}

const FPS = 60
const TIMESTEP = 1000 / FPS;
const ELAPSED = 10000;
const MAX_FRAMES = ELAPSED / TIMESTEP;

let counter = 0;
let start = now();

animate()
