import { test, expect } from "@playwright/test";

test("connects to the dictionary API and gets a response", async ({request}) => {
    const res = await request.get ('https://api.dictionaryapi.dev/api/v2/entries/en/madam')

    expect(res.ok()).toBe(true)

    const body = await res.json()
    expect(Array.isArray(body)).toBe(true)
    expect(body[0].word).toBe('madam')
})

test("shows a positive result for a valid palindrome", async ({page}) => {
    await page.goto("/")
    await page.fill('#input', 'madam')
    await page.click('#check-btn')

    const result = page.locator('#result')
    await expect(result).toBeVisible()
    await expect(result).toContainText('is a palindrome')
    await expect(result).toHaveClass(/true/)
})

test("shows a negative result for a non-palindrome", async ({page}) => {
    await page.goto("/")
    await page.fill('#input', 'hello')
    await page.click('#check-btn')

    const result = page.locator('#result')
    await expect(result).toBeVisible()
    await expect(result).toContainText('is not a palindrome')
    await expect(result).toHaveClass(/false/)
})

