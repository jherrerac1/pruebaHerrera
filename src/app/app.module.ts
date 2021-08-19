import { FilePdfService } from './services/file-pdf.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SiteLayoutComponent } from './components/_layout/site-layout/site-layout.component';
import { SiteHeaderComponent } from './components/_layout/site-header/site-header.component';
import { SiteHeader2Component } from './components/_layout/site-header2/site-header2.component';
import { SiteNavbarComponent } from './components/_layout/site-navbar/site-navbar.component';
import { SiteFooterComponent } from './components/_layout/site-footer/site-footer.component';
import { SiteLayout2Component } from './components/_layout/site-layout2/site-layout2.component';
import { SiteNavbar2Component } from './components/_layout/site-navbar2/site-navbar2.component';
import { ListarEmpresaComponent } from './components/admin/EmpresaController/listar-empresa/listar-empresa.component';
import { NuevaEmpresaComponent } from './components/admin/EmpresaController/nueva-empresa/nueva-empresa.component';
import { EditarEmpresaComponent } from './components/admin/EmpresaController/editar-empresa/editar-empresa.component';
import { ListarUsuariosComponent } from './components/admin/UsuarioController/listar-usuarios/listar-usuarios.component';
import { NuevoUsuarioComponent } from './components/admin/UsuarioController/nuevo-usuario/nuevo-usuario.component';
import { EditarUsuarioComponent } from './components/admin/UsuarioController/editar-usuario/editar-usuario.component';

// para hacer peticiones http
import { HttpClientModule } from '@angular/common/http';
import { FormsModule} from '@angular/forms';
import { EmpreServicesService } from 'src/app/services/empre-services.service';
//DATATABLES
import { DataTablesModule } from 'angular-datatables';
import { SiteLayout3Component } from './components/_layout/site-layout3/site-layout3.component';
import { ClientesComponent } from './components/general/clienteController/clientes/clientes.component';
import { AddClientesComponent } from './components/general/clienteController/add-clientes/add-clientes.component';
import { EditClientesComponent } from './components/general/clienteController/edit-clientes/edit-clientes.component';
import { CobrosComponent } from './components/general/cobrosController/cobros/cobros.component';
import { AddCobrosComponent } from './components/general/cobrosController/add-cobros/add-cobros.component';

import { FileuploadService } from './services/fileupload.service';
import { ListarContratosComponent } from './components/general/contratos/listar-contratos/listar-contratos.component';
import { NewContratoComponent } from './components/general/contratos/new-contrato/new-contrato.component';
import { EditContratoComponent } from './components/general/contratos/edit-contrato/edit-contrato.component';

// Import pdfmake-wrapper and the fonts to use
import { PdfMakeWrapper } from 'pdfmake-wrapper';
import pdfFonts from "pdfmake/build/vfs_fonts";
import { AllContratosComponent } from './components/general/contratos/all-contratos/all-contratos.component';
import { UpdateCobrosComponent } from './components/general/cobrosController/update-cobros/update-cobros.component'; // fonts provided for pdfmake

// Set the fonts to use
PdfMakeWrapper.setFonts(pdfFonts);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SiteLayoutComponent,
    SiteHeaderComponent,
    SiteHeader2Component,
    SiteNavbarComponent,
    SiteFooterComponent,
    SiteLayout2Component,
    SiteNavbar2Component,
    ListarEmpresaComponent,
    NuevaEmpresaComponent,
    EditarEmpresaComponent,
    ListarUsuariosComponent,
    NuevoUsuarioComponent,
    EditarUsuarioComponent,
    SiteLayout3Component,
    ClientesComponent,
    AddClientesComponent,
    EditClientesComponent,
    CobrosComponent,
    AddCobrosComponent,
    ListarContratosComponent,
    NewContratoComponent,
    EditContratoComponent,
    AllContratosComponent,
    UpdateCobrosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    DataTablesModule
  ],
  providers: [EmpreServicesService, FileuploadService, FilePdfService],
  bootstrap: [AppComponent]
})
export class AppModule { }
