angular.module("app", ["uiGmapgoogle-maps"])
    .controller("mainCtrl", function($scope, $window) {
        this.map = {
            center: {
                latitude: -33.86,
                longitude: 151.2094
            },
            zoom: 7
        };

        this.markers = [{
            id: 0,
            latitude: -34,
            longitude: 151
        }, {
            id: 1,
            latitude: -35,
            longitude: 152
        }];

        this.f = f.bind(this); // Binding not needed if f uses g instead of this.g
        this.g = g;

        function f(marker, eventName, model, eventArgs) {
            $window.alert(
                'marker position: ' + marker.getPosition().toUrlValue() + '\n' +
                'event name: ' + eventName + '\n' +
                'model id: ' + model.id + '\n' +
                'mouse event position: ' + eventArgs[0].latLng.toUrlValue());
            this.g();
        }

        function g() {
            $window.alert('other method')
        }
    });