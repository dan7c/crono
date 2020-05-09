let intervaloTempo = 10 //ms
let tempoDecorrido = 0;
//let tempoDecorridoAux = 0;
let segundos = 0;
let minutos = 0;
let idTemp;

function iniciarCronometro() {
  var playButton = document.getElementById("play");
  playButton.style.display = "none";
  var pauseButton = document.getElementById("pause");
  pauseButton.style.display = "inline-flex"
  var resetButton = document.getElementById("reset");
  resetButton.disabled = false;
  document.getElementById("volta").disabled = false

  idTemp = setInterval(() => {
    tempoDecorrido += intervaloTempo;
    //tempoDecorridoAux += intervaloTempo;

    let time = convertMin(tempoDecorrido);

    document.getElementById("tempo").innerHTML = time;
  }, intervaloTempo)
}

function convertMin(temp) {
  var min = '' + (Math.floor(temp / 1000 / 59))
  var sec = '' + (Math.floor((temp / 1000) % 59))
  var ms = '' + (temp % 1000)/10

  if (min.length == 1) {
    min = "0" + min
  }
  if (sec.length == 1) {
    sec = "0" + sec
  }
  if (ms.length == 1) {
    ms = "0" + ms
  }
  return (`${min}:${sec}:${ms}`)
}

function pausarCronometro() {
  document.getElementById("pause").style.display = "none";
  document.getElementById("play").style.display = "inline-flex";

  clearInterval(idTemp);
}



function zerarCronometro() {
  pausarCronometro();
  zerarVoltas();
  document.getElementById("volta").disabled = true;
  document.getElementById("reset").disabled = "true"
  tempoDecorrido = 0;
  tempoDecorridoAux = 0;
  minutos = 0;

  document.getElementById("tempo").innerHTML = "00:00:00"
}


let voltas = []
let voltaAnterior = 0;
let voltaMaisRapida;
function salvarVolta() {
  //add tempo na tabela
  voltas.push(tempoDecorrido)
  console.log(voltas)

  let tabela = document.getElementById("tbody");
  var row = tabela.insertRow(voltas.length - 1)
  var nVolta = row.insertCell(0)
  var tempoVolta = row.insertCell(1)
  var tempoTotal = row.insertCell(2)
  nVolta.innerHTML = voltas.length

  tempoVolta.innerHTML = convertMin(voltas[voltas.length - 1] - voltaAnterior)
  tempoTotal.innerHTML = convertMin(tempoDecorrido)



  //definir volta mais rapida
  let voltaAtual = voltas[voltas.length - 1];


  if (voltas.length == 1) {
    voltaMaisRapida = voltas[0]
    var maisRapida = row.insertCell(3)
    maisRapida.classList.add("rapida")
    maisRapida.innerHTML = "volta mais rapida!"
  }


  if ((voltaAtual - voltaAnterior) < voltaMaisRapida) {
    voltaMaisRapida = voltaAtual - voltaAnterior;
    //console.log(`nova volta mais rapida: ${voltas.indexOf(voltaAtual) + 1} . TEMPO: ${voltaMaisRapida}`)
    let tabela = document.getElementById("tbody");
    for (i = 0; i < voltas.length; i++) {
      if (tabela.rows[i].cells.length == 4) {
        tabela.rows[i].deleteCell(3);
      }
    }

    var maisRapida = row.insertCell(3)
    maisRapida.classList.add("rapida")
    maisRapida.innerHTML = "volta mais rapida!"
  }
  // console.log(`volta atual: ${convertMin(voltaAtual)} (${voltaAtual})`)
  // console.log(`volta anterior: ${convertMin(voltaAnterior)} (${voltaAnterior})`)
  // console.log(`volta mais rapida: ${convertMin(voltaMaisRapida)} (${voltaMaisRapida})`)
  voltaAnterior = tempoDecorrido;
}

function zerarVoltas() {
  let tabela = document.getElementById("tbody");
  for (i = 0; i < voltas.length; i++) {
    tabela.deleteRow(0)
  }
  voltaAnterior = 0
  voltas = []
}