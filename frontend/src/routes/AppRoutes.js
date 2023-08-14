import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Dashboard from '../screens/Dashboard'
import EmployeeList from '../screens/EmployeeList'
import CreateEmployee from '../screens/CreateEmployee'
import EditEmployee from '../screens/EditEmployee'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Dashboard />} />
      <Route path='/employeeList' element={<EmployeeList />} />
      <Route path='/createEmp' element={<CreateEmployee />} />
      <Route path='/updateEmp/:id' element={<EditEmployee />} />
      <Route path='*' element={<Navigate to={'/'} />} />
    </Routes>
  )
}

export default AppRoutes