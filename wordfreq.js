const MAX_FONT_SIZE = 64;
const ID_WORD_FREQUENCY_LIST = "word_freq_list";
const ID_INPUT_TEXT = "input_text";
const LIST_WORD_FREQUENCY = document.getElementById(ID_WORD_FREQUENCY_LIST);

function tokenize(text) {
    // Modified regex from Mike Grace's answer on StackOverflow:
    // https://stackoverflow.com/questions/4328500/how-can-i-strip-all-punctuation-from-a-string-in-javascript-using-regex
    const tokenizedText = text.trim().replace(/[.,\/#!$%\^&\*;:{}=\_`~()\[\]\\?]/g,"").replace(/[\s{2,}\n]/g," ").toLowerCase().split(" ");
    return tokenizedText;
}

function wordFreq(text) {
    const tokenizedText = tokenize(text);
    let freq = {};
    for (let i = 0; i < tokenizedText.length; i++) {
        if (freq[tokenizedText[i]]) {
            freq[tokenizedText[i]]++;
        } else {
            freq[tokenizedText[i]] = 1;
        }
    }
    return freq;
}

function showWordFreq() {
    LIST_WORD_FREQUENCY.innerHTML = "";
    const DATA = document.getElementById(ID_INPUT_TEXT).value;
    const OBJECT_WORD_FREQUENCY = wordFreq(DATA);
    let keys = [];
    let values = [];
    for (let [key, value] of Object.entries(OBJECT_WORD_FREQUENCY)) {
        keys.push(key);
        values.push(value);
    }
    for (let i = 0; i < keys.length; i++) {
        let li = document.createElement("li");
        li.innerText = keys[i] + ": " + values[i];
        let fontSize = 12;
        if (fontSize + values[i] < MAX_FONT_SIZE) {
            fontSize += values[i];
        } else {
            fontSize = MAX_FONT_SIZE;
        }
        li.style.fontSize = `${fontSize}px`;
        LIST_WORD_FREQUENCY.append(li);
    }
}
