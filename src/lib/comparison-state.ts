export function selectComparisonIds(raw: unknown, availableIds: string[], defaults: string[]) {
  if (raw === undefined) return defaults;
  if (typeof raw !== "string") return [];
  return [...new Set(raw.slice(0, 1024).split(","))]
    .filter((id) => availableIds.includes(id)).slice(0, 4);
}
