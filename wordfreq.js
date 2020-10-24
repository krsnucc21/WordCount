const ID_WORD_FREQUENCY_COUNTERS = "word_freq_counters";
const LIST_WORD_FREQUENCY_COUNTERS = document.getElementById(ID_WORD_FREQUENCY_COUNTERS);
const ID_WORD_FREQUENCY_LIST = "word_freq_list";
const LIST_WORD_FREQUENCY_LIST = document.getElementById(ID_WORD_FREQUENCY_LIST);
const ID_INPUT_TEXT = "input_text";

function tokenize(text) {
    // Modified regex from Mike Grace's answer on StackOverflow:
    // https://stackoverflow.com/questions/4328500/how-can-i-strip-all-punctuation-from-a-string-in-javascript-using-regex
    const tokenizedText = text.trim().replace(/[.,\/#!$%\^&\*;:{}=\_`~()\[\]\\?]/g,"").replace(/[\s{2,}\n]/g," ").toLowerCase().split(" ");
    return tokenizedText;
}

function wordFreq(tokenizedText) {
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
    const DATA = document.getElementById(ID_INPUT_TEXT).value;
    const TOKENIZED_DATA = tokenize(DATA);
    const OBJECT_WORD_FREQUENCY = wordFreq(TOKENIZED_DATA);

    let wordArray = [];
    wordArray = Object.keys(OBJECT_WORD_FREQUENCY).map(function (key) {
        return {
            name: key,
            total: OBJECT_WORD_FREQUENCY[key]
        };
    });

    wordArray.sort(function (a, b) {
        return b.total - a.total;
    });

    LIST_WORD_FREQUENCY_COUNTERS.innerHTML = "";
    if (wordArray.length > 0) {
        let liUW = document.createElement("li");
        liUW.innerText = "number of unique words: " + wordArray.length;
        LIST_WORD_FREQUENCY_COUNTERS.append(liUW);
        let liTW = document.createElement("li");
        liTW.innerText = "total number of words: " + TOKENIZED_DATA.length;
        LIST_WORD_FREQUENCY_COUNTERS.append(liTW);
    }

    LIST_WORD_FREQUENCY_LIST.innerHTML = "";
    for (let i = 0; i < wordArray.length; i++) {
        let li = document.createElement("li");
        li.innerText = wordArray[i].name + ": " + wordArray[i].total;
        LIST_WORD_FREQUENCY_LIST.append(li);
    }
}
