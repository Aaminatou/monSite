var module = angular.module("Application");

module.directive("maDirective",function () {
    
    return {
        restrict:"A",
        //template:"<blockquote>Bonjour {{$parent.hello}}<b ng-transclude></b></blockquote>",
        //template:"<blockquote ng-click = 'clique();'>Bonjour {{nom}}<b ng-transclude></b></blockquote>",
        //template: "<table><tr><th>NOM</th><th>PRENOM</th><th>AGE</th></tr><tr ng-repeat='item in personnes' ng-click = 'clique(item.nom,item.prenom,item.age);'><td>{{ item.nom }}</td><td>{{item.prenom}}</td><td>{{item.age}}</td></tr></table>",
        templateUrl:"./app/template/template.html",
        //replace:false,
        transclude:true,
        //scope:true, //pour ne pas modifier le scope parent
        //scope:{}, //il n ya plus de héritage, on isole le scope
        scope:{
            //nom:'@'//one way nom = modele dans le scope
            //nom:"="// two ways (égal au parent) ng-model = modele sdans le scope
        },
        link:function (scope,elem,attrs,ctrl) {
            //scope.hello = 'yop';
            //scope.hello = scope.hello + 1;
        },
        controller:function($scope,$http){
            $http.get('http://localhost:8888/text.json').then(function(response){//promesse
                $scope.personnes=response.data;
            }).catch(function(err){//ecriture du message d'erreur dans la console
                console.log('Errure '+err);
            });
            $scope.clique = function (item) {
                console.log("Vous avez cliqué sur : "+item.nom+" "+item.prenom+" "+item.age+" ans.");
            }
        }

    };
});
/*
module.directive('maDirective',function(){//création dans le module, convertit en html ma-directive
    return{
        restrict:'A',
        template:'<h1 ng-translude>Bonjour {{nom}} <input type="text" ng-model=prenom></h1',
        replace:false,
        //scope:true,//autorise l'héritage mais isole les modifications, sinon tout les scopes sont modifiés
        scope:{
            nom:'@',//binding 1way
            prenom:'='//binding 2way
        },//isole completement le scope
        translude:false,

        controller:function(['$scope','$http'){
            scope.clique=function(){
                alert('yop');
            };
        }
    }
});
*/
