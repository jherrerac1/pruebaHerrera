import { ContratoModel } from './../models/ContratoModel';
import { CobrosModel } from './../models/CobrosModel';
import { ClienteTipoModel } from './../models/ClienteTipoModel';
import { ClienteModel } from 'src/app/models/ClienteModel';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UsuarioModel } from 'src/app/models/UsuarioModel';
import { map } from 'rxjs/operators';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})


export class BackEndService {

  private endpoint = 'http://localhost:8080/Repository/';
  private endpoint2 = 'http://157.245.177.172/Repository2/backController/';

  constructor(private http: HttpClient) { }

  ListarDocumentosClientes(cedula:string){
    //console.log("cedula =>"+cedula);
    const data = new HttpParams().set('cedula', cedula);
    return this.http.post<any>(`${this.endpoint2}ListarDocumentosClientes`, data);
  }
  // INICIO METODOS USUARIOS
  listarUsuarios() {
    return this.http.post<UsuarioModel[]>(`${this.endpoint2}ListarUsuarios`, '');
    //return this.http.post<UsuarioModel[]>(`${this.endpoint}usuarioController/ListarUsuarios`, '');
  }

  retornaUsuarioId(id: string) {
    const data = new HttpParams().set('id_user', id);
    return this.http.post<any>(`${this.endpoint2}consultaUsuarioId`, data);

  }

  guardarUsuario(u: UsuarioModel) {
    const data = new HttpParams()
      .set('apellido', u.apellido)
      .set('estado', u.estado)
      .set('id_perfil', u.id_perfil.toString())
      .set('nombre', u.nombre)
      .set('user_name', u.user_name)
      .set('password', CryptoJS.SHA1(u.password.trim()))
      .set('id_empresa', u.id_empresa.toString()).set('usuario', localStorage.getItem('nombre'));
    return this.http.post<UsuarioModel>(`${this.endpoint2}GrabarUsuario`, data);
  }

  actualizarUsuario(u: UsuarioModel) {
    let pass: string;
    if (u.password.trim() !== '') {
      pass = CryptoJS.SHA1(u.password.trim());
    } else {
      pass = '';
    }
    //console.log(u);
    const data = new HttpParams()
      .set('id_usuario', u.id_usuario.toString())
      .set('apellido', u.apellido)
      .set('estado', u.estado)
      .set('id_perfil', u.id_perfil.toString())
      .set('nombre', u.nombre)
      .set('user_name', u.user_name)
      .set('password', pass)
      .set('id_empresa', u.id_empresa.toString()).set('usuario', localStorage.getItem('nombre'));
    return this.http.post<UsuarioModel>(`${this.endpoint2}actualizarUsuario`, data);
  }

  /// FIN METODOS USUARIOS

  //CLIENTES
  listarClientes() {
    //return this.http.post<ClienteModel[]>(`${this.endpoint}ClienteController/ListarClientes`,'');
    const data = new HttpParams().set('id_empresa', localStorage.getItem('id_empresa'));
    return this.http.post<any[]>(`${this.endpoint2}listarClientes`, data);
  }

  //tipoClienteID
  ClientetipoClienteID(id: string) {
    const data = new HttpParams().set('idtipo', id);
    return this.http.post<ClienteTipoModel>(`${this.endpoint2}/tipoClienteID`, data);
  }

  listarTiposClientes() {
    return this.http.post<any[]>(`${this.endpoint2}tipoClientes`, '');
  }

  guardarCliente(c: ClienteModel) {
    // return this.http.post<ClienteModel>(`${this.endpoint}ClienteController/GuardarCLiente`, cliente);
    const user = localStorage.getItem('nombre');
    const data = new HttpParams().set('apellido', c.apellido)
      .set('ciudad', c.ciudad.toString())
      .set('cod_clt', c.cod_clt)
      .set('coordenadas', c.coordenadas)
      .set('direccion', c.direccion)
      .set('discapacidad', c.discapacidad.toString())
      .set('dni', c.dni)
      .set('estado', c.estado)
      .set('idTipo', c.idTipo.id_tipo.toString())
      .set('id_empresa', c.id_empresa.id_empresa.toString())
      .set('mail', c.mail)
      .set('nombre', c.nombre)
      .set('pais', c.pais.toString())
      .set('provincia', c.provincia.toString())
      .set('referencia', c.referencia)
      .set('telef', c.telef)
      .set('doc_route',localStorage.getItem('doc_route'))
      .set('telef_adic', c.telef_adic).set('usuario', user);
    return this.http.post(`${this.endpoint2}GrabarCliente`, data);
  }

  actualizarCliente(c: ClienteModel) {
    console.log(c);
    const user = localStorage.getItem('nombre');
    const data = new HttpParams().set('apellido', c.apellido)
      .set('ciudad', c.ciudad.toString())
      .set('cod_clt', c.cod_clt)
      .set('coordenadas', c.coordenadas)
      .set('direccion', c.direccion)
      .set('discapacidad', c.discapacidad.toString())
      .set('dni', c.dni)
      .set('estado', c.estado)
      .set('idTipo', c.idTipo.id_tipo.toString())
      .set('id_empresa', c.id_empresa.id_empresa.toString())
      .set('mail', c.mail)
      .set('nombre', c.nombre)
      .set('pais', c.pais.toString())
      .set('provincia', c.provincia.toString())
      .set('referencia', c.referencia)
      .set('telef', c.telef)
      .set('doc_route',localStorage.getItem('doc_route'))
      .set('telef_adic', c.telef_adic).set('usuario', user).set('id_cliente', c.id_cliente.toString());
    return this.http.post(`${this.endpoint2}ActualizaCliente`, data);
    //return this.http.post(`${this.endpoint2}ActualizarCliente`, null);
  }

  CLienteID(id: string) {
    const data = new HttpParams().set('idCliente', id);
    //return this.http.post<ClienteModel>(`${this.endpoint}ClienteController/CLienteID`, data);
    return this.http.post(`${this.endpoint2}retornaClienteId`, data);
  }

  //COBROS
  guardarCobros(c: CobrosModel) {
    const user = localStorage.getItem('nombre');
    const data = new HttpParams().set('id_cliente', c.id_cliente.toString())
    .set('concepto', c.concepto)
    .set('descripcion', c.descripcion)
    .set('estatus', c.estatus)
    .set('fecha', c.fecha.toString())
    .set('valor', c.valor.toString())
    .set('id_empresa', localStorage.getItem('id_empresa'))
    .set('user',user);
    return this.http.post(`${this.endpoint2}registroCobros`, data);
  }

  guardarPago(c: CobrosModel) {
    const user = localStorage.getItem('nombre');
    const data = new HttpParams().set('id_cliente', c.id_cliente.toString())
    .set('id_cobro',c.id_cobro.toString())
    .set('concepto', c.concepto)
    .set('descripcion', c.descripcion)
    .set('estatus', c.estatus)
    .set('fecha', c.fecha.toString())
    .set('valor', c.valor.toString())
    .set('valor_pagado', c.valor_pagado.toString())
    .set('comprobante', c.comprobante.toString())
    .set('fecha_comprobante', c.fecha_comprobante.toString())
    .set('documento', localStorage.getItem('doc_comprobante'))
    .set('id_empresa', localStorage.getItem('id_empresa'))
    .set('user',user);
    return this.http.post(`${this.endpoint2}actualizaCobros`, data);
  }

  consultaCobroID(id_cobro: string){
    const data = new HttpParams().set('id_cobro', id_cobro);
    return this.http.post<CobrosModel>(`${this.endpoint2}cobrosById`,data);
  }
  
  retornaCobrosPorPagar(){
    const data = new HttpParams().set('Id_empresa', localStorage.getItem('id_empresa'));
    return this.http.post<any[]>(`${this.endpoint2}retornaCobrosPorPagar`, data);
  }
 
  /////////////////////////////////////////////////////////
  //http://157.245.177.172/Repository2/backController/listarContratosRegistrados
  retornaPlanes(tipo: string) {
    const data = new HttpParams().set('tipo', tipo);
    return this.http.post<any[]>(`${this.endpoint2}retornaPlan`, data);
  }

  consultaEquipoId(id: string){
    const data = new HttpParams().set('id', id).set('id_empresa', localStorage.getItem('id_empresa'));
    return this.http.post<any[]>(`${this.endpoint2}retornaEquipoID`, data);
  }

  consultaPlanId(id: string){
    const data = new HttpParams().set('id', id);
    return this.http.post<any[]>(`${this.endpoint2}retornaPlanID`, data);
  }

  retornaContratos() {
    const data = new HttpParams().set('IdEmpresa', localStorage.getItem('id_empresa'));
    return this.http.post<any[]>(`${this.endpoint2}listarContratosRegistrados`, data);
  }

  retornaAllContratos() {
    const data = new HttpParams().set('IdEmpresa', localStorage.getItem('id_empresa'));
    return this.http.post<any[]>(`${this.endpoint2}listarAllContratos`, data);
  }

  grabarContrato(contrato: ContratoModel, equipos: any) {
    const user = localStorage.getItem('nombre');
    const data = new HttpParams()
    .set('id_cliente', contrato.id_cliente.toString())
    .set('id_plan', contrato.id_plan.toString())
    .set('fecha_corte', contrato.fecha_corte.toString())
    .set('val_install', contrato.val_install.toString())
    .set('usuario', user)
    .set('equi_compra_id',equipos.equiCompra)
    .set('equi_carriendo_id',equipos.equiArriendo)
    .set('equi_compra_valor',equipos.val_equipoC)
    .set('id_empresa',localStorage.getItem('id_empresa'));
    return this.http.post(`${this.endpoint2}grabarContrato`, data);
  }

  retorna_Contrato(id_contrato: string){
    const data = new HttpParams().set('id', id_contrato);
    return this.http.post<any[]>(`${this.endpoint2}retornaInfoContrato`, data);
  }

  retorna_EquipoCliente(id_contrato: string, id_cliente:string, tipo:string){
    const data = new HttpParams().set('id', id_cliente).set('id_contrato',id_contrato).set('tipo',tipo);
    return this.http.post<any[]>(`${this.endpoint2}retornaEquipoCliente`, data);
  }

  
  /////////////////////////////////////////////////////////////
}
