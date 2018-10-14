var express = require('express');
var path = require('path'); // модуль для парсинга пути
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override')); // поддержка put и delete
app.use(express.static(path.join(__dirname, ".."))); // запуск статического файлового сервера, который смотрит на папку ../ (в нашем случае отдает index.html)

app.listen(1337, function () {
    console.log('Express server listening on port 1337');
});

app.route('/api').get(function (req, res) {
    res.send('API is running');
});

app.route('/api/actions').get(function (req, res) {
    var actions = [
        {
            done: false,
            text: "дело"
        },
        {
            done: true,
            text: "items"
        },
        {
            done: false,
            text: "item"
        }
    ];
    res.send(actions);
});

app.route('/api/actions').post(function (req, res) {
    res.send('post');
});

app.route('/api/actions/:id').get(function (req, res) {
    res.send('This is not implemented now');
});

app.route('/api/actions/:id').put(function (req, res) {
    res.send('This is not implemented now');
});

app.route('/api/actions/:id').delete(function (req, res) {
    res.send('This is not implemented now');
});