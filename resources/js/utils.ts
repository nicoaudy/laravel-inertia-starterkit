export function filesize(size: number): string {
  const i: number = Math.floor(Math.log(size) / Math.log(1024));
  return ((Number(size) / Math.pow(1024, i)) * 1).toFixed(2) + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
}
