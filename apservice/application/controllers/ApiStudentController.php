<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . 'libraries/RestController.php';
require APPPATH . 'libraries/Format.php';

use chriskacerguis\RestServer\RestController;

class ApiStudentController extends RestController
{
    
    public function __construct()
    {
        parent::__construct();
        $this->load->model('StudentModel');
    }
    public function indexStudent_get()
    {
        $students = new StudentModel;
        $students = $students->get_student();
        $this->response($students, 200);
    }

    public function storeStudent_post()
    {
        $students = new StudentModel;
        $data = [
            'name' =>  $this->input->post('name'),
            'class' => $this->input->post('class'),
            'email' => $this->input->post('email')
        ];
        $result = $students->insert_student($data);
        if($result > 0)
        {
            $this->response([
                'status' => true,
                'message' => 'NEW STUDENT CREATED'
            ], RestController::HTTP_OK); 
        }
        else
        {
            $this->response([
                'status' => false,
                'message' => 'FAILED TO CREATE NEW STUDENT'
            ], RestController::HTTP_BAD_REQUEST);
        }
    }

    public function editStudent_get($id)
    {
        $students = new StudentModel;
        $students = $students->edit_student($id);
        $this->response($students, 200);
    }

    public function updateStudent_put($id)
    {
        $students = new StudentModel;
        $data = [
            'name' =>  $this->put('name'),
            'class' => $this->put('class'),
            'email' => $this->put('email')
        ];
        $result = $students->update_student($id, $data);
        if($result > 0)
        {
            $this->response([
                'status' => true,
                'message' => 'STUDENT UPDATED'
            ], RestController::HTTP_OK); 
        }
        else
        {
            $this->response([
                'status' => false,
                'message' => 'FAILED TO UPDATE STUDENT'
            ], RestController::HTTP_BAD_REQUEST);
        }
    }

    public function deleteStudent_delete($id)
    {
        $students = new StudentModel;
        $result = $students->delete_student($id);
        if($result > 0)
        {
            $this->response([
                'status' => true,
                'message' => 'STUDENT DELETED'
            ], RestController::HTTP_OK); 
        }
        else
        {
            $this->response([
                'status' => false,
                'message' => 'FAILED TO DELETE STUDENT'
            ], RestController::HTTP_BAD_REQUEST);
        }
    }
}