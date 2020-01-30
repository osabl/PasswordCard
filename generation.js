"use strict";

const PASSWORD_LENGTH = 260;
const DEFAULT_CHUNK_LENGTH = 12;
const DEFAULT_TEMPLATES = {
    char: {
        upperCase: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
        lowerCase: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
        numbers: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
        symbols: ['!', '@', '#', '$', '%', '^', '&', '*'],
    },
    color: ['#0f6746', '#128487', '#bde528', '#f98a00', '#ba1b1b'],
    figure: ['Top', 'Bottom', 'Left', 'Right'],
};
const DEFAULT_REQUIREMENTS = {
    char: {
        upperCase: true,
        lowerCase: true,
        numbers: true,
        symbols: true,
    },
    color: true,
    figure: true,
}

function Character(char, color, figure) {
    this.char = char;
    this.color = color;
    this.figure = figure;
}

function Template(requirements, templates) {
    for (const key in requirements) {
        //to enter the object
        if (typeof requirements[key] == 'object' && typeof templates[key] == 'object') {
            this[key] = [];
            for (const prop in requirements[key]) {
                if (requirements[key][prop]) {
                    this[key] = this[key].concat(templates[key][prop]);
                }
            }
            continue;
        }

        if (requirements[key]) {
            this[key] = templates[key];
        }
    }
}


function generateHeader(charPattern, color, figure) {
    const header = [];

    for (const char of charPattern) {
        header.push(new Character(char, color, figure));
    }
    return header;
}

function generateFullPassword(requirements, templates, chunkLength) {
    const templ = new Template(requirements, templates);
    const numberOfChunks = Math.ceil(PASSWORD_LENGTH / chunkLength);

    let fullPassword = [];

    for (let i = 0; i < numberOfChunks; i++) {
        fullPassword = fullPassword.concat(getCorrectRandomChunk(requirements, templates, templ, chunkLength));
    }

    //cropping the array
    fullPassword.length = PASSWORD_LENGTH;

    return fullPassword;
}

function getRandomChunk(template, chunkLength) {
    const chunk = [];
    const shuffleTempl = {};

    //shuffle and copy template
    for (const key in template) {
        shuffleTempl[key] = getShuffle(template[key]);
    }

    for (let i = 0; i < chunkLength; i++) {
        const args = [];

        for (const key in shuffleTempl) {
            args.push( pullRandom(shuffleTempl[key]) );
        }

        const character = new Character(...args);
        chunk.push(character);
    }

    return chunk;
}

function pullRandom(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function getShuffle(array) {
    const arr = array;
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * arr.length);
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// This function uses recursion
function getCorrectRandomChunk(requirements, templates, template, chunkLength) {
    const chunk = getRandomChunk(template, chunkLength);

    if ( isChunkCorrect(chunk, requirements, templates) ) {
        return chunk;
    } else {
        return getCorrectRandomChunk(requirements, templates, template, chunkLength);
    }
}

//checking char only    
function isChunkCorrect(chunk, requirements, templates) {
    for (const demand in requirements.char) {
        if (requirements.char[demand]) {
            if (isMet(chunk, templates.char[demand])) {
                continue;
            } else {
                return false;
            }
        }
    }
    return true;
}

function isMet(chunk, template) {
    for (const obj of chunk) {
        for (const char of template) {
            if (obj.char == char) {
                return true;
            }
        }
    }
    return false;
}