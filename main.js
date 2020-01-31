const generateBtn = document.querySelector('#generate-btn');
const cardField = document.querySelector('#card-field');

generateBtn.addEventListener('click', (event) => {
    event.preventDefault();

    const requirements = {
        char: {
            uppercase: document.querySelector('#uppercase').checked,
            lowercase: document.querySelector('#lowercase').checked,
            number: document.querySelector('#number').checked,
            symbol: document.querySelector('#symbol').checked,
        },
        color: document.querySelector('#color').checked,
        figure: document.querySelector('#figure').checked,
    }
    const chunkLength = document.querySelector('#chunk-length').value;

    const password = generateFullPassword(requirements, DEFAULT_TEMPLATES, chunkLength);

    const passwordDOM = convertObjectArrayToDOM(password, 'cell');
    const headerDOM = createHeader(DEFAULT_TEMPLATES.char.uppercase, true);
    const sidehearedDOM = createHeader(DEFAULT_TEMPLATES.char.number, false);
    const card = createCard(headerDOM, sidehearedDOM, passwordDOM);
    cardField.appendChild(card);
});