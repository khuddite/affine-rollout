export const stringToColor = (str: string): string => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  const hue = Math.abs(hash) % 360; // keep within [0, 359]
  const saturation = 65; // nice saturation
  const lightness = 55; // pleasant brightness

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};
