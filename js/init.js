function pegarPaginaLocalStorage() {
  const pgAtual = localStorage.getItem('paginaAtual');
  return pgAtual;
}


function showTotalDeputados(total) {
  let qtda = total.length;
  let salvarTotal = localStorage.setItem('totalDeputados', qtda);
}

function pegarTotalDeDeputadosLocalStorage() {
  const TotalDeputadosLocalStorage = localStorage.getItem('totalDeputados');
  return TotalDeputadosLocalStorage;
}

function acompanharPerfil(id) {

  if (localStorage) {
    var dados;
    if (!localStorage['acompanharDeputado']) dados = [];
    else dados = JSON.parse(localStorage['acompanharDeputado']);
    if (!(dados instanceof Array)) dados = [];
    dados.push(id);

    localStorage.setItem('acompanharDeputado', JSON.stringify(dados));
  }
}

function blocoDeputado(id, nome, urlFoto, uri, siglaPartido, siglaUf) {

  let linkDeputado = 'deputado.html?id=' + id;

  let perfil = `
                <div class="col-md-3 col-xs-12 col-sm-6 bloco-perfil">
                 <div class="panel panel-info">
                   <div class="panel-heading">
                    <h2>${nome}</h2>
                   </div>
         
                   <div class="panel-body text-center">
                    <figure>
                      <img src="${urlFoto}" alt="${nome}" title="${nome}">
                     </figure>               
                   </div>
         
                   <div class="panel-footer">
                    <p>Partido: <strong>${siglaPartido}</strong> - <strong>${siglaUf}</strong></p> 
         
                     <div class="btn-group">
                       <a class="btn btn-primary btn-sm"  href="${linkDeputado}">Acessar Perfil</a>
                        <button class="btn btn-warning btn-sm" onclick="acompanharPerfil(${id})">Acompanhar</button>
                     </div> 
                   </div>
                 </div>
                </div>`;

  return perfil;
}

function gerarLinkPagina(pg) {

  if(pegarPaginaLocalStorage() === null){
    pg = 1;
  }else{
    pg = pg;
  }
  const url = `https://dadosabertos.camara.leg.br/api/v2/deputados?dataInicio=2016-01-01&ordem=ASC&ordenarPor=siglaUF&pagina=${pg}&itens=${qtdaPerfisPorPagina}`;
  return url;
}

function pegarTotalDeDeputados() {
  const urlTotal = `https://dadosabertos.camara.leg.br/api/v2/deputados?dataInicio=2016-01-01&ordem=ASC&ordenarPor=siglaUF`;
  let total;

  fetch(urlTotal).then(response => {
    let resultados = response.text();
    resultados.then(function (res) {
      let parse = JSON.parse(res);
      let dados = parse.dados;
      showTotalDeputados(dados);
    });
  });

  //return total;
}

function pegarDadosApi(url) {
  let totalDeputados = qtdaPerfisPorPagina;

  fetch(url).then(response => {
    let resultados = response.text();


    resultados.then(function (res) {
      let parse = JSON.parse(res);
      let dados = parse.dados;

      for (let i = 0; i < totalDeputados; i++) {
        let loopDeputados = dados[i];

        let id = loopDeputados.id;
        let idLegislatura = loopDeputados.idLegislatura;
        let nome = loopDeputados.nome;
        let siglaPartido = loopDeputados.siglaPartido;
        let siglaUf = loopDeputados.siglaUf;
        let uri = loopDeputados.uri;
        let uriPartido = loopDeputados.uriPartido;
        let urlFoto = loopDeputados.urlFoto;

        let bloco = blocoDeputado(id, nome, urlFoto, uri, siglaPartido, siglaUf);
        //console.log(bloco);

        document.getElementById("demo").innerHTML += bloco;


      }

    });

  }).catch(err => {
    console.error(err);
  });
}

function gerarPaginacao(total) {
  let linkPaginas;
  let listaPagina = '';
  let pgAtual = pegarPaginaLocalStorage();
  let active = '';

  for (let i = 1; i <= total; i++) {
    if (i == pgAtual) {
      active = 'active';
    } else {
      active = '';
    }
    listaPagina += `<li class="${active}"><a onclick="tratarLinkPagina(${i})" href="#">${i}</a></li>`;
  }

  linkPaginas = '<ul class="pagination">' + listaPagina + '</ul>';
  document.getElementById("paginas").innerHTML += linkPaginas;
}

function tratarLinkPagina(pg) {
  event.preventDefault();
  localStorage.setItem('paginaAtual', pg);
  document.location.reload(true);
}


const totalResultados = pegarTotalDeDeputadosLocalStorage();
const qtdaPerfisPorPagina = 32;
const totalDePaginas = Math.round(totalResultados / qtdaPerfisPorPagina);
let pgAtual = pegarPaginaLocalStorage();

let url = gerarLinkPagina(pgAtual);
pegarDadosApi(url);


gerarPaginacao(totalDePaginas)