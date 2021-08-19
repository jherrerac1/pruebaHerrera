import { UpdateCobrosComponent } from './components/general/cobrosController/update-cobros/update-cobros.component';
import { AllContratosComponent } from './components/general/contratos/all-contratos/all-contratos.component';
import { EditContratoComponent } from './components/general/contratos/edit-contrato/edit-contrato.component';
import { NewContratoComponent } from './components/general/contratos/new-contrato/new-contrato.component';
import { CobrosComponent } from './components/general/cobrosController/cobros/cobros.component';
import { AddCobrosComponent } from './components/general/cobrosController/add-cobros/add-cobros.component';
import { EditClientesComponent } from './components/general/clienteController/edit-clientes/edit-clientes.component';
import { AddClientesComponent } from './components/general/clienteController/add-clientes/add-clientes.component';
import { EditarEmpresaComponent } from './components/admin/EmpresaController/editar-empresa/editar-empresa.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SiteLayout2Component } from './components/_layout/site-layout2/site-layout2.component';
import { LoginComponent } from './components/login/login.component';
import { ListarEmpresaComponent } from './components/admin/EmpresaController/listar-empresa/listar-empresa.component';
import { ListarUsuariosComponent } from './components/admin/UsuarioController/listar-usuarios/listar-usuarios.component';
import { SiteLayoutComponent } from './components/_layout/site-layout/site-layout.component';
import { NuevaEmpresaComponent } from './components/admin/EmpresaController/nueva-empresa/nueva-empresa.component';
import { NuevoUsuarioComponent } from './components/admin/UsuarioController/nuevo-usuario/nuevo-usuario.component';
import { EditarUsuarioComponent } from './components/admin/UsuarioController/editar-usuario/editar-usuario.component';
import { AuthGuard } from './guards/auth.guard';
import { SiteLayout3Component } from './components/_layout/site-layout3/site-layout3.component';
import { ClientesComponent } from './components/general/clienteController/clientes/clientes.component';
import { ListarContratosComponent } from './components/general/contratos/listar-contratos/listar-contratos.component';


const routes: Routes = [
  /*{
    path: 'SX-CONSOLE',
    component: SiteLayout2Component, children: [
      { path: 'login', component: LoginComponent }
      // , { path: '**', pathMatch: 'full', redirectTo: 'SX-CONSOLE/login' }
    ]
  },*/
  {path: 'SX-CONSOLE/login',component: LoginComponent},
  // { path: '**', pathMatch: 'full', redirectTo: 'SX-CONSOLE/login' },
  {
    path: 'SX-CONSOLE/admin',
    component: SiteLayoutComponent, children: [
      { path: 'empresas', component: ListarEmpresaComponent, canActivate: [AuthGuard] },
      { path: 'nuevaEmpresa', component: NuevaEmpresaComponent, canActivate: [AuthGuard] },
      { path: 'editarEmpresa', component: EditarEmpresaComponent, canActivate: [AuthGuard] },
      { path: 'usuarios', component: ListarUsuariosComponent, canActivate: [AuthGuard] },
      { path: 'nuevoUsuario', component: NuevoUsuarioComponent, canActivate: [AuthGuard] },
      { path: 'editarUsuario', component: EditarUsuarioComponent, canActivate: [AuthGuard] }
    ], canActivate: [AuthGuard]
  }
  /// SX-CONSOLE/general/clientes
  , {
    path: 'SX-CONSOLE/general', component: SiteLayout3Component, children: [
      { path: 'clientes', component: ClientesComponent }
      , { path: 'addClientes', component: AddClientesComponent}
      , { path: 'editClientes', component: EditClientesComponent}
      , { path: 'cobros', component: AddCobrosComponent}
      , { path: 'Listadocobros', component: CobrosComponent}
      , { path: 'pagos', component: UpdateCobrosComponent}
      , { path: 'contratos', component: ListarContratosComponent}
      , { path: 'listContratos', component: AllContratosComponent}
      , { path: 'newContrato', component: NewContratoComponent}
      , { path: 'editContrato', component: EditContratoComponent}
    ]
  }
  , { path: '**', pathMatch: 'full', redirectTo: 'SX-CONSOLE/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
