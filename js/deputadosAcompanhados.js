let idDeputados = localStorage.getItem('acompanharDeputado');
idDeputados = JSON.parse(idDeputados);
let total = idDeputados.length;
let loopDeputados = '';

//console.log(idDeputados[1])


getDeputados()

function getDeputados(){
for (let i = 0; i < total; i++) {
    loopDeputados = idDeputados[i];
    //console.log(loopDeputados)

    pegarDadosDoDeputado(loopDeputados)

}
}

function pararDeacompanharPerfil(id) {

    //pego todos os itens

    if (localStorage) {
        let position = idDeputados.indexOf(id);
        idDeputados.splice(position,1);

        localStorage.setItem('acompanharDeputado', JSON.stringify(idDeputados));
        window.location.reload()
      }



}




function pegarDadosDoDeputado(id) {

    fetch(`https://dadosabertos.camara.leg.br/api/v2/deputados/${id}`).then(response => {
        let resultados = response.text();

        resultados.then(function (res) {
            let parse = JSON.parse(res);
            let dados = parse.dados;
            //console.log(dados)

            let ultimoStatus = dados.ultimoStatus;
            let gabinete = ultimoStatus.gabinete;

            //console.log(ultimoStatus)

            let id = dados.id;
            let nome = dados.nomeCivil;
            let urlFoto = 'https://www.camara.leg.br/internet/deputado/bandep/' + dados.id + '.jpg';
            let uri = ultimoStatus.uri;
            let = siglaPartido = ultimoStatus.siglaPartido;
            let = siglaUf = ultimoStatus.siglaUf;;



            let bloco = blocoDeputado(id, nome, urlFoto, uri, siglaPartido, siglaUf);
            //console.log(bloco);

            document.getElementById("demo").innerHTML += bloco;

        });

    })
        .catch(err => {
            console.error(err);
        });
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
                 <a class="btn btn-primary btn-xs"  href="${linkDeputado}">Acessar Perfil</a>
                  <button class="btn btn-warning btn-xs" onclick="pararDeacompanharPerfil(${id})">Parar de Acompanhar</button>
               </div> 
             </div>
           </div>
          </div>`;

    return perfil;
}