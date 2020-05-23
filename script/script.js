var contDiv = 0
var listCollors = ["white","black","gray","yellow","orange","blue","pink","green"]
var modalBox = document.getElementById('modal')

var listRank = JSON.parse(localStorage.getItem('ranking')) || []


function criarDiv() {
     contDiv += 1
    if(contDiv < 22) {
       
        var divLoad = document.createElement('div')
        divLoad.setAttribute('class','load')
        document.body.appendChild(divLoad)
        if (contDiv == 1) {
            divLoad.style.marginLeft = "1%";
        }
    } else {
        var divs = document.getElementsByClassName('load');
        for (div of divs) {
            
            div.style.backgroundColor = listCollors[Math.floor(Math.random() * 7) + 1];
            
        }
    }
}

setInterval(criarDiv, 200);

function openModal() {
    modalBox.style.display = "block";
}

function closeModal() {
    modalBox.style.display = "none";
}

function mostrarRanking() {
    openModal()
    contentModal.innerHTML = '';
    let titulo = document.createElement('h2')
    let tituloTxt = document.createTextNode('Ranking')
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