//Criar variavel com o nome de "apiURL" com o url da API
let apiUrl = "https://worldtimeapi.org/api/timezone/europe/lisbon";
let ueri;
let ampm;

//tempo portugal default
if (window.addEventListener) {
  window.addEventListener('load', setTimePortugal, false); //W3C
} else {
  window.attachEvent('onload', setTimePortugal); //IE
}

//Selecionar butoes paises
let alemanha = document.getElementById("alemanha");
let australia = document.getElementById("australia");
let chile = document.getElementById("chile");
let china = document.getElementById("china");
let dinamarca = document.getElementById("dinamarca");
let egipto = document.getElementById("egipto");
let india = document.getElementById("india");
let franca = document.getElementById("franca");
let indonesia = document.getElementById("indonesia");
let inglaterra = document.getElementById("inglaterra");
let italia = document.getElementById("italia");
let japao = document.getElementById("japao");
let mexico = document.getElementById("mexico");
let novaYork = document.getElementById("novaYork");
let portugal = document.getElementById("portugal");
let ucrania = document.getElementById("ucrania");
let washingtonDc = document.getElementById("washingtonDc");

//Criar EventListener para todos os butoes para com o "click" ativar a função de cada país
alemanha.addEventListener("click", setTimeAlemanha);
australia.addEventListener("click", setTimeAustralia);
chile.addEventListener("click", setTimeChile);
china.addEventListener("click", setTimeChina);

dinamarca.addEventListener("click", setTimeDinamarca);

egipto.addEventListener("click", setTimeEgipto);

franca.addEventListener("click", setTimeFranca);

indonesia.addEventListener("click", setTimeIndonesia);

inglaterra.addEventListener("click", setTimeInglaterra);

italia.addEventListener("click", setTimeItalia);

japao.addEventListener("click", setTimeJapao);

mexico.addEventListener("click", setTimeMexico);

novaYork.addEventListener("click", setTimeNovaYork);

portugal.addEventListener("click", setTimePortugal);

ucrania.addEventListener("click", setTimeUcrania);



//Criar variavel do intervalo
var intervalo = 0;
let intervalo1 = 0;
//Criar nova variavel "data"   com o nome de "date"
let date = new Date();
//criar toggle
const body = document.querySelector('body');
const toggle = document.getElementById('toggle');
const relogio = document.querySelector('.relogio');
const clockD = document.querySelector('.clock-container');

toggle.addEventListener('click', toggle1);
function toggle1() {
  toggle.classList.toggle('active');
  body.classList.toggle('active');
  relogio.classList.toggle('desaparecer');
  clockD.classList.toggle('aparecer');
}
//Codigo para mover os ponteiros
const offset = async () => {
  let offset;
  let dataData;
  let dia;
  fetch(apiUrl)
    .then((res) => res.json())
    .then((data) => {
      offset = data.utc_offset;
      offset = parseInt(offset);
      dataData = data.datetime;
      dia = dataData.split("T");

      //Criar constante para os ponteiros; hourHand, ponteiro das horas; minuteHand, ponteiro dos minutos; secondHand, ponteiro dos segundos        
      const hourHand = document.querySelector("[data-hour-hand]");
      const minuteHand = document.querySelector("[data-minute-hand]");
      const secondHand = document.querySelector("[data-second-hand]");
      //Criar função para controlar a rotação dos ponteiros
      function setRotation(element, rotationRatio) {
        element.style.setProperty("--rotation", rotationRatio * 360);
      }
      //Atribuir um "setInterval" à variavel "intervalo"
      intervalo = setInterval(setTime, 1);
      //GE      
      function setTime() {
        date = new Date()
        date.setHours(date.getHours() - 1 + offset);
        const msRatio = date.getMilliseconds() / 1000;
        const secondsRatio = (msRatio + date.getSeconds()) / 60;
        const minutesRatio = (secondsRatio + date.getMinutes()) / 60;
        const hourRatio = (minutesRatio + date.getHours()) / 12;
        setRotation(secondHand, secondsRatio);
        setRotation(minuteHand, minutesRatio);
        setRotation(hourHand, hourRatio);
        changeCicle(date)
        intervalo1 = setInterval(mudarTexto(date), 1000)
        return date
      }

      

      //night day
      function getImageFromSearch(search = "sky day") {
        //const apiKey = process.env.REACT_APP_APIKey
        //sconst apiSecret = process.env.REACT_APP_APISecret
        const baseUrl = "https://pixabay.com/api/";
        const KEY = "27953217-305d31ec9589e260be4028d1c";
        const ITEMS_COUNT = 10;

        axios({
          method: 'get',
          url: baseUrl,
          responseType: "application/json",
          params: {
            key: KEY,
            q: search,
            image_type: 'photo',
            per_page: ITEMS_COUNT,
            min_width: 1920

          }

        })
          .then(function (response) {
            const data = JSON.parse(response.data);
            let imagesArr = [];

            if ("hits" in data) {
              imagesArr = data.hits;
            }

            const index = Math.floor((Math.random() * ITEMS_COUNT) + 0);
            const finalImage = imagesArr[index].largeImageURL;

            const body = document.querySelector("body");

            body.style.backgroundImage = "url('" + finalImage + "')";

          });
      }

      //Criar função para mudança da cor do Titulo e do fundo consoante se está de dia ou noite

      function changeCicle(date) {

        const hours = date.getHours()
        if (hours >= 19 || hours <= 7) {
          document.body.style.backgroundColor = "#363636";
          document.getElementById("Titulo").style.color = "rgba(255, 255, 255, 75%)";

          document.getElementById("h2Pais").style.color = "rgba(255, 255, 255, 75%)";
          document.getElementById("h2Date").style.color = "rgba(255, 255, 255, 75%)";
          ueri = "night sky";
          ampm = "Pm";
        } else {

          document.body.style.backgroundColor = "#cccccc";
          document.getElementById("Titulo").style.color = "rgba(255, 255, 255, 75%)";

          document.getElementById("h2Pais").style.color = "rgba(255, 255, 255, 75%)";
          document.getElementById("h2Date").style.color = "rgba(255, 255, 255, 75%)";
          /*  document.getElementById("Titulo").style.color = "black";
          document.getElementById("h2Pais").style.color = "black";
          document.getElementById("h2Date").style.color = "black";*/
          ueri = "day sky";
          ampm = "Am";

        }
      }
      //mudar texto ampm
      let am = document.querySelector('.daynight');
      am.innerHTML = ampm;

      console.log(ampm);
      getImageFromSearch(ueri);

      //Mudar texto do dia
      function mudarTexto(data) {
        Horas = data.getHours()
        Minutos = data.getMinutes()
        Segundos = data.getSeconds()
        document.getElementById("h2Date").innerHTML = dia[0];

      }


      document.addEventListener('DOMContentLoaded', () =>
        requestAnimationFrame(updateTime)
      )

      function updateTime() {

        let date = setTime()
        let dia = "Seg"

        if (date.getDay() == 1) {
          dia = "Seg"
        } else if (date.getDay() == 2) {
          dia = "Ter"
        } else if (date.getDay() == 3) {
          dia = " Qua"
        } else if (date.getDay() == 4) {
          dia = "Qui"
        } else if (date.getDay() == 5) {
          dia = "Sex"
        } else if (date.getDay() == 6) {
          dia = "Sab"
        } else if (date.getDay() == 7) {
          dia = "Dom"
        }
        document.documentElement.style.setProperty('--timer-day', "'" + dia + "'");
        document.documentElement.style.setProperty('--timer-hours', "'" + date.getHours() + "'");
        document.documentElement.style.setProperty('--timer-minutes', "'" + date.getMinutes() + "'");
        document.documentElement.style.setProperty('--timer-seconds', "'" + date.getSeconds() + "'");
        console.log(date.getHours);
        requestAnimationFrame(updateTime);
      }
      updateTime();

    }
    )
}
offset();


//Criar funções para alterar o url da API~

function setTimeAlemanha() {
  apiUrl = "https://worldtimeapi.org/api/timezone/europe/berlin";
  clearInterval(intervalo);
  document.getElementById("h2Pais").innerHTML = "Alemanha: ";

  offset();
}
function setTimeAustralia() {
  apiUrl = "https://worldtimeapi.org/api/timezone/Australia/Sydney";
  clearInterval(intervalo);
  document.getElementById("h2Pais").innerHTML = "Austrália:";
  offset();
}
function setTimeChile() {
  apiUrl = "https://worldtimeapi.org/api/timezone/america/santiago";
  clearInterval(intervalo);
  document.getElementById("h2Pais").innerHTML = "Chile:";
  offset();
}
function setTimeChina() {
  apiUrl = "https://worldtimeapi.org/api/timezone/Asia/Hong_Kong";
  clearInterval(intervalo);
  document.getElementById("h2Pais").innerHTML = "China:";
  offset();
}
function setTimeDinamarca() {
  apiUrl = "https://worldtimeapi.org/api/timezone/Europe/Copenhagen";
  clearInterval(intervalo);
  document.getElementById("h2Pais").innerHTML = "Dinamarca:";
  offset();
}
function setTimeEgipto() {
  apiUrl = "https://worldtimeapi.org/api/timezone/Africa/Cairo";
  clearInterval(intervalo);
  document.getElementById("h2Pais").innerHTML = "Egipto:";
  offset();
}
function setTimeFranca() {
  apiUrl = "https://worldtimeapi.org/api/timezone/Europe/Paris";
  clearInterval(intervalo);
  document.getElementById("h2Pais").innerHTML = "França:";
  offset();
}
function setTimeIndonesia() {
  apiUrl = "https://worldtimeapi.org/api/timezone/Asia/Jakarta";
  clearInterval(intervalo);
  document.getElementById("h2Pais").innerHTML = "Indonésia:";
  offset();
}
function setTimeInglaterra() {
  apiUrl = "https://worldtimeapi.org/api/timezone/Europe/London";
  clearInterval(intervalo);
  document.getElementById("h2Pais").innerHTML = "Inglaterra:";
  offset();
}
function setTimeItalia() {
  apiUrl = "https://worldtimeapi.org/api/timezone/Europe/Rome";
  clearInterval(intervalo);
  document.getElementById("h2Pais").innerHTML = "Itália:";
  offset();
}
function setTimeJapao() {
  apiUrl = "https://worldtimeapi.org/api/timezone/Asia/Tokyo";
  clearInterval(intervalo);
  document.getElementById("h2Pais").innerHTML = "Japão:";
  offset();
}
function setTimeMexico() {
  apiUrl = "https://worldtimeapi.org/api/timezone/America/Mexico_City";
  clearInterval(intervalo);
  document.getElementById("h2Pais").innerHTML = "México:";
  offset();
}
function setTimeNovaYork() {
  apiUrl = "https://worldtimeapi.org/api/timezone/America/New_York";
  clearInterval(intervalo);
  document.getElementById("h2Pais").innerHTML = "NovaYork:";
  offset();
}
function setTimePortugal() {
  apiUrl = "https://worldtimeapi.org/api/timezone/Europe/Lisbon";
  clearInterval(intervalo);
  document.getElementById("h2Pais").innerHTML = "Portugal:";
  offset();
}
function setTimeUcrania() {
  apiUrl = "https://worldtimeapi.org/api/timezone/Europe/Kiev";
  clearInterval(intervalo);
  document.getElementById("h2Pais").innerHTML = "Ucrânia:";
  offset();
}





