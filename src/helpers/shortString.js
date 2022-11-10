export const shortString = (str, leng) => {
  return str ? (str.length > leng ? str.slice(0, leng) + ` ...` : str) : str;
};
