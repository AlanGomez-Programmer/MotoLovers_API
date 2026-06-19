// Elementos DOM
const gridFavoritos = document.getElementById("grid__favoritos");
const loading = document.getElementById("loading");
const vacio = document.getElementById("vacio");
const modalDetalles = document.getElementById("modal__detalles");
const btnCerrar = document.getElementById("btn__cerrar");
const modalImagen = document.getElementById("modal__imagen");
const modalTitulo = document.getElementById("modal__titulo");
const modalCuerpo = document.getElementById("modal__cuerpo");

// Cargar favoritos desde localStorage
function cargarFavoritos() {
    const favoritos = JSON.parse(localStorage.getItem("favoritos") || "[]");
    return favoritos;
}

// Mostrar favoritos
function mostrarFavoritos() {
    loading.style.display = "none";
    
    const favoritos = cargarFavoritos();
    
    if (favoritos.length === 0) {
        vacio.style.display = "block";
        return;
    }
    
    vacio.style.display = "none";
    
    favoritos.forEach(moto => {
        const tarjeta = crearTarjeta(moto);
        gridFavoritos.appendChild(tarjeta);
    });
}

// Crear tarjeta de moto (sin imagen)
function crearTarjeta(moto) {
    const tarjeta = document.createElement("div");
    tarjeta.className = "tarjeta__moto";
    
    const info = document.createElement("div");
    info.className = "tarjeta__info";
    
    const marca = document.createElement("p");
    marca.className = "tarjeta__marca";
    marca.textContent = moto.make;
    
    const modelo = document.createElement("h3");
    modelo.className = "tarjeta__modelo";
    modelo.textContent = moto.model;
    
    const anio = document.createElement("p");
    anio.className = "tarjeta__anio";
    anio.textContent = moto.year || "N/A";
    
    info.appendChild(marca);
    info.appendChild(modelo);
    info.appendChild(anio);
    tarjeta.appendChild(info);
    
    // Botón de eliminar favorito
    const btnEliminar = document.createElement("button");
    btnEliminar.className = "btn__eliminar";
    btnEliminar.textContent = "✕";
    btnEliminar.title = "Eliminar de favoritos";
    
    btnEliminar.addEventListener("click", (e) => {
        e.stopPropagation();
        eliminarFavorito(moto, tarjeta);
    });
    
    tarjeta.appendChild(btnEliminar);
    
    tarjeta.addEventListener("click", () => mostrarDetalles(moto));
    
    return tarjeta;
}

// Eliminar favorito
function eliminarFavorito(moto, tarjeta) {
    const favoritos = cargarFavoritos();
    const index = favoritos.findIndex(f => f.make === moto.make && f.model === moto.model);
    
    if (index > -1) {
        favoritos.splice(index, 1);
        localStorage.setItem("favoritos", JSON.stringify(favoritos));
        
        // Animación de eliminación
        tarjeta.style.transform = "scale(0.8)";
        tarjeta.style.opacity = "0";
        
        setTimeout(() => {
            tarjeta.remove();
            
            // Si no hay más favoritos, mostrar mensaje vacío
            const favoritosRestantes = cargarFavoritos();
            if (favoritosRestantes.length === 0) {
                vacio.style.display = "block";
            }
        }, 300);
    }
}

// Mostrar detalles en modal
function mostrarDetalles(moto) {
    const imagenSrc = moto.image || `https://via.placeholder.com/400x300/1a1a1a/e00000?text=${encodeURIComponent(moto.make + ' ' + moto.model)}`;
    
    modalImagen.src = imagenSrc;
    modalImagen.alt = `${moto.make} ${moto.model}`;
    modalTitulo.textContent = `${moto.make} ${moto.model} ${moto.year || ""}`;
    
    // Llenar tabla con especificaciones
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

// Cargar favoritos al iniciar
window.addEventListener("DOMContentLoaded", mostrarFavoritos);
