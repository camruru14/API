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


//agregar nuevo registro

const modal = document.getElementById("modal-agregar");
const btnAgregar = document.getElementById("btnAbrirModal");
const btncerrar = document.getElementById("btnCerrarModal");

btnAgregar.addEventListener("click", () => {
    modal.showModal(); //abrir el modal al hacr click
});

btncerrar.addEventListener("click", () => {
    modal.close(); //Cerrar modal
})

//agregar nuevo integrante desde el formulario

document.getElementById("frmAgregar").addEventListener("submit", async e => {
    e.preventDefault();//e representa al evento submit, evita que el formulario se envie de golpe
    //Capturar los valores del formulario
    const nombre = document.getElementById("nombre").value.trim();
    const apellido = document.getElementById("apellido").value.trim();
    const email = document.getElementById("email").value.trim();
    const edad = document.getElementById("edad").value.trim();

    //Validacion basica
    if(!nombre || !apellido || !email || !edad){
        alert("Complete todos los campos");
        return;//Evitar que el formulario se envie
    }

    //llamar a la API
    const respuesta = await fetch(API_url, {
        method: "POST",
        headers: {'Content-Type' :'application/json'},
        body: JSON.stringify({nombre, apellido, email, edad})
    });

    if(respuesta.ok){
        alert("El registro fue agregado correctamente");

        //Limpiar el formulario y cerrar el modal
        document.getElementById("frmAgregar").reset();

        modal.close();

        //recargar la tabla
        obtenerPersona();
    }

    else{
        alert("Hubo un error al agregar");
    }

});