<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class AuthController extends CI_Controller {
    
    public function __construct(){
			parent::__construct();
            $this->load->model(array('BackEndModel'));
    }
    
    public function _remap($method=""){
        $method = $this->uri->segment(2);
        if($method == "autenticar"){
            $this->_autenticar();
        }else{
            echo json_encode("NO SE ENCONTRO LA URL");
        }
    }
    
    public function _autenticar(){
        $data= null;
        //print_r($_POST);
        $usuario =$_POST['user'] ;
        $pass=$_POST['password'];
        $data = $this->BackEndModel->validarUsuario($usuario,$pass);
        echo json_encode($data);
    }
    
 
    
}