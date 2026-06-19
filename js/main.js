import { getMotorcycles } from "./motos.js";

// Elementos DOM
const posicionMoto = document.getElementById("posicion__moto");
const imagen = document.getElementById("mejor__moto");
const nombreMoto = document.getElementById("moto__nombre");
const cuerpoTabla = document.getElementById("cuerpo__tabla");
const loadingSpinner = document.getElementById("loading-spinner");
const tarjetaMoto = document.querySelector(".tarjeta__moto");
const tarjetasCuriosidades = document.querySelectorAll(".tarjeta__curiosidades");

const btnKawasaki = document.getElementById("btnKawasaki");
const btnYamaha = document.getElementById("btnYamaha");
const btnSuzuki = document.getElementById("btnSuzuki");


// Buscar la moto en la API
async function buscarMoto(make, model, year) {

    try {

        const motos = await getMotorcycles({
            make,
            model,
            year
        });

        console.log("Respuesta de la API:");
        console.log(motos);

        if (motos.length === 0) {

            console.log("No se encontró ninguna moto");
            return null;

        }

        return motos[0];

    }

    catch (error) {

        console.error("Error buscando moto:", error);

    }

}

// Llenar tabla
function agregarTabla(moto) {

    cuerpoTabla.textContent = "";

    const datosMostrar = [

        ["Marca", moto.make],
        ["Modelo", moto.model],
        ["Año", moto.year],
        ["Tipo", moto.type],
        ["Cilindraje", moto.displacement],
        ["Motor", moto.engine],
        ["Potencia", moto.power],
        ["Torque", moto.torque],
        ["Compresión", moto.compression],
        ["Diámetro x Carrera", moto.bore_stroke],
        ["Válvulas", moto.valves_per_cylinder]

    ];


    datosMostrar.forEach(dato => {

        const fila = document.createElement("tr");

        const celda1 = document.createElement("td");
        celda1.textContent = dato[0];

        const celda2 = document.createElement("td");
        celda2.textContent = dato[1] || "No disponible";

        fila.appendChild(celda1);
        fila.appendChild(celda2);

        cuerpoTabla.appendChild(fila);

    });

}


// Mostrar la moto
async function mostrarMoto(make, model, year, ruta_img, posicion) {

    try {

        // Quitar clase visible para reiniciar transición
        tarjetaMoto.classList.remove("visible");

        const moto = await buscarMoto(make, model, year);

        if (!moto) {

            console.log("Moto no encontrada");
            return;

        }


        agregarTabla(moto);


        imagen.src = ruta_img;


        posicionMoto.textContent = posicion;


        nombreMoto.textContent =
            `${moto.make} ${moto.model}`;

        // Activar transición después de cargar la nueva moto
        setTimeout(() => {
            tarjetaMoto.classList.add("visible");
        }, 100);


    }

    catch (error) {

        console.error("Lo siento hay un error", error);

    }

}


// Eventos

btnKawasaki.addEventListener("click", () => {

    mostrarMoto(

        "Kawasaki",
        "Ninja",
        "2024",

        "./img/Ninja_zx-4r.jpeg",

        "🏆 Primer Lugar"

    );

});


btnYamaha.addEventListener("click", () => {

    mostrarMoto(

        "Yamaha",
        "R1",
        "2024",

        "./img/Yamaha_R1 Race.jpeg",

        "🥈 Segundo Lugar"

    );

});


btnSuzuki.addEventListener("click", () => {

    mostrarMoto(

        "Suzuki",
        "GSX",
        "2024",

        "./img/Suzuki_GSXR1000RZ.jpeg",

        "🥉 Tercer Lugar"

    );

});


// Cargar una moto al abrir la página

window.addEventListener("DOMContentLoaded", async () => {

    await mostrarMoto(

        "Kawasaki",
        "Ninja",
        "2024",

        "./img/Ninja_zx-4r.jpeg",

        "🏆 Primer Lugar"

    );

    // Ocultar el loading spinner después de cargar
    loadingSpinner.classList.add("hidden");

    // Activar transiciones de tarjetas con delay escalonado
    setTimeout(() => {
        tarjetaMoto.classList.add("visible");
    }, 100);

    tarjetasCuriosidades.forEach((tarjeta, index) => {
        setTimeout(() => {
            tarjeta.classList.add("visible");
        }, 300 + (index * 150));
    });

});
