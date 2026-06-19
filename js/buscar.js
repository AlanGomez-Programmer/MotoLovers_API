import { getMotorcycles } from "./motos.js";


const marcaMoto = document.getElementById("marca__moto");
const modeloMoto = document.getElementById("modelo__moto");
const anioMoto = document.getElementById("anio__moto");
const btnBuscar = document.getElementById("btn_buscar");
const info = document.getElementById("tarjeta__informacion");
const cuerpoTabla = document.getElementById("cuerpo__especificaciones");
const btnFavorito = document.getElementById("btn_favorito");

let motoActual = null;

function esperar(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });

}

async function buscarMoto(make, model, year) {
    try {
        info.textContent =
            "Buscando motocicleta...";

        await esperar(1000);

        const motos = await getMotorcycles({
            make,
            model,
            year

        });

        if (motos.length === 0) {
            info.textContent = "❌ Moto no encontrada";
            return null;
        }

        info.textContent = "";
        return motos[0];
    }

    catch (error) {
        console.error(error);
        info.textContent = "⚠️ Error en la API";
        return null;
    }
}

function agregarTabla(moto) {

    cuerpoTabla.textContent = "";

    const datos = [
        ["Marca", moto.make],
        ["Modelo", moto.model],
        ["Año", moto.year],
        ["Tipo", moto.type],
        ["Cilindraje", moto.displacement],
        ["Motor", moto.engine],
        ["Potencia", moto.power],
        ["Torque", moto.torque],
        ["Compresión", moto.compression],
        ["Bore Stroke", moto.bore_stroke]
    ];

    datos.forEach(dato => {
        const fila = document.createElement("tr");

        const celda1 = document.createElement("td");
        celda1.textContent = dato[0];

        const celda2 = document.createElement("td");
        celda2.textContent = dato[1] || "No disponible";

        fila.appendChild(celda1);
        fila.appendChild(celda2);

        cuerpoTabla.appendChild(fila);
    });

    // Mostrar botón de favoritos y actualizar estado
    btnFavorito.style.display = "block";
    actualizarEstadoFavorito(moto);
}

// Toggle favorito
function toggleFavorito(moto) {
    const favoritos = JSON.parse(localStorage.getItem("favoritos") || "[]");
    const index = favoritos.findIndex(f => f.make === moto.make && f.model === moto.model);

    if (index > -1) {
        // Ya es favorito, quitarlo
        favoritos.splice(index, 1);
        btnFavorito.textContent = "♡ Agregar a Favoritos";
        btnFavorito.classList.remove("activo");
    } else {
        // No es favorito, agregarlo
        favoritos.push({
            make: moto.make,
            model: moto.model,
            image: `https://via.placeholder.com/400x300/1a1a1a/e00000?text=${encodeURIComponent(moto.make + ' ' + moto.model)}`,
            year: moto.year,
            type: moto.type,
            displacement: moto.displacement,
            engine: moto.engine,
            power: moto.power,
            torque: moto.torque,
            compression: moto.compression,
            bore_stroke: moto.bore_stroke,
            valves_per_cylinder: moto.valves_per_cylinder
        });
        btnFavorito.textContent = "♥ Quitar de Favoritos";
        btnFavorito.classList.add("activo");
    }

    localStorage.setItem("favoritos", JSON.stringify(favoritos));
}

// Actualizar estado del botón de favoritos
function actualizarEstadoFavorito(moto) {
    const favoritos = JSON.parse(localStorage.getItem("favoritos") || "[]");
    const esFavorito = favoritos.some(f => f.make === moto.make && f.model === moto.model);

    if (esFavorito) {
        btnFavorito.textContent = "♥ Quitar de Favoritos";
        btnFavorito.classList.add("activo");
    } else {
        btnFavorito.textContent = "♡ Agregar a Favoritos";
        btnFavorito.classList.remove("activo");
    }
}

btnBuscar.addEventListener("click", async () => {

    const marca = marcaMoto.value.trim();
    const modelo = modeloMoto.value.trim();
    const anio = anioMoto.value.trim();

    const moto = await buscarMoto(
        marca,
        modelo,
        anio
    );

    if (!moto) {
        btnFavorito.style.display = "none";
        return;
    }

    motoActual = moto;
    agregarTabla(
        moto
    );

    marcaMoto.value = "";
    modeloMoto.value = "";
    anioMoto.value = "";
}
);

// Event listener para botón de favoritos
btnFavorito.addEventListener("click", () => {
    if (motoActual) {
        toggleFavorito(motoActual);
    }
});
