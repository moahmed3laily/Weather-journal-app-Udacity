/* Global Variables */
const apiKey = 'fa785e0f952aa83a3cac24a4b94cc8c9';
const baseUrl = 'http://localhost:3000/';

// My data elements 
const zipCode = document.getElementById('zip');
const feelings = document.getElementById('feelings');
const dateUser = document.getElementById('date');
const temp = document.getElementById('temp');
const content = document.getElementById('content');
const wish = document.getElementById('wish')



// Function for easy handling the errors
const catchError = err => {console.error("Error has been occur", err)};

// Event listenner for generate
document.getElementById('generate').addEventListener('click', whenGenerate)

// Generating
function whenGenerate(){
    let data = {
        zipCode: zipCode.value,
        feelings: feelings.value,
        date: new Date()
    };

    getUserZipCode(data.zipCode)
.then(zipInfo => {
    data.temp = zipInfo.main.temp;
    postDataToserver(data);
}) .catch(catchError)
};

// Call the API


// Get Zip from user
async function getUserZipCode(zipCode)  {
    return await (await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}`)).json();
}

//Post the data to the server
async function postDataToserver(data){
    let response = await fetch(`http://localhost:3000/postAllData`, {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(data),
    });
    // handling errors
    try{
      
        response.json().then(data => {
            if(response.ok){
                updatePageUI();
            }
            else 
                alert('Error hhhhhappened')
        }).catch(catchError);
    } catch (err) {
        catchError(err)
    }
};
 
// update UI
async function updatePageUI(){
    let response = await fetch(`http://localhost:3000/getData`);
    try{
        response.json().then(data =>{
            let rightTemp = data.temp - 273.15;
            dateUser.innerHTML = `Date is: ${data.date}`;
            temp.innerHTML = `Temperature is: ${rightTemp.toFixed(2)} C`;
            content.innerHTML = `My feelings for the day: ${data.feelings}`;
            wish.innerHTML= `I wish you a very nice day`
        }).catch(catchError);
    } catch(err){
        catchError(err);
    }
}