interface IFormatCurrencyProps {
  currencyCode: string;
  value: number;
  localeCode: string;
  withCurrencyCode?: boolean;
  withSymbol?: boolean;
  withSymbolCode?: boolean;
}

export const formatValueByCurrencyCode = ({
  currencyCode,
  value,
  localeCode,
  withCurrencyCode = true,
  withSymbol = false,
  withSymbolCode = false,
}: IFormatCurrencyProps) => {
  try {
    const currencyFormatted = value?.toLocaleString(localeCode || "en-US", {
      style: "currency",
      currency: currencyCode || "USD",
      currencyDisplay: withSymbol ? "symbol" : "code",
    });

    if (withSymbol) return currencyFormatted;

    if (withSymbolCode) return currencyFormatted;

    return currencyFormatted.replace(currencyCode, "");
  } catch (error) {
    // console.log("Error on format value => ", error);
    return withCurrencyCode
      ? `${currencyCode} ${value}`
      : `${value.toFixed(2)}`;
  }
};
