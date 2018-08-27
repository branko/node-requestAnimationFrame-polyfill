# requestAnimationFrame polyfill

This is a basic polyfill for `requestAnimationFrame` for node.js using a forked child_process. It is an experiment to see if it works better than typical game loops using `setInterval`/`setImmediate`. Currently, it just sends a message to the parent process to indicate that the callbacks sent to `requestAnimationFrame` should be processed.