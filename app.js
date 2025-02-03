// TODO: Import required modules
// Hint: You will need the 'fs' module for reading the file and the 'chalk' library for coloring the words.
const fs = require('fs');
const chalk = require('chalk');

/**
 * Synchronously reads the content of 'declaration.txt'.
 * @returns {string} The content of the file.
 */
function readFileContent() {
    try {
        const data = fs.readFileSync('declaration.txt', 'utf8'); // Synchronous read
        return data;
    } catch (err) {
        console.error('Error reading the file:', err);
        return ''; // Return an empty string in case of an error
    }
}

/**
 * Gets the word count from the content.
 * @param {string} content The file content.
 * @returns {Object} An object with words as keys and their occurrences as values.
 */
function getWordCounts(content) {
    const wordCount = {};
    const words = content.split(/\W+/).filter(Boolean); // Splitting by non-word characters.
    
    words.forEach(word => {
        const lowerCaseWord = word.toLowerCase(); // Normalize words to lowercase
        wordCount[lowerCaseWord] = (wordCount[lowerCaseWord] || 0) + 1;
    });

    return wordCount;
}

/**
 * Colors a word based on its frequency.
 * @param {string} word The word to be colored.
 * @param {number} count The frequency of the word.
 * @returns {string} The colored word.
 */
function colorWord(word, count) {
    if (count === 1) {
        return chalk.blue(word); // Blue for words that occur once
    } else if (count >= 2 && count <= 5) {
        return chalk.green(word); // Green for words occurring between 2 and 5 times
    } else {
        return chalk.red(word); // Red for words occurring more than 5 times
    }
}

/**
 * Prints the first 15 lines of the content with colored words.
 * @param {string} content The file content.
 * @param {Object} wordCount The word occurrences.
 */
function printColoredLines(content, wordCount) {
    const lines = content.split('\n').slice(0, 15); // Get first 15 lines

    for (const line of lines) {
        const coloredLine = line.split(/\W+/).map(word => {
            const lowerCaseWord = word.toLowerCase();
            return word ? colorWord(word, wordCount[lowerCaseWord] || 0) : word;
        }).join(' ');

        console.log(coloredLine);
    }
}

/**
 * Main function to read the file, count the word occurrences and print the colored lines.
 */
function processFile() {
    const content = readFileContent();
    const wordCount = getWordCounts(content);
    printColoredLines(content, wordCount);
}

if (require.main === module) {
    // This will execute only if the file is run directly.
    processFile();
}

// TODO: Export the functions for testing
// Hint: You can use the 'module.exports' syntax.
module.exports = {
    readFileContent,
    getWordCounts,
    colorWord,
    printColoredLines,
    processFile
};
