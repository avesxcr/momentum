const time = document.querySelector('.time');
const myDate = document.querySelector('.date');
const greeting = document.querySelector('.greeting');

showTime();


function showTime() {
    const date = new Date();
    const currentTime = date.toLocaleTimeString('en-GB');
    time.textContent = currentTime;
    showDate();
    showGreeting();
    setTimeout(showTime, 1000);
}

function showDate() {
    const date = new Date();
    const options = {weekday: 'long', month: 'long', day: 'numeric'};
    const currentDate = date.toLocaleDateString('en-GB', options);
    myDate.textContent = currentDate;
}

function showGreeting() {
    const date = new Date();
    const hours = date.getHours();
    switch (true) {
        case (hours >= 4) && (hours < 12):
            greeting.textContent = 'Good morning,';
            break;
            case (hours >= 12) && (hours < 17):
                greeting.textContent = 'Good day,';
                break;
                case (hours >= 17) && (hours < 24):
                    greeting.textContent = 'Good evening,';
                    break;
                    case (hours <= 24) && (hours < 5):
                        greeting.textContent = 'Good night,';
                        break;
    }
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