import React from 'react';
import 'antd/dist/antd.css';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { useHistory } from 'react-router-dom'
import '../App.css'
import { Form, Input, Button, Checkbox, Typography, notification } from 'antd';
const { Title } = Typography;
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const LoginForm = () => {
  const history = useHistory();
  const onFinish = (values) => {
    axios({
      method: 'post',
      url: 'http://localhost:8383/admin/login',
      data: { "admin_id": values.username, "admin_password": values.password },
    })
      .then((response) => {
        if (response.data.status == 1) {
          var now = new Date();
          now.setTime(now.getTime() + 1 * 3600 * 1000);
          document.cookie = `unpaid-media=${uuidv4()}; expires=${now.toUTCString()};`;
          history.push('/');

        }
      })
      .catch((error) => {
        //handle error
        notification.error({
          message: 'ERROR',
          description:
            'Login Failed',
        });
      });
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <div className='loginForm'>
        <Title level={4} className='loginformtitle' >LOGIN FORM</Title>
        <Form
          {...layout}
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item {...tailLayout} name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Submit
        </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default LoginForm;

