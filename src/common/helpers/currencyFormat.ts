export const currencyFormat = (num?: number) => {
  if (!num) return "-";

  if (typeof num === "string") return num;

  // eslint-disable-next-line prefer-template
  return `$${num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}`;
};
