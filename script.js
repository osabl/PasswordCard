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

const DEFAULT_REQUIREMENTS = {
    upperCase: true,
    lowerCase: true,
    numbers: true,
    symbols: true,
    colors: true,
    figures: true,
}


function Character(char, color, figure) {
    this.char = char;
    this.color = color;
    this.figure = figure;
}

function pullRandomly(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function getShuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * arr.length);
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function isChunkCorrect(chunk, requirements, templates) {
    let isIncludes = function(chunk, template) {
        for (const value of template) {
            if (chunk.includes(value)) {
                return true;
            }
        }
        return false;
    };

    for (const key in requirements) {
        if (requirements[key]) {
            if (isIncludes(chunk, templates[key])) {
                continue;
            } else {
                return false;
            }
        } else {
            if (isIncludes(chunk, templates[key])) {
                return false;
            }
        }
    }
    return true;
}
