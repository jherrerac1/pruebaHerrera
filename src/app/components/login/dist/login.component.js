"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LoginComponent = void 0;
var core_1 = require("@angular/core");
var UsuarioModel_1 = require("src/app/models/UsuarioModel");
var sweetalert2_1 = require("sweetalert2");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(router, auth) {
        this.router = router;
        this.auth = auth;
        this.usuario = new UsuarioModel_1.UsuarioModel();
    }
    LoginComponent.prototype.ngOnInit = function () {
    };
    LoginComponent.prototype.onSubmit = function (form) {
        var _this = this;
        if (form.invalid) {
            return;
        }
        sweetalert2_1["default"].fire({ title: 'info',
            text: 'Validadndo Datos', allowOutsideClick: false });
        sweetalert2_1["default"].showLoading();
        this.auth.login(this.usuario).subscribe(function (resp) {
            sweetalert2_1["default"].close();
            if (resp['data']['perfil'] == '1') {
                _this.router.navigateByUrl('/SX-CONSOLE/admin/empresas');
            }
            else {
                _this.router.navigateByUrl('/SX-CONSOLE/general/clientes');
            }
        }, function (err) {
            sweetalert2_1["default"].fire({
                title: 'Error!',
                icon: 'error',
                text: err.error.error.message
            });
        });
    };
    LoginComponent.prototype.login = function () {
        console.log("HOLAAA");
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'app-login',
            templateUrl: './login.component.html',
            styles: []
        })
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
