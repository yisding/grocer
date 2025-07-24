export function savingsPercentage(local: number, online: number): number {
  if (online === 0) return 0;
  return ((online - local) / online) * 100;
}

export function isWorthBuying(local: number, online: number, threshold = 10): boolean {
  return savingsPercentage(local, online) >= threshold;
}
