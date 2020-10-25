import { getNoteInHertz } from './music';

let context;
let oscillator;
let gainNode;

function reset() {
  if (!context) {
    context = new (window.AudioContext || window.webkitAudioContext)();
  }

  oscillator = context.createOscillator();
  oscillator.type = 'triangle';
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

export async function playNote(note, time) {
  play(getNoteInHertz(note));

  return new Promise(resolve => {
    setTimeout(() => {
      stop();
      resolve();
    }, time);
  });
}
