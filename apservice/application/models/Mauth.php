<?php

class Mauth extends CI_Model {
    
    function main($param){
        
        $this->load->database();
        $vform = $param["data"];
        $SQL_CALLSP = "EXEC SP_USERLOGIN
            @VUSERNAME=?,
            @VUSERPASSWORD=?
        ";
        $data = array(
            '@VUSERNAME'=>$vform["username"],
            '@VUSERPASSWORD'=>$vform["password"]
        );

        $result = $this->db->query($SQL_CALLSP, $data);
        $row = $result->row_array();
        
        if($row['success']==='true'){

            $vprofile = json_decode($row['base_profile'],true);
            
            $this->load->model('Mconfigkey');
            $gtoken = $this->Mconfigkey->getToken($vprofile[0]);

            $row['token']=$gtoken;
        }

        unset($row["base_profile"]);
        

        return json_encode($row);
    }
    function byemail($param){
        
        
        $this->load->database();
        $vform = $param["data"];
        $SQL_CALLSP = "EXEC SP_USERLOGIN_BYEMAIL
            @VUSERNAME=?
        ";
        $data = array(
            '@VUSERNAME'=>$vform["username"]
        );

        $result = $this->db->query($SQL_CALLSP, $data);
        $row = $result->row_array();
        
        if($row['success']==='true'){

            $vprofile = json_decode($row['base_profile'],true);
            
            $this->load->model('Mconfigkey');
            $gtoken = $this->Mconfigkey->getToken($vprofile[0]);

            $row['token']=$gtoken;
        }

        unset($row["base_profile"]);
        

        return json_encode($row);
    }
}