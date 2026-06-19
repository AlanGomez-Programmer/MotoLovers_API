import { getMotorcycles } from "./motos.js";

// Elementos
const moto1 = document.getElementById("moto1");
const moto2 = document.getElementById("moto2");

const modeloMoto1 = document.getElementById("modelo_moto1");
const modeloMoto2 = document.getElementById("modelo_moto2");

const anioMoto1 = document.getElementById("anio_moto1");
const anioMoto2 = document.getElementById("anio_moto2");

const btnComparar = document.getElementById("btnComparar");

const cuerpoComparacion = document.getElementById("cuerpoComparacion");


// Buscar moto exacta en la API
async function buscarMoto(make, model, year) {

    try {

        const motos = await getMotorcycles({

            make,
            model,
            year

        });

        if (motos.length === 0) {

            console.log("Moto no encontrada");

            return null;

        }

        return motos[0];

    }

    catch (error) {

        console.error(error);

        return null;

    }

}



// Mostrar comparación
function mostrarComparacion(moto1, moto2) {

    cuerpoComparacion.textContent = "";


    const datos = [

        ["Marca", moto1.make, moto2.make],

        ["Modelo", moto1.model, moto2.model],

        ["Año", moto1.year, moto2.year],

        ["Tipo", moto1.type, moto2.type],

        ["Cilindraje",
            moto1.displacement,
            moto2.displacement
        ],

        ["Motor",
            moto1.engine,
            moto2.engine
        ],

        ["Potencia",
            moto1.power,
            moto2.power
        ],

        ["Torque",
            moto1.torque,
            moto2.torque
        ],

        ["Compresión",
            moto1.compression,
            moto2.compression
        ]

    ];


    datos.forEach(dato => {

        const fila = document.createElement("tr");

        const celda1 = document.createElement("td");
        celda1.textContent = dato[0];

        const celda2 = document.createElement("td");
        celda2.textContent = dato[1] || "-";

        const celda3 = document.createElement("td");
        celda3.textContent = dato[2] || "-";

        fila.appendChild(celda1);
        fila.appendChild(celda2);
        fila.appendChild(celda3);

        cuerpoComparacion.appendChild(fila);

    });

}


// Comparar
btnComparar.addEventListener("click", async () => {

    const marca1 = moto1.value.trim();
    const modelo1 = modeloMoto1.value.trim();
    const anio1 = anioMoto1.value.trim();

    const marca2 = moto2.value.trim();
    const modelo2 = modeloMoto2.value.trim();
    const anio2 = anioMoto2.value.trim();

    if (!marca1 || !modelo1 || !anio1 || !marca2 || !modelo2 || !anio2) {
        alert("Por favor, complete todos los campos para ambas motos");
        return;
    }

    const primeraMoto = await buscarMoto(marca1, modelo1, anio1);
    const segundaMoto = await buscarMoto(marca2, modelo2, anio2);

    if (!primeraMoto || !segundaMoto) {
        alert("No se encontraron las motos seleccionadas");
        return;
    }

    mostrarComparacion(primeraMoto, segundaMoto);

    // Limpiar los inputs después de la comparación
    moto1.value = "";
    modeloMoto1.value = "";
    anioMoto1.value = "";
    moto2.value = "";
    modeloMoto2.value = "";
    anioMoto2.value = "";
});
