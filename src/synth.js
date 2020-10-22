export class Synth {
  constructor() {
    this.context = new (window.AudioContext || window.webkitAudioContext)();
  }

  init() {
    this.oscillator = this.context.createOscillator();
    this.gainNode = this.context.createGain();

    this.oscillator.connect(this.gainNode);
    this.gainNode.connect(this.context.destination);
  }

  play(value) {
    this.init();

    this.oscillator.frequency.setValueAtTime(value, this.context.currentTime);
    this.gainNode.gain.setValueAtTime(1, this.context.currentTime);

    this.oscillator.start();
  }

  stop() {
    this.gainNode.gain.setValueAtTime(0, this.context.currentTime);
    this.oscillator.stop(this.context.currentTime + 1);
  }
}
