
let secuenciaMaquina = [];
let secuenciaUsuario = [];
let secuenciaImagen = [];
let secuenciaVerificacion = [];
let secuenciaMaquinaAleatoria = [];

let aciertos = 0;
let intentos = 0;
let indiceCuadroA = 0;
let indiceCuadroB = 1;
let cuadrosGuardados = 2;
let segundos = 0;
let minutos = 0;
const NUMERO_IMAGENES = 8;


document.querySelector("#boton-empezar").onclick = empezar;

function empezar(){
    ocultarBoton();
    repartirCartas();
    mezclarCartas();
    contarTiempo();
    seleccionar();

}

function ocultarBoton(){
    document.querySelector('#boton-empezar').className = 'oculto';
}

function repartirCartas(){
    for(let i = 0; i < NUMERO_IMAGENES; i++){
        secuenciaMaquina[i] = `./src/imagenes/${i}.jpg`;
        if(i === 7){
            i = 0;
            for(let j = 8; j < 16; j++ ){
                
                secuenciaMaquina[j] = `./src/imagenes/${i}.jpg`;
                i = i + 1;
            }
        }
    }
}

function mezclarCartas(){
    secuenciaMaquinaAleatoria = secuenciaMaquina.sort(function () {
       return Math.random() - 0.5;
    });
}

function contarTiempo(){
    window.setInterval(function(){
        document.querySelector('#tiempo').innerHTML = `${minutos}${':'}${segundos}`;
        if(segundos === 59){
         segundos = 0;
         minutos++;
         }
        segundos++;
     },1000);
}

function seleccionar(){

    document.querySelectorAll(".cuadro").forEach(function($cuadro){
        $cuadro.onclick = entradaJugador;
    });
}

function entradaJugador(e){

    const $cuadro = e.target;
    if($cuadro.classList.contains('cuadro')){
        return;
    } else {
        const idCuadro = $cuadro.id;
        secuenciaVerificacion.push(idCuadro);
        
        if(secuenciaVerificacion.length === 2){
            
            if(secuenciaVerificacion[0] != secuenciaVerificacion[1]){

                voltearCarta($cuadro);
            }
            if(secuenciaVerificacion[0] === secuenciaVerificacion[1]){
                secuenciaVerificacion.pop();
                return;
            }
        }
        if(secuenciaVerificacion.length === 1){
        
            voltearCarta($cuadro);
        }
    }
}

function voltearCarta($cuadro){
    const idCuadro = $cuadro.id;
    const soloNumero = Number(idCuadro.replace(/[^0-9]+/g, ""));
    secuenciaUsuario.push(idCuadro);
    document.querySelector(`#${idCuadro}`).src=secuenciaMaquinaAleatoria[soloNumero];
    secuenciaImagen.push(document.querySelector(`#${idCuadro}`).src);
    compararCarta(secuenciaImagen, secuenciaUsuario);
}

function compararCarta(secuenciaImagen, secuenciaUsuario){
    if(secuenciaImagen.length === cuadrosGuardados){
        if(secuenciaImagen[indiceCuadroA] != secuenciaImagen[indiceCuadroB]){
            setTimeout(function(){
                mostrarContracara(secuenciaUsuario);
                incrementarIndiceCuadros();
                incrementarCuadrosGuardados();
                reiniciarVerificacion();
                intentos++;
            }, 1000);
        }
         if(secuenciaImagen[indiceCuadroA] === secuenciaImagen[indiceCuadroB]) {
            setTimeout(function(){
                incrementarIndiceCuadros();
                incrementarCuadrosGuardados();
                ocultarAciertos();
                reiniciarVerificacion();
            }, 1000);
            aciertos++;
            intentos++;
            finalizarJuego(aciertos);
            
        }
    }
}

function finalizarJuego(aciertos){
    if(aciertos === NUMERO_IMAGENES){
              
        mensajearFinDeJuego();
        ocultarTiempo();
    }
}

function ocultarAciertos(){
    secuenciaVerificacion.forEach(function(cuadro){
                
        document.querySelector(`#${cuadro}`).className = 'oculto';
    });
}

function reiniciarVerificacion(){
    secuenciaVerificacion = [];
}
function incrementarIndiceCuadros(){
    indiceCuadroA += 2;
    indiceCuadroB += 2;
}
function incrementarCuadrosGuardados(){
    cuadrosGuardados += 2;
}
function ocultarTiempo(){
    document.querySelector('#tiempo').className = 'oculto';
    document.querySelector('#tituloTiempo').className = 'oculto';
}
function mensajearFinDeJuego(){
    setTimeout(function(){
        document.querySelector('#finDeJuego').innerHTML = `<strong>Felicidades!! tardaste ${minutos}' ${':'} ${segundos}''</strong>`;
    }, 1000);
    
}
function mostrarContracara(secuenciaUsuario){
    document.querySelector(`#${secuenciaUsuario[indiceCuadroA]}`).src='./src/imagenes/playing-card-back.jpg';
    document.querySelector(`#${secuenciaUsuario[indiceCuadroB]}`).src='./src/imagenes/playing-card-back.jpg';
}
