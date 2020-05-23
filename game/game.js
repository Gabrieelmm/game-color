var divGame = document.getElementById('game');
var header = document.getElementById('header')
var divButtons = document.getElementById('buttons')
var painelPts = document.getElementById('points')
var painelTimer = document.getElementById('time')
var msg = document.getElementById('msg')
var btnPlay = document.getElementById('btnPlay')

var listColors = ['green','orange','pink','blue','yellow','red']

var modalBox = document.getElementById('modal')
var bgModal = document.getElementById('bgModal')
var contentModal = document.getElementById('contentModal')
var buttonModal = document.getElementById('buttonModal')
var buttonRanking = document.getElementById('buttonRanking')
var buttonClose = document.getElementById('buttonClose')
var tituloModal = document.getElementById('tituloModal')
var ptsModal = document.getElementById('ptsModal')
var timerModal = document.getElementById('timerModal')

var time = document.getElementById('time')


var ptsTemp = 0;
var pts = 0;
var  list = [];
var corretas = [];
var listDivs = [];

var timer = [0,0,0];

var s = 0;
var m = 0;
var h = 0;

var listRank = JSON.parse(localStorage.getItem('ranking')) || []


function relogio() {
    
    if (s == 60) {
        s = 0
        if ( m != 60){
            m += 1
        }
        
        if(m < 60) {
            if (m < 10) {
            timer[1] = '0' + m
            } else {
            timer[1] = m
            } 
        } else if (m == 60){
            m = 0;
            h += 1;
            timer[1] = '0' + m
            if (h < 10) {
                timer[0] = '0' + h
               } else {
                timer[0] = h
               }
            
               if( h == 24) {
                relogioStop()
               }
        }
    }
       
    if( s < 10) {
        timer[2] = '0' + s
    } else {
        timer[2] = s
    }
    
    s += 1;
    if (s < 60 && m == 0) {
        time.innerHTML = `00:00:${timer[2]}`
    } else if (m < 90 && h ==0) {
        time.innerHTML = `00:${timer[1]}:${timer[2]}`
    } else {
        time.innerHTML = `${timer[0]}:${timer[1]}:${timer[2]}`

    }
}


var int;
function relogioStart() {
    int = setInterval(relogio,1000)
}

function relogioStop() {
    clearInterval(int)
}


const div = {
    bg: listColors[Math.floor(Math.random() * 5) + 1],
    class:function(e) {
        e.setAttribute('class','teste')
    },
    mudar:function(e,c) {
        e.onclick = () => {
            if (c == 1) {
                e.style.backgroundColor = 'white';
                e.style.pointerEvents = "none";
                ptsTemp += 10;
                pts += 10;
                painelPts.innerHTML = pts;
            } else {
                //e.style.backgroundColor = 'white';
                e.style.pointerEvents = "none";
                tituloModal.innerHTML = 'Você perdeu.'
                buttonModal.innerHTML = 'Reiniciar';
                ptsModal.innerHTML = pts
                timerModal.innerHTML = `${timer[0]}:${timer[1]}:${timer[2]}`
                buttonModal.onclick = restart;
                buttonClose.style.display = 'none'
                bgModal.onclick = null
                buttonRanking.style.display = 'block'
                relogioStop()
                openModal()
            }
            
        }
    }
}


function criar(n) {
    let c = 0;
    while(c < n) {
        list.push(div)
        c += 1;
    }
}

function config() {
    corretas = [];
    header.style.backgroundColor = listColors[Math.floor(Math.random() * 5) + 1];
    document.body.style.backgroundColor = header.style.backgroundColor
    for (i  of list) {
        let c;
        //console.log(i)
        var d = document.createElement('div')
        d.style.backgroundColor = listColors[Math.floor(Math.random() * 5) + 1];
        i.class(d)
        if (d.style.backgroundColor == header.style.backgroundColor) {
            c = 1;
            corretas.push(i)
            //console.log('SIM');
        } else {
            c = 0;
            //console.log('NÃO');
        }
            
        i.mudar(d,c)
        listDivs.push(d)
    }
    
}

function render() {
    var c = 0;
    while(corretas.length < 4) {
        listDivs = [];
        config()
        c += 1;
        console.log(c)
    }
    for (l of listDivs) {
        divGame.appendChild(l)
    }
    list = [];
    listDivs = [];
    
}  

function start() {
    divButtons.style.display = 'block'
    btnPlay.style.display = 'none'; 
    ptsTemp = 0
    console.clear()
    corretas = []
    divGame.innerHTML = "";
    relogioStart()
    criar(98)
    config()
    render()
}

function verificar() {
    if(ptsTemp === corretas.length * 10) {
        btnPlay.style.display = 'none'; 
        ptsTemp = 0
        console.clear()
        corretas = []
        divGame.innerHTML = "";
        criar(98)
        config()
        render()
    }
}

function openModal() {
    modalBox.style.display = "block";
}

function closeModal() {
    modalBox.style.display = "none";
}

function restart() {
    pts = 0;
    ptsTemp = 0;
    painelPts.innerHTML = ''
    relogioStop()
    s = 0
    h = 0
    m = 0
    timer = [0,0,0]
    time.innerHTML = `00:00:00`
    closeModal()
    start()
}

function fechar() {
    window.close()
}

divGame.addEventListener('click',verificar)

function continuar() {
    modalBox.style.display = "none";
    relogioStart()
}

function pause() {
    relogioStop()
    buttonModal.innerHTML = 'CONTINUAR'
    buttonModal.onclick = continuar
    bgModal.onclick = null
    buttonRanking.style.display = 'none'
    ptsModal.innerHTML = pts
    timerModal.innerHTML = `${timer[0]}:${timer[1]}:${timer[2]}`
    tituloModal.innerHTML = ''
    buttonClose.style.display = 'none'
    openModal()

}

function ranking() {
    var itemRank = {pontos:'',tempo:''}
    itemRank.pontos = painelPts.textContent
    itemRank.tempo = painelTimer.textContent
    listRank.push(itemRank);
    localStorage.setItem('ranking',JSON.stringify(listRank))
    mostrarRanking()
}

function mostrarRanking() {
    contentModal.innerHTML = '';
    let titulo = document.createElement('h2')
    let tituloTxt = document.createTextNode('Ranking')
    titulo.setAttribute('id','tr')
    titulo.appendChild(tituloTxt)
    contentModal.appendChild(titulo)

    let home = document.createElement('a')
    let homeTxt = document.createTextNode('X')
    home.appendChild(homeTxt)
    home.setAttribute('href','../index.html')
    home.setAttribute('class','close')
    contentModal.appendChild(home)
    let ordPts = [];
    let tim = listRank.map(function(e){return e.pontos});
    function decr (pr1, pr2){
        return pr2 - pr1;
    }
    for(l of listRank) {
        ordPts.push(l.pontos)
        tim.push(l.tempo)
    }


    var tabela = document.createElement('table')
    var indiceTabela = document.createElement('tr')
    indiceTabela.setAttribute('class','indice')

    var pontoTabela = document.createElement('td')
    var pontoTabelaTxt  = document.createTextNode('Pontos')

    var tempoTabela = document.createElement('td')
    var tempoTabelaTxt = document.createTextNode('Tempo')

    pontoTabela.setAttribute('class','esq')
    pontoTabela.appendChild(pontoTabelaTxt)
    indiceTabela.appendChild(pontoTabela)


    tempoTabela.appendChild(tempoTabelaTxt)
    indiceTabela.appendChild(tempoTabela)

    tabela.appendChild(indiceTabela)

    contentModal.appendChild(tabela)

    var ordDecr = ordPts.sort(decr)
    for (i of ordDecr){
    
        var cont = tim.indexOf(String(i)) 
  
        var corporTabela = document.createElement('tr')
        
        var pontoElement = document.createElement('td')
        var pontoElementTxt = document.createTextNode(i)
        pontoElement.appendChild(pontoElementTxt)
        

        var tempoElement = document.createElement('td')
        var tempoElementTxt = document.createTextNode(listRank[cont].tempo)
        tempoElement.appendChild(tempoElementTxt)

        corporTabela.appendChild(pontoElement)
        corporTabela.appendChild(tempoElement)
        tabela.appendChild(corporTabela)
    }

}