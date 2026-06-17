// ==============================
// DATOS DE LAS MOTOS
// ==============================

const motos = [
    {
        make: "Kawasaki",
        model: "Ninja 400 ZX-4R",
        year: "2025",
        type: "Sport",
        displacement: "399.0 ccm (24.35 cubic inches)",
        engine: "Twin, four-stroke",
        compression: "11.5:1",
        bore_stroke: "57.0 x 39.1 mm (2.2 x 1.5 inches)",
        valves_per_cylinder: "4",
        fuel_system: "Injection. DFI® with dual 34mm throttle bodies",
        fuel_control: "Double Overhead Cams/Twin Cam (DOHC)",
        lubrication: "Forced lubrication, wet sump",
        cooling: "Liquid",
        gearbox: "6-speed",
        transmission: "Chain (final drive)",
        clutch: "Wet multi-disc, manual. Assist and Slipper.",
        frame: "Trellis, high-tensile steel",
        front_suspension: "37mm inverted Showa fork with SFF-BP internals",
        front_wheel_travel: "119 mm (4.7 inches)",
        rear_suspension: "Horizontal back-link, Showa shock w/ adjustable spring preload",
        rear_wheel_travel: "112 mm (4.4 inches)",
        front_tire: "110/70-17"
    },
    {
        make: "Yamaha",
        model: "R1 Race",
        year: "2025",
        type: "Sport",
        displacement: "998.0 ccm (60.90 cubic inches)",
        engine: "In-line four, four-stroke",
        compression: "13.0:1",
        bore_stroke: "79.0 x 50.9 mm (3.1 x 2.0 inches)",
        valves_per_cylinder: "4",
        fuel_system: "Injection. Fuel Injection with YCC-T and YCC-I",
        fuel_control: "Double Overhead Cams/Twin Cam (DOHC)",
        lubrication: "Wet sump",
        cooling: "Liquid",
        gearbox: "6-speed",
        transmission: "Chain (final drive)",
        clutch: "Multiplate assist and slipper clutch",
        frame: "Aluminum deltabox, diamond",
        front_suspension: "43mm telescopic fork",
        front_wheel_travel: "120 mm (4.7 inches)",
        rear_suspension: "Link suspension, Swingarm",
        rear_wheel_travel: "120 mm (4.7 inches)",
        front_tire: "120/70-ZR17"
    },
    {
        make: "Suzuki",
        model: "GSX-R1000RZ",
        year: "2025",
        type: "Sport",
        displacement: "999.8 ccm (61.01 cubic inches)",
        engine: "In-line four, four-stroke",
        compression: "13.2:1",
        bore_stroke: "76.0 x 55.1 mm (3.0 x 2.2 inches)",
        valves_per_cylinder: "4",
        fuel_system: "Injection. Ride-by-Wire throttle bodies",
        fuel_control: "Double Overhead Cams/Twin Cam (DOHC)",
        lubrication: "Wet sump",
        cooling: "Liquid",
        gearbox: "6-speed",
        transmission: "Chain (final drive)",
        clutch: "Wet, multi-plate type. Suzuki Clutch Assist.",
        frame: "Twin-spar aluminum",
        front_suspension: "Inverted telescopic, coil spring, oil damped",
        front_wheel_travel: "No disponible",
        rear_suspension: "Link type, single shock, coil spring, oil damped",
        rear_wheel_travel: "No disponible",
        front_tire: "120/70-ZR17"
    }
];

// ==============================
// ELEMENTOS DEL DOM
// ==============================

const imagen = document.getElementById("mejor__moto");
const posicionMoto = document.getElementById("posicion__moto");
const nombreMoto = document.getElementById("moto__nombre");
const cuerpoTabla = document.getElementById("cuerpo__tabla");

const btnKawasaki = document.getElementById("btnKawasaki");
const btnYamaha = document.getElementById("btnYamaha");
const btnSuzuki = document.getElementById("btnSuzuki");

function buscarMoto(marca) {
    return motos.find(moto => moto.make === marca);
}

function llenarTabla(moto){

    cuerpoTabla.innerHTML = "";

    const datosMostrar = [
        ["Marca", moto.make],
        ["Modelo", moto.model],
        ["Tipo", moto.type],
        ["Cilindraje", moto.displacement],
        ["Motor", moto.engine],
        ["Compresión", moto.compression],
        ["Diámetro x Carrera", moto.bore_stroke],
        ["Válvulas por Cilindro", moto.valves_per_cylinder]
    ];

    datosMostrar.forEach(dato => {

        let fila = document.createElement("tr");

        fila.innerHTML = `
            <td>${dato[0]}</td>
            <td>${dato[1]}</td>
        `;

        cuerpoTabla.appendChild(fila);
    });

}

function mostrarMoto(marca, rutaImagen, posicion) {

    const moto = buscarMoto(marca);

    if (!moto) {
        console.error("Moto no encontrada");
        return;
    }

    imagen.src = rutaImagen;
    posicionMoto.textContent = posicion;
    nombreMoto.textContent = `${moto.make} ${moto.model}`;

    llenarTabla(moto);
}

btnKawasaki.addEventListener("click", () => {
    mostrarMoto(
        "Kawasaki",
        "./img/Ninja_zx-4r.jpeg",
        "🏆 Primer Lugar"
    );
});

btnYamaha.addEventListener("click", () => {
    mostrarMoto(
        "Yamaha",
        "./img/Yamaha_R1 Race.jpeg",
        "🥈 Segundo Lugar"
    );
});

btnSuzuki.addEventListener("click", () => {
    mostrarMoto(
        "Suzuki",
        "./img/Suzuki_GSXR1000RZ.jpeg",
        "🥉 Tercer Lugar"
    );
});


window.addEventListener("DOMContentLoaded", () => {

    mostrarMoto(
        "Kawasaki",
        "./img/Ninja_zx-4r.jpeg",
        "🏆 Primer Lugar"
    );

});