export function handleNaN(value: number): number {
  return isNaN(value) ? 0 : value;
}