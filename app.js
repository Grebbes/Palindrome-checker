import { isPalindrome, cleanInput, isRealWord } from "./palindrome.js";

const input = document.getElementById("input");
const checkBtn = document.getElementById("check-btn");
const resultEl = document.getElementById("result");
const detailsEl = document.getElementById("details");
const cleanedTextEl = document.getElementById("cleaned-text");

async function runCheck() {
    const value = input.value.trim();

    if (!value) {
        resultEl.className = "result hidden";
        detailsEl.className = "details hidden";
        return;
    }

    checkBtn.disabled = true;
    resultEl.className = "result hidden";
    detailsEl.className = "details hidden";

    const isPhrase = value.includes(" ");

    if(!isPhrase) {
        const real = await isRealWord(value);

        if (!real) {
            resultEl.className = "result false";
            resultEl.textContent = `❌ "${value}" was not found in the dictionary.`;
            checkBtn.disabled = false;
            return;
        }
    }

    const result  = isPalindrome(value);
    const cleaned = cleanInput(value);

    resultEl.className = `result ${result ? "true" : "false"}`;
    resultEl.textContent = result ? `✅ "${value}" is a palindrome!` : `❌ "${value}" is not a palindrome.`;

    cleanedTextEl.textContent = `Cleaned input: "${cleaned}"`;
    detailsEl.className = "details";

    checkBtn.disabled = false;
}

checkBtn.addEventListener("click", runCheck);

input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") runCheck();
});

input.addEventListener("input", () => {
    if (!input.value.trim()) {
        resultEl.className = "result hidden";
        detailsEl.className = "details hidden";
    }
});
