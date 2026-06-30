import { fitChips } from '@/lib/chipFit';

// One-line chip fitting for the collapsed "why you matched" answer chips. Greedy from the
// front under a character budget (maxChars 34) and a count cap (maxCount 3), but always at
// least one chip so a single long label still renders instead of an empty row.

describe('fitChips', () => {
  it('returns nothing to show or count for empty input', () => {
    expect(fitChips([])).toEqual({ shown: [], more: 0 });
  });

  it('shows every label when they all fit the budget', () => {
    const labels = ['Wire it up', 'Test a part', 'Plan a line'];
    expect(fitChips(labels)).toEqual({ shown: labels, more: 0 });
  });

  it('still shows a too-long first label alone, with the rest as more', () => {
    const long = 'Meet with my friends to make some afterschool plans';
    expect(fitChips([long, 'short', 'tiny'])).toEqual({ shown: [long], more: 2 });
  });

  it('caps the count at maxCount even when more labels would fit on chars', () => {
    const labels = ['a', 'b', 'c', 'd', 'e'];
    expect(fitChips(labels)).toEqual({ shown: ['a', 'b', 'c'], more: 2 });
  });

  it('cuts off mid-list once the running char budget is exceeded', () => {
    // 16 + 16 = 32 fits; the third (16 more = 48) would exceed maxChars 34.
    const labels = ['sixteen-charsxx!', 'sixteen-charsxx!', 'sixteen-charsxx!'];
    expect(fitChips(labels)).toEqual({ shown: [labels[0], labels[1]], more: 1 });
  });

  it('honors custom maxChars and maxCount options', () => {
    expect(fitChips(['ab', 'cd', 'ef'], { maxChars: 100, maxCount: 1 })).toEqual({
      shown: ['ab'],
      more: 2,
    });
  });
});
