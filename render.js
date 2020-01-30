function convertObjectArrayToDOM(objArray, className) {
    const elemArr = [];

    for (const obj of objArray) {
        const elem = document.createElement('div');
        elem.className = className;

        //if() -> weed out undefined
        if (obj.char) {
            elem.textContent = obj.char;
        }
        if (obj.color) {
            elem.setAttribute('data-color', `${obj.color}`);
        }
        if (obj.figure) {
            elem.setAttribute('data-figure', `${obj.figure}`);
        }

        elemArr.push(elem);
    }

    return elemArr;
}

function createHeader(charPattern, emptyAngle = false) {
    const header = [];

    for (const char of charPattern) {
        const elem = document.createElement('div');
        elem.className = 'header';
        elem.textContent = char;

        header.push(elem);
    }

    if (emptyAngle) {
        const angle = document.createElement('div');
        angle.className = 'header';

        header.unshift(angle);
        header.push(angle);
    }

    return header;
}

function createCard(header, sideHeader, password) {
    const card = document.createElement('div');
    card.className = 'card';
    
    const row = document.createElement('div');
    card.className = 'row';
    for (const elem of header) {
        row.appendChild(elem);    
    }
    card.appendChild(row);

    for (const elem of sideHeader) {
        const row = document.createElement('div');
        card.className = 'row';

        row.appendChild(elem);

        for (let i = 0; i < 26; i++) { // 26 - number of letters in the English alphabet
            row.appendChild( password.shift() );
        }

        row.appendChild(elem);
        card.appendChild(row);
    }

    card.appendChild(row);

    return card;
}