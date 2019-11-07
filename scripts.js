let itensSla = [];

$(window).on('load', function () {
    BuscarDados();
});

function BuscarDados() {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: "https://api.myjson.com/bins/i741o",
            type: "GET",
            success: data => {
                itensSla = data
            },
            error: error => {
                alert(JSON.stringify(error));
            }
        });

        resolve();
    })
}

