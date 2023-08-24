/*function empezar(){
    mostrar();
}*/
let secuenciaMaquina = [];
let secuenciaUsuario = [];
let guardarCarta = [];
let aciertos = 0;
let intentos = 0;
let indiceCartaA = 0;
let indiceCartaB = 1;
let cartasGuardadas = 2;
let segundos = 0;
let minutos = 0;
const NUMERO_CARTAS = 8;

//document.querySelector("#boton-empezar").onclick = empezar;

for(let i = 0; i < NUMERO_CARTAS; i++){
    secuenciaMaquina[i] = `./imagenes/${i}.avif`;
    if(i === 7){
        i = 0;
        for(let j = 8; j < 16; j++ ){
            
            secuenciaMaquina[j] = `./imagenes/${i}.avif`;
            i = i + 1;
        }
    }
}

let barajarSecuenciaMaquina = secuenciaMaquina.sort(function () {
    return Math.random() - 0.5;
  });

window.setInterval(function(){
   document.querySelector('#tiempo').innerHTML = `${minutos}${':'}${segundos}`;
   //document.querySelector('#minutos').innerHTML = `${minutos}`;
   if(segundos === 59){
    segundos = 0;
    minutos++;
    }
   segundos++;
},1000);

seleccionar();

function seleccionar(){
    document.querySelectorAll(".cuadro").forEach(function($cuadro){
        $cuadro.onclick = entradaJugador;
    });
}

function entradaJugador(e){
    
    const $cuadro = e.target;
    voltearCarta($cuadro);
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
                intentos++;
            }, 1000);
        } else {
            indiceCartaA += 2;
            indiceCartaB += 2;
            cartasGuardadas += 2;
            aciertos++;
            intentos++;
            if(aciertos === 8){
                
                document.querySelector('#intentos').innerHTML = `tardaste ${minutos} ${':'} ${segundos}`;
                document.querySelector('#tiempo').className = 'oculto';
                document.querySelector('#tituloTiempo').className = 'oculto';
            }
        }
    }
}
