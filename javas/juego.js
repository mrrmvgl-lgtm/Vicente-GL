/*  ------------------- Realizado por Vicente García
*
*   --- FUNCIONES
*   register_name   >> Sirve para registrar al jugador
*   new_player      >> Cambio de jugador
*   oneselect       >> Seleccionar la apuesta
*   select          >> Activar la apuesta
*   jugar           >> Inicia el juego y activa las animaciones
*   barChart        >> Dibuja el gráfico de puntuación por jugador
*
*/

// Registrar un nuevo usuario
var nowUser = "";
function register_name(player) {
    const qN = document.getElementById("questionName");
    if (player.value == "") {
                player.value = "fool";  // Si no pones tu nombre sale esto
    }
    // Comprobar que no nos pasamos de 5 jugadores diferentes
    if(xValues.length > 4){
        for(let i in xValues){
            if(xValues[i] == player.value.toUpperCase()){
                   // si existe el nombre, sigue
                qN.textContent = player.value.toUpperCase();
                nowUser = player.value.toUpperCase();
                contenedor.removeChild(document.getElementById("player_name"));
                contenedor.removeChild(document.getElementById("botonsub"));
            }
        }
    } else {
        qN.textContent = player.value.toUpperCase();
        nowUser = player.value.toUpperCase();
        contenedor.removeChild(document.getElementById("player_name"));
        contenedor.removeChild(document.getElementById("botonsub"));
    }
}

function reset() {
    // Volver a colocar la etiqueta
    const qT = document.getElementById("questionName");
    if (qT.textContent == "Player") { return; }
    // Seguimos si estamos introduciendo un nuevo nombre
    qT.textContent = "Player";
    // Añadir los campos eliminados previamente
    const nuevoInput = document.createElement('input');
    nuevoInput.id = "player_name";
    nuevoInput.type = "text";
    nuevoInput.classList.add("centrado");
    nuevoInput.maxLength = "10";
    nuevoInput.required;
    nuevoInput.pattern = "^[a-zA-Z]+$";
    nuevoInput.placeholder = "your name";
    contenedor.appendChild(nuevoInput);

    const nuevoBoton = document.createElement('input');
    nuevoBoton.id = "botonsub";
    nuevoBoton.type = "submit";
    nuevoBoton.classList.add("boton");
    nuevoBoton.value = "Submit";
    nuevoBoton.addEventListener('click', function () {
        register_name(player_name);
    });
    contenedor.appendChild(nuevoBoton);

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
    switch (cpu_bet) {
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
    const resultado = [ [0, 1, -1],
                        [-1, 0, 1],
                        [1, -1, 0]
    ];  
    var ganador = resultado[player_bet-1][cpu_bet-1];
    switch (ganador){    // jugador >> fila / CPU >> columna
        case 0  :   empate++;
                    empB = true;            // lo usamos en BBDD
                    break;
        case 1  :   victoria++;   
                    victB = true;           // lo usamos en BBDD
                    document.getElementById('playerChoice').src = "images/victory.gif";
                    sonidov.play();
                    break;
        case -1 :   derrota++;
                    document.getElementById('playerChoice').src = "images/losser.gif";
                    sonidof.play();
                    break;
        default :
    }
    // carga la imagen de la apuesta de la CPU
    document.getElementById('cpuChoice').src = betCPU;
    // actualiza los datos
    outBets.innerHTML = tirada;
    outWon.innerText = victoria;
    outLosses.innerText = derrota;
    outDraw.innerText = empate;
    barChart();
    // esperar 2 segundos a mostrar a los jugadores    
    setTimeout(() => {
        document.getElementById('playerChoice').src = "images/player.webp";
        document.getElementById('cpuChoice').src = "images/cpu.png";
    }, 2000);
}
    // Ejes Bar Chart
    const xValues = []; //  Nombre de los jugadores
    const yValues = [0,0,0,0,0]; // Porcentaje de victorias
    // variables para cálculos
    const betp = [0,0,0,0,0];    // Tiradas
    const winp = [0,0,0,0,0];    // Ganadas
    const drap = [0,0,0,0,0];    // Empates
        // El cálculo será la división de las tiradas ganadoras entre las tiradas totales
    const barColors = ["red", "white", "blue", "orange", "brown"]; // Colores de los diferentes jugadores
    var victB = false;
    var empB = false;
    var yaexiste = true;
    var espesorLinea = 30;

function barChart(){
    // Creamos la tabla con la primera tirada
    var index = xValues.length;
    console.log(index);
    if(index == 0){
        index = 0;
        xValues.push(nowUser); //  Creamos un nuevo valor
    } else {
        // buscamos la coincidencia con la BBDD
        for(let i in xValues){
            if(xValues[i] == nowUser){
                index = i;   // si existe el nombre, se coge el índice
                yaexiste = true; break;
            } else { yaexiste = false; }
        } 
        if(!yaexiste) {
                index = xValues.length; 
                xValues.push(nowUser);  // si no existe el nombre, se crea
                yaexiste = true;   
        }  
    }
    // Incrementamos los arrays
    betp[index]++;
    if(victB){
        winp[index]++;    
        victB = false;
    }
    if(empB){
        drap[index]++;
        empB = false;
    }
    // Cálculo de la puntuación
    yValues[index] = ((winp[index]*100+drap[index]*50)/betp[index]).toFixed(0); 

    // Gráficos
    const lienzo = document.getElementById('playerChart');
    // Player 1
    const lin00 = new Linea(30,120,30,120-yValues[0],barColors[0],espesorLinea); 
    lin00.borrarLinea(lienzo);      // colorFondo = "#008b38";
    lin00.pintarLinea(lienzo);
    // Player 2
    const lin01 = new Linea(30*2,120,30*2,120-yValues[1],barColors[1],espesorLinea); 
    lin01.borrarLinea(lienzo);
    lin01.pintarLinea(lienzo);
    // Player 3
    const lin02 = new Linea(30*3,120,30*3,120-yValues[2],barColors[2],espesorLinea); 
    lin02.borrarLinea(lienzo);
    lin02.pintarLinea(lienzo);
    // Player 4
    const lin03 = new Linea(30*4,120,30*4,120-yValues[3],barColors[3],espesorLinea); 
    lin03.borrarLinea(lienzo);
    lin03.pintarLinea(lienzo);
    // Player 5
    const lin04 = new Linea(30*5,120,30*5,120-yValues[4],barColors[4],espesorLinea); 
    lin04.borrarLinea(lienzo);
    lin04.pintarLinea(lienzo);
    // Nombre de los jugadores con su respectivo color
    const qR = document.getElementById("leyenda");
    var todosNombres = "";
    var inc = 0;
    for(let tN of xValues){
        todosNombres += '<span style="color:'+barColors[inc]+'">'+tN+'</span>';
        todosNombres += '-';
        inc++;
    }
    todosNombres = todosNombres.slice(0, -1);   // Borramos el último guión
    qR.innerHTML = todosNombres;
}