import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { store } from './redux/store';
import { Provider } from 'react-redux';
// import 'antd/dist/antd.css'; // Ant Design CSS
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}> {/* Redux Store'u tüm uygulamaya bağlamak için Provider kullanıyoruz */}
      <App />
    </Provider>
);
