export function cleanInput(str){
  if(typeof str !== "string") return ""
  return str.toLowerCase().replace(/[^a-z0-9]/g, '')
}

export function isPalindrome(str){
  const cleaned = cleanInput(str)
  if(cleaned.length === 0) return false
  return cleaned === cleaned.split("").reverse().join("")
}
