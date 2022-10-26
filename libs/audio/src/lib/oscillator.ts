export const playNote = (frequency: number, duration: number, audioCtx: AudioContext) => {
  // create Oscillator node
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  oscillator.frequency.value = frequency; // value in hertz
  
  oscillator.connect(gainNode)
  gainNode.connect(audioCtx.destination);
  oscillator.start();
  gainNode.gain.exponentialRampToValueAtTime(1, audioCtx.currentTime + 0.5);
  gainNode.gain.exponentialRampToValueAtTime(0.1, audioCtx.currentTime + duration);
  oscillator.stop(audioCtx.currentTime + duration);
}