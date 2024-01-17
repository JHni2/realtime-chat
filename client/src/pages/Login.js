import React, { useContext, useEffect, useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { AuthContext } from '../context/AuthContext';
import boyImg from '../assets/home-boy.png';
import girlImg from '../assets/home-girl.png';

const Login = () => {
  const [form] = Form.useForm();
  const [clientReady, setClientReady] = useState(false);
  const { logoutUser, loginUser, loginError, loginInfo, updateLoginInfo, isLoginLoading } = useContext(AuthContext);

  useEffect(() => {
    setClientReady(true);
  }, []);

  const onFinish = (values) => {
    console.log('로그인 사용자:', values);
    loginUser();
  };

  return (
    <div className="login-container">
      <div>
        <img className="home-boy" src={boyImg} alt="home-boy" width={174} height={362} />
        <img className="home-girl" src={girlImg} alt="home-girl" width={154} height={342} />
      </div>
      <Form form={form} name="horizontal_login" layout="inline" onFinish={onFinish}>
        <div className="login-text">
          <span className="login-des">Welcome to Chat</span>
          <span className="login-title">Log in</span>
        </div>
        <Form.Item
          name="id"
          rules={[
            {
              required: true,
              message: 'id를 입력해주세요.',
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
              message: '비밀번호를 입력해주세요.',
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
