/* Global Variables */
let baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
let apikey = "&APPID=8a0b899fbbc1ee245a5f197f2d0272b3";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth()+1)+'.'+ d.getDate()+'.'+ d.getFullYear();

// Async GET: Fetch weather data from OpenWeatherApi
const getData = async (baseURL, zip, key) => {
    const res = await fetch(baseURL+zip+key);
    try {
        const data = await res.json();
        return data;
    } catch(error) {
        console.log("error", error);
    }
}

// Async POST: store date, temp and user input
const postData = async ( url= '', data = {} ) => {
    const response = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    try {
        // Transfer into JSON
        const newData = await response.json();
        return newData;
    } catch(error) {
        console.log("error", error);
    }
}
 
// Update UI elements
const updateUI = async () => {
    const request = await fetch("/allData");
    try {
        const allData = await request.json();
        document.getElementById("date").innerHTML = "Date: " + allData.date;
        document.getElementById("temp").innerHTML = "Temperature: " + allData.temp;
        document.getElementById("content").innerHTML = "Feeling: " + allData.userResponse;
    }catch(error){
        console.log(error);
    }
}

document.getElementById("generate").addEventListener("click", performAction);

function performAction(e) {
    const newZip = document.getElementById("zip").value;
    const feelings = document.getElementById("feelings").value;

    getData(baseURL, newZip, apikey)
        .then(function(data) {
            console.log(data)
            postData("/addData", {date: newDate, temp: data.main.temp, userResponse: feelings} );
        })
        .then(function() {
            updateUI()
        })
}
