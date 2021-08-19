"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.EmpreServicesService = void 0;
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var EmpreServicesService = /** @class */ (function () {
    function EmpreServicesService(http) {
        this.http = http;
        this.url = 'http://localhost:8080/Repository/';
    }
    EmpreServicesService.prototype.listarEmpresa = function () {
        //EmpresaController/ListarEmpresa
        return this.http.post(this.url + "EmpresaController/ListarEmpresa", '');
    };
    EmpreServicesService.prototype.empresaById = function (id) {
        var data = new http_1.HttpParams().set('id_empresa', id);
        return this.http.post(this.url + "EmpresaController/EmpresaId", data);
    };
    EmpreServicesService.prototype.guardarEmpresa = function (empresa) {
        return this.http.post(this.url + "EmpresaController/GuardarEmpresa", empresa);
    };
    EmpreServicesService.prototype.ActualizarEmpresa = function (empresa) {
        // editEmpresa
        return this.http.post(this.url + "EmpresaController/editEmpresa", empresa);
    };
    EmpreServicesService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], EmpreServicesService);
    return EmpreServicesService;
}());
exports.EmpreServicesService = EmpreServicesService;
