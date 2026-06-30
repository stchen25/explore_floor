import { COMPARE_CLOSE_THRESHOLD,compareRecommendation } from '@/lib/compareRecommendation';

// Compare recommendation (DATA_MODEL §17, D-029 Phase D). Leads with fit (higher match %),
// foregrounds the lower-barrier role when close. Education barriers: Technician 0,
// Specialist 2, Integrator 2 — so Technician is the lower-barrier role against either degreed
// role, and Specialist vs Integrator is an equal-barrier pair.

describe('compareRecommendation', () => {
  it('names the higher match % as the leaned role; ties go to the left', () => {
    expect(compareRecommendation('specialist', 'technician', 80, 40).leaned).toBe('specialist');
    expect(compareRecommendation('specialist', 'technician', 40, 80).leaned).toBe('technician');
    expect(compareRecommendation('specialist', 'integrator', 60, 60).leaned).toBe('specialist'); // tie → left
  });

  it('is a clear winner when the gap exceeds the close threshold', () => {
    const rec = compareRecommendation('specialist', 'technician', 80, 40);
    expect(rec.close).toBe(false);
    expect(rec.variant).toBe('clearWinner');
    expect(rec.other).toBe('technician');
  });

  it('foregrounds the lower-barrier role when close and the school asks differ', () => {
    // Specialist edges Technician on fit, but they are close and Technician needs less school.
    const rec = compareRecommendation('specialist', 'technician', 60, 55);
    expect(rec.close).toBe(true);
    expect(rec.variant).toBe('closeLowerBarrier');
    expect(rec.lowerBarrier).toBe('technician');
    expect(rec.growToward).toBe('specialist');
  });

  it('foregrounds the lower-barrier role even when it is also the higher-fit role', () => {
    // Technician is both the closer fit and the easier start; grow toward the other.
    const rec = compareRecommendation('technician', 'integrator', 58, 54);
    expect(rec.variant).toBe('closeLowerBarrier');
    expect(rec.lowerBarrier).toBe('technician');
    expect(rec.growToward).toBe('integrator');
  });

  it('treats two equal-barrier roles as a close, even call', () => {
    const rec = compareRecommendation('specialist', 'integrator', 62, 58);
    expect(rec.close).toBe(true);
    expect(rec.lowerBarrier).toBeNull();
    expect(rec.growToward).toBeNull();
    expect(rec.variant).toBe('closeEqualBarrier');
  });

  it('uses the close threshold boundary inclusively', () => {
    const atEdge = compareRecommendation('specialist', 'integrator', 60, 60 - COMPARE_CLOSE_THRESHOLD);
    expect(atEdge.close).toBe(true);
    const justOver = compareRecommendation('specialist', 'integrator', 60, 60 - COMPARE_CLOSE_THRESHOLD - 1);
    expect(justOver.close).toBe(false);
    expect(justOver.variant).toBe('clearWinner');
  });
});
