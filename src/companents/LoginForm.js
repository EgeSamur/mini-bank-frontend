import React from 'react';
import { Avatar, Card, Button, Form, Input, Row, Col } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/slices/authSlice';
import { Navigate, useNavigate } from 'react-router-dom';

const { Meta } = Card;

const LoginForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAuthenticated = !!localStorage.getItem('token'); // Check if token exists
    // const {accessToken} = useSelector((state) => state.auth);
   
     // Eğer kullanıcı zaten giriş yaptıysa, login sayfası yerine dashboard'a yönlendir
     if (isAuthenticated) {
        return <Navigate to="/dashboard" />;
        }
   
    const onFinish = (values) => {
        console.log('Success:', values);
        const data = {
            emailAddress: values.email,
            password: values.password
        }
        dispatch(login(data)).then((result) => {
            if (result.meta.requestStatus === 'fulfilled') {
                navigate('/dashboard');
            }
        });
    
        
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Row
            justify="center" // Yatayda ortalamak için
            align="middle"   // Dikeyde ortalamak için
            style={{ minHeight: '100vh', backgroundColor: '#f0f2f5' }} // Arka plan rengi
        >
            <Col xs={24} sm={12} md={8} lg={6} style={{ padding: '16px' }}>
                <Card
                    style={{
                        width: '100%',
                        borderRadius: '12px', // Kenar yuvarlatma
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Gölge efekti
                    }}
                >
                    <Meta
                        avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
                        title="Giriş Yap"
                        description="Lütfen kimlik bilgilerinizi girin"
                    />
                    <Form
                        name="login"
                        layout="vertical"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        style={{ marginTop: 16 }}
                    >
                        <Form.Item
                            label="E-posta"
                            name="email"
                            rules={[
                                { required: true, message: 'Lütfen e-posta adresinizi girin!' },
                                { type: 'email', message: 'Geçerli bir e-posta adresi girin!' } // E-posta doğrulaması
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Şifre"
                            name="password"
                            rules={[{ required: true, message: 'Lütfen şifrenizi girin!' }]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" block>
                                Giriş Yap
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </Col>
        </Row>
    );
}

export default LoginForm;
