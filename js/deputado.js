function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

var busca = getParameterByName('id');

function pegarDadosDoDeputado(id) {

    fetch(`https://dadosabertos.camara.leg.br/api/v2/deputados/${id}`).then(response => {
            let resultados = response.text();

            resultados.then(function (res) {
                let parse = JSON.parse(res);
                let dados = parse.dados;

                //console.log(dados)

                let cpf = dados.cpf;
                document.getElementById('cpf').innerText = cpf;

                let dataNascimento = dados.dataNascimento;
                document.getElementById('dt-nascimento').innerText = dataNascimento;

                let escolaridade = dados.escolaridade;
                document.getElementById('escolaridade').innerText = escolaridade;

                let municipioNascimento = dados.municipioNascimento;
                document.getElementById('m_nascimento').innerText = municipioNascimento;


                let sexo = dados.sexo;
                document.getElementById('sexo').innerText = sexo;

                let ufNascimento = dados.ufNascimento;
                document.getElementById('ufNascimento').innerText = ufNascimento;


                let ultimoStatus = dados.ultimoStatus;

                console.log(ultimoStatus)

                let email = ultimoStatus.email;
                document.getElementById('email').innerText = email;

                let nome = ultimoStatus.nome;
                document.getElementById('nome_civil').innerText = nome;

                let nomeEleitoral = ultimoStatus.nomeEleitoral;
                document.getElementById('nome_eleitoral').innerText = nomeEleitoral;

                let situacao = ultimoStatus.situacao;
                document.getElementById('situacao').innerText = situacao;

                let urlFoto = ultimoStatus.urlFoto;
                let foto = `<img class="img-responsive" src="${urlFoto}" alt="${nome}" title="${nome}">`;


                document.getElementById('foto').innerHTML = foto;

                /*GABINETE*/

                let gabinete = ultimoStatus.gabinete;

                console.log(gabinete)

                let nomeGab = gabinete.nome;
                document.getElementById('gab_nome').innerText = nomeGab;

                let predioGab = gabinete.predio;
                document.getElementById('gab_predio').innerText = predioGab;

                let salaGab = gabinete.sala;
                document.getElementById('gab_sala').innerText = salaGab;

                let andarGab = gabinete.andar;
                document.getElementById('gab_andar').innerText = andarGab;

                let telefoneGab = gabinete.telefone;
                document.getElementById('gab_fone').innerText = telefoneGab;

                let emailGab = gabinete.email;
                document.getElementById('gab_email').innerText = emailGab;


            });

        })
        .catch(err => {
            console.error(err);
        });
}

pegarDadosDoDeputado(busca)