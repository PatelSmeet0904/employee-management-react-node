import React from 'react';
import EmployeeTable from '../components/Table/Table';
import { useNavigate } from 'react-router-dom';

const EmployeeList = () => {
  const navigate = useNavigate()

  return (
    <div className="app-page">
      <div className="page-head">
        <h2 className="page-title">Employee Management</h2>
        <button className="page-head-button" onClick={() => navigate('/createEmp')}>+ Add User</button>
      </div>
      <EmployeeTable />
    </div>
  );
};

export default EmployeeList;
