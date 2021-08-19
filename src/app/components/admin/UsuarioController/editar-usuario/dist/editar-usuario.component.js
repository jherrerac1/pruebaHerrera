"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.EditarUsuarioComponent = void 0;
var core_1 = require("@angular/core");
var UsuarioModel_1 = require("src/app/models/UsuarioModel");
var sweetalert2_1 = require("sweetalert2");
var EditarUsuarioComponent = /** @class */ (function () {
    function EditarUsuarioComponent(router, service) {
        this.router = router;
        this.service = service;
        this.usuario = new UsuarioModel_1.UsuarioModel();
    }
    EditarUsuarioComponent.prototype.ngOnInit = function () {
        this.editar();
    };
    EditarUsuarioComponent.prototype.onSubmit = function (form) {
        var _this = this;
        if (form.invalid) {
            return;
        }
        sweetalert2_1["default"].fire({
            title: 'info',
            text: 'Registrando Datos', allowOutsideClick: false
        });
        sweetalert2_1["default"].showLoading();
        this.service.guardarUsuario(this.usuario).subscribe(function (data) {
            sweetalert2_1["default"].fire({
                position: 'top-end',
                title: 'Respuesta',
                icon: 'success',
                text: 'DATOS GRABADOS CON EXITO',
                showConfirmButton: false,
                timer: 1500
            });
            localStorage.removeItem("idUsuario");
            _this.router.navigateByUrl('/SX-CONSOLE/admin/usuarios');
        }, function (err) {
            sweetalert2_1["default"].fire({
                title: 'Error!',
                icon: 'error',
                text: err.error.error.message
            });
        });
    };
    EditarUsuarioComponent.prototype.editar = function () {
        var _this = this;
        var idUsuario = localStorage.getItem('idUsuario');
        this.service.retornaUsuarioId(idUsuario).subscribe(function (data) {
            _this.usuario = data;
        });
    };
    EditarUsuarioComponent.prototype.cancelar = function () {
        localStorage.removeItem("idUsuario");
        this.router.navigateByUrl('/SX-CONSOLE/admin/usuarios');
    };
    EditarUsuarioComponent = __decorate([
        core_1.Component({
            selector: 'app-editar-usuario',
            templateUrl: './editar-usuario.component.html',
            styles: []
        })
    ], EditarUsuarioComponent);
    return EditarUsuarioComponent;
}());
exports.EditarUsuarioComponent = EditarUsuarioComponent;
