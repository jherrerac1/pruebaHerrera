<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class FileController extends CI_Controller {
    
    public function __construct(){
			parent::__construct();
            $this->load->model(array('BackEndModel'));
    }
    
    public function _remap($method=""){
        $method = $this->uri->segment(2);
        if($method == "subirArchivos"){
            $this->_uploadfiles();
        }else if($method =="subirArchivosCli"){
            $this->_subirArchivosCli();
        }else if($method =="subirArchivosPagos"){
            $this->_subirArchivosPagos();
        }else{
            echo json_encode("NO EXISTE RESPUESTA");
        }
    }
    
    
     function _subirArchivosPagos(){
        $datoCli = $this->BackEndModel->retornaCliente($_POST['id_cliente']);
        //print_r($datoCli);
         $path_subida= '/var/www/html/Repository2/UPLOADS/COMPROBANTESDEPAGO/'.trim($datoCli['dni']).'_'.trim($datoCli['apellido']).'_'.trim($datoCli['nombre']).'/';
        //echo $path_subida;
        if (isset($_FILES['file'])) {
            if (!file_exists($path_subida)) {
                mkdir($path_subida, 0777, true);
            }
            $originalName = $_FILES['file']['name'];
            $ext = '.'.pathinfo($originalName, PATHINFO_EXTENSION);
            $generatedName = $_FILES['file']['name'];
            $generatedName = str_replace(array("_"),array("_"),$generatedName);
            $filePath = $path_subida.$generatedName;
            if (!is_writable($path_subida)) {
                echo json_encode(array('status' => false,'msg'    => 'Destination directory not writable.'));
                exit;
            }
            
            if(file_exists($filePath)){
                echo json_encode(array('status' => false,'msg'    => 'Archivo ya existe en el servidor','path' => $filePath));
                exit;
            }
            
            if (move_uploaded_file($_FILES['file']['tmp_name'], $filePath)) {
                echo json_encode(array('status' => true,'generatedName' => $generatedName,'path' =>$path_subida));
            }else{
                echo json_encode(array('status' => false,'generatedName' => $generatedName,'path' =>$path_subida));
            }
        }else{
            echo json_encode(array('status' => false, 'msg' => 'No file uploaded.'));
            exit;
        }
    }
    
    
    function _subirArchivosCli(){
        //print_r($_POST);
        //print_r($_FILES);
        $path_subida= '/var/www/html/Repository2/UPLOADS/DOCUMENTOSCLIENTES/'.$_POST['dni'].'/';
        if (isset($_FILES['file'])) {
            if (!file_exists($path_subida)) {
                mkdir($path_subida, 0777, true);
                //echo "CRENDO CARPETA";
            }
            
            $originalName = $_FILES['file']['name'];
            $ext = '.'.pathinfo($originalName, PATHINFO_EXTENSION);
            $generatedName = $_FILES['file']['name'];
            $generatedName = str_replace(array("_"),array("_"),$generatedName);
            $filePath = $path_subida.$generatedName;
            if (!is_writable($path_subida)) {
                echo json_encode(array('status' => false,'msg'    => 'Destination directory not writable.'));
                exit;
            }
            
            if(file_exists($filePath)){
                echo json_encode(array('status' => false,'msg'    => 'Archivo ya existe en el servidor','path' => $filePath));
                exit;
            }
            
            if (move_uploaded_file($_FILES['file']['tmp_name'], $filePath)) {
                echo json_encode(array('status' => true,'generatedName' => $generatedName,'path' =>$path_subida));
            }else{
                echo json_encode(array('status' => false,'generatedName' => $generatedName,'path' =>$path_subida));
            }
        }else{
            echo json_encode(array('status' => false, 'msg' => 'No file uploaded.'));
            exit;
        }
    }
   
    function _uploadfiles(){
        //$path_subida= '/opt/UPLOADS/LOGOS/'.trim($_POST['ruc']).'/';
        $path_subida= '/var/www/html/Repository2/UPLOADS/LOGOS/'.trim($_POST['ruc']).'/';
        //print_r($_POST);
        if(isset($_POST['ruta_2']) && ($_POST['ruta_2'] != '' || $_POST['ruta_2'] != 'undefined')){
            if (file_exists(trim($_POST['ruta_2']))) {
                $success = unlink($_POST['ruta_2']);
                if (!$success) {
                     echo json_encode(array('status' => false,'msg'    => 'Cannot delete '.$_POST['ruta_2']));
                    exit;
                }
            }
        }
        //echo $path_subida;
        if (isset($_FILES['file'])) {
            
            if (!file_exists($path_subida)) {
                mkdir($path_subida, 0777, true);
                //echo "CRENDO CARPETA";
            }
            
                $originalName = $_FILES['file']['name'];
                $ext = '.'.pathinfo($originalName, PATHINFO_EXTENSION);
                $generatedName = $_FILES['file']['name'];
                $generatedName = str_replace(array("_"),array("_"),$generatedName);
                $filePath = $path_subida.$generatedName;
                
                if (!is_writable($path_subida)) {
                    echo json_encode(array('status' => false,'msg'    => 'Destination directory not writable.'));
                    exit;
                }
                
                if(file_exists($filePath)){
                     echo json_encode(array('status' => false,'msg'    => 'Archivo ya existe en el servidor','path' => trim($filePath)));
                    exit;
                }
                //echo $filePath;die();
                if (move_uploaded_file($_FILES['file']['tmp_name'], $filePath)) {
                    echo json_encode(array('status' => true,'generatedName' => trim($generatedName),'path' =>trim($path_subida)));
                }else{
                    echo json_encode(array('status' => false,'generatedName' => trim($generatedName),'path' =>trim($path_subida)));
                }
        }else{
            echo json_encode(array('status' => false, 'msg' => 'No file uploaded.'));
            exit;
        }
        
    }
    
    
}