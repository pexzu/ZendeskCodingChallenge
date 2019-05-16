export function getAvailableSearchFields(path: string) {
  return Object.keys(require(path)[0]);
}
