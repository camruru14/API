//url de la api
const API_url = "https://retoolapi.dev/zQs58v/data";
//funcion que manda a traer el JSON
async function obtenerPersona() {
    //Respuesta del servidor
    const res = await fetch(API_url)//Se hace una llamada al endpoint
    //Pasamos a JSON la respuesta del servidor
    const data = await res.json();

    //Enviamos el JSON que nos manda la API a la funcion que crea la tabla en HTML
    mostrarDatos(data);
}
function mostrarDatos(datos){
    //Se llama el tbody del elemnto con id tabla
    const tabla = document.querySelector('#tabla tbody')
    tabla.innerHTML = ' ';//vaciamos la tabla

    datos.forEach(Persona => {
        tabla.innerHTML += `
        <tr>
        <td>${Persona.id}</td>
        <td>${Persona.nombre}</td>
        <td>${Persona.apellido}</td>
        <td>${Persona.email}</td>
        <td>${Persona.edad}</td>
        <td>
            <button>Editar</button>
            <button>Elmiinar</button>
        </td>
        </tr>
        `
    });
}
//llamada incial para que se carguen los datos que vienen del servidor
obtenerPersona();