export function toDeLocaleDateString(date: Date): string {
  return new Date(date).toLocaleDateString("de-DE", {
    weekday: "short",
    year: "2-digit",
    month: "short",
    day: "numeric",
  });
}
