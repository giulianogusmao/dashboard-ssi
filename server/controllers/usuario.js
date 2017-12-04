module.exports = function (app) {
    var route = '/api';

    var User = {
        "id": "L5s4dfa8s4fda6s5dfSDSFF4s65df48sf4ds6F",
        "nome": "giuliano Gregory guimarães gusmão",
        "login": "giuliano.gusmao",
        "perfil": "administrador",
        "token": "lKJF1kSDfj1LKJ23SFOSIF3123jldskdfj5aosfi"
    };

    app.post(route + '/authenticate', function (req, res) {
        setTimeout(() => {
            var request = req.body;

            var usuarios = [
                { "username": "teste1", "password": "123" },
                { "username": "teste", "password": "123" },
                { "username": "giuliano", "password": 'teste' },
            ];

            var usuario = usuarios.filter(function (u) {
                return u.username == request.username && u.password == request.password;
            });

            if (usuario.length)
                res.send({ "Error": false, "Message": "", "data": User });
            else
                res.status(400).send({ "Error": true, "Message": "Login ou Senha incorretos!" });
        }, 2000);
    });
}