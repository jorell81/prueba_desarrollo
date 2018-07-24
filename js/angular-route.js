var app = angular.module("app", ['ngRoute']);
app.config(['$routeProvider',function($routeProvider) {


    $routeProvider.when('/pagina1', {
        templateUrl: "pagina1.html",
        controller: "Pagina1Controller"
    });

    $routeProvider.when('/pagina2', {
        templateUrl: "pagina2.html",
        controller: "Pagina2Controller"
    });

    $routeProvider.when('/pagina3', {
        templateUrl: "pagina3.html",
        controller: "Pagina3Controller"
    });

    $routeProvider.otherwise({
        redirectTo: '/pagina1'
    });

}]);


app.controller("Pagina1Controller", ['$scope',function($scope) {

    $scope.nombre = "william";
    $scope.mensaje="Texto cargado desde el controlador Pagina1Controller";

}]);

app.controller("Pagina2Controller", ["$scope",function($scope) {
        $scope.highlighters = [];
        $scope.gMap = null;
        var myLatLng = {lat: 4.656163351, lng: -74.10041651};
        //var winInfo = new google.maps.InfoWindow();

        var googleMapOption = {
            zoom: 14,
            center: new google.maps.LatLng(myLatLng)
            //mapTypeId: google.maps.MapTypeId.TERRAIN
        };

        $scope.gMap = new google.maps.Map(document.getElementById('googleMap'), googleMapOption);
        $scope.geocoder = new google.maps.Geocoder();
        /*document.getElementById('#search').onclick = function() {
            geocodeAddress($scope.geocoder, $scope.gMap);
        };*/

        $scope.geocodeAddress = function(){
            $scope.marker= null;
            $scope.address = document.getElementById('location').value;
            $scope.georef = "";
            $scope.geocoder.geocode({'address': $scope.address}, function(results, status) {
                if (status === 'OK') {

                    $scope.gMap.setCenter(results[0].geometry.location);
                    $scope.marker = new google.maps.Marker({
                        map: $scope.gMap,
                        position: results[0].geometry.location,
                        draggable: true
                    });
                    $scope.marker.addListener( 'dragend', function (){
                        //escribimos las coordenadas de la posicion actual del marcador dentro del input #newlocation
                        document.getElementById("newlocation").value = this.getPosition().lat()+","+ this.getPosition().lng();
                    });

                } else {
                    alert('Geocode was not successful for the following reason: ' + status);
                }
            });
        }
    //$scope.mensaje="Texto cargado desde el controlador Pagina2Controller";
}]);


app.controller("Pagina3Controller", ["$scope","$http",function($scope,$http) {


    $http.get("http://l-lin.github.io/angular-datatables/archives/data.json").then(function (response) {
        $scope.data = response.data;
        var a = response.data;
        console.log("a",a);
        /*$('#example').DataTable( {
            "ajax": {
                "url":"http://l-lin.github.io/angular-datatables/archives/data.json",
                "dataSrc": ""
            },
            "columns": [
                { "data": 'id' },
                { "data": 'firstName' },
                { "data": 'lastName' }
            ]
        } );*/
        setTimeout(function () {
            $('#example').DataTable();
        },100)

    },function(response) {
            console.log(response);
    });

    // Angular se rompe si esto se hace antes que el documento listo.
    //$scope.mensaje="Texto cargado desde el controlador Pagina3Controller";
}]);
