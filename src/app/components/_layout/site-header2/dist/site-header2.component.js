"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SiteHeader2Component = void 0;
var core_1 = require("@angular/core");
var SiteHeader2Component = /** @class */ (function () {
    function SiteHeader2Component(route, auth) {
        this.route = route;
        this.auth = auth;
    }
    SiteHeader2Component.prototype.ngOnInit = function () {
        document.getElementById('principal_body').className = 'hold-transition sidebar-mini layout-fixed layout-navbar-fixed layout-footer-fixed img_font';
    };
    SiteHeader2Component.prototype.salir = function () {
        this.auth.logaut();
        this.route.navigateByUrl('/SX-CONSOLE/login');
    };
    SiteHeader2Component = __decorate([
        core_1.Component({
            selector: 'app-site-header2',
            templateUrl: './site-header2.component.html',
            styles: []
        })
    ], SiteHeader2Component);
    return SiteHeader2Component;
}());
exports.SiteHeader2Component = SiteHeader2Component;
