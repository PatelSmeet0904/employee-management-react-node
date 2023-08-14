import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Form.css'
import { useEmployeeContext } from '../../context/EmployeeContext';

const initialValue = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  workHours: '',
  salaryType: 1,
  department: '',
}

const Form = ({ employeeId }) => {
  const { fetchEmployee, loading, createEmployee, updateEmployee } = useEmployeeContext()
  const navigate = useNavigate()
  const [employee, setEmployeeData] = useState(initialValue);

  const [errors, setErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    const getEmployeeById = async (id) => {
      const data = await fetchEmployee(id);
      setEmployeeData(data)
    }
    if (employeeId) {
      getEmployeeById(employeeId)
    }
  }, [employeeId]);

  const validateForm = () => {
    const newErrors = {};
    if (!employee.firstName) {
      newErrors.firstName = 'First name is required';
    }
    if (!employee.lastName) {
      newErrors.lastName = 'Last name is required';
    }
    if (!employee.phone) {
      newErrors.phone = 'Phone is required';
    } else if (!isValidPhone(employee.phone)) {
      newErrors.phone = 'Invalid phone format! Please, write 10 digit numbers';
    }
    if (!employee.email) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(employee.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!employee.workHours || employee.workHours < 0) {
      newErrors.workHours = 'Invalid work hours';
    }
    if (!employee.department) {
      newErrors.department = 'Department is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidPhone = (phone) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormSubmitted(true);

    if (validateForm()) {
      try {
        if (employeeId) {
          updateEmployee(employeeId, employee, navigate)
        } else {
          createEmployee(employee, navigate)
        }
        // Handle success or redirect
      } catch (error) {
        console.error('Error submitting employee:', error);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEmployeeData((prevEmployee) => ({
      ...prevEmployee,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  return (
    <div className="container">
      {employeeId && loading ?
        <h3>loading...</h3>
        :
        <form className="form" onSubmit={handleSubmit}>
          <div className="grid">
            <div className="input-container">
              <label className="label">First Name</label>
              <input
                type="text"
                name="firstName"
                value={employee?.firstName}
                onChange={handleChange}
                className={formSubmitted && errors.firstName ? 'input error' : 'input'}
              />
              {formSubmitted && errors.firstName && (
                <p className="error-message">{errors.firstName}</p>
              )}
            </div>
            <div className="input-container">
              <label className="label">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={employee?.lastName}
                onChange={handleChange}
                className={formSubmitted && errors.lastName ? 'input error' : 'input'}
              />
              {formSubmitted && errors.lastName && (
                <p className="error-message">{errors.lastName}</p>
              )}
            </div>
            <div className="input-container">
              <label className="label">Phone</label>
              <input
                type="text"
                name="phone"
                value={employee?.phone}
                onChange={handleChange}
                className={formSubmitted && errors.phone ? 'input error' : 'input'}
              />
              {formSubmitted && errors.phone && (
                <p className="error-message">{errors.phone}</p>
              )}
            </div>
            <div className="input-container">
              <label className="label">Email</label>
              <input
                type="email"
                name="email"
                value={employee?.email}
                onChange={handleChange}
                className={formSubmitted && errors.email ? 'input error' : 'input'}
                disabled={employeeId ? true : false}
              />
              {formSubmitted && errors.email && (
                <p className="error-message">{errors.email}</p>
              )}
            </div>
            <div className="input-container">
              <label className="label">Work Hours</label>
              <input
                type="number"
                name="workHours"
                value={employee?.workHours}
                onChange={handleChange}
                className={formSubmitted && errors.workHours ? 'input error' : 'input'}
              />
              {formSubmitted && errors.workHours && (
                <p className="error-message">{errors.workHours}</p>
              )}
            </div>
            <div className="input-container">
              <label className="label">Salary Type</label>
              <select
                name="salaryType"
                value={employee?.salaryType}
                onChange={handleChange}
                className={formSubmitted && errors.salaryType ? 'input error' : 'input'}
              >
                <option value={1}>Hourly Wage</option>
                <option value={2}>Fixed Monthly</option>
                <option value={3}>Performance-based</option>
              </select>
              {formSubmitted && errors.salaryType && (
                <p className="error-message">{errors.salaryType}</p>
              )}
            </div>
            <div className="input-container">
              <label className="label">Department</label>
              <input
                type="text"
                name="department"
                value={employee?.department}
                onChange={handleChange}
                className={formSubmitted && errors.department ? 'input error' : 'input'}
              />
              {formSubmitted && errors.department && (
                <p className="error-message">{errors.department}</p>
              )}
            </div>
          </div>
          <div>
            <button type="submit" className="button primary-button">
              {employeeId ? 'Update' : 'Add'}
            </button>
            <button
              type="button"
              className="button"
              onClick={() => navigate('/employeeList')}
            >
              Cancel
            </button>
          </div>
        </form>
      }
    </div>
  );
};

export default Form;
