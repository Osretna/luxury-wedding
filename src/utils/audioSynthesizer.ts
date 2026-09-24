/**
 * Romantic Wedding Ambient Melody Synthesizer
 * Uses Web Audio API to create gentle harp and chime arpeggios
 * Zero external audio dependencies, fully self-contained and instant.
 */

class RomanticAudioSynthesizer {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private timerId: number | null = null;
  private masterGain: GainNode | null = null;
  private noteIndex: number = 0;

  // Romantic harmonic arpeggio based on Canon in D / Romantic Wedding Progression (D, A, Bm, F#m, G, D, G, A)
  private melodyNotes: number[] = [
    // Frequencies in Hz: D4, F#4, A4, D5, A3, E4, A4, C#5, B3, F#4, B4, D5, F#3, C#4, F#4, A4,
    // G3, D4, G4, B4, D3, A3, D4, F#4, G3, D4, G4, B4, A3, E4, A4, C#5
    293.66, 369.99, 440.00, 587.33,
    220.00, 329.63, 440.00, 554.37,
    246.94, 369.99, 493.88, 587.33,
    185.00, 277.18, 369.99, 440.00,
    196.00, 293.66, 392.00, 493.88,
    146.83, 220.00, 293.66, 369.99,
    196.00, 293.66, 392.00, 493.88,
    220.00, 329.63, 440.00, 554.37,
  ];

  private initContext() {
    if (!this.ctx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtxClass();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.12, this.ctx.currentTime); // gentle ambient volume
      this.masterGain.connect(this.ctx.destination);
    }
  }

  private playPluck(freq: number) {
    if (!this.ctx || !this.masterGain) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    // Warm sine + subtle triangle for warm harp timbre
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

    // Subtle gentle attack and long romantic decay
    const now = this.ctx.currentTime;
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.2, now + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 2.0);
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.pause();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  public play() {
    this.initContext();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    this.isPlaying = true;
    this.scheduleNextNote();
  }

  private scheduleNextNote() {
    if (!this.isPlaying) return;

    const freq = this.melodyNotes[this.noteIndex];
    this.playPluck(freq);

    this.noteIndex = (this.noteIndex + 1) % this.melodyNotes.length;

    // Gentle timing: 420ms per note
    this.timerId = window.setTimeout(() => {
      this.scheduleNextNote();
    }, 450);
  }

  public pause() {
    this.isPlaying = false;
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }
}

export const romanticAudio = new RomanticAudioSynthesizer();
