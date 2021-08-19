<?php

class BackEndModel extends CI_Model {
    
     function __construct() {
        parent::__construct();
        $this->db->trans_strict(FALSE);
        $this->db->trans_off();
        $this->db->save_queries = FALSE;
        $this->db->flush_cache();
    }
    
    function validarUsuario($usuario,$pass){
        $data = null;
        $error=false;
        $mensaje="OK";
        $sql = "SELECT * from usuario where user_name='$usuario' and estado='A'";
        //echo $sql;
        $rs =  $this->db->query($sql);
        $dat = $rs->row_array(0);
        if(isset($dat['user_name'])){
            if(trim($dat['password'])==trim($pass)){
                $data=$dat;
            }else{
                $error=true;
                $mensaje="CLAVE INCORRECTA";
            }
        }else{
            $error=true;
            $mensaje="NOMBRE DE USUARIO INCORRECTO";
        }
        $result['error']=$error;
        $result['mensaje']=$mensaje;
        $result['data']=$data;
        return $result;
        
    }
    
    function tipoClientes(){
        $data = null;
        $sql = "select  * from cliente_tipo where estado = 'A'";
        $rs =  $this->db->query($sql);
        foreach ($rs->result_array() as $row){
            foreach($row as $key => $val){ 
                $datos[$key]=$val;
            }
            $data[]=$datos;
            $datos=null;
        }
        $rs->free_result();
        return $data;
    }
    function empresaID($id){
        $data = null;
        $sql = "select  * from empresa where estado = 'A' and id_empresa='$id'";
        $rs =  $this->db->query($sql);
        $data = $rs->row_array(0);
        return $data;
    }
    
    function usuarioID($id){
        $data = null;
        $sql = "select  * from usuario where estado = 'A' and id_usuario='$id'";
        $rs =  $this->db->query($sql);
        $data = $rs->row_array(0);
        $data['password']='';
        return $data;
    }
    
    function consultaComercio($tipo){
        $data = null;
        $sql = "select  * from cliente_tipo where estado = 'A' and id_tipo='$tipo'";
        $rs =  $this->db->query($sql);
        $data = $rs->row_array(0);
        return $data;
    }
    /**/
    
    function consultaMarca($tipo,$empresa){
        $data = null;
        $sql="";
        if($tipo == 'A'){
            $sql= "select m.* from marca_equi m 
inner join modelo_equi mo on mo.id_marca = m.id_marca and mo.estado='A'
inner join emp_equipos ee on ee.id_modelo = mo.id_modelo and ee.tipo='ARRIENDO' and ee.estado='A' and ee.id_empresa='$empresa'
where m.estado='A';";
        }else{
            $sql = "select m.* from marca_equi m 
inner join modelo_equi mo on mo.id_marca = m.id_marca and mo.estado='A'
inner join emp_equipos ee on ee.id_modelo = mo.id_modelo and ee.tipo='COMPRA' and ee.estado='A' and ee.id_empresa='$empresa'
left outer join  equip_cliente ec on ec.id_equipo = ee.id 
where m.estado='A';";
        }
        
        $rs =  $this->db->query($sql);
        foreach ($rs->result_array() as $row){
            foreach($row as $key => $val){ 
                $datos[$key]=$val;
            }
            $data[]=$datos;
            $datos=null;
        }
        $rs->free_result();
        return $data;
    }
    
    function consultarModeloEquipos($id_marca){
        $data = null;
        $sql = "select * from modelo_equi where estado='A' and id_marca='$id_marca'";
        $rs =  $this->db->query($sql);
        foreach ($rs->result_array() as $row){
            foreach($row as $key => $val){ 
                $datos[$key]=$val;
            }
            $data[]=$datos;
            $datos=null;
        }
        $rs->free_result();
        return $data;
    }
    
    function consultarEquipos($id_modelo,$tipo,$empresa){
        $data = null;
        $cond =(trim($tipo)=='A')?"and tipo = 'ARRIENDO'":"and tipo = 'COMPRA' and asiganado is null ";
        $sql = "select * from emp_equipos where estado='A' and id_modelo='$id_modelo' $cond  and id_empresa='$empresa'";
        $rs =  $this->db->query($sql);
        foreach ($rs->result_array() as $row){
            foreach($row as $key => $val){ 
                $datos[$key]=$val;
            }
            $data[]=$datos;
            $datos=null;
        }
        $rs->free_result();
        return $data;
    }
    
    function consultaLocation($tipo,$padre){
        $data = null;
        $condi='';
        if($padre != 'null'){
            $condi = "l.id_padre ='$padre' and ";
        }
        $sql= "select l.id_location as id, l.nombre  as descripcion from location l where $condi l.tipo='$tipo' and l.estado ='A'";
        //echo $sql;
        $rs =  $this->db->query($sql);
        foreach ($rs->result_array() as $row){
            foreach($row as $key => $val){ 
                $datos[$key]=$val;
            }
            $data[]=$datos;
            $datos=null;
        }
        $rs->free_result();
        return $data;
    }
    /*###############CLIENTES*/
    function retornaEmpresa(){
        $data=null;
        $sql = "SELECT * FROM empresa where estado='A'";
        $rs =  $this->db->query($sql);
        foreach ($rs->result_array() as $row){
            foreach($row as $key => $val){ 
                $datos[$key]=$val;
            }
            $data[]=$datos;
            $datos=null;
        }
        $rs->free_result();
        return $data;
    }
    
    function retornaUsuarios(){
        $data = null;
        $sql = "select * from usuario u where estado ='A'";
        $rs =  $this->db->query($sql);
        foreach ($rs->result_array() as $row){
            foreach($row as $key => $val){ 
                $datos[$key]=$val;
            }
            $data[]=$datos;
            $datos=null;
        }
        $rs->free_result();
        return $data;
    }
    
    function retornaClientes($empresa){
        $data=null;
        $sql="select c.*,e.nombre  as empresa,ct.descripcion as comercio from cliente c  
inner join empresa e on e.id_empresa =c.id_empresa and e.estado ='A'
inner join cliente_tipo ct on ct.id_tipo = c.id_tipo and ct.estado ='A'
where c.id_empresa ='$empresa' and c.estado ='A'";
$rs =  $this->db->query($sql);
        foreach ($rs->result_array() as $row){
            foreach($row as $key => $val){ 
                $datos[$key]=$val;
            }
            $data[]=$datos;
            $datos=null;
        }
        $rs->free_result();
        return $data;
    }
    /*#############################################*/
    /**/
    function retornaCobrosPorPagar($idempresa){
        $data = null;
        $sql ="select c.id_cobro ,c.concepto,c.descripcion,c.estatus,c.valor ,c.id_cliente,cl.nombre,cl.apellido,
(case when c.concepto ='I1P' then 'INSTALACION (PRIMERA VEZ)'else 
(case when c.concepto ='PM' then 'PAGO MENSUAL' else (case when c.concepto ='MT' then 'MANTENIMIENTO ' else 'RECONEXION' end) end)
end) as concept_full
from cobros c 
inner join cliente cl on cl.id_cliente  = c.id_cliente and cl.estado ='A'
where c.id_empresa ='$idempresa' and c.estatus  <> 'PAGO TOTAL'";
        $rs =  $this->db->query($sql);
        foreach ($rs->result_array() as $row){
            foreach($row as $key => $val){ 
                $datos[$key]=$val;
            }
            $data[]=$datos;
            $datos=null;
        }
        $rs->free_result();
        return $data;
    }
    
    function cobrosById($id_cobro){
        $data = null;
        $sql="Select * from cobros where id_cobro ='$id_cobro' and estatus <>'PAGADO'";
        $rs =  $this->db->query($sql);
        $data = $rs->row_array(0);
        return $data;
    }
    
    function retornaEquipoID($id,$empresa){
        $data = null;
        $sql="Select * from emp_equipos where id ='$id' and id_empresa = '$empresa' and estado='A'";
        $rs =  $this->db->query($sql);
        $data = $rs->row_array(0);
        return $data;
    }
    
    function retornaEquipoCliente($id,$contra,$tipo){
        $data = null;
        $sql = "select eq.*,mo.nombre as modelo, ma.nombre as marca from equip_cliente ec
inner join emp_equipos eq on eq.id = ec.id_equipo and eq.tipo ='$tipo'
inner join modelo_equi mo on mo.id_modelo = eq.id_modelo and mo.estado ='A'
inner join marca_equi ma on ma.id_marca = mo.id_marca  and ma.estado ='A'
where ec.id_cliente ='$id' and ec.id_contrato ='$contra'";
        $rs =  $this->db->query($sql);
        $data = $rs->row_array(0);
        return $data;
    }
    
    
    
    
    function contratos($idempresa){
        $data=null;
        $sql= "select c.*,cl.apellido ,cl.nombre,p.descripcion as nombreplan,cl.id_empresa,ct.descripcion as tipo from contrato c  
inner join cliente cl on cl.id_cliente = c.id_cliente and cl.estado ='A' and cl.id_empresa ='$idempresa'
inner join cliente_tipo ct on ct.id_tipo =cl.id_tipo  and ct.estado ='A'
inner join plan p on p.id_plan = c.id_plan and c.estado ='A'
where c.estado ='A'";
        $rs =  $this->db->query($sql);
                foreach ($rs->result_array() as $row){
                    foreach($row as $key => $val){ 
                        $datos[$key]=$val;
                    }
                    $data[]=$datos;
                    $datos=null;
                }
                $rs->free_result();
                return $data;
    }
    
    function retornaContratos($idempresa){
        $data=null;
        $sql = " select c.*,ct.descripcion as comercio from cliente c 
inner join cliente_tipo  ct on ct.id_tipo  = c.id_tipo  and ct.estado ='A'
where c.id_cliente  not in (select c2.id_cliente  from contrato c2  where c2.estado ='A')";

        $sql = "select c.apellido ,c.nombre,c.id_cliente ,c.id_tipo ,ct.descripcion as comercio,
(select count(c2.id_cliente)  from contrato c2  where c2.estado ='A') as contrato
from cliente c 
inner join cliente_tipo  ct on ct.id_tipo  = c.id_tipo  and ct.estado ='A' and c.id_cliente  not in (select c2.id_cliente  from contrato c2  where c2.estado ='A') and c.id_empresa='$idempresa'";
        $rs =  $this->db->query($sql);
        foreach ($rs->result_array() as $row){
            foreach($row as $key => $val){ 
                $datos[$key]=$val;
            }
            $data[]=$datos;
            $datos=null;
        }
        $rs->free_result();
        return $data;
    }
    
    
    function retornaPlan($tipo){
        $data=null;
        $sql = "select p.* from plan p where p.tipo ='$tipo' and p.estado ='A';";
        $rs =  $this->db->query($sql);
        foreach ($rs->result_array() as $row){
            foreach($row as $key => $val){ 
                $datos[$key]=$val;
            }
            $data[]=$datos;
            $datos=null;
        }
        $rs->free_result();
        return $data;
         
    }
    
    function grabarContrato($data){
        //print_r($data);
        $error=false;
        $mensaje="OK";
        $contatoN=null;
        //Array ( [id_cliente] => 2 [id_plan] => 1 [fecha_corte] => 2020-09-02 [val_install] => 0 [usuario] => null )
        $sql = "select MAX(id_contrato) as id_contrato from contrato c ;";
        $rs =  $this->db->query($sql);
        $c = $rs->row_array(0);
        $rs->free_result();
        if(isset($c['id_contrato']) && $c['id_contrato'] != null ){
            $id_contrato = $c['id_contrato']+1;
        }else{
            $id_contrato = 1;
        }
        
        $sql = "select p.* from plan p where p.id_plan ='$data[id_plan]' and p.estado ='A';";
        $rs =  $this->db->query($sql);
        $plan = $rs->row_array(0);
        $rs->free_result();
        $ftemp = explode("-",$data['fecha_corte']);
        $val_isntalacion = 0;
        if(isset($data['equi_compra_valor']) && ($data['equi_compra_valor'] != null || $data['equi_compra_valor']>0)){
            $val_isntalacion = $data['equi_compra_valor']+$data['val_install'];
        }else{
            $val_isntalacion = $data['val_install'];
        }
        $sql2 = "INSERT INTO contrato (id_contrato,id_cliente,id_plan,fecha_corte,fecha_inicio,dia_corte,estado,estatus,create_by,create_date,val_install)";
        $sql2 .= " values('$id_contrato','$data[id_cliente]','$data[id_plan]','$data[fecha_corte]','$data[fecha_corte]','$ftemp[2]','A','ACTIVO','$data[usuario]',current_date(),'$val_isntalacion')";
        if(!$this->db->query($sql2)){
            $error=true;
            $mensaje="ERROR AL GRABAR DATOS";
        }else{
            $contatoN=$id_contrato;
            //print_r($data); die();
            ///ASIGNANDO EQUIPOS///
            $arriendo = $this->asignarEquipo($data['id_cliente'],$id_contrato,$data['equi_carriendo_id'],$data['usuario']);
            $compra = $this->asignarEquipo($data['id_cliente'],$id_contrato,$data['equi_compra_id'],$data['usuario']);
            if($arriendo =='OK' && $compra =='OK'){
                $mensaje .= "EQUIPOS ASIGANDOS CORRECTAMENTE";
            }else{
                $error=true;
                $mensaje="EQUIPOS NO ASIGANDOS";
            }
            
            $cobro = null;
            $cobro['id_cliente']=$data['id_cliente'];
            $cobro['id_empresa']=$data['id_empresa'];
            $cobro['concepto']='I1P';
            $cobro['descripcion']='VALOR MENSUAL + INSTAÑACION';
            $cobro['valor']=$val_isntalacion;
            $cobro['fecha']=$data['fecha_corte'];
            $cobro['estatus']='POR PAGAR';
            $cobro['user']=$data['usuario'];
            if(!$this->grabarCobro($cobro)){
                $error=true;
                $mensaje="SE GENERO EL CONTRATO PERO NO SE REGISTRO COBRO LLAME AL ADMINISTRADOR";
            }else{
                $mensaje .= "SE GENERO COBRO PENDIENTE DE PAGO VAYA A LA OPCION DE CUENTAS POR COBRAR";
            }
            ///GENERANDO COBROS///
//'$data[concepto]','$data[descripcion]','$data[valor]','$data[fecha]','$data[estatus]','A','$data[user]',current_date())";/
  //         
   /*
Array ( [id_cliente] => 10 [id_plan] => 2 [fecha_corte] => 2020-09-08 [val_install] => 65.0 [usuario] => CPOLIT 
[equi_compra_id] => 1 [equi_carriendo_id] => 2 [equi_compra_valor] => 25 ) 
            */
            
            
        }
        $result['error'] = $error;
        $result['mensaje']=$mensaje;
        $result['contrato_num']=$contatoN;
        return $result;
    }
    
    function asignarEquipo($id_cliente,$id_contrato,$id_equipo,$user){
        $data="OK";
        $sql = "INSERT INTO equip_cliente (id_cliente,id_contrato,id_equipo,create_user,create_date,estado)"; 
        $sql .= "values('$id_cliente','$id_contrato','$id_equipo','$user',current_date(),'A')";
        if(!$this->db->query($sql)){
            $data="NO";
        }
        return $data;
    }
    
    
    function retornaCliente($idCliente){
        $data=null;
        $sql="select c.* from cliente c  where c.id_cliente='$idCliente' and c.estado ='A';";
        $sql = "select c.*,p.nombre as pasinom, pr.nombre as prov,ciu.nombre as ciu, lo.nombre  as lo  from cliente c 
inner join location p on p.id_location =c.pais and p.estado ='A'
inner join location pr on pr.id_location =c.provincia and pr.estado ='A'
inner join location ciu on ciu.id_location =c.ciudad and ciu.estado ='A'
left join location lo on lo.id_location =c.localidad and lo.estado ='A'
where c.id_cliente='$idCliente' and c.estado ='A'";
        $rs =  $this->db->query($sql);
        $data = $rs->row_array(0);
        return $data;
    }
    
    function retornaInfoContrato($id){
        $data=null;
        $sql="select c.*,p.descripcion as nombre_plan,p.val_mensual,ct.comparticion,emp.razon_social ,emp.representante_legal,emp.cargo_repre,
emp.telefono ,emp.telefono_add ,pais.nombre as pais,ciud.nombre as ciudad,prov.nombre as provincia,loc.nombre as localidad, emp.direccion, emp.ruc 
from contrato c  
inner join plan p on p.id_plan  = c.id_plan and p.estado ='A'
inner join cliente_tipo  ct on ct.id_tipo  = p.tipo and ct.estado ='A'
inner join cliente  cl on cl.id_cliente = c.id_cliente  and cl.estado ='A'
inner join empresa emp on emp.id_empresa = cl.id_empresa and emp.estado ='A'
inner join location pais on pais.id_location = emp.pais 
inner join location prov on prov.id_location = emp.provincia 
inner join location ciud on ciud.id_location = emp.ciudad 
left join location loc on loc.id_location = emp.localidad 
where c.id_contrato ='$id' and c.estado ='A'";
        $rs =  $this->db->query($sql);
        $data = $rs->row_array(0);
        return $data;
    }
    
    function retornaPlanID($id){
        $data=null;
        $sql="select p.* from plan p  where p.id_plan='$id' and p.estado ='A';";
        $rs =  $this->db->query($sql);
        $data = $rs->row_array(0);
        return $data;
    }
    
    
    function actualizaCliente($data){
        //print_r($data);
        $error=false;
        $mensaje="OK";
        $sql = "select count(*) as existe from cliente where id_cliente='$data[id_cliente]' and estado='A'";
        $rs =  $this->db->query($sql);
        $cli = $rs->row_array(0);
        $rs->free_result();
        if($cli['existe']>0){
            /*
            Array ( [apellido] => HERRERA [ciudad] => 5 [cod_clt] => C001 [coordenadas] => 23131 
            [direccion] => SUBURBIO [discapacidad] => 1 [dni] => 123456789 [estado] => A [idTipo] => 2 
            [id_empresa] => 1 [mail] => JOSE.HERRERA@KNOWCELL.COM [nombre] => JOSE [pais] => 1 
            [provincia] => 3 [referencia] => null [telef] => 0986877964 [telef_adic] => 0986877964 
            [usuario] => test [id_cliente] => 7 )
            */
            $sql2= "UPDATE cliente set ";
            $sql2 .= "apellido = '$data[apellido]',ciudad='$data[ciudad]',cod_clt='$data[cod_clt]',coordenadas='$data[coordenadas]',";
            $sql2 .= "direccion='$data[direccion]',discapacidad='$data[discapacidad]',estado='$data[estado]',id_tipo='$data[idTipo]',id_empresa='$data[id_empresa]',mail='$data[mail]',nombre='$data[nombre]',pais='$data[pais]',";
            $sql2 .= "provincia='$data[provincia]',referencia='$data[referencia]',telef='$data[telef]',telef_adic='$data[telef_adic]',user_actualizacion='$data[usuario]',fecha_actualizacion = current_date(),dni='$data[dni]'";
            $sql2 .= "where estado='A' and id_cliente='$data[id_cliente]'";
            if(!$this->db->query($sql2)){
            $error=true;
            $mensaje="ERROR AL GRABAR DATOS";
        }
        }else{
            $result['error'] = true;
            $result['mensaje']="CLIENTE NO EXISTE";
            return $result;
        }
        $result['error'] = $error;
        $result['mensaje']=$mensaje;
        return $result;
    }
    
    
    function  grabarCliente($data){
        //print_r($data);
        $error=false;
        $mensaje="OK";
        $sql="select count(*) as existe from cliente where dni='$data[dni]' and estado='A'";
        $rs =  $this->db->query($sql);
        $cli = $rs->row_array(0);
        $rs->free_result();
        if($cli['existe']>0){
            $result['error'] = true;
            $result['mensaje']="CLIENTE YA HA SIDO REGISTRADO";
            return $result; 
        }
        
        $sql2 = "Insert into cliente (cod_clt,apellido,nombre,pais,provincia,ciudad,coordenadas,direccion,discapacidad,dni,id_tipo,id_empresa,mail,telef,telef_adic,estado,user_creacion,fecha_creacion)";
        $sql2 .= "values";
        $sql2 .= "('$data[cod_clt]','$data[apellido]','$data[nombre]','$data[pais]','$data[provincia]','$data[ciudad]','$data[coordenadas]','$data[direccion]','$data[discapacidad]','$data[dni]','$data[idTipo]','$data[id_empresa]','$data[mail]','$data[telef]','$data[telef_adic]','$data[estado]','$data[usuario]',current_date())";
        if(!$this->db->query($sql2)){
            $error=true;
            $mensaje="ERROR AL GRABAR DATOS";
        }
        $result['error'] = $error;
        $result['mensaje']=$mensaje;
        return $result;
        
    }
    
    function grabarEmpresa($data){
        $error=false;
        $mensaje="OK";
        $sql = "select count(*) as existe from empresa where ruc= '$data[ruc]' and estado='A'";
        $rs =  $this->db->query($sql);
        $cli = $rs->row_array(0);
        $rs->free_result();
        if($cli['existe']>0){
            $result['error'] = true;
            $result['mensaje']="YA EXISTE UNA EMPRESA REGISTRADA CON EL RUC: ".$data['ruc'];
            return $result; 
        }
        if($data['localidad']==0){
            $data['localidad']=null;
        }
        $sql2 = "INSERT INTO empresa (";
        $sql2 .= "ciudad, direccion, dni, email, localidad, logo_route, nombre, pais, provincia, razon_social,";
        $sql2 .=" representante_legal, email_repre, cargo_repre, ci_repre, ruc, site_web, telefono, telefono_add,"; 
        $sql2 .= "user_creacion, estado, fecha_creacion";
        $sql2 .= ")values(";
        $sql2 .= "'$data[ciudad]','$data[direccion]','$data[dni] ','$data[email] ','$data[localidad] ','$data[logo_route] ',";
        $sql2 .= "'$data[nombre]','$data[pais]','$data[provincia] ','$data[razon_social] ','$data[representante_legal] ','$data[email_repre] ',";
        $sql2 .= "'$data[cargo_repre]','$data[ci_repre]','$data[ruc] ','$data[site_web] ','$data[telefono] ','$data[telefono_add]',";
        $sql2 .= "'$data[usuario_creacion]','$data[estado]',current_date())";
        if(!$this->db->query($sql2)){
            $error=true;
            $mensaje="ERROR AL GRABAR DATOS";
        }
        
        $result['error'] = $error;
        $result['mensaje']=$mensaje;
        return $result;
    }
    
    function actualizaEmpresa($data){
        //print_r($data);
        $error=false;
        $mensaje="OK";
        $sql = "select count(*) as existe from empresa where id_empresa= '$data[id_empresa]' and ruc='$data[ruc]' and estado='A'";
        $rs =  $this->db->query($sql);
        $cli = $rs->row_array(0);
        $rs->free_result();
        if($cli['existe']>0){
            $sql2 = "UPDATE empresa set ";
            $sql2 .= "cargo_repre = '$data[cargo_repre]', ci_repre='$data[ci_repre]',dni='$data[dni]',direccion='$data[direccion]',email='$data[email]',email_repre='$data[email_repre]',";
            $sql2 .= "ciudad='$data[ciudad]',localidad='$data[localidad]',nombre='$data[nombre]',pais='$data[pais]',provincia='$data[provincia]',razon_social='$data[razon_social]',representante_legal='$data[representante_legal]',";
            $sql2 .= "ruc='$data[ruc]',telefono='$data[telefono]',";
            $sql2 .= "site_web ='$data[site_web]',logo_route='$data[logo_route]',";
            $sql2 .= "estado='$data[estado]',user_actualizacion='',fecha_actualizacion= current_date()";
            $sql2 .= "where id_empresa= '$data[id_empresa]' and estado='A'";
            //echo $sql2;die();
            if(!$this->db->query($sql2)){
                $error=true;
                $mensaje="ERROR AL GRABAR DATOS";
            }
        }else{
            $result['error'] = true;
            $result['mensaje']="EMPRESA NO REGISTRADA";
            return $result;
        }
        $result['error'] = $error;
        $result['mensaje']=$mensaje;
        return $result;
    }
    
    function actualizaCobros($data){
        $error=false;
        $mensaje="OK";
        $sql = "select count(*) as existe  from cobros where id_cobro='$data[id_cobro]' and id_empresa='$data[id_empresa]' and id_cliente = '$data[id_cliente]' ";
        
        //echo $sql;die();
        $rs =  $this->db->query($sql);
        $cli = $rs->row_array(0);
        $rs->free_result();
        if($cli['existe'] > 0){
            $sql2 = "Update cobros set ";
            $sql2 .= "comprobante = '$data[comprobante]', fecha_comprobante='$data[fecha_comprobante]',val_pagado='$data[valor_pagado]', estatus ='$data[estatus]',documento='$data[documento]'";
            $sql2 .= "where id_cobro='$data[id_cobro]' and id_empresa='$data[id_empresa]' and id_cliente = '$data[id_cliente]'";
            if(!$this->db->query($sql2)){
                $error=true;
                $mensaje="ERROR AL GRABAR DATOS";
                /*if(trim($data['estatus']) == 'PAGO PARCIAL'){
                    $data['estatus'] = 'POR PAGAR';
                    $data['descripcion'] = 'VALOR FALTANTE DE COBRO #'.$data['id_cobro'];
                    $tis->grabarCobro();
                }*/
            }
        }else{
            $result['error'] = true;
            $result['mensaje']="NO EXISTE UN REGISTRO DE COBRO : ".$data['concepto']." DEL CLIENTE, LLAMAR A ADMIN";
            return $result; 
        }
        $result['error'] = $error;
        $result['mensaje']=$mensaje;
        return $result;
    }
    
    function grabarCobro($data){
        $error=false;
        $mensaje="OK";
        $sql = "";
        if($data['concepto'] =='I1P'){
            $sql = "select count(*) as existe  from cobros where concepto ='I1P' and id_cliente='$data[id_cliente]' ";
            $sql .= "and id_cliente in (select c.id_cliente from cliente c where c.id_cliente='$data[id_cliente]' and c.estado='A')";
        }else if($data['concepto'] == "PM"){
            $sql = "select count(*) as existe  from cobros where concepto ='PM' and fecha='$data[fecha]'";
        }
        
        if($data['concepto'] == "PM" || $data['concepto'] == "I1P" ){
            //echo $sql;die();
            $rs =  $this->db->query($sql);
            $cli = $rs->row_array(0);
            $rs->free_result();
            if($cli['existe'] > 0){
                $result['error'] = true;
                $result['mensaje']="YA EXISTE UN REGISTRO DE COBRO : ".$data['concepto'];
                return $result; 
            }
        }
        
        $sql2 = "insert into cobros (id_cliente,id_empresa,concepto,descripcion,valor,fecha,estatus,estado,create_user,create_date)";
        $sql2 .= " values('$data[id_cliente]','$data[id_empresa]','$data[concepto]','$data[descripcion]','$data[valor]','$data[fecha]','$data[estatus]','A','$data[user]',current_date())";
        //echo $sql2;die();
        if(!$this->db->query($sql2)){
            $error=true;
            $mensaje="ERROR AL GRABAR DATOS";
        }
        $result['error'] = $error;
        $result['mensaje']=$mensaje;
        return $result;
        
    }
    function grabarUsuario($data){
        $error=false;
        $mensaje="OK";
        $sql = "select count(*) as existe from usuario where user_name= '$data[user_name]' and estado='A'";
        $rs =  $this->db->query($sql);
        $cli = $rs->row_array(0);
        $rs->free_result();
        if($cli['existe']>0){
            $result['error'] = true;
            $result['mensaje']="YA EXISTE UNA USUARIO REGISTRADO: ".$data['user_name'];
            return $result; 
        }
        $sql2 ="insert into usuario ( apellido,nombre, id_perfil,id_empresa,user_name,password,estado,fecha_creacion,user_creacion ";
        $sql2 .=" )values (";
        $sql2 .=" '$data[apellido]','$data[nombre]','$data[id_perfil]','$data[id_empresa]','$data[user_name]','$data[password]','$data[estado]',current_date(),'$data[usuario]'";
        $sql2 .=")";
        if(!$this->db->query($sql2)){
            $error=true;
            $mensaje="ERROR AL GRABAR DATOS";
        }
        $result['error'] = $error;
        $result['mensaje']=$mensaje;
        return $result;
    }
    
    function actualizarUsuario($data){
        $error=false;
        $mensaje="OK";
        //print_r($data);
        $sql = "select count(*) as existe from usuario where user_name= '$data[user_name]' and id_usuario = '$data[id_usuario]' and estado='A'";
        $rs =  $this->db->query($sql);
        $cli = $rs->row_array(0);
        //print_r($cli);die();
        $rs->free_result();
        if($cli['existe']>0){
            
            $sql2 ="UPDATE usuario set ";
            $sql2 .=" apellido ='$data[apellido]',nombre ='$data[nombre]',id_perfil='$data[id_perfil]',id_empresa = '$data[id_empresa]',estado='$data[estado]',fecha_actualizacion = current_date(),user_actualizacion='$data[usuario]' ";
            if($data['password'] !== ''){
                $sql2 .= ",password= '$data[password]'";
            }
            
            $sql2 .=" where user_name= '$data[user_name]' and id_usuario = '$data[id_usuario]' and estado='A'";
            
            if(!$this->db->query($sql2)){
                $error=true;
                $mensaje="ERROR AL GRABAR DATOS";
            }
            
        }else{
            $result['error'] = true;
            $result['mensaje']="NO EXISTE UNA USUARIO REGISTRADO: ".$data['user_name'];
        }
        $result['error'] = $error;
        $result['mensaje']=$mensaje;
        return $result;
    }
        
    
}