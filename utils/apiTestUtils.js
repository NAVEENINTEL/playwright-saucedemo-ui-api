const {apiURL} =require("../config")
async function fetchRandomImageUrl() {
    const fetchResponse = await fetch(apiURL);
    const data = await fetchResponse.json();
    return data.message;
  }
  
  module.exports = { fetchRandomImageUrl };
  