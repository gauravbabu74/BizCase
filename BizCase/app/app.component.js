"use strict";
var core_1 = require('@angular/core');
var connectivity = require("connectivity");
var AppComponent = (function () {
    function AppComponent(zone) {
        this.zone = zone;
        alert('ngOnInitApp');
        var connectionType = connectivity.getConnectionType();
        switch (connectionType) {
            case connectivity.connectionType.none:
                this.connectionType = "None";
                break;
            case connectivity.connectionType.wifi:
                this.connectionType = "Wi-Fi";
                break;
            case connectivity.connectionType.mobile:
                this.connectionType = "Mobile";
                break;
            default:
                break;
        }
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        //this.page.actionBarHidden = true;
        alert('ngOnInitApp');
        connectivity.startMonitoring(function (newConnectionType) {
            _this.zone.run(function () {
                switch (newConnectionType) {
                    case connectivity.connectionType.none:
                        _this.connectionType = "None";
                        console.log("Connection type changed to none.");
                        break;
                    case connectivity.connectionType.wifi:
                        _this.connectionType = "Wi-Fi";
                        console.log("Connection type changed to WiFi.");
                        break;
                    case connectivity.connectionType.mobile:
                        _this.connectionType = "Mobile";
                        console.log("Connection type changed to mobile.");
                        break;
                    default:
                        break;
                }
            });
        });
    };
    AppComponent.prototype.ngOnDestroy = function () {
        // >> connectivity-stop-code
        connectivity.stopMonitoring();
        // << connectivity-stop-code
        alert('ngOnDestroyApp');
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: "ns-main",
            template: "<page-router-outlet></page-router-outlet>"
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof core_1.NgZone !== 'undefined' && core_1.NgZone) === 'function' && _a) || Object])
    ], AppComponent);
    return AppComponent;
    var _a;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map