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
const langChange = document.querySelector('.change-lang');
const toDoListButton = document.querySelector('.todolist--button');
const closeToDoList = document.querySelector('.close-todolist');
let timeCheckBox = document.querySelector('.time-checkbox');
let dateCheckBox = document.querySelector('.date-checkbox');
let greetingCheckBox = document.querySelector('.greeting-checkbox');
let quoteCheckBox = document.querySelector('.quote-checkbox');
let weatherCheckBox = document.querySelector('.weather-checkbox');
let audioCheckBox = document.querySelector('.audio-checkbox');
let toDoListCheckBox = document.querySelector('.todolist-checkbox');
let todoInput = document.querySelector('.todo-item');

todoInput.placeholder = 'Пункт списка дел'


let state = {
    lang: 'ru',
    photoSource: 'github',
    blocks: ['time', 'date','greeting', 'quote', 'weather', 'audio', 'todolist']
}
let input = document.querySelector('.name');
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
getWeather();
getQuotes();
showTracks();
setBg ();
changeSourceImg ();
whatLang();

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
    const currentDate = date.toLocaleDateString(`${state.lang}-GB`, options);
    myDate.textContent = currentDate;
}

function getTimeOfDay() {
    const date = new Date();
    const hours = date.getHours();
    
    switch (true) {
        case (state.lang == 'ru') && (hours >= 4) && (hours < 12):
            timeOfDay = 'morning';
            greeting.textContent = `Доброе утро,`;
            break;
            case (state.lang == 'ru') && (hours >= 12) && (hours < 17):
                timeOfDay = 'afternoon';
                greeting.textContent = `Добрый день,`;
                break;
                case (state.lang == 'ru') && (hours >= 17) && (hours < 24):
                    timeOfDay = 'evening';
                    greeting.textContent = `Добрый вечер,`;
                    break;
                    case (state.lang == 'ru') && (hours <= 24) && (hours < 5):
                        timeOfDay = 'night';
                        greeting.textContent = `Доброй ночи,`;
                        break;
                        
                        case (state.lang == 'en') && (hours >= 4) && (hours < 12):
                            timeOfDay = 'morning';
                            greeting.textContent = `Good ${timeOfDay},`;
                            break;
                            case (state.lang == 'en') && (hours >= 12) && (hours < 17):
                                timeOfDay = 'afternoon';
                                greeting.textContent = `Good ${timeOfDay},`;
                                break;
                                case (state.lang == 'en') && (hours >= 17) && (hours < 24):
                                    timeOfDay = 'evening';
                                    greeting.textContent = `Good ${timeOfDay},`;
                                    break;
                                    case (state.lang == 'en') && (hours <= 24) && (hours < 5):
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
    setBg ();
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
    setBg ();
    }
  


async function setBg () {
    if (state.photoSource == 'github') {
        const img = new Image();
        img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${randomNumber}.jpg`
        img.onload = () => {      
          body.style.backgroundImage = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${randomNumber}.jpg')`
        }; 
    } else if (state.photoSource == 'flickr') {
        const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=a71fd7e0a10a3856f2b0920228d03d04&tags=${timeOfDay}&extras=url_l&format=json&nojsoncallback=1`
        const res = await fetch(url);
        const data = await res.json();
    
        const img = new Image();
        img.src = data.photos.photo[0].url_l;
        img.onload = () => {
            body.style.backgroundImage = `url(${data.photos.photo[0].url_l})`
        }
    } else if (state.photoSource == 'unsplash') {
        const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${timeOfDay}&client_id=6xlcD00aIM1OGx4fTVaPMCV2D_jtnJy0rk_D17fP2J4`;
        const res = await fetch(url);
        const data = await res.json();
    
        const img = new Image();
        img.src = data.urls.regular;
        img.style.backgroundRepeat = 'no-repeat'
        img.onload = () => {
            body.style.backgroundImage = `url(${data.urls.regular})`
        }
}
}

  async function getWeather() {
   
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${state.lang}&appid=b17e5efc8a33a0fd879b569423ff0d4f&units=metric`;
    console.log(url);
    const res = await fetch(url);
    const data = await res.json();
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    switch (true) {
        case (state.lang == 'ru'):
            
            wind.textContent = `Скорость ветра: ${data.wind.speed} м/с`;
            break;
            case (state.lang == 'en'):
                wind.textContent = `Wind speed: ${data.wind.speed} m/s`;
                break;
                case (state.lang == 'ru'):
                    humidity.textContent = `Влажность: ${data.main.humidity}%`
                    break;
                    case (state.lang == 'en'):
                        humidity.textContent = `Humidity: ${data.main.humidity}%`
                        break;
    }
  }

  async function getQuotes() {  
    const quotes = `quotes${state.lang}.json`;
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

function whatLang() {
    if (state.lang == 'ru') {
        input.placeholder = "[Введите имя]";
    } else {
        input.placeholder = "[Enter name]";
    }
  }

// modal 

let modal = document.getElementById("modal-window");
let btn = document.getElementById("button__modal--button");
let span = document.getElementsByClassName("close")[0];

btn.onclick = function () {
  modal.style.display = "block";
}

span.onclick = function () {
  modal.style.display = "none";
}

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// checkboxes

timeCheckBox.addEventListener('change', function () {
    if (!timeCheckBox.checked) {
        document.querySelector('.time').classList.toggle('hidden')
    } else if (timeCheckBox.checked) {
        document.querySelector('.time').classList.toggle('hidden') 
    }
})

dateCheckBox.addEventListener('change', function () {
    if (!dateCheckBox.checked) {
        document.querySelector('.date').classList.toggle('hidden')
    } else if (dateCheckBox.checked) {
        document.querySelector('.date').classList.toggle('hidden') 
    }
})

greetingCheckBox.addEventListener('change', function () {
    if (!greetingCheckBox.checked) {
        document.querySelector('.greeting-container').classList.toggle('hidden')
    } else if (greetingCheckBox.checked) {
        document.querySelector('.greeting-container').classList.toggle('hidden') 
    }
})

quoteCheckBox.addEventListener('change', function () {
    if (!quoteCheckBox.checked) {
        document.querySelector('.change-quote').classList.toggle('hidden')
        document.querySelector('.quote').classList.toggle('hidden')
        document.querySelector('.author').classList.toggle('hidden')
    } else if (quoteCheckBox.checked) {
        document.querySelector('.change-quote').classList.toggle('hidden')
        document.querySelector('.quote').classList.toggle('hidden')
        document.querySelector('.author').classList.toggle('hidden')
    }
})

weatherCheckBox.addEventListener('change', function () {
    if (!weatherCheckBox.checked) {
        document.querySelector('.weather').classList.toggle('hidden')
    } else if (weatherCheckBox.checked) {
        document.querySelector('.weather').classList.toggle('hidden') 
    }
})

audioCheckBox.addEventListener('change', function () {
    if (!audioCheckBox.checked) {
        document.querySelector('.player-controls').classList.toggle('hidden')
        document.querySelector('.play-list').classList.toggle('hidden')
    } else if (audioCheckBox.checked) {
        document.querySelector('.player-controls').classList.toggle('hidden')
        document.querySelector('.play-list').classList.toggle('hidden')
    }
})
  
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
      }  else if ((city.value).length == 0) {
        city.value = 'Minsk'
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
        state.lang = 'ru';
        getWeather();
        getTimeOfDay();
        getQuotes();
        getQuotes();
        whatLang()
        document.querySelector('.time-label').innerHTML = 'Время';
        document.querySelector('.date-label').innerHTML = 'Дата';
        document.querySelector('.greeting-label').innerHTML = 'Приветствие';
        document.querySelector('.weather-label').innerHTML = 'Погода';
        document.querySelector('.audio-label').innerHTML = 'Плеер';
        document.querySelector('.quote-label').innerHTML = 'Случайная цитата';
        document.querySelector('.todolist-label').innerHTML = 'Случайная цитата';
        document.querySelector('.change-lang').innerHTML = 'Сменить язык'
        document.querySelector('.todo-title').innerHTML = 'Список дел'
        document.querySelector('.todo-select').innerHTML = `Всего ${txtTotal.textContent} задач(а)`
        document.querySelector('.todolist--button').innerHTML = 'Отобразить список дел'
        document.querySelector('.footer--change-source').innerHTML = 'Сменить источник получения фото:'
        document.querySelector('.footer--theme-of-photo').innerHTML = 'Указать тематику фонового изображения'
        document.querySelector('.change-photo').innerHTML = 'Изменить'
        document.querySelector('.footer--h1').innerHTML = 'Настройки приложения'
        document.querySelector('.add--button').innerHTML = 'Добавить'
        todoInput.placeholder = 'Пункт списка дел' 
        onTaskSelectChange()
        selectAll()
        closeToDoList.textContent = 'Закрыть список дел' 
        btn.innerHTML = 'Настройки'
    } else {
        state.lang = 'en';
        getWeather();
        getTimeOfDay();
        getQuotes();
        whatLang()
        document.querySelector('.time-label').innerHTML = 'Time';
        document.querySelector('.date-label').innerHTML = 'Date';
        document.querySelector('.greeting-label').innerHTML = 'Greetings';
        document.querySelector('.weather-label').innerHTML = 'Weather';
        document.querySelector('.audio-label').innerHTML = 'Player';
        document.querySelector('.quote-label').innerHTML = 'Random quote';
        document.querySelector('.todolist-label').innerHTML = 'To do list';
        document.querySelector('.change-lang').innerHTML = 'Change language'
        document.querySelector('.todo-title').innerHTML = 'To do list'
        document.querySelector('.todo-select').innerHTML = `Total ${txtTotal.textContent} task(s)`
        document.querySelector('.todolist--button').innerHTML = 'Display To-Do List'
        document.querySelector('.footer--change-source').innerHTML = 'Change photo source:'
        document.querySelector('.footer--theme-of-photo').innerHTML = 'Specify the theme of the background image'
        document.querySelector('.change-photo').innerHTML = 'Change'
        document.querySelector('.footer--h1').innerHTML = 'Settings'
        document.querySelector('.add--button').innerHTML = 'Add'
        closeToDoList.textContent = 'Close to-do list' 
        todoInput.placeholder = 'To-do item'
        btn.innerHTML = 'Settings'
    }  

})

document.querySelector('.change-photo').addEventListener('click', function () {
    if (state.photoSource == 'github' && state.lang == 'en') {
        alert('Choose another source! (flickr or unsplash)')
    }  else if (state.photoSource == 'github' && state.lang == 'ru') {
        alert('Выберите другой источник получения фото! (flickr or unsplash)')
    } 
    else {
        timeOfDay = document.querySelector('.search-photo').value
        setBg ()
    }
})


function changeSourceImg () {
    document.querySelector('.flickr').addEventListener('click', function () {
        state.photoSource = 'flickr'
        setBg ();
        console.log(state);
    })
    document.querySelector('.github').addEventListener('click', function () {
        state.photoSource = 'github'
        setBg ();
        console.log(state);
    })
    document.querySelector('.unsplash').addEventListener('click', function () {
        state.photoSource = 'unsplash'
        setBg ();
        console.log(state);
    })
}

  slideNext.addEventListener('click', getSlideNext);
  slidePrev.addEventListener('click', getSlidePrev);


  // to do list

  "use strict"

  /** 
   * Just using localStorage to store To-Do List.
  */
  
  let inpItem, divList, txtNotify, txtTotal;
  let btnAdd, btnDel;
  let chxSelectAll;
  let numTaskChecked;
  let listDataItem = [], listChxItem = [], listHTMLItem = [];
  let $ = document.querySelector.bind(document);
  
  let localStorage = window.localStorage;
  const prefix = 'to-do-purejs-';
  
  window.onload = function() {
    inpItem = $('#item');
    txtTotal = $('#total');
    txtNotify = $('#notify');
    
    divList = $('#list');
    divList.addEventListener('click', onTaskSelectChange);
  
    chxSelectAll = $('#select-all');
    chxSelectAll.addEventListener('click', onChxSelectAllChange);
    chxSelectAll.disabled = true;
  
    btnDel = $('#delete');
    btnDel.style.visibility = 'hidden';
    btnDel.addEventListener('click', deleteTasks);
   

    btnAdd = $('#add');
    btnAdd.addEventListener('click', addItem);
  
    // Load && Render existing To-Do List
    for(var key in localStorage) {
      if(key.indexOf(prefix) >= 0) {
        let item = {
          id: listDataItem.length,
          title: localStorage[key],
          done: 'false'
        }
        listDataItem.push(item);
        let newItem = addHTMLItem(item);
        listHTMLItem.push(newItem);
      }
    }
    txtTotal.textContent = '' + listDataItem.length;

  
  }
  
  function deleteTasks() {
    let i = listChxItem.length;
    while (i--) {
      if (listChxItem[i].checked) { 
        listDataItem.splice(i, 1);
        listChxItem.splice(i, 1);
  
        deleteHTMLItem(listHTMLItem[i]);
        listHTMLItem.splice(i, 1);
      } 
    }
  
    // Reset localStorage
    for(var key in localStorage) {
      if(key.indexOf(prefix) >= 0) {
        localStorage.removeItem(key);
      }
    }
    for (i = 0; i < listDataItem.length; i++) {
      localStorage.setItem(prefix + i, listDataItem[i].title);
    }
  
    numTaskChecked = 0;
    unselectAll();
    txtTotal.textContent = '' + listDataItem.length;
  }
  
  function onTaskSelectChange() {
    numTaskChecked = 0;
    for(let i = 0; i < listChxItem.length; i++) {
      if(listChxItem[i].checked) numTaskChecked++;
    }
    if(numTaskChecked == 0) {
      unselectAll();
    }
    else if(numTaskChecked == listDataItem.length) {
      selectAll();
    }
    else {
      btnDel.style.visibility = 'visible';
      chxSelectAll.checked = false;
    }
  }
  
  function onChxSelectAllChange() {
    if(chxSelectAll.checked && listDataItem.length > 0) selectAll();
    else unselectAll();
  }
  
  function selectAll() {
    btnDel.style.visibility = 'visible';
    numTaskChecked = listDataItem.length;
    for(let i = 0; i < listChxItem.length; i++) {
      listChxItem[i].checked = true;
    }
    chxSelectAll.checked = true;
  }
  
  function unselectAll() {
    btnDel.style.visibility = 'hidden';
    numTaskChecked = 0;
    for(let i = 0; i < listChxItem.length; i++) {
      listChxItem[i].checked = false;
    }
    chxSelectAll.checked = false;
  }
  
  function addItem() {
    if(inpItem.value == '') {
      txtNotify.textContent = 'Attention: Input is empty!';
      return;
    }
  
    if(isExist(inpItem.value)) {
      txtNotify.textContent = 'Attention: This item already exists!';
      return;
    }
  
    let item = {
      id: listDataItem.length,
      title: inpItem.value,
      done: 'false'
    }
    listDataItem.push(item);
    let newItem = addHTMLItem(item);
    listHTMLItem.push(newItem);
    localStorage.setItem(prefix + item.id, inpItem.value);
  
    txtNotify.textContent = '';
    inpItem.value = '';
    txtTotal.textContent = '' + listDataItem.length;
    chxSelectAll.disabled = false;
  } 
  
  function isExist(itemTitle) {
    for(var i = 0; i < listDataItem.length; i++){
      if(listDataItem[i].title == itemTitle) return true;
    }
    return false;
  }
  
  /* 
  <div class="todo-item">
    <input type="checkbox" name="item" value="Item 1">
    <span class="todo-item-title">Item 1</span>
  </div> 
  */
  function addHTMLItem(item) {
    let divElement = document.createElement('div');
    divElement.setAttribute('class', 'todo-item');
    
    let inputElement = document.createElement('input');
    inputElement.setAttribute('type', 'checkbox');
    inputElement.setAttribute('name', 'item');
    inputElement.setAttribute('value', 'Item 1');
  
    let spanElement = document.createElement('span');
    spanElement.setAttribute('class', 'todo-item-title');
  
    let txtTitle = document.createTextNode(item.title);
  
    spanElement.appendChild(txtTitle);
    divElement.appendChild(inputElement);
    divElement.appendChild(spanElement);
    divList.appendChild(divElement);
  
    listChxItem.push(inputElement);
    return divElement;
  }
  
  function deleteHTMLItem(htmlItem) {
    while (htmlItem.firstChild) {
      htmlItem.removeChild(htmlItem.firstChild);
    }
    divList.removeChild(htmlItem);
  }

  toDoListButton.addEventListener('click', function() {
    document.querySelector('.todo-container').classList.toggle('visible');
  })

  closeToDoList.addEventListener('click', function() {
    document.querySelector('.todo-container').classList.remove('visible');
  })
