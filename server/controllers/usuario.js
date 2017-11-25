module.exports = function (app) {
    var route = '/usuario';

    var User = {
        "nome": "giuliano Gregory guimarães gusmão",
        "login": "giuliano.gusmao",
        "perfil": "administrador",
        "token": "lKJF1kSDfj1LKJ23SFOSIF3123jldskdfj5aosfi"
    };

    app.get(route, function (request, response) {
        response.send(
            JSON.stringify(User)
        );
    });

    app.post(route + '/autentica', function (req, res) {
        var request = req.body;

        var usuarios = [
            { "login": "teste1", "password": "123" },
            { "login": "teste", "password": "123" },
            { "login": "giuliano", "password": 'teste' },
        ];

        var usuario = usuarios.filter(function (usuario) {
            return usuario.login == request.login && usuario.password == request.password;
        });

        res.send(usuario.length ? User : { "Error": true });       

    });
}