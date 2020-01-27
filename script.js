const PASSWORD_LENGTH = 260;
const DEFAULT_CHARS = {
    upperCase: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
    lowerCase: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
    numbers: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    symbols: ['!', '@', '#', '$', '%', '^', '&', '*'],    
};
const DEFAULT_DECOR = {
    colors: ['red', 'blue', 'yellow', 'green', 'black', 'white', 'purple', 'gray'],
    figures: ['lineUP', 'triengleDOWN', 'lineLEFT', 'lineRIGHT'],
};
const DEFAULT_CHUNK_LENGTH = 8;


function Character(char, color, figure) {
    this.char = char;
    this.color = color;
    this.figure = figure;
}