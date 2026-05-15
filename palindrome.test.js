import { describe, it, expect, vi, beforeEach } from 'vitest';
import { isPalindrome, cleanInput, isRealWord } from './palindrome.js';

describe("cleanInput()", () => {
  const cases = [
    ["HELLO",   "hello"],
    ["race car",   "racecar"],
    ["A man a plan!",   "amanaplan"],
    ["A man a plan, a canal: Panama",   "amanaplanacanalpanama"],
    ["abc123",   "abc123"],
    ["",   ""],
    ["  ",   ""],
    ["!@#$%",   ""],
  ]

  it.each(cases)('cleanInput("%s") returns "%s"', (input, expected) => {
    expect(cleanInput(input)).toBe(expected)
  })

  it("returns empty string for non-string input", () =>  {
    expect(cleanInput(null)).toBe("")
    expect(cleanInput(undefined)).toBe("")
    expect(cleanInput(123)).toBe("")
  })
})

describe("isPalindrome()", () => {
  const cases = [
    ["racecar",    true],
    ["madam",    true],
    ["a",    true],
    ["1",    true],
    ["12321",    true],
    ["Racecar",    true],
    ["RaceCar",    true],
    ["hello",    false],
    ["world",    false],
    ["palindrome",    false],
    ["ab",    false],

    ["race car",    true],
    ["a man a plane a canal Panama",    true],
    ["Was it a car or a cat I saw",    true],
    ["No 'x' in Nixon",    true],
    ["hello world",    false],

    ["'",    false],
    ["   ",    false],
    ["!!!",    false],
  ]

  it.each(cases)('isPalindrome("%s") returns %s', (input, expected) => {
    expect(isPalindrome(input)).toBe(expected)
  })

  it("handles a very long palindrome", () => {
    expect(isPalindrome('a'.repeat(1000))).toBe(true)
  }) 

  it("handles a very long non-palindrome", () => {
    expect(isPalindrome('a'.repeat(999) + 'b')).toBe(false)
  })
})
