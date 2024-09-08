<?php
require APPPATH . '/libraries/JWT.php';
require APPPATH . '/libraries/Key.php';
require APPPATH . '/libraries/ExpiredException.php';
require APPPATH . '/libraries/BeforeValidException.php';
require APPPATH . '/libraries/SignatureInvalidException.php';
require APPPATH . '/libraries/JWK.php';

use \Firebase\JWT\JWT;
use Firebase\JWT\Key;
use \Firebase\JWT\ExpiredException;

class Mconfigkey extends CI_Model {
    
    public function getToken($profile){               
        
        $payload = array(
            "iss" => "tdk",
            "aud" => "tdkapp",
            "iat" => 1356999524,
            "nbf" => 1357000000,
            'VUSERLOGIN'=>$profile['USERLOGIN'],
            'VUSERNAME'=>$profile['USERNAME'],
            'VUSERPASSWORD'=>$profile['USERPASSWORD'],
            'VUSERDEPT'=>$profile['USERDEPT'],
            'VUSERGROUP'=>$profile['USERGROUP'],
            "exp" => time() + (60 * 60 * 1), //60 detik * 60 menit = 1 jam  
        );   
        
        $jwt = JWT::encode($payload, 'TDK$2023!','HS256');
        return $jwt;
    }
    public function checktoken(){
        $secret_key = 'TDK$2023!'; 
        //$token = null; 
        $authHeader = $this->input->request_headers()['Authorization']; 
        $token = str_replace('Bearer ','',$authHeader);
        $result= array();
        try{
            $decoded = JWT::decode($token, new Key($secret_key, 'HS256'));          
            if ($decoded){
                $result = array(
                    'success'=>'true',
                    'message'=>'Token Ok',
                    'data'=>$decoded
                );
            }else{
                $result = array(
                    'success'=>'false',
                    'message'=>'Silahkan Login kembali'
                );    
            }
        } catch (\Exception $e) {
            $result = array(
                'success'=>'false',
                'message'=>'Akses ditolak token expired'
            );
            
            
        }   
        
        return json_encode( $result);
    }
    
}