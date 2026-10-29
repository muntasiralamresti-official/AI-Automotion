/**
 * Web Audio API synthesizer for client-side emergency alarm siren.
 * Operates without external audio files and sounds through any speaker/headphones.
 */
class BrowserAlarmSynthesizer {
  constructor() {
    this.audioCtx = null;
    this.oscillator = null;
    this.gainNode = null;
    this.isPlaying = false;
    this.volume = 0.8;
  }

  _initContext() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.audioCtx = new AudioContext();
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  setVolume(vol) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.gainNode && this.audioCtx) {
      this.gainNode.gain.setValueAtTime(this.volume, this.audioCtx.currentTime);
    }
  }

  startAlarm() {
    if (this.isPlaying) return;
    try {
      this._initContext();
      this.isPlaying = true;

      this.oscillator = this.audioCtx.createOscillator();
      this.gainNode = this.audioCtx.createGain();

      this.oscillator.type = 'sawtooth';
      
      // Dual-tone siren modulation: ramps between 900Hz and 1800Hz
      const now = this.audioCtx.currentTime;
      this.oscillator.frequency.setValueAtTime(900, now);
      this.gainNode.gain.setValueAtTime(this.volume, now);

      this.oscillator.connect(this.gainNode);
      this.gainNode.connect(this.audioCtx.destination);
      this.oscillator.start();

      // Modulation loop
      this._modulateFrequency();
    } catch (err) {
      console.warn('[AlarmBuzzer] Audio play failed:', err);
    }
  }

  _modulateFrequency() {
    if (!this.isPlaying || !this.audioCtx || !this.oscillator) return;
    const now = this.audioCtx.currentTime;
    this.oscillator.frequency.cancelScheduledValues(now);
    this.oscillator.frequency.setValueAtTime(900, now);
    this.oscillator.frequency.linearRampToValueAtTime(1800, now + 0.25);
    this.oscillator.frequency.linearRampToValueAtTime(900, now + 0.5);

    this.timer = setTimeout(() => this._modulateFrequency(), 500);
  }

  stopAlarm() {
    if (!this.isPlaying) return;
    this.isPlaying = false;
    clearTimeout(this.timer);
    try {
      if (this.oscillator) {
        this.oscillator.stop();
        this.oscillator.disconnect();
        this.oscillator = null;
      }
    } catch (e) {
      // ignore cleanup errors
    }
  }
}

export const browserAlarm = new BrowserAlarmSynthesizer();
