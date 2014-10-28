<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Auth extends CI_Controller {

    function __construct()
    {
        parent::__construct();
        $this->load->library('session');
    }

	public function index()
	{
		echo date('Y-m-d H:i:s');
	}

    public function session()
    {
        $ret = array();
        $user = $this->session->userdata('userName');
        if($user)
        {
            $ret['success'] = true;
            $ret['sessionID'] = $this->session->userdata('session_id');
            $ret['userName'] = $user;
        }
        else
        {
            $ret['success'] = false;
        }
        outJSON($ret);
    }

    public function reg()
    {
        echo __FUNCTION__;
    }

    public function login()
    {
        $user = $this->input->post('username');
        $pass = $this->input->post('password');
        $ret = array();

        if($user === 'demo' && $pass === 'demo')
        {
            $ret['success'] = true;
            $ret['sessionID'] = $this->session->userdata('session_id');
            $this->session->set_userdata('userName', $user);
            $ret['userName'] = $user;
        }
        else
        {
            $ret['success'] = false;
            $ret['msg'] = 'login failed';
        }

        outJSON($ret);
    }

    public function logout()
    {
        $this->session->sess_destroy();
    }
}