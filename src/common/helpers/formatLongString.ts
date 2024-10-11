export const formatLongString = (string: string, limit = 7): string => {
  if (string.length <= limit) {
    return string;
  }

  return `${string.slice(0, limit)}...${string.slice(-limit)}`;
};
