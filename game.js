const { fork } = require('child_process');

function now() {
  const time = process.hrtime()
  const seconds = time[0]
  const nanoseconds = time[1]

  return seconds * 1000 + nanoseconds / 1000000
}

let callbacks = []

const requestAnimationFrameChild = fork('requestAnimationFrame.js')

requestAnimationFrameChild.on('message', msg => {
  if (msg === 'frame') {
    while (callbacks.length > 0) {
      const cb = callbacks.shift();
      cb(); 
    }
  }
})

requestAnimationFrameChild.on('close', msg => {
  console.log('requestAnimationFrameChild Closed')
})

const requestAnimationFrame = (cb) => {
  callbacks.push(cb);
}

let time = now();
let last = now();

const animate = (timestamp) => {
  requestAnimationFrame(animate)
  // console.log(timestamp - time)
  // console.log((now() - last).toFixed(4))
  last = now()
}

animate(now())
