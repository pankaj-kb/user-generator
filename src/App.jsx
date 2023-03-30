import React from 'react';
import * as XLSX from 'xlsx';
import { faker } from '@faker-js/faker';
import fs from 'fs';

function App() {
  const handleClick = () => {
    // Define the number of rows you want to generate
    const numberOfAdults = 20;
    const numberOfChildren = 5;
    const numberOfInfants = 5;

    // Generate the data for adults
    const adultData = [];
    for (let i = 0; i < numberOfAdults; i++) {
      const firstName = faker.name.firstName();
      const lastName = faker.name.lastName();
      const birthdate = formatBirthdate(faker.date.between('01-01-1980', '12-31-2001'));
      adultData.push({ firstName, lastName, birthdate, type: 'adt' });
    }

    // Generate the data for children
    const childData = [];
    for (let i = 0; i < numberOfChildren; i++) {
      const firstName = faker.name.firstName();
      const lastName = faker.name.lastName();
      const birthdate = formatBirthdate(faker.date.between('01-01-2019', '12-31-2020'));
      childData.push({ firstName, lastName, birthdate, type: 'chd' });
    }

    // Generate the data for infants
    const infantData = [];
    for (let i = 0; i < numberOfInfants; i++) {
      const firstName = faker.name.firstName();
      const lastName = faker.name.lastName();
      const birthdate = formatBirthdate(faker.date.between('01-01-2022', '12-31-2022'));
      infantData.push({ firstName, lastName, birthdate, type: 'inf' });
    }

    // Format the birthdate as ddmmyy
    function formatBirthdate(date) {
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = String(date.getFullYear()).substr(-2);
      return `${day}${month}${year}`;
    }

    // Combine all the data into one array
    const data = [...adultData, ...childData, ...infantData];

    // Create a new workbook and add the data to a worksheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, 'Data');

    // Write the workbook to a file named "user_data_{timestamp}.xlsx"
    const fileName = `user_data_${Date.now()}.xlsx`;
    XLSX.writeFile(wb, fileName);

    // Download the file
    const link = document.createElement('a');
    link.href = fileName;
    link.download = fileName;
    link.click();

    // Delete the file after download is complete
    fs.unlink(fileName, (err) => {
      if (err) console.error(err);
    });
  };

  return (
    <div>
      <button onClick={handleClick}>Download Excel file</button>
    </div>
  );
}

export default App;