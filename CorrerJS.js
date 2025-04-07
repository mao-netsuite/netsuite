console.log("🔹 Ejercicio: 10 conceptos clave de JavaScript");

// 1️⃣ Variables y Tipos de Datos
function mostrarTipos() {
    let nombre = "JavaScript";
    let version = 2024;
    let esPopular = true;
    
    console.log("1️⃣ Variables y Tipos:");
    console.log("Lenguaje:", nombre, "- Año:", version, "- Popular:", esPopular);
}

// 2️⃣ Funciones
function usarFunciones() {
    function saludar(nombre) {
        return `¡Hola, ${nombre}!`;
    }
    
    console.log("2️⃣ Funciones:");
    console.log(saludar("Mundo"));
}

// 3️⃣ Condicionales
function evaluarCondicional() {
    let edad = 18;
    let mensaje = edad >= 18 ? "Eres mayor de edad" : "Eres menor de edad";
    
    console.log("3️⃣ Condicionales:");
    console.log(mensaje);
}

// 4️⃣ Bucles
function usarBucles() {
    console.log("4️⃣ Bucles:");
    for (let i = 1; i <= 5; i++) {
        console.log("Número:", i);
    }
}

// 5️⃣ Arrays
function manejarArrays() {
    let frutas = ["🍎", "🍌", "🍍"];
    frutas.push("🍉");

    console.log("5️⃣ Arrays:");
    console.log("Lista de frutas:", frutas);
}

// 6️⃣ Objetos
function usarObjetos() {
    let persona = {
        nombre: "Ana",
        edad: 25,
        ciudad: "Bogotá"
    };

    console.log("6️⃣ Objetos:");
    console.log(persona);
}

// 7️⃣ Asincronía con `setTimeout`
function ejecutarAsync() {
    console.log("7️⃣ Asincronía:");
    console.log("Esperando 2 segundos...");
    
    setTimeout(() => {
        console.log("¡Tiempo cumplido!");
    }, 2000);
}

// 8️⃣ Clases y POO
function usarClases() {
    class Persona {
        constructor(nombre, edad) {
            this.nombre = nombre;
            this.edad = edad;
        }
        saludar() {
            return `Hola, soy ${this.nombre} y tengo ${this.edad} años.`;
        }
    }

    let persona = new Persona("Carlos", 30);
    console.log("8️⃣ Clases:");
    console.log(persona.saludar());
}

// 9️⃣ Promesas y asincronía
function usarPromesas() {
    console.log("9️⃣ Promesas:");

    let promesa = new Promise((resolve, reject) => {
        setTimeout(() => resolve("Promesa cumplida 🎉"), 3000);
    });

    promesa.then(mensaje => console.log(mensaje));
}

// 🔟 Módulos en JavaScript (Ejemplo básico)
function usarModulos() {
    console.log("🔟 Módulos:");
    console.log("Para usar módulos, crea archivos separados y usa `import/export`.");
}

// Ejecutar todas las funciones
mostrarTipos();
usarFunciones();
evaluarCondicional();
usarBucles();
manejarArrays();
usarObjetos();
ejecutarAsync();
usarClases();
usarPromesas();
usarModulos();
