let context;
let oscillator;
let gainNode;

context = new (window.AudioContext || window.webkitAudioContext)();

function reset() {
  oscillator = context.createOscillator();
  oscillator.type = "triangle";
  gainNode = context.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(context.destination);
}

export function play(value) {
  reset();

  oscillator.frequency.setValueAtTime(value, context.currentTime);
  gainNode.gain.setValueAtTime(1, context.currentTime);

  oscillator.start();
}

export function stop() {
  gainNode.gain.setValueAtTime(0, context.currentTime);
  oscillator.stop(context.currentTime);
}
