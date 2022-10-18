export const playNote = (freq: number, time: number, audioCtx: AudioContext) => {
  const oscillator = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  oscillator.type = 'sine';
  oscillator.connect(gain);
  oscillator.frequency.value = freq;
  gain.connect(audioCtx.destination);
  oscillator.start(audioCtx.currentTime + time);
  gain.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 1 + time);
  // oscillator.stop()
}