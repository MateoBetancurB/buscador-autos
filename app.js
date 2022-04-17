// variables
const marca = document.querySelector("#marca");
const year = document.querySelector("#year");
const minimo = document.querySelector("#minimo");
const maximo = document.querySelector("#maximo");
const puertas = document.querySelector("#puertas");
const transmision = document.querySelector("#transmision");
const color = document.querySelector("#color");

//contenedor para los resultados
const resultado = document.querySelector("#resultado");

// crear los años
const max = new Date().getFullYear();
const min = max - 10;

//generar objeto con la búsqueda
const datosBusqueda = {
	marca: "",
	year: "",
	minimo: "",
	maximo: "",
	puertas: "",
	transmision: "",
	color: "",
};

//eventos
document.addEventListener("DOMContentLoaded", () => {
	mostrarAutos(autos);
	//llenar las opciones de años
	llenarSelect();
});
//event listener para los select de búsqueda
marca.addEventListener("change", (e) => {
	datosBusqueda.marca = e.target.value;
	filtrarAuto();
});
year.addEventListener("change", (e) => {
	datosBusqueda.year = e.target.value;
});
minimo.addEventListener("change", (e) => {
	datosBusqueda.minimo = e.target.value;
});
maximo.addEventListener("change", (e) => {
	datosBusqueda.maximo = e.target.value;
});
puertas.addEventListener("change", (e) => {
	datosBusqueda.puertas = e.target.value;
});
transmision.addEventListener("change", (e) => {
	datosBusqueda.transmision = e.target.value;
});
color.addEventListener("change", (e) => {
	datosBusqueda.color = e.target.value;
});

//funciones
function mostrarAutos() {
	autos.forEach((auto) => {
		const { marca, modelo, year, precio, puertas, color, transmision } = auto;
		const autoHTML = document.createElement("p");

		autoHTML.textContent = `
      ${marca} - ${modelo} - ${year} - Precio:${precio} - Puertas:${puertas} - Color:${color} - Transmisión:${transmision}
    `;

		//insertar en el html
		resultado.appendChild(autoHTML);
	});
}

function llenarSelect() {
	for (let i = max; i >= min; i--) {
		const option = document.createElement("option");
		option.value = i;
		option.innerText = i;
		document.querySelector("#year").appendChild(option);
	}
}

//función que filtra con base en la búsqueda del usuario
function filtrarAuto() {
	const resultado = autos.filter(filtrarMarca);
	console.table(resultado);
}
function filtrarMarca(auto) {
	const { marca } = datosBusqueda;
	if (marca) {
		return auto.marca === datosBusqueda.marca;
	}
	return auto;
}
