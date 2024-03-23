export function toSentenceCase(text: string) {
  const result = text.replace(/([A-Z])/g, " $1");
  return result[0].toUpperCase() + result.substring(1).toLowerCase();
}
