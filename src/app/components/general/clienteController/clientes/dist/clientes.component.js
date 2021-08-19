"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ClientesComponent = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var ClientesComponent = /** @class */ (function () {
    function ClientesComponent(route, service) {
        this.route = route;
        this.service = service;
        this.dtOptions = {};
        this.dtTrigger = new rxjs_1.Subject();
    }
    ClientesComponent.prototype.ngOnInit = function () {
        this.retornaClientes();
    };
    ClientesComponent.prototype.retornaClientes = function () {
        this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 10,
            responsive: true
        };
    };
    ClientesComponent.prototype.nuevo = function () {
    };
    ClientesComponent.prototype.editar = function (cliente) {
    };
    ClientesComponent = __decorate([
        core_1.Component({
            selector: 'app-clientes',
            templateUrl: './clientes.component.html',
            styles: []
        })
    ], ClientesComponent);
    return ClientesComponent;
}());
exports.ClientesComponent = ClientesComponent;
