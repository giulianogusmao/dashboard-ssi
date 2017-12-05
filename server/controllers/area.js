
module.exports = function (app) {
    const route = '/api/areas';
    let slas = [
        {
            idarea: 321,
            area: 'Diretoria de Redes',
            siglaArea: 'DR',
        },
        {
            idarea: 123,
            area: 'Outras',
            siglaArea: 'OU',
        }
    ];

    app.get(route, function (req, res) {
        setTimeout(() => {
            
            if (!req.get('Authorization')) {
                res.status('403').send({ Error: true, Message: 'Usuário não autorizado' });
            }

            res.send({ Error: false, Message: 'ok', data: slas });

        }, 2000);
    });

};