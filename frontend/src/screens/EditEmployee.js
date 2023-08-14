import React from 'react'
import { useParams } from 'react-router-dom'
import EmployeeForm from '../components/Form/Form'

const EditEmployee = () => {
  const { id } = useParams()
  return (
    <div className="app-page">
      <div className="page-head">
        <h2 className="page-title">Update Employee Details</h2>
      </div>
      <EmployeeForm employeeId={id} />
    </div>
  )
}

export default EditEmployee