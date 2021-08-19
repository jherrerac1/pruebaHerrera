"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.NuevaEmpresaComponent = void 0;
var EmpresaModel_1 = require("src/app/models/EmpresaModel");
var core_1 = require("@angular/core");
var sweetalert2_1 = require("sweetalert2");
var NuevaEmpresaComponent = /** @class */ (function () {
    function NuevaEmpresaComponent(router, empreServi) {
        this.router = router;
        this.empreServi = empreServi;
        this.empresa = new EmpresaModel_1.Empresa();
    }
    NuevaEmpresaComponent.prototype.ngOnInit = function () {
    };
    NuevaEmpresaComponent.prototype.cancelar = function () {
        this.router.navigateByUrl('/SX-CONSOLE/admin/empresas');
    };
    NuevaEmpresaComponent.prototype.guardar = function () {
        console.log(this.empresa);
    };
    NuevaEmpresaComponent.prototype.onSubmit = function (form) {
        var _this = this;
        //console.log(this.empresa);
        if (form.invalid) {
            //console.log(form);
            return;
        }
        sweetalert2_1["default"].fire({
            title: 'info',
            text: 'Registrando Datos', allowOutsideClick: false
        });
        sweetalert2_1["default"].showLoading();
        this.empreServi.guardarEmpresa(this.empresa).subscribe(function (resp) {
            //console.log(resp);
            /*if(eval(resp.data)){
              console.log(resp.data['nombre']);
              console.log(resp.data['apellido']);
              console.log(resp.data['perfil'].id_perfil);
            }*/
            sweetalert2_1["default"].close();
            // this.router.navigateByUrl('/sx_console/home');
            sweetalert2_1["default"].fire({
                position: 'top-end',
                title: 'Respuesta',
                icon: 'success',
                text: 'DATOS GRABADOS CON EXITO',
                showConfirmButton: false,
                timer: 1500
            });
            _this.router.navigateByUrl('/SX-CONSOLE/admin/empresas');
        }, function (err) {
            sweetalert2_1["default"].fire({
                title: 'Error!',
                icon: 'error',
                text: err.error.error.message
            });
        });
    };
    NuevaEmpresaComponent = __decorate([
        core_1.Component({
            selector: 'app-nueva-empresa',
            templateUrl: './nueva-empresa.component.html',
            styles: []
        })
    ], NuevaEmpresaComponent);
    return NuevaEmpresaComponent;
}());
exports.NuevaEmpresaComponent = NuevaEmpresaComponent;
