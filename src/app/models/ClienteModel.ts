import { ClienteTipoModel } from './ClienteTipoModel';
import { Empresa } from './EmpresaModel';
export class ClienteModel {
    id_cliente: number;
    nombre: string;
    apellido: string;
    pais: number;
    provincia: number;
    ciudad: number;
    localidad: number;
    cod_clt: string;
    coordenadas: string;
    referencia: string;
    direccion: string;
    telef: string;
    telef_adic: string;
    mail: string;
    dni: string;
    estado: string;
    user_creacion: string;
    fecha_creacion: Date;
    user_actualizacion: string;
    fecha_actualizacion: Date;
    id_empresa: Empresa;
    idTipo: ClienteTipoModel;
    doc: string;
    val_install:number;
    discapacidad: number;
    
}