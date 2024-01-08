import React, { useContext, useEffect, useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { AuthContext } from '../context/AuthContext';
const Login = () => {
  const [form] = Form.useForm();
  const [clientReady, setClientReady] = useState(false);
  const { logoutUser, loginUser, loginError, loginInfo, updateLoginInfo, isLoginLoading } = useContext(AuthContext);

  useEffect(() => {
    setClientReady(true);
  }, []);

  const onFinish = (values) => {
    console.log('Finish:', values);
    loginUser();
  };

  return (
    <div className="login-container">
      <Form form={form} name="horizontal_login" layout="inline" onFinish={onFinish}>
        <Form.Item
          name="id"
          rules={[
            {
              required: true,
              message: 'Please input your id!',
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="id"
            onChange={(e) => updateLoginInfo({ ...loginInfo, id: e.target.value })}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
            onChange={(e) => updateLoginInfo({ ...loginInfo, password: e.target.value })}
          />
        </Form.Item>
        <span className="login-error-message">{loginError?.message}</span>
        <Form.Item shouldUpdate>
          {() => (
            <Button
              type="primary"
              htmlType="submit"
              disabled={
                !clientReady ||
                !form.isFieldsTouched(true) ||
                !!form.getFieldsError().filter(({ errors }) => errors.length).length
              }
            >
              Log in
            </Button>
          )}
        </Form.Item>
      </Form>
    </div>
  );
};
export default Login;
