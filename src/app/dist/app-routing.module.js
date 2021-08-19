"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppRoutingModule = void 0;
var editar_empresa_component_1 = require("./components/admin/EmpresaController/editar-empresa/editar-empresa.component");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var site_layout2_component_1 = require("./components/_layout/site-layout2/site-layout2.component");
var login_component_1 = require("./components/login/login.component");
var listar_empresa_component_1 = require("./components/admin/EmpresaController/listar-empresa/listar-empresa.component");
var listar_usuarios_component_1 = require("./components/admin/UsuarioController/listar-usuarios/listar-usuarios.component");
var site_layout_component_1 = require("./components/_layout/site-layout/site-layout.component");
var nueva_empresa_component_1 = require("./components/admin/EmpresaController/nueva-empresa/nueva-empresa.component");
var nuevo_usuario_component_1 = require("./components/admin/UsuarioController/nuevo-usuario/nuevo-usuario.component");
var editar_usuario_component_1 = require("./components/admin/UsuarioController/editar-usuario/editar-usuario.component");
var auth_guard_1 = require("./guards/auth.guard");
var site_layout3_component_1 = require("./components/_layout/site-layout3/site-layout3.component");
var clientes_component_1 = require("./components/general/clienteController/clientes/clientes.component");
var routes = [
    {
        path: 'SX-CONSOLE',
        component: site_layout2_component_1.SiteLayout2Component, children: [
            { path: 'login', component: login_component_1.LoginComponent }
            //, { path: '**', pathMatch: 'full', redirectTo: 'SX-CONSOLE/login' }
        ]
    },
    // { path: '**', pathMatch: 'full', redirectTo: 'SX-CONSOLE/login' },
    {
        path: 'SX-CONSOLE/admin',
        component: site_layout_component_1.SiteLayoutComponent, children: [
            { path: 'empresas', component: listar_empresa_component_1.ListarEmpresaComponent, canActivate: [auth_guard_1.AuthGuard] },
            { path: 'nuevaEmpresa', component: nueva_empresa_component_1.NuevaEmpresaComponent, canActivate: [auth_guard_1.AuthGuard] },
            { path: 'editarEmpresa', component: editar_empresa_component_1.EditarEmpresaComponent, canActivate: [auth_guard_1.AuthGuard] },
            { path: 'usuarios', component: listar_usuarios_component_1.ListarUsuariosComponent, canActivate: [auth_guard_1.AuthGuard] },
            { path: 'nuevoUsuario', component: nuevo_usuario_component_1.NuevoUsuarioComponent, canActivate: [auth_guard_1.AuthGuard] },
            { path: 'editarUsuario', component: editar_usuario_component_1.EditarUsuarioComponent, canActivate: [auth_guard_1.AuthGuard] }
        ], canActivate: [auth_guard_1.AuthGuard]
    }
    ///SX-CONSOLE/general/clientes
    ,
    {
        path: 'SX-CONSOLE/general', component: site_layout3_component_1.SiteLayout3Component, children: [
            { path: 'clientes', component: clientes_component_1.ClientesComponent }
        ]
    },
    { path: '**', pathMatch: 'full', redirectTo: 'SX-CONSOLE/login' }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes)],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
