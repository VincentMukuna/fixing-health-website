export function getInitials(name: string) {
  // Split the name into an array of words
  const words = name.trim().split(/\s+/)

  // If the name has more than one word, get the initials of the first and last words
  if (words.length > 1) {
    const firstInitial = words[0][0].toUpperCase()
    const lastInitial = words[words.length - 1][0].toUpperCase()
    return firstInitial + lastInitial
  }

  // If the name has only one word, return the first two letters
  const firstWord = words[0].toUpperCase()
  return firstWord.slice(0, 2)
}
