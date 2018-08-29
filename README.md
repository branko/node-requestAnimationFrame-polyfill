# requestAnimationFrame polyfill

This is a basic polyfill for `requestAnimationFrame` for node.js using a forked child_process in an attempt to schedule callbacks in a more reliable and consistent way than setTimeout/setInterval/setImmediate. Currently, it just sends a message to the parent process at 60fps to indicate that the callbacks sent to `requestAnimationFrame` should be processed.
