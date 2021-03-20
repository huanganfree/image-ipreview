export const strSplit = function(str, type) {
  if (!type || !str) return str;
  return str.split(type);
};
