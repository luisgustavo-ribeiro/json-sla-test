let itensSla = [];
let area = [];
let categoria = [];
let servico = [];
let classificacao = [];

$(window).on('load', function () {
    BuscarDados();
});

function BuscarDados() {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: "https://raw.githubusercontent.com/luisgustavo-ribeiro/json-sla-test/master/data.json",
            type: "GET",
            dataType: 'json',
            success: data => {
                itensSla = data
            },
            error: error => {
                alert(JSON.stringify(error));
            }
        });

        resolve();
    }).then(() => {
        SepararItensDeSelecao();
    });
}

function SepararItensDeSelecao() {
    itensSla.forEach(item => {
        area.indexOf(item.Area) === -1 ? area.push(item.Area) : console.log("o item " + item.Area + " já existe");
        categoria.indexOf(item.Categoria) === -1 ? categoria.push(item.Categoria) : console.log("o item " + item.Categoria + " já existe");
        servico.indexOf(item.Serviços) === -1 ? servico.push(item.Serviços) : console.log("o item " + item.Serviços + " já existe");
        classificacao.indexOf(item.Classificação) === -1 ? classificacao.push(item.Classificação) : console.log("o item " + item.Classificação + " já existe");
    });
}

function MontarDropdowns() {
    area.forEach(area => {
        let option = "<option>" + area + "</option>";
        $("#drpArea").append(option);
    })
}