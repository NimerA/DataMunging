const FileSystem = require('fs');

// Reads the file.
function readFile(filePath) {
  return FileSystem.readFileSync(filePath, 'utf8');
}

// returns an array with the matching regex found on a data row.
function splitRowData(row, regex) {
  let columns = row.match(regex);
  if (columns) {
    columns = columns[0].split(/\s+/);
    columns.shift();
  }
  return columns;
}

// Splits a text file by endline
function splitFileIntoRows(file) {
  return file.toString().split('\n');
}

function getMinimunDifferenceBetweenTwoColumns(file, regex, columnOne, columnTwo) {
  const rows = splitFileIntoRows(file);
  let lowestResult;
  let minDifference = 1000;
  rows.forEach((row) => {
    const splitedColumns = splitRowData(row, regex);
    if (splitedColumns) {
      const value = Math.abs(splitedColumns[columnOne] - splitedColumns[columnTwo]);
      if (value < minDifference) {
        lowestResult = splitedColumns;
        minDifference = value;
      }
    }
  }, this);
  return lowestResult;
}

// Searches for the lowest tempeture spread in the data.
function weatherDataMunging(weatherFilePath) {
  const weatherDataFile = readFile(weatherFilePath);
  const weatherColumnRegex = /\s+\d+\s+\d+\s+\d+/;
  const result = getMinimunDifferenceBetweenTwoColumns(weatherDataFile, weatherColumnRegex, 1, 2);
  return (`Day Number: ${result[0]} Maximum temperature: ${result[1]} Minimum temperature: ${result[2]}`);
}

// Searches for the lowest difference between F and A in the data.
function footballDataMunging(footballFilePath) {
  const footballDataFile = readFile(footballFilePath);
  const footballColumnRegex = /\s+\d+.\s+\w+\s+\d+\s+\d+\s+\d+\s+\d+\s+\d+\s+-\s+\d+/;
  const result = getMinimunDifferenceBetweenTwoColumns(footballDataFile, footballColumnRegex, 6, 8);
  return (`Name: ${result[1]} Smallest difference: ${Math.abs(result[6] - result[8])}`);
}

module.exports = {
  weatherData(filePath) { return weatherDataMunging(filePath); },
  footballData(filePath) { return footballDataMunging(filePath); },
};
