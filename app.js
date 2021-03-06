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
const years = document.createElement("option");
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
	datosBusqueda.year = parseInt(e.target.value);
	filtrarAuto();
});
minimo.addEventListener("change", (e) => {
	datosBusqueda.minimo = parseInt(e.target.value);
	filtrarAuto();
});
maximo.addEventListener("change", (e) => {
	datosBusqueda.maximo = parseInt(e.target.value);
	filtrarAuto();
});
puertas.addEventListener("change", (e) => {
	datosBusqueda.puertas = parseInt(e.target.value);
	filtrarAuto();
});
transmision.addEventListener("change", (e) => {
	datosBusqueda.transmision = e.target.value;
	filtrarAuto();
});
color.addEventListener("change", (e) => {
	datosBusqueda.color = e.target.value;
	filtrarAuto();
});

//funciones
function mostrarAutos(autos) {
	limpiarHTML(); //limpiar html antes de mostrar nuevos resultados
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

//limpiar HTML
function limpiarHTML() {
	while (resultado.firstChild) {
		resultado.removeChild(resultado.firstChild);
	}
}

//función que filtra con base en la búsqueda del usuario
function filtrarAuto() {
	//función de alto nivel
	const resultado = autos
		.filter(filtrarMarca)
		.filter(filtrarYear)
		.filter(filtrarMinimo)
		.filter(filtrarMaximo)
		.filter(filtrarPuertas)
		.filter(filtrarTransmision)
		.filter(filtrarColor);

	//mensaje en caso de que no haya autos con esas características
	if (resultado.length) {
		mostrarAutos(resultado);
	} else {
		mensajeError();
	}
}

function mensajeError() {
	limpiarHTML();
	const mensajeError = document.createElement("div");
	mensajeError.classList.add("mensajeError");
	mensajeError.textContent = "No hay autos con estas características";
	resultado.appendChild(mensajeError);
}

function filtrarMarca(auto) {
	const { marca } = datosBusqueda;
	if (marca) {
		return auto.marca === marca;
	}
	return auto;
}

function filtrarYear(auto) {
	const { year } = datosBusqueda;
	if (year) {
		return auto.year === year;
	}
	return auto;
}

function filtrarMinimo(auto) {
	const { minimo } = datosBusqueda;
	if (minimo) {
		return auto.precio >= minimo;
	}
	return auto;
}

function filtrarMaximo(auto) {
	const { maximo } = datosBusqueda;
	if (maximo) {
		return auto.precio <= maximo;
	}
	return auto;
}

function filtrarPuertas(auto) {
	const { puertas } = datosBusqueda;
	if (puertas) {
		return auto.puertas === puertas;
	}
	return auto;
}

function filtrarTransmision(auto) {
	const { transmision } = datosBusqueda;
	if (transmision) {
		return auto.transmision === transmision;
	}
	return auto;
}

function filtrarColor(auto) {
	const { color } = datosBusqueda;
	if (color) {
		return auto.color === color;
	}
	return auto;
}
