var express = require('express');
var path = require('path'); // модуль для парсинга пути
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var app = express();
var ActionModel = require('./Mongoose').ActionModel;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override')); // поддержка put и delete
require('./Mongoose').db.once('open', function callback () {
    app.use(express.static(path.join(__dirname, ".."))); // запуск статического файлового сервера, который смотрит на папку ../ (в нашем случае отдает index.html)
});

app.listen(1337, function () {
    console.log('Express server listening on port 1337');
});

app.route('/api').get(function (req, res) {
    res.send('API is running');
});

app.route('/api/actions').get(function (req, res) {
    return ActionModel.find(function (err, actions) {
        return res.send(actions);
    });
});

app.route('/api/actions').post(function (req, res) {
    var action = new ActionModel({
        text: req.body.text,
        done: req.body.done
    });

    action.save(function (err) {
        if (!err) {
            console.log("action created");
            return res.send({status: 'OK', action: action});
        }
    });
});

app.route('/api/actions/:id').get(function (req, res) {
    res.send('This is not implemented now');
});

app.route('/api/actions/:id').put(function (req, res) {
    return ActionModel.find(function (err, actions) {
        var action = actions[req.params.id];
        if(!action) {
            res.statusCode = 404;
            return res.send({ error: 'Not found' });
        }

        action.done = req.body.done;
        return action.save(function (err) {
            if (!err) {
                console.log("action updated");
                return res.send({ status: 'OK', action:action });
            } else {
                console.log('Internal error(%d): %s',res.statusCode,err.message);
            }
        });
    });
});

app.route('/api/actions/:id').delete(function (req, res) {
    return ActionModel.find(function (err, actions) {
        var action = actions[req.params.id];
        return action.remove(function (err) {
            if (!err) {
                console.log("action removed");
                return res.send({ status: 'OK' });
            }
        });
    });
});