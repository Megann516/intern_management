<?php
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
require_once FCPATH . '../vendor/autoload.php';
class Mcp_userlogin extends CI_Model
{
    function read($param){
        switch ($param["method"]) {
            case "read_data":
                return $this->read_data($param);
                break;
            case "uploadfile":
                return $this->uploadfile($param);
                break;
            case "list_dept":
                return $this->list_dept($param);
                break;
            case "list_group_user":
                return $this->list_group_user($param);
                break;
            case "read_approval_pr":
                return $this->read_approval_pr($param);
                break;
            case "read_approval_po":
                return $this->read_approval_po($param);
                break;
            case "read_approval_abr":
                return $this->read_approval_abr($param);
                break;
            case "read_approval_nonlp":
                    return $this->read_approval_nonlp($param);
                    break;
            case "read_approval_nonlp_abr":
                    return $this->read_approval_nonlp_abr($param);
                    break;
            case "read_approval_switch":
                return $this->read_approval_switch($param);
                break;
            case "read_approval_invest":
                return $this->read_approval_invest($param);
                break;
            default:
                return false;
        }
    }
    function read_data($param){
        $this->load->database();
        $this->db->select("
        A.*,
        B.NAMA_DEPARTMENT
            ", false);
        $this->db->from("CPUSER A");
        $this->db->join("VW_DEPARTMENT B","B.KODE1 = A.USERDEPT","left");


        if (array_key_exists('filter', $param)) {
            $keyval = json_decode($param['filter'], true);
            foreach ($keyval as $key => $val) {
                $this->db->like($val['property'], $val['value']);
            }
        }
       
        $tempdb = clone $this->db;
        $count = $tempdb->count_all_results();

        if (array_key_exists('limit', $param)) {
            $this->db->limit($param['limit'], $param['start']);
        }

        if (array_key_exists('sort', $param)) {
            $keyval = json_decode($param['sort'], true);
            foreach ($keyval as $key => $val) {
                $this->db->order_by($val['property'], $val['direction']);
            }
        }

        $query = $this->db->get();
        $rows = $query->result_array();
        $data = array(
            'TotalRows' => $count,
            'Rows' => $rows
        );
        return json_encode($data);
    }
    function process_data($param){
        $this->load->database();
        $SQL_CALLSP = "EXEC SP_PROCESS_CP_USERLOGIN
        @VUSERLOGIN=?,
        @VMODULE=?,
        @VDATA=?
        ";
        $data = array(
            '@VUSERLOGIN' =>  $param['VUSERLOGIN'] ?? "",
            '@VMODULE' =>  $param['module'] ?? "",
            '@VDATA' =>  $param['vdata'] ?? '{}'
        );
        $result = $this->db->query($SQL_CALLSP, $data);
        $rows = $result->result_array();
        return json_encode($rows);
    }
    function list_dept($param){
        $this->load->database();
        $SQL = "
            SELECT * FROM VW_DEPARTMENT
        ";
        
        $result = $this->db->query($SQL);
        $rows = $result->result_array();

        return json_encode($rows); 
    }
    function list_group_user($param){
        $this->load->database();
        $SQL = "
            SELECT * FROM VW_GROUPUSER         
            ";
        
        $result = $this->db->query($SQL);
        $rows = $result->result_array();

        return json_encode($rows); 
    }
    function read_approval_pr($param){
        $vdata = json_decode($param['vdata'] ?? "{}",true);
        $this->load->database();
        $this->db->select("
        A.*
            ", false);
        $this->db->from("VW_APPROVAL A");
        $this->db->where("
            MODULNAME='PR-REG' AND 
            USERLOGIN='".$vdata['USERLOGIN']."'
        ");

        if (array_key_exists('filter', $param)) {
            $keyval = json_decode($param['filter'], true);
            foreach ($keyval as $key => $val) {
                $this->db->where($val['property'], $val['value']);
            }
        }
       
        $tempdb = clone $this->db;
        $count = $tempdb->count_all_results();

        if (array_key_exists('limit', $param)) {
            $this->db->limit($param['limit'], $param['start']);
        }

        if (array_key_exists('sort', $param)) {
            $keyval = json_decode($param['sort'], true);
            foreach ($keyval as $key => $val) {
                $this->db->order_by($val['property'], $val['direction']);
            }
        }

        $query = $this->db->get();
        $rows = $query->result_array();
        $data = array(
            'TotalRows' => $count,
            'Rows' => $rows
        );
        return json_encode($data);
    }
    function read_approval_po($param){
        $vdata = json_decode($param['vdata'] ?? "{}",true);
        $this->load->database();
        $this->db->select("
        A.*
            ", false);
        $this->db->from("VW_APPROVAL A");
        $this->db->where("
            MODULNAME='PO' AND 
            USERLOGIN='".$vdata['USERLOGIN']."'
        ");
        
        if (array_key_exists('filter', $param)) {
            $keyval = json_decode($param['filter'], true);
            foreach ($keyval as $key => $val) {
                $this->db->where($val['property'], $val['value']);
            }
        }
       
        $tempdb = clone $this->db;
        $count = $tempdb->count_all_results();

        if (array_key_exists('limit', $param)) {
            $this->db->limit($param['limit'], $param['start']);
        }

        if (array_key_exists('sort', $param)) {
            $keyval = json_decode($param['sort'], true);
            foreach ($keyval as $key => $val) {
                $this->db->order_by($val['property'], $val['direction']);
            }
        }

        $query = $this->db->get();
        $rows = $query->result_array();
        $data = array(
            'TotalRows' => $count,
            'Rows' => $rows
        );
        return json_encode($data);
    }
    function read_approval_abr($param){
        $vdata = json_decode($param['vdata'] ?? "{}",true);
        $this->load->database();
        $this->db->select("
        A.*
            ", false);
        $this->db->from("VW_APPROVAL A");
        $this->db->where("
            MODULNAME='PR-ABR' AND 
            USERLOGIN='".$vdata['USERLOGIN']."'
        ");

        if (array_key_exists('filter', $param)) {
            $keyval = json_decode($param['filter'], true);
            foreach ($keyval as $key => $val) {
                $this->db->where($val['property'], $val['value']);
            }
        }
       
        $tempdb = clone $this->db;
        $count = $tempdb->count_all_results();

        if (array_key_exists('limit', $param)) {
            $this->db->limit($param['limit'], $param['start']);
        }

        if (array_key_exists('sort', $param)) {
            $keyval = json_decode($param['sort'], true);
            foreach ($keyval as $key => $val) {
                $this->db->order_by($val['property'], $val['direction']);
            }
        }

        $query = $this->db->get();
        $rows = $query->result_array();
        $data = array(
            'TotalRows' => $count,
            'Rows' => $rows
        );
        return json_encode($data);
    }
    function read_approval_nonlp($param){
        $vdata = json_decode($param['vdata'] ?? "{}",true);
        $this->load->database();
        $this->db->select("
        A.*
            ", false);
        $this->db->from("VW_APPROVAL A");
        $this->db->where("
            MODULNAME='PR-NONLP-REG' AND 
            USERLOGIN='".$vdata['USERLOGIN']."'
        ");
        
        if (array_key_exists('filter', $param)) {
            $keyval = json_decode($param['filter'], true);
            foreach ($keyval as $key => $val) {
                $this->db->where($val['property'], $val['value']);
            }
        }
       
        $tempdb = clone $this->db;
        $count = $tempdb->count_all_results();

        if (array_key_exists('limit', $param)) {
            $this->db->limit($param['limit'], $param['start']);
        }

        if (array_key_exists('sort', $param)) {
            $keyval = json_decode($param['sort'], true);
            foreach ($keyval as $key => $val) {
                $this->db->order_by($val['property'], $val['direction']);
            }
        }

        $query = $this->db->get();
        $rows = $query->result_array();
        $data = array(
            'TotalRows' => $count,
            'Rows' => $rows
        );
        return json_encode($data);
    }
    function read_approval_nonlp_abr($param){
        $vdata = json_decode($param['vdata'] ?? "{}",true);
        $this->load->database();
        $this->db->select("
        A.*
            ", false);
        $this->db->from("VW_APPROVAL A");
        $this->db->where("
            MODULNAME='PR-NONLP-ABR' AND 
            USERLOGIN='".$vdata['USERLOGIN']."'
        ");

        if (array_key_exists('filter', $param)) {
            $keyval = json_decode($param['filter'], true);
            foreach ($keyval as $key => $val) {
                $this->db->where($val['property'], $val['value']);
            }
        }
       
        $tempdb = clone $this->db;
        $count = $tempdb->count_all_results();

        if (array_key_exists('limit', $param)) {
            $this->db->limit($param['limit'], $param['start']);
        }

        if (array_key_exists('sort', $param)) {
            $keyval = json_decode($param['sort'], true);
            foreach ($keyval as $key => $val) {
                $this->db->order_by($val['property'], $val['direction']);
            }
        }

        $query = $this->db->get();
        $rows = $query->result_array();
        $data = array(
            'TotalRows' => $count,
            'Rows' => $rows
        );
        return json_encode($data);
    }
    function read_approval_switch($param){
        $vdata = json_decode($param['vdata'] ?? "{}",true);
        $this->load->database();
        $this->db->select("
        A.*
            ", false);
        $this->db->from("VW_APPROVAL A");
        $this->db->where("
            MODULNAME='BUDGET-SWITCH' AND 
            USERLOGIN='".$vdata['USERLOGIN']."'
        ");
        
        if (array_key_exists('filter', $param)) {
            $keyval = json_decode($param['filter'], true);
            foreach ($keyval as $key => $val) {
                $this->db->where($val['property'], $val['value']);
            }
        }
       
        $tempdb = clone $this->db;
        $count = $tempdb->count_all_results();

        if (array_key_exists('limit', $param)) {
            $this->db->limit($param['limit'], $param['start']);
        }

        if (array_key_exists('sort', $param)) {
            $keyval = json_decode($param['sort'], true);
            foreach ($keyval as $key => $val) {
                $this->db->order_by($val['property'], $val['direction']);
            }
        }

        $query = $this->db->get();
        $rows = $query->result_array();
        $data = array(
            'TotalRows' => $count,
            'Rows' => $rows
        );
        return json_encode($data);
    }
    function read_approval_invest($param){
        $vdata = json_decode($param['vdata'] ?? "{}",true);
        $this->load->database();
        $this->db->select("
        A.*
            ", false);
        $this->db->from("VW_APPROVAL A");
        $this->db->where("
            MODULNAME='PR-INVEST' AND 
            USERLOGIN='".$vdata['USERLOGIN']."'
        ");
        
        if (array_key_exists('filter', $param)) {
            $keyval = json_decode($param['filter'], true);
            foreach ($keyval as $key => $val) {
                $this->db->where($val['property'], $val['value']);
            }
        }
       
        $tempdb = clone $this->db;
        $count = $tempdb->count_all_results();

        if (array_key_exists('limit', $param)) {
            $this->db->limit($param['limit'], $param['start']);
        }

        if (array_key_exists('sort', $param)) {
            $keyval = json_decode($param['sort'], true);
            foreach ($keyval as $key => $val) {
                $this->db->order_by($val['property'], $val['direction']);
            }
        }

        $query = $this->db->get();
        $rows = $query->result_array();
        $data = array(
            'TotalRows' => $count,
            'Rows' => $rows
        );
        return json_encode($data);
    }
}
