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
    ["A man a plan a canal Panama",    true],
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

describe("isRealWord()", () => {
 beforeEach(() => {
  vi.restoreAllMocks()
 })

 it("returns true when the API responds with 200", async () => {
  vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ok: true}))
  expect(await isRealWord("racecar")).toBe(true)
 })

 it("returns false when the API responds with 404", async () => {
  vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ok: false}))
  expect(await isRealWord("xyzqrt")).toBe(false)
 })

 it("calls the API witht the word lowercased", async () => {
  const mockedFetch = vi.fn().mockResolvedValue({ok: true})
  vi.stubGlobal("fetch", mockedFetch)
  await isRealWord("Racecar")
  expect(mockedFetch).toHaveBeenCalledWith('https://api.dictionaryapi.dev/api/v2/entries/en/racecar')
 })

 it("returns true on network error so the app still works offline", async () => {
  vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error ("Network error")))
  expect(await isRealWord("racecar")).toBe(true);
 })

 it("trims the whitespace before calling the API", async () => {
  const mockedFetch = vi.fn().mockResolvedValue({ok: true})
  vi.stubGlobal("fetch", mockedFetch)
  await isRealWord("   madam   ")
  expect(mockedFetch).toHaveBeenCalled('https://api.dictionaryapi.dev/api/v2/entries/en/madam')
 })

 const edgeCases = [
  ["",  false],
  [null, false]
 ]

 it.each(edgeCases)("returns false for invalid input: %s", async (input, expected) => {
  expect(await isRealWord(input)).toBe(expected)
 } )
})
