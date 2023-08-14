import React from 'react'
import EmployeeForm from '../components/Form/Form'

const CreateEmployee = () => {
  return (
    <div className="app-page">
      <div className="page-head">
        <h2 className="page-title">Add Employee</h2>
      </div>
      <EmployeeForm />
    </div>

  )
}

export default CreateEmployee