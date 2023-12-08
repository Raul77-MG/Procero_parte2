//--------------------------------------------------------
//--------------- FUNCIONES ------------------------------
//--------------------------------------------------------

const botonCasa = document.getElementById('botonCasa');
const botonEdificio = document.getElementById('botonEdificio');
const casaFormulario = document.getElementById('casaFormulario');
const edificioFormulario = document.getElementById('edificioFormulario');
const anchoCasaInput = document.getElementById('ancho');
const largoCasaInput = document.getElementById('largo');
const posicionEscaleraCasaInput = document.getElementById('posicion_escalera');
const numPisosCasaInput = document.getElementById('num_pisos');
const anchoEdificioInput = document.getElementById('anchoEdificio');
const largoEdificioInput = document.getElementById('largoEdificio');
const posicionEscaleraEdificioInput = document.getElementById('posicion_escaleraEdificio');
const numPisosEdificioInput = document.getElementById('num_pisosEdificio');

botonCasa.addEventListener('click', function() {
    reiniciarValoresEdificio();
    casaFormulario.style.display = 'block';
    edificioFormulario.style.display = 'none';
    cambiandoNroPisos();
});

botonEdificio.addEventListener('click', function() {
    reiniciarValoresCasa();
    casaFormulario.style.display = 'none';
    edificioFormulario.style.display = 'block';
    cambiandoNroPisosEdificio();
});

function addChangeListeners() {
    anchoCasaInput.addEventListener('change', function() {
        
        cambiandoNroPisos();
       
    });
    largoCasaInput.addEventListener('change', function() {
        
        cambiandoNroPisos();
       
    });
    posicionEscaleraCasaInput.addEventListener('change', function() {
        
        cambiandoNroPisos();
        
    });

    
    anchoEdificioInput.addEventListener('change', function() {
        cambiandoNroPisosEdificio();
    });
    largoEdificioInput.addEventListener('change', function() {
        cambiandoNroPisosEdificio();
    });
    posicionEscaleraEdificioInput.addEventListener('change', function() {
        cambiandoNroPisosEdificio();
    });

    
}

addChangeListeners();

function reiniciarValoresCasa() {
    // Restablecer valores y ocultar elementos
    document.getElementById("num_pisos").value = "";
    document.getElementById("ancho").value = "";
    document.getElementById("largo").value = "";
    document.getElementById("posicion_escalera").value = "";

    const formulariosCasa = document.querySelectorAll("#casaFormulario .floor-form");
    formulariosCasa.forEach((formulario, index) => {
        formulario.style.display = "none";
        const imagen = document.getElementById(`imagen-${index}`);
        imagen.src = "";
        imagen.style.display = "none";
    });

    cambiandoNroPisos();
}

function reiniciarValoresEdificio() {
    // Restablecer valores y ocultar elementos
    document.getElementById("num_pisosEdificio").value = "";
    document.getElementById("anchoEdificio").value = "";
    document.getElementById("largoEdificio").value = "";
    document.getElementById("posicion_escaleraEdificio").value = "";

    const formulariosEdificio = document.querySelectorAll("#edificioFormulario .floor-formEdificio");
    formulariosEdificio.forEach((formulario, index) => {
        formulario.style.display = "none";
        const imagenEdificio = document.getElementById(`imagenEdificio-${index}`);
        imagenEdificio.src = "";
        imagenEdificio.style.display = "none";
    });

    cambiandoNroPisosEdificio();
}


//--------------------------------------------------------
//--------------- FUNCIONES CASA -------------------------
//--------------------------------------------------------
//================ Validar Ancho y Largo ================= 
function validarAnchoLargo() {
    var ancho = document.getElementById("ancho").value;
    var largo = document.getElementById("largo").value;

    if (parseInt(ancho) > parseInt(largo)) {
        alert("El largo debe ser mayor o igual al ancho");
        // document.getElementById("ancho").value = "";
    }
}
//================== Mostrar Plano =====================
function mostrarImagen(event, numeroPiso) {
    event.preventDefault();
    const getAncho = document.getElementById("ancho").value;
    const getLargo = document.getElementById("largo").value;
    const getEscalera = document.getElementById("posicion_escalera").value;

    const cuartos = document.getElementById(`cuartos-${numeroPiso}`).value;
    const banos = document.getElementById(`banos-${numeroPiso}`).value;
    const sala = document.getElementById(`sala-${numeroPiso}`).value;
    const comedor = document.getElementById(`comedor-${numeroPiso}`).value;
    const cocina = document.getElementById(`cocina-${numeroPiso}`).value;
    const terraza = document.getElementById(`terraza-${numeroPiso}`).value;
    const lavanderia = document.getElementById(`lavanderia-${numeroPiso}`).value;
    const cochera = document.getElementById(`cochera-${numeroPiso}`).value;
    const piscina = document.getElementById(`piscina-${numeroPiso}`).value;
    
    const caracteristicas = `${getAncho}_${getLargo}_${getEscalera}_${cuartos}_${banos}_${sala}_${comedor}_${cocina}_${terraza}_${lavanderia}_${cochera}_${piscina}`;
    console.log("características:", caracteristicas);

    const url = `https://procero.tech/wp-content/uploads/2023/12/${caracteristicas}.webp`;
    console.log(url);

    const imageContainer = document.getElementById(`imageContainer${numeroPiso}`);
    const imagen = document.getElementById(`imagen-${numeroPiso}`);
    imagen.onerror = function() {
        imageContainer.innerHTML="";
        imagen.style.display = "none";
        const errorMessage = document.createElement("p");
        errorMessage.textContent = "El plano solicitado aun no está disponible con las caracteristicas seleccionadas";
        // imageContainer.appendChild(errorMessage);
        
        const solicitarBtn = document.createElement("button");
        solicitarBtn.textContent = "Solicitar diseño";
        solicitarBtn.onclick = function() {
            // Aquí puedes colocar la lógica para solicitar el plano o lo que sea necesario
            alert("Solicitud enviada. Pronto nos pondremos en contacto contigo.");
        };

        const errorContainer = document.createElement("div");
        errorContainer.appendChild(errorMessage);
        errorContainer.appendChild(solicitarBtn);
        imageContainer.appendChild(errorContainer);
    };
    
    imagen.onload = function() {
        imageContainer.innerHTML="";
        imagen.style.display = "block";

        const personalizarBtn = document.createElement("button");
        personalizarBtn.textContent = "Personalizar plano";
        personalizarBtn.onclick = function() {
            // Aquí puedes colocar la lógica para personalizar el plano
            alert("Personalizar plano según tus preferencias(PASARELA DE PAGOS).");
        };

        imageContainer.appendChild(imagen);
        imageContainer.appendChild(personalizarBtn); // Agregar el botón de personalizar
    };

    imagen.src = url;
}

//=============== Generar formulario =================
function generarFormulario( numeroPiso) {
    const contenedor = document.createElement("div");
    contenedor.classList.add("floor-form");
    if (!contenedor) return console.error("floor-form no existe");
    
    const selectCuartosElement = `
        <label for="cuartos-${numeroPiso}">Cuartos:</label>
        <select id="cuartos-${numeroPiso}" onchange="mostrarImagen(event, ${numeroPiso})">
            <option value="2">2</option>s
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
        </select>
    `;

    const selectBanosElement =`
        <label for="banos-${numeroPiso}">Baños:</label>   
        <select id="banos-${numeroPiso}">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
        </select>
    `;

    const selectSalaElement = `
        <label for="sala-${numeroPiso}">Sala:</label> 
        <select id="sala-${numeroPiso}">
            <option value="si">Sí</option>
            <option value="no">No</option>
        </select>
    `;

    const selectComedorElement = `
        <label for="comedor-${numeroPiso}">Comedor:</label> 
        <select id="comedor-${numeroPiso}">
            <option value="si">Sí</option>
            <option value="no">No</option>
        </select>
    `;

    const selectCocinaElement = `
        <label for="cocina-${numeroPiso}">Cocina:</label> 
        <select id="cocina-${numeroPiso}">
            <option value="si">Sí</option>
            <option value="no">No</option>
        </select>
    `;
    const selectTerrazaElement = (numeroPiso === 0) ? `
        <label for="terraza-${numeroPiso}">Terraza:</label> 
        <select id="terraza-${numeroPiso}">
            <option value="no">No</option>
        </select>
    ` : `
        <label for="terraza-${numeroPiso}">Terraza:</label> 
        <select id="terraza-${numeroPiso}">
            <option value="si">Sí</option>
            <option value="no">No</option>
        </select>
    `;

    const selectLavanderiaElement = `
        <label for="lavanderia-${numeroPiso}">Lavanderia:</label> 
        <select id="lavanderia-${numeroPiso}">
            <option value="si">Sí</option>
            <option value="no">No</option>
        </select>
    `;
    const selectCocheraElement = (numeroPiso === 0) ? `
        <label for="cochera-${numeroPiso}">Cochera:</label> 
        <select id="cochera-${numeroPiso}">
            <option value="si">Sí</option>
            <option value="no">No</option>
        </select>
    ` : `
        <label for="cochera-${numeroPiso}">Cochera:</label> 
        <select id="cochera-${numeroPiso}">
            <option value="no">No</option>
        </select>
    `;
    const selectPiscinaElement = (numeroPiso === 0) ? `
        <label for="piscina-${numeroPiso}">Piscina:</label> 
        <select id="piscina-${numeroPiso}">
            <option value="si">Sí</option>
            <option value="no">No</option>
        </select>
    ` : `
        <label for="piscina-${numeroPiso}">Piscina:</label> 
        <select id="piscina-${numeroPiso}">
            <option value="no">No</option>
        </select>
    `;
    const generarPlanoBtn = `
    <button id="btn-${numeroPiso}" class="custom-boton" onclick="mostrarImagen(event, ${numeroPiso})">Generar Plano</button>

    `;
   
    contenedor.innerHTML = `
    <h2>Piso: ${numeroPiso+1}</h2>
        ${selectCuartosElement}
        ${selectBanosElement}
        ${selectSalaElement}
        ${selectComedorElement}
        ${selectCocinaElement}
        ${selectTerrazaElement}
        ${selectLavanderiaElement}
        ${selectCocheraElement}
        ${selectPiscinaElement}
        ${generarPlanoBtn}
        
    `;
   return contenedor;
}


function generarImagenContainer(numeroPiso) {
    const imageContainer = document.createElement("div");
    imageContainer.classList.add("image-container");
    
    const planoPisoElement = ` 
    <div class="image-container" id="imageContainer${numeroPiso}">
        <h2>Plano del piso: ${numeroPiso + 1}</h2>
        <img id="imagen-${numeroPiso}" style="display: none;">
    </div>
    `;
    imageContainer.innerHTML = `
        ${planoPisoElement}
    `;
    return imageContainer;
}
function ocultarImagen(numeroPiso) {
    const imagen = document.getElementById(`imageContainer${numeroPiso}`);
    if (imagen) {
        imagen.style.display = 'none';
    }
}
//=============== Cambiando el numero de pisos =================
const selectPisos = document.getElementById("num_pisos");

function cambiandoNroPisos() {
    const numeroPisos = Number.parseInt(selectPisos.value);

    const pisoForm = document.getElementById("containerForm");
    if (!pisoForm) return console.error("containerForm no existe");

    pisoForm.innerHTML = '';

    for (let i = 0; i < numeroPisos; i++) {
        const formulario = generarFormulario(i);
        const imagenContainer = generarImagenContainer(i);

        const floorContainer = document.createElement("div");
        floorContainer.classList.add("floor");

        floorContainer.appendChild(formulario);
        floorContainer.appendChild(imagenContainer);

        pisoForm.appendChild(floorContainer);
        pisoForm.style.display='none';
    }

    const selectEscalera = document.getElementById("posicion_escalera");
    if (numeroPisos === 1) {
        selectEscalera.innerHTML = '<option value="ND">No disponible</option>';
    } else {
        selectEscalera.innerHTML = `
            <option value="adelante">Adelante</option>
            <option value="medio">Medio</option>
            <option value="fondo">Fondo</option>
        `;
    }

    
}


function start() {
    const selectPisos = document.getElementById("num_pisos");
    if (!selectPisos) return console.error("el selectPisos no existe");
    selectPisos.addEventListener("change", cambiandoNroPisos);

    const selectPisosEdificio = document.getElementById("num_pisosEdificio");
    if (!selectPisosEdificio) return console.error("el selectPisosEdificio no existe");
    selectPisosEdificio.addEventListener("change", cambiandoNroPisosEdificio);
}
start();
//================= muestra las opciones de inicio ================
function mostrarOpciones(event) {
    var numPisos = document.getElementById("num_pisos").value;
    var ancho = document.getElementById("ancho").value;
    var largo = document.getElementById("largo").value;
    var posicionEscalera = document.getElementById("posicion_escalera").value;

    if (numPisos !== "" && ancho !== "" && largo !== "" && posicionEscalera !== "") {
        var container = document.getElementById("containerForm");
        container.style.display = "block";
    } else {
        alert("Por favor completa el número de pisos, ancho, largo y posición de la escalera antes de agregar mas caracteristicas.");
    }

    // Detener el comportamiento predeterminado del botón
    event.preventDefault();
}

//--------------------------------------------------------
//--------------- FUNCIONES EDIFICIO ---------------------
//--------------------------------------------------------
//================ Validar Ancho y Largo ================= 
function validarAnchoLargoEdificio() {
    var ancho = document.getElementById("anchoEdificio").value;
    var largo = document.getElementById("largoEdificio").value;

    if (parseInt(ancho) > parseInt(largo)) {
        alert("El largo debe ser mayor o igual al ancho");
        // document.getElementById("ancho").value = "";
    }
}
//================== Mostrar Plano =====================
function mostrarImagenEdificio(event, numeroPiso) {
    event.preventDefault();
    const getAnchoEdificio = document.getElementById("anchoEdificio").value;
    const getLargoEdificio = document.getElementById("largoEdificio").value;
    const getEscaleraEdificio = document.getElementById("posicion_escaleraEdificio").value;

    const cuartosEdificio = document.getElementById(`cuartosEdificio-${numeroPiso}`).value;
    const banosEdificio = document.getElementById(`banosEdificio-${numeroPiso}`).value;
    const salaEdificio = document.getElementById(`salaEdificio-${numeroPiso}`).value;
    const comedorEdificio = document.getElementById(`comedorEdificio-${numeroPiso}`).value;
    const cocinaEdificio = document.getElementById(`cocinaEdificio-${numeroPiso}`).value;
    const terrazaEdificio = document.getElementById(`terrazaEdificio-${numeroPiso}`).value;
    const lavanderiaEdificio = document.getElementById(`lavanderiaEdificio-${numeroPiso}`).value;
    const cocheraEdificio = document.getElementById(`cocheraEdificio-${numeroPiso}`).value;
    const piscinaEdificio = document.getElementById(`piscinaEdificio-${numeroPiso}`).value;
    

    const caracteristicasEdificio = `${getAnchoEdificio}_${getLargoEdificio}_${getEscaleraEdificio}_${cuartosEdificio}_${banosEdificio}_${salaEdificio}_${comedorEdificio}_${cocinaEdificio}_${terrazaEdificio}_${lavanderiaEdificio}_${cocheraEdificio}_${piscinaEdificio}`;
    console.log("características:", caracteristicasEdificio);

   const urlEdificio = `https://procero.tech/wp-content/uploads/2023/12/${caracteristicasEdificio}.webp`;
    console.log(urlEdificio);

    const imageContainer = document.getElementById(`imageContainerEdificio${numeroPiso}`);
    const imagenEdificio = document.getElementById(`imagenEdificio-${numeroPiso}`);

    imagenEdificio.onerror = function() {
        imageContainer.innerHTML="";

        imagenEdificio.style.display = "none";
        const errorMessage = document.createElement("p");
        errorMessage.textContent = "El plano solicitado aun no está disponible con las caracteristicas seleccionadas";
        // imageContainer.appendChild(errorMessage);

        const solicitarBtn = document.createElement("button");
        solicitarBtn.textContent = "Solicitar diseño";
        solicitarBtn.onclick = function() {
            // Aquí puedes colocar la lógica para solicitar el plano o lo que sea necesario
            alert("Solicitud enviada. Pronto nos pondremos en contacto contigo.");
        };

        const errorContainer = document.createElement("div");
        errorContainer.appendChild(errorMessage);
        errorContainer.appendChild(solicitarBtn);

        imageContainer.appendChild(errorContainer);
    };
    
    imagenEdificio.onload = function() {
        imageContainer.innerHTML="";
        imagenEdificio.style.display = "block";

        const personalizarBtn = document.createElement("button");
        personalizarBtn.textContent = "Personalizar plano";
        personalizarBtn.onclick = function() {
            // Aquí puedes colocar la lógica para personalizar el plano del edificio
            alert("Personalizar plano del edificio según tus preferencias(PASARELA DE PAGOS).");
        };

        imageContainer.appendChild(imagenEdificio);
        imageContainer.appendChild(personalizarBtn); // Agregar el botón de personalizar
    };

    imagenEdificio.src = urlEdificio;
}

//=============== Generar formulario =================
function generarFormularioEdificio( numeroPiso) {
    const contenedor = document.createElement("div");
    contenedor.classList.add("floor-formEdificio");
    if (!contenedor) return console.error("floor-formEdificio no existe");
    const selectCuartosElement = `
        <label for="cuartosEdificio-${numeroPiso}">Cuartos:</label>
        <select id="cuartosEdificio-${numeroPiso}">
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
        </select>
    `;

    const selectBanosElement =`
        <label for="banosEdificio-${numeroPiso}">Baños:</label>   
        <select id="banosEdificio-${numeroPiso}">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
        </select>
    `;

    const selectSalaElement = `
        <label for="salaEdificio-${numeroPiso}">Sala:</label> 
        <select id="salaEdificio-${numeroPiso}">
            <option value="si">Sí</option>
            <option value="no">No</option>
        </select>
    `;

    const selectComedorElement = `
        <label for="comedorEdificio-${numeroPiso}">Comedor:</label> 
        <select id="comedorEdificio-${numeroPiso}">
            <option value="si">Sí</option>
            <option value="no">No</option>
        </select>
    `;

    const selectCocinaElement = `
        <label for="cocinaEdificio-${numeroPiso}">Cocina:</label> 
        <select id="cocinaEdificio-${numeroPiso}">
            <option value="si">Sí</option>
            <option value="no">No</option>
        </select>
    `;
    const selectTerrazaElement = (numeroPiso === 0) ? `
        <label for="terrazaEdificio-${numeroPiso}">Terraza:</label> 
        <select id="terrazaEdificio-${numeroPiso}">
            <option value="no">No</option>
        </select>
    ` : `
        <label for="terrazaEdificio-${numeroPiso}">Terraza:</label> 
        <select id="terrazaEdificio-${numeroPiso}">
            <option value="si">Sí</option>
            <option value="no">No</option>
        </select>
    `;

    const selectLavanderiaElement = `
        <label for="lavanderiaEdificio-${numeroPiso}">Lavanderia:</label> 
        <select id="lavanderiaEdificio-${numeroPiso}">
            <option value="si">Sí</option>
            <option value="no">No</option>
        </select>
    `;
    const selectCocheraElement = (numeroPiso === 0) ? `
        <label for="cocheraEdificio-${numeroPiso}">Cochera:</label> 
        <select id="cocheraEdificio-${numeroPiso}">
            <option value="si">Sí</option>
            <option value="no">No</option>
        </select>
    ` : `
        <label for="cocheraEdificio-${numeroPiso}">Cochera:</label> 
        <select id="cocheraEdificio-${numeroPiso}">
            <option value="no">No</option>
        </select>
    `;
    const selectPiscinaElement =  `
        <label for="piscinaEdificio-${numeroPiso}">Piscina:</label> 
        <select id="piscinaEdificio-${numeroPiso}">
            <option value="no">No</option>
        </select>
    `;
    const generarPlanoBtn = `
    <button id="btnEdificio-${numeroPiso}" class="custom-boton" onclick="mostrarImagenEdificio(event, ${numeroPiso})" >Generar Plano</button>

    `;
    
    contenedor.innerHTML = `
    <h2>Piso: ${numeroPiso+1}</h2>
        ${selectCuartosElement}
        ${selectBanosElement}
        ${selectSalaElement}
        ${selectComedorElement}
        ${selectCocinaElement}
        ${selectTerrazaElement}
        ${selectLavanderiaElement}
        ${selectCocheraElement}
        ${selectPiscinaElement}
        ${generarPlanoBtn}
        
    `;
   return contenedor;
}

function generarImagenContainerEdificio(numeroPiso) {
    const imageContainer = document.createElement("div");
    imageContainer.classList.add("image-containerEdificio");
    // Generar elementos del contenedor de imagen...
    const planoPisoElement = ` 
        <div class="image-container" id="imageContainerEdificio${numeroPiso}">
            <h2>Plano del piso: ${numeroPiso + 1}</h2>
            <img id="imagenEdificio-${numeroPiso}" style="display: none;">
        </div>
    `;
    imageContainer.innerHTML = `
        ${planoPisoElement}
    `;
    return imageContainer;
}
function ocultarElementos(numeroPiso) {
    const imagen = document.getElementById(`imagen-${numeroPiso}`);
    if (imagen) {
        imagen.style.display = 'none';
    }

    const personalizarBtn = document.getElementById(`btn-${numeroPiso}`);
    if (personalizarBtn) {
        personalizarBtn.style.display = 'none';
    }

    const solicitarBtn = document.getElementById(`solicitar-${numeroPiso}`);
    if (solicitarBtn) {
        solicitarBtn.style.display = 'none';
    }
}

//=============== Cambiando el numero de pisos =================
const selectPisosEdificio = document.getElementById("num_pisosEdificio");


function cambiandoNroPisosEdificio() {
    const numeroPisosEdificio = Number.parseInt(selectPisosEdificio.value);

    const pisoFormEdificio = document.getElementById("containerFormEdificio");
    if (!pisoFormEdificio) return console.error("containerFormEdificio no existe");

    pisoFormEdificio.innerHTML = '';

    for (let i = 0; i < numeroPisosEdificio; i++) {
        const formularioEdificio = generarFormularioEdificio(i);
        const imagenContainerEdificio = generarImagenContainerEdificio(i);

        const floorContainerEdificio = document.createElement("div");
        floorContainerEdificio.classList.add("floor");

        floorContainerEdificio.appendChild(formularioEdificio);
        floorContainerEdificio.appendChild(imagenContainerEdificio);

        pisoFormEdificio.appendChild(floorContainerEdificio);
        pisoFormEdificio.style.display='none';
    }

    const selectEscaleraEdificio = document.getElementById("posicion_escaleraEdificio");
    if (numeroPisosEdificio === 1) {
        selectEscaleraEdificio.innerHTML = '<option value="ND">No disponible</option>';
    } else {
        selectEscaleraEdificio.innerHTML = `
            <option value="adelante">Adelante</option>
            <option value="medio">Medio</option>
            <option value="fondo">Fondo</option>
        `;
    }
}

function mostrarOpcionesEdificio(event) {
    var numPisosEdificio = document.getElementById("num_pisosEdificio").value;
    var anchoEdificio = document.getElementById("anchoEdificio").value;
    var largoEdificio = document.getElementById("largoEdificio").value;
    var posicionEscaleraEdificio = document.getElementById("posicion_escaleraEdificio").value;

    if (numPisosEdificio !== "" && anchoEdificio !== "" && largoEdificio !== "" && posicionEscaleraEdificio !== "") {
        var containerEdificio = document.getElementById("containerFormEdificio");
        containerEdificio.style.display = "block";
    } else {
        alert("Por favor completa el número de pisos, ancho, largo y posición de la escalera antes de agregar mas caracteristicas.");
    }

    // Detener el comportamiento predeterminado del botón
    event.preventDefault();
}

//================  boton salir =================

// Obtener el botón salir
const botonSalir = document.getElementById("botonSalir");

// Asignar la función al hacer clic en el botón
botonSalir.addEventListener("click", function() {
    // Limpiar los campos
    document.getElementById("num_pisos").value= "";
    document.getElementById("ancho").value = "";
    document.getElementById("largo").value = "";
    document.getElementById("posicion_escalera").value = "";

    document.getElementById("num_pisosEdificio").value= "";
    document.getElementById("anchoEdificio").value = "";
    document.getElementById("largoEdificio").value = "";
    document.getElementById("posicion_escaleraEdificio").value = "";
    // Ocultar los elementos de formulario y las imágenes de Casa
    const formulariosCasa = document.querySelectorAll("#casaFormulario .floor-form");
    formulariosCasa.forEach((formulario, index) => {
        formulario.style.display = "none";
        const imagen = document.getElementById(`imagen-${index}`);
        imagen.src = "";
        imagen.style.display = "none";
    });

    // Ocultar los elementos de formulario y las imágenes de Edificio
    const formulariosEdificio = document.querySelectorAll("#edificioFormulario .floor-formEdificio");
    formulariosEdificio.forEach((formulario, index) => {
        formulario.style.display = "none";
        const imagenEdificio = document.getElementById(`imagenEdificio-${index}`);
        imagenEdificio.src = "";
        imagenEdificio.style.display = "none";
    });

    // Ocultar los contenedores principales de Casa y Edificio
    document.getElementById("casaFormulario").style.display = "none";
    document.getElementById("edificioFormulario").style.display = "none";
});

