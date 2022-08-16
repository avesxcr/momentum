import playList from './playList.js';

const time = document.querySelector('.time');
const myDate = document.querySelector('.date');
const greeting = document.querySelector('.greeting');
const body = document.querySelector('body');
const slidePrev = document.querySelector('.slide-prev');
const slideNext = document.querySelector('.slide-next');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('.city');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const changeQuote = document.querySelector('.change-quote');
const playBtn = document.querySelector('.play');
const audio = new Audio();
const playListContainer = document.querySelector('.play-list');
const playNext = document.querySelector('.play-next');
const playPrev = document.querySelector('.play-prev');
const langChange = document.querySelector('.lang');
let input = document.querySelector('.name');
let lang = 'ru';
let isPlay = false;
let timeOfDay = '';
let randomNumber;
let randomQuote;
let n = 0;
let k = 0;
let z = 1;

showTime();
getRandomNum();
getRandomQuote();
setBg();
getWeather();
getQuotes();
showTracks();



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
    const currentDate = date.toLocaleDateString(`${lang}-GB`, options);
    myDate.textContent = currentDate;
}

function getTimeOfDay() {
    const date = new Date();
    const hours = date.getHours();
    
    switch (true) {
        case (lang == 'ru') && (hours >= 4) && (hours < 12):
            timeOfDay = 'morning';
            greeting.textContent = `Доброе утро,`;
            break;
            case (lang == 'ru') && (hours >= 12) && (hours < 17):
                timeOfDay = 'afternoon';
                greeting.textContent = `Добрый день,`;
                break;
                case (lang == 'ru') && (hours >= 17) && (hours < 24):
                    timeOfDay = 'evening';
                    greeting.textContent = `Добрый вечер,`;
                    break;
                    case (lang == 'ru') && (hours <= 24) && (hours < 5):
                        timeOfDay = 'night';
                        greeting.textContent = `Доброй ночи,`;
                        break;
                        
                        case (lang == 'en') && (hours >= 4) && (hours < 12):
                            timeOfDay = 'morning';
                            greeting.textContent = `Good ${timeOfDay},`;
                            break;
                            case (lang == 'en') && (hours >= 12) && (hours < 17):
                                timeOfDay = 'afternoon';
                                greeting.textContent = `Good ${timeOfDay},`;
                                break;
                                case (lang == 'en') && (hours >= 17) && (hours < 24):
                                    timeOfDay = 'evening';
                                    greeting.textContent = `Good ${timeOfDay},`;
                                    break;
                                    case (lang == 'en') && (hours <= 24) && (hours < 5):
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

function getRandomQuote() {
    randomQuote = String((Math.floor(Math.random() * (100 - 1 + 1)) + 1)); 
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

  async function getWeather() {  
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${lang}&appid=b17e5efc8a33a0fd879b569423ff0d4f&units=metric`;
    console.log(url);
    const res = await fetch(url);
    const data = await res.json();
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    switch (true) {
        case (lang == 'ru'):
            wind.textContent = `Скорость ветра: ${data.wind.speed} м/с`;
            input.placeholder = "[Введите имя]";
            break;
            case (lang == 'en'):
                wind.textContent = `Wind speed: ${data.wind.speed} m/s`;
                input.placeholder = "[Enter name]";
                break;
                case (lang == 'ru'):
                    humidity.textContent = `Влажность: ${data.main.humidity}%`
                    break;
                    case (lang == 'en'):
                        humidity.textContent = `Humidity: ${data.main.humidity}%`
                        break;
    }
  }

  async function getQuotes() {  
    const quotes = `quotes${lang}.json`;
    const res = await fetch(quotes);
    const data = await res.json();

    quote.textContent = `"${data[randomQuote].text}."`;
    author.textContent = data[randomQuote].author;

    console.log(randomQuote);
    console.log(data[randomQuote].text);
  }


  //audio player

  function pauseAudio() {
    audio.pause();
  }

  function showTracks() {
    for(let i = 0; i < playList.length; i++) {
        const li = document.createElement('li');
        playListContainer.append(li);
        li.classList.add('play-item')
        li.textContent = playList[i].title;
        li.addEventListener('click', function() {
            audio.src = playList[i].src;
            audio.currentTime = 0;
            audio.play();
            playBtn.classList.add('pause');
            isPlay = true;
        });
      }
      playNext.addEventListener('click', function() {

        n++;
        if (n == playList.length) {
            n = 0;
        }
        audio.src = playList[n].src;
        audio.currentTime = 0;
        audio.play();
        playBtn.classList.add('pause');
    })
    playPrev.addEventListener('click', function() {
        n--;
        if (n == -1) {
            n = 3;
        }
        let trackTitle = document.querySelectorAll('li')
        audio.src = playList[n].src;
        audio.currentTime = 0;
        audio.play();
        playBtn.classList.add('pause');
    })
      playBtn.addEventListener('click', function() {
        if (k == 0) {
            audio.src = playList[0].src;
            audio.currentTime = 0;
            audio.play();
            playBtn.classList.toggle('pause'); 
            k++;
            isPlay = true;
            playList[0].style = "black";
        }
        else if (!isPlay) {
            isPlay = true;
            audio.play();
            playBtn.classList.add('pause');
        } else {
            pauseAudio();
            playBtn.classList.remove('pause');
            isPlay = false;
        }
      });
  }
  
document.addEventListener('DOMContentLoaded', function() {
    if (input) {
      input.value = localStorage.getItem("name") || "";
      input.addEventListener('input', function() {
        localStorage.setItem("name", this.value);
      });
    }
  });


  document.addEventListener('DOMContentLoaded', function() {
      city.value = localStorage.getItem("city") || "";
      city.addEventListener('input', function() {
        localStorage.setItem("city", this.value);
      });
      if (city.value) {
        getWeather();
      }
  });

city.addEventListener('change', function () {
    getWeather();
})

changeQuote.addEventListener('click', function () {
    getRandomQuote();
    getQuotes();
})

langChange.addEventListener('click', function () {
    z++;
    if (z % 2) {
        lang = 'ru';
        getWeather();
        getTimeOfDay();
        getQuotes();
    } else {
        lang = 'en';
        getWeather();
        getTimeOfDay();
        getQuotes();
    }
  
    
})

  slideNext.addEventListener('click', getSlideNext);
  slidePrev.addEventListener('click', getSlidePrev);
