import React, { useState } from 'react';
import { Layout, Menu, Breadcrumb, Avatar } from 'antd';
import { 
  UserOutlined, 
  LaptopOutlined, 
  NotificationOutlined, 
  LogoutOutlined, 
  AntDesignOutlined 
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice';

const { Header, Content, Footer, Sider } = Layout;

const MainLayout = ({ content }) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate(); // URL yönlendirme için useNavigate hook
  const dispatch = useDispatch();

  // Menü itemlarını tanımlıyoruz
  const items = [
    { key: '1', icon: <UserOutlined />, label: 'User', path: '/user' },
    { key: '2', icon: <LaptopOutlined />, label: 'Laptop', path: '/laptop' },
    { key: '3', icon: <NotificationOutlined />, label: 'Notification', path: '/notification' },
    // Logout item'ını menüye ekliyoruz, ama bunun path'i yok
    { key: '4', icon: <LogoutOutlined />, label: 'Logout', isLogout: true }
  ];

  // Logout butonu için handler
  const handleLogout = () => {
    dispatch(logout()); // Redux'tan logout işlemi çağrılıyor
    navigate('/login'); // Logout sonrası login sayfasına yönlendir
  };

  // Menü itemlarına tıklayınca yönlendirme işlemi
  const handleMenuClick = (item) => {
    if (item.isLogout) {
      handleLogout(); // Eğer logout butonuna tıklanmışsa logout işlemi çalıştır
    } else {
      navigate(item.path); // Diğer item'lar için URL'e yönlendir
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" style={{ padding: '16px', textAlign: 'center' }}>
          {/* Avatarı ekliyoruz */}
          <Avatar
            size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
            icon={<AntDesignOutlined />}
          />
        </div>
        <Menu 
          theme="dark" 
          defaultSelectedKeys={['1']} 
          mode="inline" 
          onClick={({ key }) => handleMenuClick(items.find(i => i.key === key))} // Tıklanan item'a göre yönlendirme yap
          items={items}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: '#fff' }} />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}></Breadcrumb>
          <div style={{ padding: 24, minHeight: 360, background: '#fff', borderRadius: 8 }}>
            {content}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
