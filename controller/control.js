const fs = require("fs");


// Read data from JSON file
const readData = () => {
    try {
      const data = fs.readFileSync('data.json', 'utf8');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  };


// Write data to JSON file
const writeData = (data) => {
    fs.writeFileSync('data.json', JSON.stringify(data, null, 2), 'utf8');
  };
  

  module.exports = {
    readData,
    writeData
  }