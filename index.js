var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');

var routeTodo = require('./route/todo');

var app = express();

app.use(session({secret:'cleCryptage'}));
app.use(express.static(path.join(__dirname, 'public')));// definir un dossier public accessible depuis la racine et accessible depuis l'exterieur(use vu que c'est un middle)
app.use(bodyParser.urlencoded({extends: true}));//extends pour l'autoriser a etendre le boddy

app.use('/todo',routeTodo);

app.get('/', function(request, response) {
    //response.setHeader('Content-Type','text/plain');
    response.render('entree.ejs');
});
app.get('/cv', function(req, res) {
    res.render('cv.ejs');
});
app.get('/todoList', function(req, res) {
    res.render('todo.ejs');
});



app.use( function (request, response, next) {
    response.setHeader('Content-Type', 'text/plain');
    response.send(404, 'Erreur 404 !');
});
app.listen(8888);