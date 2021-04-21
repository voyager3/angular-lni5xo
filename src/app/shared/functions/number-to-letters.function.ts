
const numberOfLettersInAlphabet: number = 26;
const asciiCodeOfaLetter: number = 97;

export function numberToLetters(numberToConvert: number): string {
    let mod: number = numberToConvert % numberOfLettersInAlphabet;
    let pow: number = numberToConvert / numberOfLettersInAlphabet | 0;
    let out: string = mod ? String.fromCharCode((asciiCodeOfaLetter - 1) + mod) : (pow--, 'z');

    return pow 
      ? numberToLetters(pow) + out 
      : out;
  }