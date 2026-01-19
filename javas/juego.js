/*  ------------------- Realizado por Vicente García
*   --- VARIABLES GLOBALES
*   tirada
*
*   --- FUNCIONES
*   register_name   >> Sirve para registrar al jugador
*   new_player      >> Cambio de jugador
*   oneselect       >> Seleccionar la apuesta
*   select          >> Activar la apuesta
*   jugar           >> Inicia el juego y activa las animaciones
*/

// Registrar un nuevo usuario
function register_name(player) {
    const qN = document.getElementById("questionName");
    qN.textContent = player.value.toUpperCase();
    contenedor.removeChild(document.getElementById("player_name"));
    contenedor.removeChild(document.getElementById("botonsub"));

}

function reset(){
    contenedor.appendChild(document.getElementById('player_name'));
    contenedor.appendChild(document.getElementById('botonsub'));
}

// al clicar sobre la imagen
function oneselect(player_bet) {
    // con 1 click transformamos la imagen y desactivamos la de las otras   
    switch (player_bet) {
        case 1: document.getElementById('bp').classList.add("selectable");
            document.getElementById('bs').classList.remove("selectable");
            document.getElementById('bt').classList.remove("selectable");
            break;
        case 2: document.getElementById('bs').classList.add("selectable");
            document.getElementById('bp').classList.remove("selectable");
            document.getElementById('bt').classList.remove("selectable");
            break;
        case 3: document.getElementById('bt').classList.add("selectable");
            document.getElementById('bp').classList.remove("selectable");
            document.getElementById('bs').classList.remove("selectable");
            break;
        default: alert('ERROR');
    }
}
// al seleccionar la imagen
function select(player_bet) {
    switch (player_bet) {
        case 1: document.getElementById('playerChoice').src = "images/papel.jpg";
            break;
        case 2: document.getElementById('playerChoice').src = "images/piedra.jpg";
            break;
        case 3: document.getElementById('playerChoice').src = "images/tijera.jpg";
            break;
        default: alert('ERROR');
    }
    jugar(player_bet);
}
var tirada = 0;
var empate = 0;
var victoria = 0;
var derrota = 0;
const sonidov = new Audio('sound/victory.mp3');
const sonidof = new Audio('sound/fail.mp3');

function jugar(player_bet) {
    // CPU coge una imagen al azar
    var cpu_bet = Math.floor(Math.random() * 3 + 1);
    switch (cpu_bet){
        case 1: betCPU = "images/papel.jpg";
        break;
        case 2: betCPU = "images/piedra.jpg";
        break;
        case 3: betCPU = "images/tijera.jpg";
        break;
    }
    // incrementa tirada
    tirada++;
    // Compara con Player y busca ganador
    // incrementa victorias, perdidas y empates
    // actualiza interfaz gráfica por unos segundos
    if (player_bet == cpu_bet) {
        empate++;
    } else if (player_bet == 3 && cpu_bet == 1 ||
        player_bet == 2 && cpu_bet == 3 ||
        player_bet == 1 && cpu_bet == 2) {
        victoria++;
        document.getElementById('playerChoice').src = "images/victory.gif";
        sonidov.play();
    } else {
        derrota++;
        document.getElementById('playerChoice').src = "images/losser.gif";
        sonidof.play();
    }
    // carga la imagen de la apuesta de la CPU
    document.getElementById('cpuChoice').src = betCPU;
    // actualiza los datos
    outBets.innerHTML = tirada;
    outWon.innerText = victoria;
    outLosses.innerText = derrota;
    outDraw.innerText = empate;
    // esperar 2 segundos a mostrar a los jugadores    
    setTimeout(() => {
        document.getElementById('playerChoice').src = "images/player.webp";
        document.getElementById('cpuChoice').src = "images/cpu.png";
    }, 2000);
    

}