#!/usr/bin/env node

/**
 * @fileoverview Main CLI that is run via the word-chain command.
 * @author Nimer Ennabe
 */

/* eslint no-console:off */

const DataMunging = require('../src/index.js');

const choice = process.argv[2];
if (choice === 'weather') {
  console.log(DataMunging.weatherData('./weather.dat'));
} else {
  console.log(DataMunging.footballData('./football.dat'));
}
