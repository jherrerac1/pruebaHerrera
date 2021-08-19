"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LocationService = void 0;
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var LocationService = /** @class */ (function () {
    function LocationService(http) {
        this.http = http;
        this.url = 'http://localhost:8080/Repository/locationController';
    }
    LocationService.prototype.retornaPais = function () {
        return this.http.post(this.url + "/retornaPais", '');
    };
    LocationService.prototype.retornaProvincia = function (id_padre) {
        var data = new http_1.HttpParams().set('idPadre', id_padre);
        return this.http.post(this.url + "/retornaProvincia", data);
    };
    LocationService.prototype.retornaCiudad = function (id_padre) {
        var data = new http_1.HttpParams().set('idPadre', id_padre);
        return this.http.post(this.url + "/retornaCiudad", data);
    };
    LocationService.prototype.retornaLocalidad = function (id_padre) {
        var data = new http_1.HttpParams().set('idPadre', id_padre);
        return this.http.post(this.url + "/retornaLocalidad", data);
    };
    LocationService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], LocationService);
    return LocationService;
}());
exports.LocationService = LocationService;
