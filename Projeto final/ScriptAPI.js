//Criar variavel com o nome de "apiURL" com o url da API
let apiUrl = "https://worldtimeapi.org/api/timezone/europe/lisbon";

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
//Criar nova variavel "data"   com o nome de "date"
let date = new Date();

//Codigo para mover os ponteiros
const offset = async () => {
  let offset;
  fetch(apiUrl)
    .then((res) => res.json())
    .then((data) => {
      offset = data.utc_offset;
      offset = parseInt(offset);
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
      } 
    //Criar função para mudança da cor do Titulo e do fundo consoante se está de dia ou noite

      function changeCicle(date) {
        const hours = date.getHours()
        console.log(hours);
        if (hours >= 19) {
          console.log("noite");
          document.getElementById("Titulo").style.color = "rgba(255, 255, 255, 75%)";
          document.body.style.backgroundColor = "#363636";
        } else {
          console.log("dia");
          document.getElementById("Titulo").style.color = "black";
          document.body.style.backgroundColor = "#cccccc";
        }
      }
    }
)}

      
//Criar funções para alterar o url da API
function setTimeAlemanha() {
  apiUrl = "https://worldtimeapi.org/api/timezone/europe/berlin";
  clearInterval(intervalo);
  offset();
}
function setTimeAustralia() {
  apiUrl = "https://worldtimeapi.org/api/timezone/Australia/Sydney";
  clearInterval(intervalo);
  offset();
}
function setTimeChile() {
  apiUrl = "https://worldtimeapi.org/api/timezone/america/santiago";
  clearInterval(intervalo);
  offset();
}
function setTimeChina() {
  apiUrl = "https://worldtimeapi.org/api/timezone/Asia/Hong_Kong";
  clearInterval(intervalo);
  offset();
}
function setTimeDinamarca() {
  apiUrl = "https://worldtimeapi.org/api/timezone/Europe/Copenhagen";
  clearInterval(intervalo);
  offset();
}
function setTimeEgipto() {
  apiUrl = "https://worldtimeapi.org/api/timezone/Africa/Cairo";
  clearInterval(intervalo);
  offset();
}
function setTimeFranca() {
  apiUrl = "https://worldtimeapi.org/api/timezone/Europe/Paris";
  clearInterval(intervalo);
  offset();
}
function setTimeIndonesia() {
  apiUrl = "https://worldtimeapi.org/api/timezone/Asia/Jakarta";
  clearInterval(intervalo);
  offset();
}
function setTimeInglaterra() {
  apiUrl = "https://worldtimeapi.org/api/timezone/Europe/London";
  clearInterval(intervalo);
  offset();
}
function setTimeItalia() {
  apiUrl = "https://worldtimeapi.org/api/timezone/Europe/Rome";
  clearInterval(intervalo);
  offset();
}
function setTimeJapao() {
  apiUrl = "https://worldtimeapi.org/api/timezone/Asia/Tokyo";
  clearInterval(intervalo);
  offset();
}
function setTimeMexico() {
  apiUrl = "https://worldtimeapi.org/api/timezone/America/Mexico_City";
  clearInterval(intervalo);
  offset();
}
function setTimeNovaYork() {
  apiUrl = "https://worldtimeapi.org/api/timezone/America/New_York";
  clearInterval(intervalo);
  offset();
}
function setTimePortugal() {
  apiUrl = "https://worldtimeapi.org/api/timezone/Europe/Lisbon";
  clearInterval(intervalo);
  offset();
}
function setTimeUcrania() {
  apiUrl = "https://worldtimeapi.org/api/timezone/Europe/Kiev";
  clearInterval(intervalo);
  offset();
}



