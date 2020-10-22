'use strict';

function FrequencyCounter(text) {
  this.text = text
}

FrequencyCounter.prototype.splitWords = function() {
  this.text = this.text.split(" ")
}

FrequencyCounter.prototype.removeNonAlphas = function() {
  this.text = this.text.replace(/[^0-9a-z\ ]/gi, '')
}

FrequencyCounter.prototype.countFrequencies = function() {
  var wordFrequencies = {}

  this.text.forEach(function (key) {
    if (wordFrequencies.hasOwnProperty(key)) {
      wordFrequencies[key]++;
    } else {
      wordFrequencies[key] = 1;
    }
  });

  this.wordFrequencies = wordFrequencies

}

//Execute the program for a specific text file
var chosenFile = "./text-files/railway-children.txt"

var fs = require('fs');
var bookText = fs.readFileSync(chosenFile, "utf8");

var fc = new FrequencyCounter(bookText)
fc.removeNonAlphas();
fc.splitWords();
fc.countFrequencies();
console.log(fc.wordFrequencies)
