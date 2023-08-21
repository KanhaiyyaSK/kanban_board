// src/api.js

// Define the API URL
const apiUrl = "https://api.quicksell.co/v1/internal/frontend-assignment";

// Fetch function to get data from the API
const fetchData = async () => {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

// Export the fetchData function
export default fetchData;
