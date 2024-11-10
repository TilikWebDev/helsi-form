export const createFieldMask = (format: string): Array<string | RegExp> => {
  return format.split('').map((char) => {
    if (char === 'A') return /[A-Za-zА-Яа-я]/;
    if (char === '9') return /[0-9]/;
    return char;
  });
};
