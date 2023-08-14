import './App.css';
import {
  BrowserRouter as Router,
} from "react-router-dom";
import Layout from './components/layout/Layout';
import { ToastContainer } from 'react-toastify';
import AppRoutes from './routes/AppRoutes';

function App() {

  return (
    <>
      <Router>
        <Layout>
          <AppRoutes />
        </Layout>
        <ToastContainer autoClose={2000} theme="colored" />
      </Router>
    </>
  );
}

export default App;
