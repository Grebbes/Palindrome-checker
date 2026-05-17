import { defineConfig } from "@playwright/test";

export default defineConfig({
    testDir: ".",
    testMatch: "**/*.e2e.js",
    use: {
        baseURL: 'http://localhost:5500'
    }
})