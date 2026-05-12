export function cleanInput(str){
  if(typeof str !== "string") return ""
  return str.toLowerCase().replace(/[^a-z0-9]/g, '');
};

export function isPalindrome(str){
  const cleaned = cleanInput(str);
  const reversed = cleaned.split("").reverse().join("");

  if(cleaned.length === 0) return false
  return cleaned === reversed
};


export async function isRealWord(word){
  if(!word || typeof word !== "string") return false;
  const cleaned = word.trim().toLowerCase();
  if (!cleaned) return false

try {
  const result = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${cleaned}`)
  return result.ok;
} catch {
  return true
};
};
