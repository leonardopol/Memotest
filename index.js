
let secuenciaMaquina = [];
let secuenciaUsuario = [];
let guardarCarta = [];
let verificar = [];
let k = 0;
let barajarSecuenciaMaquina;
let aciertos = 0;
let intentos = 0;
let indiceCartaA = 0;
let indiceCartaB = 1;
let cartasGuardadas = 2;
let segundos = 0;
let minutos = 0;
const NUMERO_CARTAS = 8;
let prueba = [];

document.querySelector("#boton-empezar").onclick = empezar;

function empezar(){
    ocultarBoton();
    repartirCartas();
    mezclarCartas();
    contadorTiempo();
    seleccionar();

}

function ocultarBoton(){
    document.querySelector('#boton-empezar').className = 'oculto';
}

function repartirCartas(){
    for(let i = 0; i < NUMERO_CARTAS; i++){
        secuenciaMaquina[i] = `./imagenes/${i}.jpg`;
        if(i === 7){
            i = 0;
            for(let j = 8; j < 16; j++ ){
                
                secuenciaMaquina[j] = `./imagenes/${i}.jpg`;
                i = i + 1;
            }
        }
    }
}

function mezclarCartas(){
    barajarSecuenciaMaquina = secuenciaMaquina.sort(function () {
       return Math.random() - 0.5;
    });
}

function contadorTiempo(){
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
    const cuadro = $cuadro.id;
    verificar.push(cuadro);
    
    if(verificar.length === 2){
        if(verificar[0] != verificar[1]){

            voltearCarta($cuadro);
        }
        /*if(verificar[0] === verificar[1]){
            //verificar.pop();
            
            //secuenciaUsuario.pop();
            //guardarCarta.pop();
        }*/
    }
    if(verificar.length === 1){
       
        voltearCarta($cuadro);
    }
}

function voltearCarta($cuadro){
    const $carta = $cuadro.id;
    const soloNumero = Number($carta.replace(/[^0-9]+/g, ""));
    secuenciaUsuario.push($carta);
    document.querySelector(`#${$carta}`).src=barajarSecuenciaMaquina[soloNumero];
    guardarCarta.push(document.querySelector(`#${$carta}`).src);
    compararCarta(guardarCarta, secuenciaUsuario);
}

function compararCarta(guardarCarta, secuenciaUsuario){
    if(guardarCarta.length === cartasGuardadas){
        if(guardarCarta[indiceCartaA] != guardarCarta[indiceCartaB]){
            setTimeout(function(){
                document.querySelector(`#${secuenciaUsuario[indiceCartaA]}`).src='./imagenes/playing-card-back.jpg';
                document.querySelector(`#${secuenciaUsuario[indiceCartaB]}`).src='./imagenes/playing-card-back.jpg';
                indiceCartaA += 2;
                indiceCartaB += 2;
                cartasGuardadas += 2;
                verificar = [];
                
                intentos++;
            }, 1000);
        } else {
            setTimeout(function(){
            indiceCartaA += 2;
            indiceCartaB += 2;
            cartasGuardadas += 2;
            verificar.forEach(function(cuadro){
                
                document.querySelector(`#${cuadro}`).className = 'oculto';
            });
            verificar = [];
        }, 1000);
            aciertos++;
            intentos++;
            
            if(aciertos === 8){
                
                document.querySelector('#intentos').innerHTML = `Felicidades!! tardaste ${minutos}' ${':'} ${segundos}''`;
                document.querySelector('#tiempo').className = 'oculto';
                document.querySelector('#tituloTiempo').className = 'oculto';
            }
        }
    }
}

function bloquearUsuario(){
    document.querySelectorAll('.cuadro').forEach(function($cuadro) {
        $cuadro.onclick = function() {
            return;
        };
    });
}

function desbloquearUsuario() {
    document.querySelectorAll('.cuadro').forEach(function($cuadro) {
      $cuadro.onclick = entradaJugador;
    });
}
