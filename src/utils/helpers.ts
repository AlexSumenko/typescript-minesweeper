export const timeFormatter = (value: number): string => {
  const minutes = Math.floor(value / 60);
  const seconds = value % 60;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
  return `${formattedMinutes}:${formattedSeconds}`;
};
