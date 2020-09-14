// jshint esversion: 8
/* Global Variables */
// define the input elements
const zip = document.querySelector("#zip");
const feelings = document.querySelector("#feelings");
const generate = document.querySelector("#generate");
// define the output elements
const dateDiv = document.querySelector("#date");
const tempDiv = document.querySelector("#temp");
const contentDiv = document.querySelector("#content");

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = `${d.getMonth() + 1}-${d.getDate()}-${d.getFullYear()}`;

//add event listner to the generate button
//make the listener function async to chain the promises
generate.addEventListener("click",async ()=>{
  // construct the URL based on the user zip code provided
  const apiKey = "0e1be1c1a7c5f2444671733ff9bed9cf";
  const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zip.value},us&appid=${apiKey}&units=metric`;
  //get data from the openweathermap server
  const weatherResponse = await getWeather(url);
  try{
    //construct the object that will be posted to our server
    const weatherFullData = {
      date: newDate,
      temperature: weatherResponse.main.temp,
      feeling: feelings.value
    };
    //post the data object to our server
    const postData = await postWeather("/postData", weatherFullData);
    // get the data data object from our server
    const ServerData = await getServerData();
    //update out DOM based on the data object received form the our server
    updateDom(ServerData);
    //catch any error and alert the user to enter a valid zip code
  }catch(error){
    alert("invalid zip code, please enter a US valid zip code");
    console.error(error);
  }

});

//get data from the openweathermap server
async function getWeather(fullUrl){
  const response = await fetch(fullUrl);
  try{
    const jsonData = await response.json();
    return jsonData;
  }catch(error){
    console.error(error);
  }
}

//post the data object to our server
async function postWeather(serverUrl = "", data= {}){
  const response = await fetch(serverUrl, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  try {
        const newData = await response.json();
               return newData;
  }catch(error) {
      console.error(error);
      }
}

// get the data data object from our server
async function getServerData(){
  const response = await fetch("/postData");
  try{
    const jsonData = await response.json();
    return jsonData;
  }catch(error){
    console.error(error);
  }
}

//update out DOM based on the data object received form the our server
function updateDom(info){
dateDiv.innerHTML = `Date: ${info.date}`;
tempDiv.innerHTML = `Temperature: ${info.temperature}°`;
contentDiv.innerHTML = `Your feelings: ${info.feeling}`;
}
