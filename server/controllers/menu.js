module.exports = function (app) {
    var route = '/api/menu';

    app.get(route, function (request, response) {
        response.send(
            JSON.stringify([
                {
                    "label": "Home",
                    "link": "/"
                },
                {
                    "label": "Listar SLAs",
                    "link": "/slas"
                },
                {
                    "label": "Cadastrar SLA",
                    "link": "/slas/novo"
                }
            ])
        );
    });
}