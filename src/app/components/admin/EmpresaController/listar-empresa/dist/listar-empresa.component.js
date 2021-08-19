"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ListarEmpresaComponent = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var DataTablesResponse = /** @class */ (function () {
    function DataTablesResponse() {
    }
    return DataTablesResponse;
}());
var ListarEmpresaComponent = /** @class */ (function () {
    function ListarEmpresaComponent(empreServi, router) {
        this.empreServi = empreServi;
        this.router = router;
        this.dtOptions = {};
        this.dtTrigger = new rxjs_1.Subject();
    }
    ListarEmpresaComponent.prototype.ngOnInit = function () {
        this.ListarEmpresa();
    };
    ListarEmpresaComponent.prototype.ListarEmpresa = function () {
        var _this = this;
        /*console.log(' Consultando Empresas registradas');*/
        this.empreServi.listarEmpresa().subscribe(function (data) {
            //console.log(data);
            _this.empresas = data;
            _this.dtTrigger.next();
        });
        this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 10,
            responsive: true
        };
    };
    ListarEmpresaComponent.prototype.editarEmpresa = function (empresa) {
        //console.log(empresa.idEmpresa);
        localStorage.setItem('idEmpresa', empresa.idEmpresa.toString());
        this.router.navigateByUrl('/SX-CONSOLE/admin/editarEmpresa');
    };
    /*private extractData(res: Response) {
      const body = res.json();
      return body || {};
    }*/
    ListarEmpresaComponent.prototype.nuevaEmpresa = function () {
        this.router.navigateByUrl('/SX-CONSOLE/admin/nuevaEmpresa');
    };
    ListarEmpresaComponent = __decorate([
        core_1.Component({
            selector: 'app-listar-empresa',
            templateUrl: './listar-empresa.component.html',
            styles: []
        })
    ], ListarEmpresaComponent);
    return ListarEmpresaComponent;
}());
exports.ListarEmpresaComponent = ListarEmpresaComponent;
