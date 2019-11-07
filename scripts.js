let itensSla = [];
let area = [];
let categoria = [];
let servico = [];
let classificacao = [];
let slaDesejado = [];

$(window).on('load', () => {
    BuscarDados();
});

function BuscarDados() {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: "https://raw.githubusercontent.com/luisgustavo-ribeiro/json-sla-test/master/data.json",
            type: "GET",
            dataType: 'json',
            success: data => {
                itensSla = data;
                SepararItensDeSelecao();
            },
            error: error => {
                alert(JSON.stringify(error));
            }
        });

        resolve();
    });
}

function SepararItensDeSelecao() {
    return new Promise((resolve, reject) => {
        itensSla.forEach(item => {
            area.indexOf(item.Area) === -1 ? area.push(item.Area) : console.log("o item " + item.Area + " já existe");
            // categoria.indexOf(item.Categoria) === -1 ? categoria.push(item.Categoria) : console.log("o item " + item.Categoria + " já existe");
            // servico.indexOf(item.Servicos) === -1 ? servico.push(item.Servicos) : console.log("o item " + item.Servicos + " já existe");
            // classificacao.indexOf(item.Classificacao) === -1 ? classificacao.push(item.Classificacao) : console.log("o item " + item.Classificacao + " já existe");
        });

        resolve();
        MontarDropdownArea();
    });
}

function MontarDropdownArea() {
    area.forEach(area => {
        let option = "<option>" + area + "</option>";
        $("#drpArea").append(option);
    });

    BuscarCategorias();

    $("#drpArea").change(() => {
        categoria = [];
        servico = [];
        classificacao = [];
        $("#drpCategoria option").remove();
        $("#drpServico option").remove();
        $("#drpClassificacao option").remove();
        BuscarCategorias();
    });
}

function BuscarCategorias() {
    itensSla.forEach(item => {
        if ($("#drpArea").val() === item.Area) {
            categoria.indexOf(item.Categoria) === -1 ? categoria.push(item.Categoria) : "";
        }
    });

    MontarDropdownCategoria();
}

function MontarDropdownCategoria() {
    categoria.forEach(option => {
        let optionItem = "<option>" + option + "</option>";
        $("#drpCategoria").append(optionItem);
    });

    $("#drpCategoria").change(() => {
        servico = [];
        classificacao = [];
        $("#drpServico option").remove();
        $("#drpClassificacao option").remove();
        BuscarServicos();
    });

    BuscarServicos();
}

function BuscarServicos() {
    itensSla.forEach(item => {
        if ($("#drpArea").val() === item.Area && $("#drpCategoria").val() === item.Categoria) {
            servico.indexOf(item.Servicos) === -1 ? servico.push(item.Servicos) : "";
        }
    });

    MontarDropdownServicos();
}

function MontarDropdownServicos() {
    servico.forEach(option => {
        let optionItem = "<option>" + option + "</option>";
        $("#drpServico").append(optionItem);
    });


    $("#drpServico").change(() => {
        classificacao = [];
        $("#drpClassificacao option").remove();
        BuscarClassificacao();
    });

    BuscarClassificacao();
}

function BuscarClassificacao() {
    itensSla.forEach(item => {
        if ($("#drpArea").val() === item.Area && $("#drpCategoria").val() === item.Categoria && $("#drpServico").val() === item.Servicos) {
            classificacao.indexOf(item.Classificacao) === -1 ? classificacao.push(item.Classificacao) : "";
            slaDesejado.indexOf(item.SLA_DESEJADO) === -1 ? classificacao.push(item.SLA_DESEJADO) : "";
        }
    });

    MontarDropdownClassificacao();
}

function MontarDropdownClassificacao() {
    classificacao.forEach(option => {
        let optionItem = "<option>" + option + "</option>";
        $("#drpClassificacao").append(optionItem);
    });

    $("#drpClassificacao").change(() => {
        ExibirSLA();
    })
}

function ExibirSLA() {
    itensSla.forEach(item => {
        if ($("#drpArea").val() === item.Area && $("#drpCategoria").val() === item.Categoria && $("#drpServico").val() === item.Servicos && $("#drpClassificacao").val() === item.Classificacao) {
            $("#slaDesejado").text(item.SLA_DESEJADO);
        }
    });
}