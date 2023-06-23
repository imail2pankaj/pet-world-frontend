import moment from "moment";

export const capitalize = (string) => (string.charAt(0).toUpperCase() + string.slice(1)).replace("_", " ")

export const truncate = (string) => {
  return string.length > 97 ? string.substring(0, 97) + "..." : string;
}

export const dateFormat = (string) => {
  return moment(string).format("DD MMM, YYYY");
}

export const formatCurrency = (price, currency = 'EUR') => {
  const pounds = Intl.NumberFormat('en-DE', {
    style: 'currency',
    currency: currency,
    maximumSignificantDigits: 3,
  });

  return pounds.format(price);
}