module.exports = function (app) {
    var route = '/menu';

    app.get(route, function (request, response) {
        response.send(
            JSON.stringify([
                {
                    "label": "Home",
                    "link": "/"
                },
                {
                    "label": "Listar SLAs",
                    "link": "/sla"
                },
                {
                    "label": "Cadastrar SLA",
                    "link": "/sla-cadastrar"
                }
            ])
        );
    });
}