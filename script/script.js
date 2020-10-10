    const base = 'https://raw.githubusercontent.com/irinainina/ready-projects/momentum/momentum/assets/images/night/';
    const images = ['01.jpg', '02.jpg', '03.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg'];
    let i = 0;
    const body = document.querySelector('body');
    const img = document.createElement('img');
    const date = document.querySelector('.date');
    const dayOfWeek = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
    const monthOfYear = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];
    const API_WEATHER = '598e4adeda1f82e3ee3da74752fc34ea';

    let clock = document.querySelector('.clock');
    let name = document.getElementById('name');
    let goal = document.getElementById('goal');
    let welcome = document.querySelector('.welcome-words');

    function setWelcome() {
        let hours = new Date().getHours(),
            words = '';
        if (hours > 2 && hours < 9) {
            words = 'Добрейшего утречка, ';
        } else if (hours >= 9 && hours < 15) {
            words = 'Доброго дня, ';
        } else if (hours >= 15 && hours < 21) {
            words = 'Вечерок, а значит домой! ';
        } else {
            words = 'Шо не спим?!, ';
        }

        welcome.innerText = words + '  ';
        setTimeout(setWelcome, 180000000);

    }

    function getTime() {
        let now = new Date();
        clock.innerHTML = now.getHours() + ":" + addZero(now.getMinutes()) + ":" + addZero(now.getSeconds());
        setTimeout(getTime, 1000);

    }

    function getData() {
        let now = new Date();
        date.innerHTML = dayOfWeek[now.getDay() - 1] + ' , ' + now.getDate() + ' ' + monthOfYear[now.getMonth()] + '  ' + now.getFullYear() + ' года';
    }
    const blockquote = document.querySelector('blockquote');
    const figcaption = document.querySelector('figcaption');
    const quote = document.querySelector('.quote');

    async function getQuote() {
        const url = `https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=ru`;
        const res = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'API-Key': 'secret'
            }
        });
        console.log(res)
        const data = await res.json();
        blockquote.textContent = data.quoteText;
        figcaption.textContent = data.quoteAuthor;
    }
    document.addEventListener('DOMContentLoaded', getQuote);
    quote.addEventListener('click', getQuote);

    const weatherIcon = document.querySelector('.weather-icon');
    const weatherCity = document.querySelector('.location-ico');
    const temperature = document.querySelector('.temperature');
    const weatherDescription = document.querySelector('.weather-description');

    async function getWeather() {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${weatherCity.innerText}&lang=ru&appid=${API_WEATHER}&units=metric`;
        const res = await fetch(url);
        const data = await res.json();
        console.log(data)
        weatherIcon.className = 'owf owf-800 owf-pull-left owf-border';
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        temperature.textContent = `${data.main.temp}°C`;
        weatherDescription.textContent = data.weather[0].description;
    }

    localStorage.city ? weatherCity.innerText = localStorage.city : weatherCity.innerText = 'Введите город';

    function setCity(event) {
        console.log(event)
        if (event.code === 'Enter') {
            localStorage.setItem('city', weatherCity.innerText)
            getWeather();
            weatherCity.blur();
        }
    }
    document.addEventListener('DOMContentLoaded', getWeather);
    weatherCity.addEventListener('keypress', setCity);

    function getImage() {
        const index = i % images.length;
        const imageSrc = base + images[index];
        viewBgImage(imageSrc);
        i++;
    }
    const btn = document.querySelector('.btn');
    btn.addEventListener('click', getImage);


    localStorage.name ? name.innerHTML = localStorage.name : name.innerHTML = '[Потыкай пальчиками своё имя]';
    localStorage.goal ? goal.innerHTML = localStorage.goal : goal.innerHTML = '[Потыкай пальчиками свою пушку-цель]';

    name.addEventListener('blur', () => {
        console.log(name.innerHTML)
        localStorage.setItem('name', name.innerHTML);
    });

    goal.addEventListener('blur', () => {
        console.log(goal.innerHTML)
        localStorage.setItem('goal', goal.innerHTML);
    });

    const addZero = (n) => {
        return (n < 10) ? ('0' + n) : ('' + n);
    };

    function viewBgImage(data) {
        const src = data;
        img.src = src;
        img.onload = () => {
            body.style.backgroundImage = `url(${src})`;
        };
    }
    getTime();
    getData();
    setWelcome();