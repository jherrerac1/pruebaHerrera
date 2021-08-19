<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class BackController extends CI_Controller {
    
    public function __construct(){
			parent::__construct();
            $this->load->model(array('BackEndModel'));
    }
    
    public function _remap($method=""){
        
        $method = $this->uri->segment(2);
        if($method == "listarContratosRegistrados"){
            $this->_listarContratosRegistrados();
        }else if($method == "listarAllContratos"){
            $this->_listarContratos();
        }else if($method == "retornaPlan"){
            $this->_retornaPlan();
        }else if($method == "retornaPlanID"){
            $this->_retornaPlanID();
        }else if($method == "grabarContrato"){
            $this->_grabarContrato();
        }else if($method =="consultaLocation"){
            $this->_consultaLocation();
        }else if($method =="listarClientes"){
            $this->_listarClientes();   
        }else if($method == "retornaClienteId"){
            $this->_retornaClienteId();
        }else if($method == "retornaInfoContrato"){
            $this->_retornaInfoContrato();
        }else if($method =="GrabarEmpresa"){
            $this->_GrabarEmpresa();
        }else if($method =="ActualizarEmpresa"){
            $this->_ActualizarEmpresa();
        }else if($method =="GrabarCliente"){
            $this->_GrabarCliente();
        }else if($method == "ActualizaCliente"){
            $this->_ActualizaCliente();
        }else if($method == "tipoClientes"){
            $this->_tipoClientes();
        }else if($method == "tipoClienteID"){
            $this->_tipoClienteID();
        }else if($method =='EmpresaId'){
            $this->_EmpresaId();
        }elseif($method == "ListarEmpresa"){
            $this->_ListarEmpresa();
        }else if($method == "ListarUsuarios"){
            $this->_ListarUsuarios();
        }else if($method == "consultaUsuarioId"){
            $this->_consultaUsuarioId();
        }else if($method == "GrabarUsuario"){
            $this->_GrabarUsuario();
        }else if($method == "actualizarUsuario"){
            $this->_actualizarUsuario();
        }else if($method == "registroCobros"){
            $this->_registroCobros();
        }else if($method == "actualizaCobros"){
            $this->_actualizaCobros();
        }else if($method == "retornaCobrosPorPagar"){
            $this->_retornaCobrosPorPagar();
        }else if($method == "cobrosById"){
            $this->_cobrosById();
        }else if($method == "consultarMarcaEquipos"){
            $this->_consultarMarcaEquipos();
        }else if($method == "consultarModeloEquipos"){
            $this->_consultarModeloEquipos();
        }else if($method == "consultarEquipos"){
            $this->_consultarEquipos();
        }else if ($method =="retornaEquipoID"){
            $this->_retornaEquipoID();
        }else if ($method =="retornaEquipoCliente"){
            $this->_retornaEquipoCliente();
        }else if($method == "ListarDocumentosClientes"){
            $this->_ListarDocumentosClientes();
        }else{
            echo json_encode("HOLA");
        }
    }
    
    
    public function _ListarDocumentosClientes(){
        $data = null;
        $cedula = $_POST['cedula'];
        $thefolder = "/var/www/html/Repository2/UPLOADS/DOCUMENTOSCLIENTES/".$cedula;
        if(file_exists($thefolder)){
            if ($handler = opendir($thefolder)) {
                $i=0;
                while (false !== ($file = readdir($handler))) {
                        if(strlen($file) >=4){
                           $data[$i]= $file;
                            $i++; 
                        }
                        
                }
                closedir($handler);
            }
        }
        echo json_encode($data);
    }
    
    public function _listarClientes(){
         $data=null;
         $id_empresa = $_POST['id_empresa'];
         $data = $this->BackEndModel->retornaClientes($id_empresa);
         echo json_encode($data);
    }
    
    public function _ListarUsuarios(){
        $data=null;
         $data = $this->BackEndModel->retornaUsuarios();
         echo json_encode($data);
    }
    
    public function _ListarEmpresa(){
        $data=null;
        $data = $this->BackEndModel->retornaEmpresa();
        echo json_encode($data);
    }
    
    public function _consultarMarcaEquipos(){
        $tipo=$_POST['tipo'];
        $emp=$_POST['empresa'];
        $data = $this->BackEndModel->consultaMarca($tipo,$emp);
        echo json_encode($data);
    }
    
    public function _consultarModeloEquipos(){
        $id_marca = $_POST['id_marca'];
        $data = $this->BackEndModel->consultarModeloEquipos($id_marca);
        echo json_encode($data);
    }
    
    public function _consultarEquipos(){
        //consultarEquipos
        $id_modelo = $_POST['id_modelo'];
        $tipo=$_POST['tipo'];
        $empresa=$_POST['empresa'];
        $data = $this->BackEndModel->consultarEquipos($id_modelo,$tipo,$empresa);
        echo json_encode($data);
    }
    
    
    public function _consultaLocation(){
        $tipo=$_POST['tipo'];
        $padre=$_POST['padre'];
        $data = $this->BackEndModel->consultaLocation($tipo,$padre);
        echo json_encode($data);
    }
    
    public function _EmpresaId(){
        $id=$_POST['id_empresa'];
        $data = $this->BackEndModel->empresaID($id);
        echo json_encode($data);
    }
    
    public function _consultaUsuarioId(){
        $id=$_POST['id_user'];
        $data = $this->BackEndModel->usuarioID($id);
        echo json_encode($data);
    }
    
    public function _tipoClienteID(){
        $tipo=$_POST['idtipo'];
        $data = $this->BackEndModel->consultaComercio($tipo);
        echo json_encode($data);
    }
    public function _tipoClientes(){
        $data=null;
        $data = $this->BackEndModel->tipoClientes();
        echo json_encode($data);
    }
    
    public function _listarContratosRegistrados(){
         $data=null;
         $idempresa=$_POST['IdEmpresa'];
         $data = $this->BackEndModel->retornaContratos($idempresa);
         echo json_encode($data);
    }
    
    public function _listarContratos(){
         $data=null;
         $idempresa=$_POST['IdEmpresa'];
         $data = $this->BackEndModel->Contratos($idempresa);
         echo json_encode($data);
    }
    
    public function _retornaPlan(){
        $tipo = $_POST['tipo'];
        $data = $this->BackEndModel->retornaPlan($tipo);
        echo json_encode($data);
    }
    
    public function _retornaPlanID(){
        //retornaPlanID
        $id = $_POST['id'];
        $data = $this->BackEndModel->retornaPlanID($id);
        echo json_encode($data);
    }
    
    public function _grabarContrato(){
        $data= $_POST;
        $result = $this->BackEndModel->grabarContrato($data);
        echo json_encode($result);
    }
    public function _retornaClienteId(){
        $idCliente = $_POST['idCliente'];
        $data = $this->BackEndModel->retornaCliente($idCliente);
        echo json_encode($data);
    }
    
    public function _retornaInfoContrato(){
        $id =$_POST['id'];
        $data = $this->BackEndModel->retornaInfoContrato($id);
        echo json_encode($data);
    }
    
    public function _GrabarCliente(){
        $data= $_POST;
        $result = $this->BackEndModel->grabarCliente($data);
        echo json_encode($result);
    }
    
    public function _ActualizaCliente(){
        $data= $_POST;
        $result = $this->BackEndModel->actualizaCliente($data);
        echo json_encode($result);
    }
    
    public function _GrabarEmpresa(){
        $data= $_POST;
        $result = $this->BackEndModel->grabarEmpresa($data);
        echo json_encode($result);
    }
    
    public function _ActualizarEmpresa(){
        $data= $_POST;
        $result = $this->BackEndModel->actualizaEmpresa($data);
        echo json_encode($result);
    }
    
    public function _GrabarUsuario(){
        $data= $_POST;
        $result = $this->BackEndModel->grabarUsuario($data);
        echo json_encode($result);
    } 
    public function _actualizarUsuario(){
        $data= $_POST;
        $result = $this->BackEndModel->actualizarUsuario($data);
        echo json_encode($result);
    }
    public function _retornaCobrosPorPagar(){
        $data=null;
        $idempresa=$_POST['Id_empresa'];
        $data = $this->BackEndModel->retornaCobrosPorPagar($idempresa);
        echo json_encode($data);
    }
        
    public function _registroCobros(){
        $data= $_POST;
        $result = $this->BackEndModel->grabarCobro($data);
        echo json_encode($result);
    }
    public function _actualizaCobros(){
        $data= $_POST;
        $result = $this->BackEndModel->actualizaCobros($data);
        echo json_encode($result);
    }
    
    public function _cobrosById(){
        $data = null;
        $id_cobro=$_POST['id_cobro'];
        $data=$this->BackEndModel->cobrosById($id_cobro);
        echo json_encode($data);
    }
    
    public function _retornaEquipoID(){
        $data = null;
        $id = $_POST['id'];
        $empresa = $_POST['id_empresa'];
        $data =  $this->BackEndModel->retornaEquipoID($id,$empresa);
        echo json_encode($data);
    }
    
    public function _retornaEquipoCliente(){
        //_retornaEquipoCliente
        $data = null;
        $id = $_POST['id'];
        $contra = $_POST['id_contrato'];
        $tipo = $_POST['tipo'];
        $data =  $this->BackEndModel->retornaEquipoCliente($id,$contra,$tipo);
        echo json_encode($data);
    }
    
    
    
}