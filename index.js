
const icono = "http://openweathermap.org/img/wn";
const ulList = document.querySelector(".ul-list");
const button = document.querySelector("#button-addon1");
const textBox = document.querySelector("#textBox");
const kelvin = 273.15;
const date = new Date();

const crearHmlt = ({ main, name, sys, weather }) => {
  const html = `<li>
    <p class="fs-5">Hora actual</p>
    <p class="fs-4">${date.getHours()}:${date.getMinutes()}</p>
    <img src='${icono}/${weather[0].icon}@2x.png'/>
    <p class="fs-1">${parseFloat(main.temp - kelvin, 10).toFixed(2)}&#x2103</p>
    <p class="fs-4">${sys.country}</p>
    <p class="fs-4">${name}</p>
    </li>
    `;

  const div = document.createElement("div");
  div.innerHTML = html;
  ulList.append(div.firstElementChild);

  return div.firstElementChild;
};


const buscarCiudad = () => {

    button.addEventListener("click", async () => {
    const li = document.querySelector("li");

    if (!textBox.value == "") {
      if (ulList.removeChild(li)) {
        crearHmlt(await getClima(textBox.value));
      } else {
        console.log("no hay nodos");
      }
    } else {
      ulList.innerHTML = "<li>Ingresa el nombre de tu ciudad</li>";
    }
  });
};


  buscarCiudad();



//**************HTTP PROVIDER******************//

const apiKey = "1af1874b3ade00c4a0eff7608bd6f58c";

const getClima = async (ciudad) => {
  const urlApi = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}`;
  try {
    const resp = await fetch(urlApi);

    if (resp.ok) {

      const { main, name, sys,weather } = await resp.json();
//const { main, name, sys, timezone, weather } = await resp.json();
// const hora= new Date((sys.sunrise + timezone)*1000);
// console.log(hora);
      return { main, name, sys, weather };

    } else {

        
      ulList.innerHTML="<li>Ciudad no valida</li>"
      throw 'Ciudad no valida';
    }
  } catch (err) {
    throw err;
  }
};




