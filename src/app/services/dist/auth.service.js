"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AuthService = void 0;
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var operators_1 = require("rxjs/operators");
var AuthService = /** @class */ (function () {
    function AuthService(http) {
        this.http = http;
        this.url = 'http://localhost:8080/Repository/authController';
    }
    AuthService.prototype.login = function (usuario) {
        var _this = this;
        var autData = new http_1.HttpParams().set('user', usuario.user_name).set('password', usuario.password);
        // return  this.http.post(`${ this.url }/login?user=${usuario.user_name}&password=${usuario.password}`, autData);
        return this.http.post(this.url + "/login", autData).pipe(operators_1.map(function (resp) {
            if (resp['data']['empresa'] !== null) {
                _this.guardarInformacion(resp['data']['nombre'], resp['data']['apellido'], resp['data']['perfil'], resp['data']['empresa']);
            }
            else {
                _this.guardarInformacion(resp['data']['nombre'], resp['data']['apellido'], resp['data']['perfil'], '');
            }
            return resp;
        }));
    };
    AuthService.prototype.guardarInformacion = function (nombreUsr, apellido, perfil, empresa) {
        this.nombre = nombreUsr;
        localStorage.setItem('nombre', nombreUsr);
        this.apellido = apellido;
        localStorage.setItem('apellido', apellido);
        this.perfil = perfil;
        localStorage.setItem('id_perfil', perfil);
        if (empresa !== '') {
            this.empresa = empresa;
            localStorage.setItem('id_empresa', empresa);
        }
    };
    AuthService.prototype.leerInfo = function () {
        if (localStorage.getItem('nombre')) {
            this.nombre = localStorage.getItem('nombre');
        }
        else {
            this.nombre = '';
        }
    };
    AuthService.prototype.autenticado = function () {
        this.leerInfo();
        return this.nombre.length > 1;
    };
    AuthService.prototype.logaut = function () {
        localStorage.removeItem('nombre');
        localStorage.removeItem('apellido');
        localStorage.removeItem('id_perfil');
        localStorage.removeItem('id_empresa');
    };
    AuthService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
