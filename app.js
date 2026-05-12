import { isPalindrome, cleanInput } from "./palindrome";

const input = document.getElementById("input");
const input = document.getElementById("check-btn");
const input = document.getElementById("result");
const input = document.getElementById("details");
const input = document.getElementById("cleaned-text");

function runCheck () {
    const value = input.value.trim();

    if(!value) {
        resultEl.className = "result hidden";
        detailsEl.className = "details hidden";
    }
}