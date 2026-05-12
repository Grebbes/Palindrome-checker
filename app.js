import { isPalindrome, cleanInput } from "./palindrome";

const input = document.getElementById("input");
const checkBtn = document.getElementById("check-btn");
const resultEl = document.getElementById("result");
const detailsEl = document.getElementById("details");
const cleanedTextEl = document.getElementById("cleaned-text");

function runCheck () {
    const value = input.value.trim();

    if(!value) {
        resultEl.className = "result hidden";
        detailsEl.className = "details hidden";
    }
}