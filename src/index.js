const FileSystem = require('fs');

// Reads the file.
function readFile(filePath) {
  return FileSystem.readFileSync(filePath, 'utf8');
}

// returns an array with the matching regex found on a data row.
function splitRowData(row) {
  const regex = /\s+/;
  const columns = row.split(regex);
  columns.shift();
  return columns;
}

// Splits a text file by endline
function splitFileIntoRows(file) {
  return file.toString().split('\n');
}

function getMinimunDifferenceBetweenTwoColumns(file, columnOne, columnTwo) {
  const rows = splitFileIntoRows(file);
  let lowestResult;
  let minDifference = 1000;
  rows.forEach((row) => {
    const splitedColumns = splitRowData(row);
    const value = Math.abs(splitedColumns[columnOne] - splitedColumns[columnTwo]);
    if (value < minDifference) {
      lowestResult = splitedColumns;
      minDifference = value;
    }
  }, this);
  return lowestResult;
}

// Searches for the lowest tempeture spread in the data.
function weatherDataMunging(weatherFilePath) {
  const weatherDataFile = readFile(weatherFilePath);
  const maxTempetureColumnNumber = 1;
  const minTempetureColumnNumber = 2;
  const result = getMinimunDifferenceBetweenTwoColumns(
    weatherDataFile,
    maxTempetureColumnNumber,
    minTempetureColumnNumber,
  );
  return (`Day: ${result[0]} Max Temp: ${result[maxTempetureColumnNumber]} Min Temp: ${result[minTempetureColumnNumber]}`);
}

// Searches for the lowest difference between F and A in the data.
function footballDataMunging(footballFilePath) {
  const footballDataFile = readFile(footballFilePath);
  const goalsInFavorColumnNumber = 6;
  const goalsAgainstColumnNumber = 8;
  const result = getMinimunDifferenceBetweenTwoColumns(
    footballDataFile,
    goalsInFavorColumnNumber,
    goalsAgainstColumnNumber,
  );
  const goalDiff = Math.abs(result[goalsInFavorColumnNumber] - result[goalsAgainstColumnNumber]);
  return (`Name: ${result[1]} Smallest difference: ${goalDiff}`);
}

module.exports = {
  weatherData(filePath) { return weatherDataMunging(filePath); },
  footballData(filePath) { return footballDataMunging(filePath); },
};
