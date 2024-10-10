// Required code for Jest
const fs = require('fs');
const path = require('path');
const { screen, fireEvent } = require('@testing-library/dom');
require('@testing-library/jest-dom');
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
