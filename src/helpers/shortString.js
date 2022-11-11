export const shortString = (str, leng, extra) => {
  console.log(extra);
  const a = extra ?? '';
  return str ? (str.length > leng ? str.slice(0, leng) + `...${a}` : str) : str;
};
