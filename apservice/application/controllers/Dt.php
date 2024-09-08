<?php
defined('BASEPATH') OR exit('No direct script access allowed');
require APPPATH . '/libraries/JWT.php';
require APPPATH . '/libraries/Key.php';
require APPPATH . '/libraries/ExpiredException.php';
require APPPATH . '/libraries/BeforeValidException.php';
require APPPATH . '/libraries/SignatureInvalidException.php';
require APPPATH . '/libraries/JWK.php';

use \Firebase\JWT\JWT;
use Firebase\JWT\Key;
use \Firebase\JWT\ExpiredException;

class Dt extends CI_Controller {
    function configToken(){
        $cnf['exp'] = 3600; //milisecond
        $cnf['secretkey'] = '2212336221';
        return $cnf;        
    }
    public function index(){
            return $this->status();
    }
    public function status(){
        $dt['data']=json_encode(array(
                'servername'=>$_SERVER['SERVER_NAME'],
                'ip'=>$_SERVER['REMOTE_ADDR'],
                'status'=>'ok',
                'message'=>'Connection Success'
            ));
            $this->load->view('Vdt',$dt);
    }
    public function mread(){
        echo "haloo";
    }
    public function getToken_post(){               
        $exp = time() + 3600;
            $token = array(
                "iss" => 'apprestservice',
                "aud" => 'pengguna',
                "iat" => time(),
                "nbf" => time() + 10,
                "exp" => $exp,
                "data" => array(
                    "username" => 'admin',
                    "password" => 'admin'
                )
            );       
        
        $jwt = JWT::encode($token, $this->configToken()['secretkey'],'HS256');
        $output = [
                'status' => 200,
                'message' => 'Berhasil login',
                "token" => $jwt,                
                "expireAt" => $token['exp']
            ];      
        $data = array('kode'=>'200', 'pesan'=>'token', 'data'=>array('token'=>$jwt, 'exp'=>$exp));
        print_r($data);
    }
}
