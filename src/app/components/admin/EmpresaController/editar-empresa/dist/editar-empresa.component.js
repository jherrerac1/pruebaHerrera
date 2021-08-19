"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.EditarEmpresaComponent = void 0;
var core_1 = require("@angular/core");
var EmpresaModel_1 = require("src/app/models/EmpresaModel");
var sweetalert2_1 = require("sweetalert2");
var EditarEmpresaComponent = /** @class */ (function () {
    function EditarEmpresaComponent(router, emprServi, locaServi) {
        this.router = router;
        this.emprServi = emprServi;
        this.locaServi = locaServi;
        this.empresa = new EmpresaModel_1.Empresa();
    }
    EditarEmpresaComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.editar();
        this.locaServi.retornaPais().subscribe(function (resp) {
            _this.pais = resp;
        });
    };
    EditarEmpresaComponent.prototype.editar = function () {
        var _this = this;
        var id = localStorage.getItem("idEmpresa");
        this.emprServi.empresaById(id).subscribe(function (resp) {
            _this.empresa = resp;
        });
    };
    EditarEmpresaComponent.prototype.onSubmit = function (form) {
        var _this = this;
        if (form.invalid) {
            return;
        }
        sweetalert2_1["default"].fire({
            title: 'info',
            text: 'Registrando Datos', allowOutsideClick: false
        });
        sweetalert2_1["default"].showLoading();
        this.emprServi.ActualizarEmpresa(this.empresa).subscribe(function (resp) {
            sweetalert2_1["default"].close();
            sweetalert2_1["default"].fire({
                position: 'top-end',
                icon: 'success',
                title: 'RESPUESTA',
                text: 'Datos Modificados con exito',
                showConfirmButton: false,
                timer: 1500
            });
            localStorage.removeItem("idEmpresa");
            _this.router.navigateByUrl('/SX-CONSOLE/admin/empresas');
        }, function (err) {
            sweetalert2_1["default"].fire({
                title: 'Error!',
                icon: 'error',
                text: err.error.error.message
            });
        });
    };
    EditarEmpresaComponent.prototype.cancelar = function () {
        localStorage.removeItem("idEmpresa");
        this.router.navigateByUrl('/SX-CONSOLE/admin/empresas');
    };
    EditarEmpresaComponent = __decorate([
        core_1.Component({
            selector: 'app-editar-empresa',
            templateUrl: './editar-empresa.component.html',
            styles: []
        })
    ], EditarEmpresaComponent);
    return EditarEmpresaComponent;
}());
exports.EditarEmpresaComponent = EditarEmpresaComponent;
