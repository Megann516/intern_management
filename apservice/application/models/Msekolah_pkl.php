<?php


class Msekolah_pkl extends CI_Model
{
    function read($param)
    {
        switch ($param["method"]) {
            case "read_data":
                return $this->read_data($param);
                break;
            default:
                return false;
        }
    }
    function read_data($param)
    {

        $this->load->database();
        $this->db->select("
        *

        ", false);
        $this->db->from("VW_SEKOLAH");


        if (array_key_exists('keywhere', $param)) {
            $keyval = json_decode($param['keywhere'], true);
            foreach ($keyval as $key => $val) {
                $this->db->where($val['property'], $val['value']);
            }
        }
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
}
