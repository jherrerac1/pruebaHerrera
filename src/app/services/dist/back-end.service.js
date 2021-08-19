"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.BackEndService = void 0;
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var BackEndService = /** @class */ (function () {
    function BackEndService(http) {
        this.http = http;
        this.endpoint = 'http://localhost:8080/Repository/';
    }
    // INICIO METODOS USUARIOS
    BackEndService.prototype.listarUsuarios = function () {
        return this.http.post(this.endpoint + "usuarioController/ListarUsuarios", '');
    };
    BackEndService.prototype.retornaUsuarioId = function (id) {
        var data = new http_1.HttpParams().set('id_user', id);
        return this.http.post(this.endpoint + "usuarioController/userId", data);
    };
    BackEndService.prototype.guardarUsuario = function (usuario) {
        return this.http.post(this.endpoint + "usuarioController/guardar", usuario);
    };
    BackEndService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], BackEndService);
    return BackEndService;
}());
exports.BackEndService = BackEndService;
