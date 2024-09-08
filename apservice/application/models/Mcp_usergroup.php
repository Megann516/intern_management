<?php
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
require_once FCPATH . '../vendor/autoload.php';
class Mcp_usergroup extends CI_Model
{
    function read($param)
    {
        switch ($param["method"]) {
            case "read_data":
                return $this->read_data($param);
                break;
            case "uploadfile":
                return $this->uploadfile($param);
                break;
            default:
                return false;
        }
    }
    function read_data($param){

        $this->load->database();
        $this->db->select("
        A.*
            ", false);
        $this->db->from("VW_GROUPUSER A");
        

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
}
