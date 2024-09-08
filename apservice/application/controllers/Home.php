<?php

defined('BASEPATH') or exit('No direct script access allowed');

class Home extends CI_Controller
{
    public function index()
    {
        echo "haloo";
    }
    public function module()
    {
        $module = $this->uri->segment(3);
        $model = 'M' . $this->uri->segment(3);

        $this->load->model($model);
        $dtinput = array_merge($this->input->post(NULL, TRUE), $this->input->get(NULL, TRUE));
        $validate = json_decode($dtinput['validate'], true);
        $xaction = $validate["xfunction"];

        $data = $this->$model->$xaction($dtinput);
        print($data);
    }
    public function api()
    {
        $this->load->model('Mconfigkey');
        $hasil = $this->Mconfigkey->checktoken();
        $vtoken = json_decode($hasil, true);

        if ($vtoken['success'] == 'false') {
            $this->output
                ->set_content_type('application/json')
                ->set_status_header(401)
                ->set_output(json_encode(['success' => false, 'message' => 'Token expired']));
            // Stop further execution
            exit;
        }
        $module = $this->uri->segment(3);
        $moduleview = $this->uri->segment(4);

        if ($moduleview === 'uploadfile') {
            return $this->uploadfile($vtoken);
        }


        $model = 'M' . $this->uri->segment(3);
        $this->load->model($model);

        $xaction = 'read';
        $dtinput = '';


        if ($this->uri->segment(5)) {
            $xaction = $this->uri->segment(5);
            $json = file_get_contents('php://input');
            $dtinput = json_decode($json, true);
        } else {
            if ($module !== $moduleview) {

                $dtinput = array_merge($this->input->post(NULL, TRUE), $this->input->get(NULL, TRUE));
                $xaction = 'read';
            } else {

                $json = file_get_contents('php://input');
                $dtinput = json_decode($json, true);
                $xaction = $dtinput['method'] ?? '';
            }
        }
        $dtinput = array_merge($dtinput, array(
            'VUSERLOGIN' => $vtoken['data']['VUSERLOGIN'],
            'VUSERNAME' => $vtoken['data']['VUSERNAME'],
            'ID_COMPANY' => $vtoken['data']['VUSERDEPT'],
            'VUSERGROUP' => $vtoken['data']['VUSERGROUP']
        ));

        $data = $this->$model->$xaction($dtinput);
        print($data);
    }
    public function uploadfile($vtoken)
    {
        $vjson = $this->input->post(NULL, TRUE);
        $vparam = json_decode($vjson['params'], true);
        $config['upload_path']          = FCPATH  . '../z_upload/' . $vparam['npath'] . "/";
        $config['allowed_types']        = 'xlsx';
        $config['max_size']             = 20480;
        $config['max_width']            = 1024;
        $config['max_height']           = 768;
        $config['file_name']            = 'upload_' . $vparam['nfile'];

        $this->load->library('upload', $config);
        $filename = $_FILES['file']['name'];
        $filepath = $config['upload_path'] . 'upload_' . $vparam['nfile'] . '.xlsx';

        if (file_exists($filepath)) {
            // Hapus file yang sudah ada
            unlink($filepath);
            //delete_files($file_path);
        }

        if (!$this->upload->do_upload('file')) {
            $error = array(
                'success' => 'false',
                'message' => $this->upload->display_errors()
            );
            // Tampilkan pesan kesalahan upload
            echo json_encode($error);
        } else {
            $data = array('upload_data' => $this->upload->data());
            $model = 'M' . $vparam['module'];
            $this->load->model($model);
            $dtinput = $vparam;
            $dtinput = array_merge($dtinput, array(
                'VUSERLOGIN' => $vtoken['data']['VUSERLOGIN'],
                'VUSERNAME' => $vtoken['data']['VUSERNAME'],
                'ID_COMPANY' => $vtoken['data']['VUSERDEPT'],
                'vmodule' => 'read_file',
            ));
            $data = $this->$model->uploadfile($dtinput);
            print($data);
        }
    }
    public function auth()
    {
        $json = file_get_contents('php://input');
        $dtinput = json_decode($json, true);
        $this->load->model('Mauth');
        $data = $this->Mauth->main($dtinput);

        print($data);
    }
    public function auth_byemail()
    {
        $json = file_get_contents('php://input');
        $dtinput = json_decode($json, true);
        $this->load->model('Mauth');
        $data = $this->Mauth->byemail($dtinput);

        print($data);
    }
    public function reload()
    {
        $this->load->database();
        $this->load->model('Mconfigkey');
        $hasil = $this->Mconfigkey->checktoken();
        $vtoken = json_decode($hasil, true);

        $out = array();
        if ($vtoken['success'] == 'false') {
            print($hasil);
        } else {
            $vform = $vtoken["data"];
            $SQL_CALLSP = "EXEC SP_USERLOGIN
                @VUSERNAME=?,
                @VUSERPASSWORD=?
            ";
            $data = array(
                '@VUSERNAME' => $vform["VUSERLOGIN"],
                '@VUSERPASSWORD' => $vform["VUSERPASSWORD"]
            );

            $result = $this->db->query($SQL_CALLSP, $data);
            $row = $result->row_array();
            unset($row["base_profile"]);
            print(json_encode($row));
        }
    }
    public function approval_pr()
    {
        // Mengambil URL saat ini
        $this->load->model('Mconfigkey');
        $url = current_url();
        $query_string = $_SERVER['QUERY_STRING'];
        $this->load->library('encryption');
        $param = $this->encryption->decrypt(urldecode($query_string));
        if ($param === false) {
            $this->load->view('Verror_approval');
            return;
        }
        if ($param === null) {
            $this->load->view('Verror_approval');
            return;
        }
        $key_encrypt = json_decode($param, true);

        // Email Check Login
        $this->load->database();
        $SQL_CALLSP = "EXEC SP_USERLOGIN_BYEMAIL_PR
            @VKEYEMAIL=?
        ";
        $data = array(
            '@VKEYEMAIL' => $param
        );
        $result = $this->db->query($SQL_CALLSP, $data);
        $row = $result->row_array();
        // ===================================


        if ($row['success'] === 'false') {
            $this->load->view('Verror_approval', $data);
        } else {
            $vprofile = json_decode($row['base_profile'], true)[0];
            $gtoken = $this->Mconfigkey->getToken($vprofile);
            $vprmaster = json_decode($row['prmaster'], true)[0];
            $data = array(
                'profile' => $row['profile'],
                'keyemail' => $query_string,
                'token' => $gtoken,
                'prmaster' => json_encode(array_merge($vprmaster, $key_encrypt)),
                'prmaster_data' => $row['prmaster_data']

            );

            $this->load->view('Vapproval_pr', $data);
        }
    }
    public function approval_pr_abr()
    {
        // Mengambil URL saat ini
        $this->load->model('Mconfigkey');
        $url = current_url();
        $query_string = $_SERVER['QUERY_STRING'];
        $this->load->library('encryption');
        $param = $this->encryption->decrypt(urldecode($query_string));
        if ($param === false) {
            $this->load->view('Verror_approval');
            return;
        }
        if ($param === null) {
            $this->load->view('Verror_approval');
            return;
        }
        $key_encrypt = json_decode($param, true);

        // Email Check Login
        $this->load->database();
        $SQL_CALLSP = "EXEC SP_USERLOGIN_BYEMAIL_PR
            @VKEYEMAIL=?
        ";
        $data = array(
            '@VKEYEMAIL' => $param
        );
        $result = $this->db->query($SQL_CALLSP, $data);
        $row = $result->row_array();
        // ===================================


        if ($row['success'] === 'false') {
            $this->load->view('Verror_approval', $data);
        } else {
            $vprofile = json_decode($row['base_profile'], true)[0];
            $gtoken = $this->Mconfigkey->getToken($vprofile);
            $vprmaster = json_decode($row['prmaster'], true)[0];
            $data = array(
                'profile' => $row['profile'],
                'keyemail' => $query_string,
                'token' => $gtoken,
                'prmaster' => json_encode(array_merge($vprmaster, $key_encrypt)),
                'prmaster_data' => $row['prmaster_data']

            );

            $this->load->view('Vapproval_pr_abr', $data);
        }
    }
    public function approval_pr_invest()
    {
        // Mengambil URL saat ini
        $this->load->model('Mconfigkey');
        $url = current_url();
        $query_string = $_SERVER['QUERY_STRING'];
        $this->load->library('encryption');
        $param = $this->encryption->decrypt(urldecode($query_string));
        if ($param === false) {
            $this->load->view('Verror_approval');
            return;
        }
        if ($param === null) {
            $this->load->view('Verror_approval');
            return;
        }
        $key_encrypt = json_decode($param, true);

        // Email Check Login
        $this->load->database();
        $SQL_CALLSP = "EXEC SP_USERLOGIN_BYEMAIL_PR
            @VKEYEMAIL=?
        ";
        $data = array(
            '@VKEYEMAIL' => $param
        );
        $result = $this->db->query($SQL_CALLSP, $data);
        $row = $result->row_array();
        // ===================================


        if ($row['success'] === 'false') {
            $this->load->view('Verror_approval', $data);
        } else {
            $vprofile = json_decode($row['base_profile'], true)[0];
            $gtoken = $this->Mconfigkey->getToken($vprofile);
            $vprmaster = json_decode($row['prmaster'], true)[0];
            $data = array(
                'profile' => $row['profile'],
                'keyemail' => $query_string,
                'token' => $gtoken,
                'prmaster' => json_encode(array_merge($vprmaster, $key_encrypt)),
                'prmaster_data' => $row['prmaster_data'],
                'prinvest' => $row['prinvest']

            );

            $this->load->view('Vapproval_pr_invest', $data);
        }
    }
    public function approval_pr_nonlp()
    {
        // Mengambil URL saat ini
        $this->load->model('Mconfigkey');
        $url = current_url();
        $query_string = $_SERVER['QUERY_STRING'];
        $this->load->library('encryption');
        $param = $this->encryption->decrypt(urldecode($query_string));
        if ($param === false) {
            $this->load->view('Verror_approval');
            return;
        }
        if ($param === null) {
            $this->load->view('Verror_approval');
            return;
        }
        $key_encrypt = json_decode($param, true);

        // Email Check Login
        $this->load->database();
        $SQL_CALLSP = "EXEC SP_USERLOGIN_BYEMAIL_PR
            @VKEYEMAIL=?
        ";
        $data = array(
            '@VKEYEMAIL' => $param
        );
        $result = $this->db->query($SQL_CALLSP, $data);
        $row = $result->row_array();
        // ===================================


        if ($row['success'] === 'false') {
            $this->load->view('Verror_approval', $data);
        } else {
            $vprofile = json_decode($row['base_profile'], true)[0];
            $gtoken = $this->Mconfigkey->getToken($vprofile);
            $vprmaster = json_decode($row['prmaster'], true)[0];
            $data = array(
                'profile' => $row['profile'],
                'keyemail' => $query_string,
                'token' => $gtoken,
                'prmaster' => json_encode(array_merge($vprmaster, $key_encrypt)),
                'prmaster_data' => $row['prmaster_data']

            );

            $this->load->view('Vapproval_pr_nonlp', $data);
        }
    }
    public function approval_pr_nonlp_abr()
    {
        // Mengambil URL saat ini
        $this->load->model('Mconfigkey');
        $url = current_url();
        $query_string = $_SERVER['QUERY_STRING'];
        $this->load->library('encryption');
        $param = $this->encryption->decrypt(urldecode($query_string));

        if ($param === false) {
            $this->load->view('Verror_approval');
            return;
        }
        if ($param === null) {
            $this->load->view('Verror_approval');
            return;
        }
        $key_encrypt = json_decode($param, true);

        // Email Check Login
        $this->load->database();
        $SQL_CALLSP = "EXEC SP_USERLOGIN_BYEMAIL_PR
            @VKEYEMAIL=?
        ";
        $data = array(
            '@VKEYEMAIL' => $param
        );
        $result = $this->db->query($SQL_CALLSP, $data);
        $row = $result->row_array();
        // ===================================


        if ($row['success'] === 'false') {
            $this->load->view('Verror_approval', $data);
        } else {
            $vprofile = json_decode($row['base_profile'], true)[0];
            $gtoken = $this->Mconfigkey->getToken($vprofile);
            $vprmaster = json_decode($row['prmaster'], true)[0];
            $data = array(
                'profile' => $row['profile'],
                'keyemail' => $query_string,
                'token' => $gtoken,
                'prmaster' => json_encode(array_merge($vprmaster, $key_encrypt)),
                'prmaster_data' => $row['prmaster_data']

            );

            $this->load->view('Vapproval_pr_nonlp_abr', $data);
        }
    }
    public function approval_po()
    {
        // Mengambil URL saat ini
        $this->load->model('Mconfigkey');
        $url = current_url();
        $query_string = $_SERVER['QUERY_STRING'];
        $this->load->library('encryption');
        $param = $this->encryption->decrypt(urldecode($query_string));
        if ($param === false) {
            $this->load->view('Verror_approval');
            return;
        }
        if ($param === null) {
            $this->load->view('Verror_approval');
            return;
        }
        $key_encrypt = json_decode($param, true);

        // Email Check Login
        $this->load->database();
        $SQL_CALLSP = "EXEC SP_USERLOGIN_BYEMAIL_PO
            @VKEYEMAIL=?
        ";
        $data = array(
            '@VKEYEMAIL' => $param
        );
        $result = $this->db->query($SQL_CALLSP, $data);
        $row = $result->row_array();
        // ===================================


        if ($row['success'] === 'false') {
            $this->load->view('Verror_approval', $data);
        } else {
            $vprofile = json_decode($row['base_profile'], true)[0];
            $gtoken = $this->Mconfigkey->getToken($vprofile);
            $vprmaster = json_decode($row['poheader'], true)[0];
            $data = array(
                'profile' => $row['profile'],
                'keyemail' => $query_string,
                'token' => $gtoken,
                'poheader' => json_encode(array_merge($vprmaster, $key_encrypt)),
                'poitem' => $row['poitem']

            );

            $this->load->view('Vapproval_po', $data);
        }
    }
    public function sample_send()
    {
        $this->load->model('Msend_email');
        print $this->Msend_email->send_email();
    }
    public function email_template_pr()
    {
        $this->load->model('Msend_email');
        print $this->Msend_email->template_pr();
    }
    public function email_template_pr_abr()
    {
        $this->load->model('Msend_email');
        print $this->Msend_email->template_pr_abr();
    }
    public function email_template_pr_invest()
    {
        $this->load->model('Msend_email');
        print $this->Msend_email->template_pr_invest();
    }
    public function email_template_pr_nonlp()
    {
        $this->load->model('Msend_email');
        print $this->Msend_email->template_pr_nonlp();
    }
    public function email_template_pr_nonlp_abr()
    {
        $this->load->model('Msend_email');
        print $this->Msend_email->template_pr_nonlp_abr();
    }
    public function email_template_po()
    {
        $this->load->model('Msend_email');
        print $this->Msend_email->template_po();
    }
    public function test_email()
    {
        $this->load->model('Msend_email');
        print $this->Msend_email->test_email();
    }
}
