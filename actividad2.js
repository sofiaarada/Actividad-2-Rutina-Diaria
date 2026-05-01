// ACTIVIDAD 
// Contexto: Productividad diaria
// En este programa analizo mis actividades diarias para ver
// cuales me ayudan a ser mas productiva y cuales no

// aqui creo la clase Registro que me sirve como molde
// para guardar la informacion de cada dia
class Registro {
    // el constructor recibe todos los datos del dia
    // y los guarda dentro del objeto con "this"
    constructor(dia, fecha, duracionEstudio, eventos, descanso, fueProductivo) {
        this.dia = dia; // numero del dia
        this.fecha = fecha; // fecha en la que fue el dia
        this.duracionEstudio = duracionEstudio; // cuanto estudie ese dia
        this.eventos = eventos; // lista de actividades que hice
        this.descanso = descanso; // cuanto dormi esa noche
        this.fueProductivo = fueProductivo; // true si fue buen dia, false si no
    }
}

// Array Principal
// cada elemento es un objeto con la informacion de ese dia
const rutinaDiaria = [
    { dia: 1,  fecha: "2026/08/11", duracionEstudio: "2 horas", eventos: ["desayunar", "estudiar_programacion", "tejer", "lavar_ropa"],    descanso: "7 horas", fueProductivo: true  },
    { dia: 2,  fecha: "2026/08/12", duracionEstudio: "0 horas", eventos: ["desayunar", "estudiar_programacion", "lavar_ropa", "jugar_basketball"], descanso: "8 horas", fueProductivo: false },
    { dia: 3,  fecha: "2026/08/13", duracionEstudio: "3 horas", eventos: ["desayunar", "estudiar_programacion", "lavar_ropa", "dormir"],   descanso: "8 horas", fueProductivo: true  },
    { dia: 4,  fecha: "2026/08/14", duracionEstudio: "0 horas", eventos: ["desayunar", "ver_tiktok", "dormir_tarde", "ver_series"],        descanso: "5 horas", fueProductivo: false },
    { dia: 5,  fecha: "2026/08/15", duracionEstudio: "4 horas", eventos: ["desayunar", "estudiar_programacion", "tejer", "leer"],          descanso: "8 horas", fueProductivo: true  },
    { dia: 6,  fecha: "2026/08/16", duracionEstudio: "0 horas", eventos: ["desayunar", "ver_tiktok", "ver_series", "dormir_tarde"],        descanso: "6 horas", fueProductivo: false },
    { dia: 7,  fecha: "2026/08/17", duracionEstudio: "3 horas", eventos: ["desayunar", "estudiar_programacion", "tejer", "hacer_ejercicio"], descanso: "7 horas", fueProductivo: true  },
    { dia: 8,  fecha: "2026/08/18", duracionEstudio: "0 horas", eventos: ["desayunar", "ver_tiktok", "lavar_ropa", "dormir_tarde"],        descanso: "5 horas", fueProductivo: false },
    { dia: 9,  fecha: "2026/08/19", duracionEstudio: "2 horas", eventos: ["desayunar", "estudiar_programacion", "leer", "tejer"],          descanso: "8 horas", fueProductivo: true  },
    { dia: 10, fecha: "2026/08/20", duracionEstudio: "0 horas", eventos: ["desayunar", "ver_tiktok", "ver_series", "dormir_tarde"],        descanso: "4 horas", fueProductivo: false },
];

//Funciòn agregar registros
// usa "new Registro" para crear el objeto con el molde de la clase
function agregarRegistro(dia, fecha, duracionEstudio, eventos, descanso, fueProductivo) {
    let nuevoRegistro = new Registro(dia, fecha, duracionEstudio, eventos, descanso, fueProductivo);
    rutinaDiaria.push(nuevoRegistro); // push lo agrega al final del array
}

//Funciòn obtener eventos unicos.
// esta funcion recorre todos los dias y saca una lista
// de actividades sin repetir ninguna
function obtenerEventosUnicos() {
    let unicos = []; // aqui voy guardando las actividades sin repetir
    for (let registro of rutinaDiaria) { // recorro cada dia
        for (let evento of registro.eventos) { // recorro cada actividad del dia
            if (!unicos.includes(evento)) {  // si la actividad NO esta ya en la lista
                unicos.push(evento); // la agrego
            }
        }
    }
    return unicos; // devuelvo la lista sin repetidos
}

//Funciòn analizar por evento.
// cuenta cuantas veces aparece cada actividad en dias buenos y en dias malos
function analizarPorEvento() {
    let analisis = {}; // objeto vacio donde voy a guardar los contadores
    for (let registro of rutinaDiaria) {
        for (let evento of registro.eventos) {
            // si la actividad no existe todavia en analisis, la creo con contadores en 0
            if (!analisis[evento]) {
                analisis[evento] = { positivos: 0, negativos: 0, total: 0 };
            }
            analisis[evento].total++;// cada vez que aparece sumo 1 al total
             // dependiendo de si el dia fue productivo o no, sumo al contador correcto
            if (registro.fueProductivo == true) {
                analisis[evento].positivos++;
            } else {
                analisis[evento].negativos++;
            }
        }
    }
    return analisis;
}


// esta funcion muestra todos los resultados en consola
function mostrarResultados() {
    console.log("===========================================");
    console.log("   ANALISIS DE PRODUCTIVIDAD DIARIA");
    console.log("===========================================");
    // llamo la funcion y muestro los eventos unicos
    console.log("\nEventos unicos encontrados:");
    let unicos = obtenerEventosUnicos();
    for (let evento of unicos) {
        console.log("  -", evento);
    }
    // llamo la funcion de analisis y recorro los resultados
    console.log("\nAnalisis por actividad:");
    let analisis = analizarPorEvento();

    let actividadesPositivas = [];// aqui guardo las que tienen mas impacto positivo
    let actividadesNegativas = [];// aqui guardo las que tienen mas impacto negativo

    for (let actividad in analisis) {
        // calculo el porcentaje de dias positivos sobre el total
        // Math.round redondea el numero para que no tenga muchos decimales
        let datos = analisis[actividad];
        let porcentaje = Math.round((datos.positivos / datos.total) * 100);
        console.log("\n  Actividad:", actividad);
        console.log("  Total apariciones:", datos.total);
        console.log("  Dias productivos:", datos.positivos);
        console.log("  Dias no productivos:", datos.negativos);
        console.log("  Impacto positivo:", porcentaje + "%");
        // si el porcentaje es mayor o igual a 70 la considero positiva
        // si es menor o igual a 30 la considero negativa
        if (porcentaje >= 70) {
            actividadesPositivas.push(actividad);
        } else if (porcentaje <= 30) {
            actividadesNegativas.push(actividad);
        }
    }
    // muestro las conclusiones finales
    console.log("\n===========================================");
    console.log("Actividades con MAYOR impacto positivo:");
    for (let a of actividadesPositivas) {
        console.log("  *", a);
    }

    console.log("\nActividades con MAYOR impacto negativo:");
    for (let a of actividadesNegativas) {
        console.log("  *", a);
    }
    console.log("===========================================");
}
// ejecuto el programa
mostrarResultados();