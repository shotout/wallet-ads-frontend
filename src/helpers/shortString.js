export const shortString = (str, leng, extra) => {
  const a = extra ?? '';
  const extension = /[.]/.exec(str) ? /[^.]+$/.exec(str) : '';
  return str ? (str.length >= leng ? str.slice(0, leng) + ` ...${extension ? extension : ''}` : str) : str;
};
