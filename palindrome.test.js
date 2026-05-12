import { describe, it, expect } from 'vitest';
import { isPalindrome } from './palindrome.js';

describe('isPalindrome', () => {
  it('returns true for a simple palindrome', () => {
    expect(isPalindrome('racecar')).toBe(true);
  });

  it('returns false for a non-palindrome', () => {
    expect(isPalindrome('hello')).toBe(false);
  });
});
