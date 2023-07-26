/*function empezar(){
    mostrar();
}*/

mostrar();

function mostrar(){
    document.querySelectorAll(".cuadro").forEach(function($cuadro){
        $cuadro.onclick = entradaJugador;
    });
}

function entradaJugador(e){
    const $cuadro = e.target;
    console.log($cuadro);
}