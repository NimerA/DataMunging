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
function weatherDataMunging(filePath) {
  const dataFile = readFile(filePath);
  const result = getMinimunDifferenceBetweenTwoColumns(dataFile, 1, 2);
  return (`Day: ${result[0]} Max Temp: ${result[1]} Min Temp: ${result[2]}`);
}

// Searches for the lowest difference between F and A in the data.
function footballDataMunging(filePath) {
  const DataFile = readFile(filePath);
  const res = getMinimunDifferenceBetweenTwoColumns(DataFile, 6, 8);
  const goalDiff = Math.abs(res[6] - res[8]);
  return (`Name: ${res[1]} Smallest difference: ${goalDiff}`);
}

module.exports = {
  weatherData(filePath) { return weatherDataMunging(filePath); },
  footballData(filePath) { return footballDataMunging(filePath); },
};
