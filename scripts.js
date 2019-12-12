let itensSla = [];
let area = [];
let categoria = [];
let servico = [];
let classificacao = [];
let slaDesejado = [];

let drpArea = document.querySelector("#drpArea");
let drpCategoria = document.querySelector("#drpCategoria");
let drpServico = document.querySelector("#drpServico");
let drpClassificacao = document.querySelector("#drpClassificacao");

let areaSelecionada;
let categoriaSelecionada;
let servicoSelecionado;
let classificacaoSelecionada;

switch (document.readyState) {
    case "loading":
        BuscarDados();
    case "interactive":
        console.log(document.readyState);
    case "complete":
        break;
}

function BuscarDados() {
    // arquivo da base de dados
    let url = "https://raw.githubusercontent.com/luisgustavo-ribeiro/json-sla-test/master/data.json";

    fetch(url)
        .then(response => {
            return response.json()
        })
        .then(data => {
            itensSla = data;
            BuscarAreas();
        })
        .catch(err => {
            alert("Ops, algo deu errado!")
            console.log(err)
        });
}

function BuscarAreas() {
    itensSla.forEach(item => {
        area.indexOf(item.Area) === -1 ? area.push(item.Area) : "";
    });

    area.forEach(area => {
        drpArea.options.add(new Option(area, ""));
    });

    BuscarCategorias();
}

function BuscarCategorias() {
    areaSelecionada = drpArea.options[drpArea.selectedIndex].text;
    itensSla.forEach(item => {
        if (areaSelecionada === item.Area) {
            categoria.indexOf(item.Categoria) === -1 ? categoria.push(item.Categoria) : "";
        }
    });

    categoria.forEach(categoria => {
        drpCategoria.options.add(new Option(categoria, ""));
    });

    BuscarServicos();
}

function BuscarServicos() {
    categoriaSelecionada = drpCategoria.options[drpCategoria.selectedIndex].text;
    itensSla.forEach(item => {
        if (areaSelecionada === item.Area && categoriaSelecionada === item.Categoria) {
            servico.indexOf(item.Servicos) === -1 ? servico.push(item.Servicos) : "";
        }
    });

    servico.forEach(servico => {
        drpServico.options.add(new Option(servico, ""));
    });

    BuscarClassificacao();
}

function BuscarClassificacao() {
    servicoSelecionado = drpServico.options[drpServico.selectedIndex].text;
    itensSla.forEach(item => {
        if (areaSelecionada === item.Area && categoriaSelecionada === item.Categoria && servicoSelecionado === item.Servicos) {
            classificacao.indexOf(item.Classificacao) === -1 ? classificacao.push(item.Classificacao) : "";
            slaDesejado.indexOf(item.SLA_DESEJADO) === -1 ? slaDesejado.push(item.SLA_DESEJADO) : "";
        }
    });

    classificacao.forEach(classificacao => {
        drpClassificacao.options.add(new Option(classificacao, ""));
    });

    ExibirSLA();
}

function ExibirSLA() {
    classificacaoSelecionada = drpClassificacao.options[drpClassificacao.selectedIndex].text;
    document.querySelector("#slaDesejado").innerHTML = "-";
    document.querySelector("#txtRequisito").value = "-";

    itensSla.forEach(item => {
        if (areaSelecionada === item.Area && categoriaSelecionada === item.Categoria && servicoSelecionado === item.Servicos && classificacaoSelecionada === item.Classificacao) {
            document.querySelector("#slaDesejado").innerHTML = item.SLA_DESEJADO;
            document.querySelector("#txtRequisito").value = item.Requisitos;
        }
    });
}

drpArea.addEventListener('change', () => {
    areaSelecionada = drpArea.options[drpArea.selectedIndex].text;

    categoria = [];
    servico = [];
    classificacao = [];

    drpCategoria.options.length = 0;
    drpServico.options.length = 0;
    drpClassificacao.options.length = 0;

    BuscarCategorias();
    ExibirSLA();
});

drpCategoria.addEventListener('change', () => {
    categoriaSelecionada = drpCategoria.options[drpCategoria.selectedIndex].text;

    servico = [];
    classificacao = [];

    drpServico.options.length = 0;
    drpClassificacao.options.length = 0;

    BuscarServicos();
    ExibirSLA();
});

drpServico.addEventListener('change', () => {
    servicoSelecionado = drpServico.options[drpServico.selectedIndex].text;

    classificacao = [];

    drpClassificacao.options.length = 0;

    BuscarClassificacao();
    ExibirSLA();
});

drpClassificacao.addEventListener('change', () => {
    classificacaoSelecionada = drpClassificacao.options[drpClassificacao.selectedIndex].text;
    ExibirSLA();
});

function EnviarRequisicao() {
    if (document.querySelector("#solicitante").value != "" && document.querySelector("#txtDescricao").value != "") {

        let form = {
            Solicitante: document.querySelector("#solicitante").value,
            Area: areaSelecionada,
            Categoria: categoriaSelecionada,
            Servico: servicoSelecionado,
            Classificacao: classificacaoSelecionada,
            Requisito: document.querySelector("#txtRequisito").value != "-" ? document.querySelector("#txtRequisito").value : "Requisito não definido",
            SLA: document.querySelector("#slaDesejado").innerText != "-" ? document.querySelector("#slaDesejado").innerText : "SLA não definido",
            Descricao: document.querySelector("#txtDescricao").value
        };

        try {
            fetch('https://prod-89.westus.logic.azure.com:443/workflows/83d22548a7cb4844b4aae31147a08387/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=vMK6z2B4IjvSfYSFj7KO-nAPq_24O_CTObm9lZ6Ujtw', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form)
            });

            alert("Solicitação enviada com sucesso!");

        } catch (error) {
            alert("Ops, algo deu errado! Tente novamente")
            console.log(error);
        }

    } else {
        alert("Email e/ou o Descrição vazio(s) certifique-se que os campos estão preenchidos para enviar a solicitação")
    }
}