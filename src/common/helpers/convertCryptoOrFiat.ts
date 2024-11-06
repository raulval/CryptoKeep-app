import { formatValueByCurrencyCode } from "./formatValueByCurrencyCode";

export enum EActionToConvertCryptoOrFiat {
  FIAT_TO_CRYPTO = "fiatToCrypto",
  CRYPTO_TO_FIAT = "cryptoToFiat",
}
interface IConvertCryptoOrFiat {
  action: EActionToConvertCryptoOrFiat;
  value: number;
  quotation: any;
  localeInfo: {
    currencyCode: string;
    languageTag: string;
  };
  withSymbol?: boolean;
  noFormat?: boolean;
}

export const convertCryptoOrFiat = ({
  value,
  action,
  quotation,
  localeInfo,
  withSymbol = true,
  noFormat = false,
}: IConvertCryptoOrFiat): string => {
  let convertedValue = "0";

  if (!quotation) {
    return "--";
  }

  const priceCryptoInFiat = Number(quotation);

  if (priceCryptoInFiat) {
    if (action === EActionToConvertCryptoOrFiat.FIAT_TO_CRYPTO) {
      convertedValue = (Number(value) / priceCryptoInFiat)
        .toFixed(5)
        .replace(/[.,]00$/, "");
    } else if (action === EActionToConvertCryptoOrFiat.CRYPTO_TO_FIAT) {
      const valueWithoutFormatting = (
        Number(value) * priceCryptoInFiat
      ).toFixed(2);

      if (noFormat) {
        return valueWithoutFormatting;
      }

      convertedValue = formatValueByCurrencyCode({
        value: Number(valueWithoutFormatting),
        currencyCode: localeInfo.currencyCode,
        localeCode: localeInfo.languageTag,
        withSymbol,
      });
    }
  }

  return convertedValue;
};
