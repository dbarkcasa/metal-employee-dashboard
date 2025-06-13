const axios = require('axios');

const baseURL = 'http://localhost:3000/api';

// Sample test data for employees
const testEmployee = {
  name: "Test User",
  hours: 40,
  rate: 25
};

// Sample test data for metals
const testMetal = {
  name: "Gold",
  quantity: 10,
  price: 2000
};

// Helper to pause between tests
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function runTests() {
  try {
    console.log('--- Starting Sanity Check ---');

    // Test Employee POST
    const employeePost = await axios.post(`${baseURL}/employees`, testEmployee);
    console.log('POST Employee:', employeePost.data.length, 'total records now.');

    // Test Employee GET
    const employeeGet = await axios.get(`${baseURL}/employees`);
    console.log('GET Employees:', employeeGet.data.length, 'records found.');

    await sleep(500); // short pause

    // Test Metal POST
    const metalPost = await axios.post(`${baseURL}/metal`, testMetal);
    console.log('POST Metal:', metalPost.data.length, 'total records now.');

    // Test Metal GET
    const metalGet = await axios.get(`${baseURL}/metal`);
    console.log('GET Metals:', metalGet.data.length, 'records found.');

    console.log('--- Sanity Check Complete ---');
  } catch (err) {
    console.error('Sanity Check Failed:', err.response?.data || err.message);
  }
}

runTests();
