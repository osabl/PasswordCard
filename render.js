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

function createHeader(charPattern, className, emptyAngle = false) {
    const header = [];

    for (const char of charPattern) {
        const elem = document.createElement('div');
        elem.className = className;
        elem.textContent = char;

        header.push(elem);
    }

    if (emptyAngle) {
        const angle = document.createElement('div');
        angle.className = 'header';
        const copy = angle.cloneNode(true);

        header.unshift(angle);
        header.push(copy);
    }

    return header;
}

function createCard(header, sideHeader, password) {
    const card = document.createElement('div');
    card.className = 'card';

    const startRow = document.createElement('div');
    startRow.className = 'row';
    for (const elem of header) {
        startRow.appendChild(elem);
    }
    card.appendChild(startRow);

    for (const elem of sideHeader) {
        const row = document.createElement('div');
        row.className = 'row';

        row.appendChild(elem);

        for (let i = 0; i < 26; i++) { // 26 - number of letters in the English alphabet
            row.appendChild( password.shift() );
        }

        const copyElem = elem.cloneNode(true);
        row.appendChild(copyElem);
        card.appendChild(row);
    }

    const endRow = startRow.cloneNode(true);
    card.appendChild(endRow);

    return card;
}