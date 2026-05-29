// Thin audio seam. Sound is off by default and a NO-OP in Phase 0 — the real Howler wiring
// (SFX assets, the mute toggle) lands in Phase 3. Keeping the seam here means screens can
// call playSfx() / setMuted() now without depending on the implementation.

let muted = true;

export function setMuted(value: boolean): void {
  muted = value;
}

export function isMuted(): boolean {
  return muted;
}

export function playSfx(_name: string): void {
  // Phase 0: intentionally does nothing. Phase 3 wires Howler here, gated on `muted`.
}
