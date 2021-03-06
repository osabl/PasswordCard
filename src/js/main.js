const generateBtn = document.querySelector('#generate-btn');
const cardFieldInner = document.querySelector('.card-field-inner');
const cardField_back = document.querySelector('.card-field .back'); 
const cardField = document.querySelector('.card-field');
const checkboxes = document.querySelectorAll('input[name="requirements"]');
const reset = document.querySelector('.button.reset');

generateBtn.addEventListener('click', (event) => {
    if (document.querySelector('#chunk-length').validity.valid) {
        event.preventDefault();

        let oldCard = document.querySelector('.card');
        if (oldCard) {
            oldCard.remove();
        }

        const requirements = {
            char: {
                uppercase: document.querySelector('#uppercase').checked,
                lowercase: document.querySelector('#lowercase').checked,
                number: document.querySelector('#number').checked,
                symbol: document.querySelector('#symbol').checked,
            },
            color: document.querySelector('#color').checked,
            extraColor: document.querySelector('#extraColor').checked,
        }
        const chunkLength = document.querySelector('#chunk-length').value;

        const password = generateFullPassword(requirements, DEFAULT_TEMPLATES, chunkLength);

        const passwordDOM = convertObjectArrayToDOM(password, 'cell');
        const headerDOM = createHeader(DEFAULT_TEMPLATES.char.uppercase, 'header', true);
        const sidehearedDOM = createHeader(DEFAULT_TEMPLATES.char.number, 'side-header', false);
        const card = createCard(headerDOM, sidehearedDOM, passwordDOM);
      
        cardField_back.appendChild(card);
        scope();
        setTimeout(flip, 1500);
        setTimeout(scope, 3000);
    }
});

for (const checkbox of checkboxes) {
    checkbox.addEventListener('click', checkingBox);
}

reset.addEventListener('click', () => setTimeout(checkingBox, 1)); // crutch (does not work without a timeout)

function checkingBox() {
    for (const check of checkboxes) {
        if (check.id == 'color') { // ignore because color depends on the char
            continue;
        } else if (check.checked) {
            generateBtn.disabled = false;
            return;
        }
    }
    generateBtn.disabled = true;
}

function flip() {
    cardFieldInner.classList.toggle('flip');
}

function scope() {
    cardField.classList.toggle('scope');
}