var express = require('express');
var router = express.Router();
var jsonfile = require('jsonfile')


/*************************/
router.use(function logForRoute(req,res,next){
    console.log('info server : vous etes ici => zone todo');
    next();
});
/***************************/

router.get('/login', function(req, res) {
    res.render('adminLogin.ejs', {});
});

router.post('/login', function(req, res) {
    var sess = req.session;

    var login = req.body.login;
    var mdp = req.body.mdp;

    if(login == 'aaminatou' && mdp=='Pass123!'){
        sess.login='aaminatou';
        res.redirect('/todo/todo.html');
        //res.render('/todo/todo.html');
    }else {
        res.redirect(403,'/todo/login');
    }
});

router.get('/logout', function(req, res) {
   req.session.destroy();
   res.redirect('/todo/login');
});


router.get('/todo.:format', function(req, res) {
    var sess = req.session;
    if(sess.login){     
        var format = req.params.format;
        if(format=='json'){
            var file = './public/json/content.json';
            res.json((jsonfile.readFileSync(file)));
        } else {
            res.render('todo.ejs', {});
        }
    }else {
        res.redirect(403,'/todo/login');
    }
});

/*router.post('/', function(req, res) {
    var diametre = req.body.diametre;
    console.log('bonjour %d',diametre);
    var surface = math.surface(req.body.diametre);
    console.log('bonjour %d',surface);
    var perimetre = math.perimetre(req.body.diametre);
    console.log('bonjour %d',perimetre);
    res.render('formulaire.ejs', {diametre:diametre,surface:surface,perimetre:perimetre});
});*/

module.exports = router;