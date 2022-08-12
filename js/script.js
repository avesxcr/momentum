
const time = document.querySelector('.time');
const myDate = document.querySelector('.date');
const greeting = document.querySelector('.greeting');
const body = document.querySelector('body');
const slidePrev = document.querySelector('.slide-prev');
const slideNext = document.querySelector('.slide-next');
let timeOfDay = '';
let randomNumber;

showTime();
getRandomNum();
setBg();


function showTime() {
    const date = new Date();
    const currentTime = date.toLocaleTimeString('en-GB');
    time.textContent = currentTime;
    showDate();
    getTimeOfDay();
    setTimeout(showTime, 1000);
}

function showDate() {
    const date = new Date();
    const options = {weekday: 'long', month: 'long', day: 'numeric'};
    const currentDate = date.toLocaleDateString('en-GB', options);
    myDate.textContent = currentDate;
}

function getTimeOfDay() {
    const date = new Date();
    const hours = date.getHours();
    
    switch (true) {
        case (hours >= 4) && (hours < 12):
            timeOfDay = 'morning';
            greeting.textContent = `Good ${timeOfDay},`;
            break;
            case (hours >= 12) && (hours < 17):
                timeOfDay = 'afternoon';
                greeting.textContent = `Good ${timeOfDay},`;
                break;
                case (hours >= 17) && (hours < 24):
                    timeOfDay = 'evening';
                    greeting.textContent = `Good ${timeOfDay},`;
                    break;
                    case (hours <= 24) && (hours < 5):
                        timeOfDay = 'night';
                        greeting.textContent = `Good ${timeOfDay},`;
                        break;
    }
}

function getRandomNum() {
    randomNumber = String((Math.floor(Math.random() * (20 - 1 + 1)) + 1)); 
    if (randomNumber < 10) {
        randomNumber = randomNumber.padStart(2, 0);
    }
}

function getSlideNext() {
    randomNumber = Number(randomNumber) + 1;
    if (Number(randomNumber) >= 21) {
        randomNumber = '01';
    }
    else if (randomNumber < 10) {
        randomNumber = String(randomNumber)
        randomNumber = randomNumber.padStart(2, 0);
    }
    setBg()
 }

function getSlidePrev() {
    randomNumber = Number(randomNumber) - 1;
    if (Number(randomNumber) <= 0) {
        randomNumber = 20;
    }
   else if (randomNumber < 10) {
        randomNumber = String(randomNumber);
        randomNumber = randomNumber.padStart(2, 0);
    } 
    setBg()
    }
  
function setBg() {  
    const img = new Image();
    img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${randomNumber}.jpg`
    img.onload = () => {      
      body.style.backgroundImage = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${randomNumber}.jpg')`
    }; 
  }


document.addEventListener('DOMContentLoaded', function() {
    let input = document.querySelector('.name');
  
    if (input) {
      input.value = localStorage.getItem("name") || "";
  
      input.addEventListener('input', function() {
        localStorage.setItem("name", this.value);
      });
    } else {
        input.value = "[Enter name]";
    }
  });

  slideNext.addEventListener('click', getSlideNext);
  slidePrev.addEventListener('click', getSlidePrev);
