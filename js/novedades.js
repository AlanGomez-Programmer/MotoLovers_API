import { getMotorcycles } from "./motos.js";

// Elementos DOM
const gridNovedades = document.getElementById("grid__novedades");
const loading = document.getElementById("loading");
const error = document.getElementById("error");
const modalDetalles = document.getElementById("modal__detalles");
const btnCerrar = document.getElementById("btn__cerrar");
const modalImagen = document.getElementById("modal__imagen");
const modalTitulo = document.getElementById("modal__titulo");
const modalCuerpo = document.getElementById("modal__cuerpo");

// Array de motos específicas para novedades
const motosNovedades = [
    { make: "KTM", model: "250", image: "./img/KTM_250_EXC_TPI.jpeg" },
    { make: "Kawasaki", model: "Ninja 400", image: "./img/Kawasaki_ninja_400.jpg" },
    { make: "Suzuki", model: "Hayabusa", image: "./img/Suzuki_hayabusa.png" }
];

// Obtener novedades específicas
async function obtenerNovedades2025() {
    try {
        const motosEncontradas = [];
        
        // Buscar cada moto específica
        for (const moto of motosNovedades) {
            try {
                const resultado = await getMotorcycles({ 
                    make: moto.make, 
                    model: moto.model 
                });
                
                if (resultado.length > 0) {
                    // Agregar la imagen del array al resultado de la API
                    resultado[0].image = moto.image;
                    motosEncontradas.push(resultado[0]);
                }
            } catch (error) {
                console.error(`Error buscando ${moto.make} ${moto.model}:`, error);
            }
        }
        
        if (motosEncontradas.length === 0) {
            mostrarError();
            return;
        }
        
        mostrarMotos(motosEncontradas);
    } catch (error) {
        console.error("Error obteniendo novedades:", error);
        mostrarError();
    }
}

// Mostrar error
function mostrarError() {
    loading.style.display = "none";
    error.style.display = "block";
}

// Toggle favorito
function toggleFavorito(moto, imagenSrc, btn) {
    const favoritos = JSON.parse(localStorage.getItem("favoritos") || "[]");
    const index = favoritos.findIndex(f => f.make === moto.make && f.model === moto.model);
    
    if (index > -1) {
        // Ya es favorito, quitarlo
        favoritos.splice(index, 1);
        btn.classList.remove("activo");
        btn.textContent = "♡";
        btn.title = "Agregar a favoritos";
    } else {
        // No es favorito, agregarlo
        favoritos.push({
            make: moto.make,
            model: moto.model,
            image: imagenSrc,
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
        btn.classList.add("activo");
        btn.textContent = "♥";
        btn.title = "Quitar de favoritos";
    }
    
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
}

// Crear tarjeta de moto
function crearTarjeta(moto) {
    const tarjeta = document.createElement("div");
    tarjeta.className = "tarjeta__moto";
    
    const imagenSrc = moto.image || `https://via.placeholder.com/400x300/1a1a1a/e00000?text=${encodeURIComponent(moto.make + ' ' + moto.model)}`;
    
    const img = document.createElement("img");
    img.className = "tarjeta__imagen";
    img.src = imagenSrc;
    img.alt = `${moto.make} ${moto.model}`;
    tarjeta.appendChild(img);
    
    const info = document.createElement("div");
    info.className = "tarjeta__info";
    
    const marca = document.createElement("p");
    marca.className = "tarjeta__marca";
    marca.textContent = moto.make;
    
    const modelo = document.createElement("h3");
    modelo.className = "tarjeta__modelo";
    modelo.textContent = moto.model;
    
    info.appendChild(marca);
    info.appendChild(modelo);
    tarjeta.appendChild(info);
    
    // Botón de favoritos
    const btnFavorito = document.createElement("button");
    btnFavorito.className = "btn__favorito";
    btnFavorito.textContent = "♡";
    btnFavorito.title = "Agregar a favoritos";
    
    // Verificar si ya es favorito
    const favoritos = JSON.parse(localStorage.getItem("favoritos") || "[]");
    const esFavorito = favoritos.some(f => f.make === moto.make && f.model === moto.model);
    if (esFavorito) {
        btnFavorito.classList.add("activo");
        btnFavorito.textContent = "♥";
        btnFavorito.title = "Quitar de favoritos";
    }
    
    btnFavorito.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleFavorito(moto, imagenSrc, btnFavorito);
    });
    
    tarjeta.appendChild(btnFavorito);
    
    tarjeta.addEventListener("click", () => mostrarDetalles(moto, imagenSrc));
    
    return tarjeta;
}

// Mostrar todas las motos en el grid
function mostrarMotos(motos) {
    loading.style.display = "none";
    
    motos.forEach(moto => {
        const tarjeta = crearTarjeta(moto);
        gridNovedades.appendChild(tarjeta);
    });
}

// Mostrar detalles en modal
function mostrarDetalles(moto, imagenSrc) {
    modalImagen.src = imagenSrc;
    modalImagen.alt = `${moto.make} ${moto.model}`;
    modalTitulo.textContent = `${moto.make} ${moto.model}`;
    
    // Llenar tabla con especificaciones
    const datos = [
        ["Marca", moto.make],
        ["Modelo", moto.model],
        ["Tipo", moto.type],
        ["Cilindraje", moto.displacement],
        ["Motor", moto.engine],
        ["Potencia", moto.power],
        ["Torque", moto.torque],
        ["Compresión", moto.compression],
        ["Diámetro x Carrera", moto.bore_stroke],
        ["Válvulas", moto.valves_per_cylinder]
    ];
    
    modalCuerpo.textContent = "";
    
    datos.forEach(dato => {
        const fila = document.createElement("tr");
        
        const celda1 = document.createElement("td");
        celda1.textContent = dato[0];
        
        const celda2 = document.createElement("td");
        celda2.textContent = dato[1] || "No disponible";
        
        fila.appendChild(celda1);
        fila.appendChild(celda2);
        modalCuerpo.appendChild(fila);
    });
    
    modalDetalles.classList.add("active");
    document.body.style.overflow = "hidden";
}

// Cerrar modal
function cerrarModal() {
    modalDetalles.classList.remove("active");
    document.body.style.overflow = "auto";
}

// Event listeners
btnCerrar.addEventListener("click", cerrarModal);

modalDetalles.addEventListener("click", (e) => {
    if (e.target === modalDetalles) {
        cerrarModal();
    }
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalDetalles.classList.contains("active")) {
        cerrarModal();
    }
});

// Cargar novedades al iniciar
window.addEventListener("DOMContentLoaded", obtenerNovedades2025);
