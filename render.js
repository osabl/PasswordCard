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