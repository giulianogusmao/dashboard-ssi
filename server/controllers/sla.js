module.exports = function (app) {
    const route = '/api/sla';
    let slas = [
        {
            idsla: 0,
            ativo: true,
            status: 'novo',
            sla: 15,
            prioridade: 'Urgente',
            complexidade: 'Baixa',
            inicioDaVigencia: '01/09/2017',
            finalDaVigencia: '',
            idarea: 321,
            area: 'Diretoria de Redes',
            siglaArea: 'DR',
        },
        {
            idsla: 1,
            ativo: false,
            status: 'aguardando aprovação',
            sla: 15,
            prioridade: 'Não Urgente',
            complexidade: 'Alta',
            inicioDaVigencia: new Date(),
            finalDaVigencia: new Date(),
            idarea: 321,
            area: 'Diretoria de Redes',
            siglaArea: 'DR',
        },
        {
            idsla: 3,
            ativo: true,
            status: 'aguardando aprovação',
            sla: 15,
            prioridade: 'Urgente',
            complexidade: 'Baixa',
            inicioDaVigencia: new Date(),
            finalDaVigencia: '',
            idarea: 123,
            area: 'Outras',
            siglaArea: 'OU',
        }
    ];
    let id = slas.length;
    
    app.get(route, function (req, res) {

        setTimeout(() => {
            res.send({ Error: false, Message: 'ok', data: slas });
        }, 2000);
    });

    app.get(route + '/:id', function (req, res) {
        setTimeout(() => {
            const id = req.params.id;
            const filtered = slas.filter(function(sla) {
                return sla.idsla == id
            });

            res.send({ Error: false, Message: 'ok', data: filtered.length ? filtered[0] : {} });
        }, 2000);
    });

    app.post(route + '/novo', function (req, res) {
        setTimeout(() => {
            if (!req.get('Authorization')) {
                res.status('403').send({ Error: true, Message: 'Usuário não autorizado' });
            } else if (!req.body) {
                res.status('400').send({ Error: true, Message: 'SLA inválido para cadastrar' });
            } else {
                id++;
                dados = req.body;
                console.log(dados);
                
                dados.idsla = id;
                dados.ativo = true;
                dados.inicioDaVigencia = new Date();
                dados.finalDaVigencia = '';
                dados.area = 'Diretoria de Redes';
                dados.siglaArea = 'DR';

                slas.push(dados);
                res.send({ Error: false, Message: 'ok', data: dados });
            }
        }, 2000);
    });

};