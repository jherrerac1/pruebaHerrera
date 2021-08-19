export class CobrosModel{
    id_cobro: number;
    id_cliente: number;
    id_empresa: string;
    concepto: string;
    descripcion: string;
    valor: number;
    valor_pagado: number;
    comprobante: string;
    documento:string;
    fecha: Date;
    fecha_comprobante: Date;
    estatus:string;
    estado: string;
    create_user: string;
    create_date: Date;
    modify_user:string;
    modify_date: Date;
}