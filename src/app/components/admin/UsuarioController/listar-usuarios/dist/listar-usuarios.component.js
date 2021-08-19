"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ListarUsuariosComponent = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var DataTablesResponse = /** @class */ (function () {
    function DataTablesResponse() {
    }
    return DataTablesResponse;
}());
var ListarUsuariosComponent = /** @class */ (function () {
    function ListarUsuariosComponent(router, service) {
        this.router = router;
        this.service = service;
        this.dtOptions = {};
        this.dtTrigger = new rxjs_1.Subject();
    }
    ListarUsuariosComponent.prototype.ngOnInit = function () {
        this.listarUsuario();
    };
    ListarUsuariosComponent.prototype.listarUsuario = function () {
        var _this = this;
        //console.log("HOLAAAA");
        this.service.listarUsuarios().subscribe(function (resp) {
            //console.log(resp);
            _this.usuarios = resp;
            _this.dtTrigger.next();
        });
        this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 10,
            responsive: true
        };
    };
    ListarUsuariosComponent.prototype.editar = function (usr) {
        //console.log(usr.idUsuario);
        localStorage.setItem('idUsuario', usr.idUsuario.toString());
        this.router.navigateByUrl('/SX-CONSOLE/admin/editarUsuario');
    };
    ListarUsuariosComponent.prototype.nuevoUsuario = function () {
        this.router.navigateByUrl('/SX-CONSOLE/admin/nuevoUsuario');
    };
    ListarUsuariosComponent = __decorate([
        core_1.Component({
            selector: 'app-listar-usuarios',
            templateUrl: './listar-usuarios.component.html',
            styles: []
        })
    ], ListarUsuariosComponent);
    return ListarUsuariosComponent;
}());
exports.ListarUsuariosComponent = ListarUsuariosComponent;
