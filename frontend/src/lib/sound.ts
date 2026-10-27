/**
 * Web Audio API Cash Register / Order Chime Sound Generator
 * Generates a clean, crisp "Cha-Ching!" coin bell sound without external MP3 files.
 */
export function playOrderChime() {
  if (typeof window === "undefined") return;

  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;

    const ctx = new AudioContextClass();

    // First bell tone (high pitch coin ding)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();

    osc1.type = "sine";
    osc1.frequency.setValueAtTime(987.77, ctx.currentTime); // B5
    osc1.frequency.exponentialRampToValueAtTime(1318.51, ctx.currentTime + 0.08); // E6

    gain1.gain.setValueAtTime(0.3, ctx.currentTime);
    gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.45);

    osc1.connect(gain1);
    gain1.connect(ctx.destination);

    osc1.start(ctx.currentTime);
    osc1.stop(ctx.currentTime + 0.45);

    // Second bell tone (register chime shimmer)
    setTimeout(() => {
      try {
        const osc2 = ctx.createOscillator();
        const gain2 = ctx.createGain();

        osc2.type = "triangle";
        osc2.frequency.setValueAtTime(1567.98, ctx.currentTime); // G6
        osc2.frequency.exponentialRampToValueAtTime(2093.0, ctx.currentTime + 0.15); // C7

        gain2.gain.setValueAtTime(0.4, ctx.currentTime);
        gain2.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.6);

        osc2.connect(gain2);
        gain2.connect(ctx.destination);

        osc2.start(ctx.currentTime);
        osc2.stop(ctx.currentTime + 0.6);
      } catch (err) {
        console.warn("Second chime tone failed:", err);
      }
    }, 90);
  } catch (err) {
    console.warn("Audio playback not supported or blocked by user interaction:", err);
  }
}
