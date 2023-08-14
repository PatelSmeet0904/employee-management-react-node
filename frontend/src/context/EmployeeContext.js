import React, { createContext, useContext, useReducer } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

// Define initial state
const initialState = {
  loading: true,
  employees: [],
  employee: {},
  currentPage: 1,
  totalPages: 0,
  message: '',
  error: null
};

// Define reducer function
const employeeReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADER':
      return {
        ...state,
        loading: true
      }
    case 'FETCH_EMPLOYEES':
      return {
        ...state,
        employees: action.payload?.employees,
        loading: false,
        currentPage: +action.payload?.currentPage,
        totalPages: +action.payload?.totalPages
      };
    case 'FETCH_EMPLOYEE':
      return {
        ...state,
        employee: action.payload?.employee,
        loading: false,
      };
    default:
      return state;
  }
};

// Create context
const EmployeeContext = createContext();

// Create EmployeeProvider component
const EmployeeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(employeeReducer, initialState);

  // Fetch employees from API
  const fetchEmployees = async (queryValue = '', sort = 'DESC', page = 1) => {
    try {
      dispatch({ type: 'SET_LOADER' });
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/employees?page=${page}&search=${queryValue}&sort=${sort}`);
      dispatch({ type: 'FETCH_EMPLOYEES', payload: response.data });
    } catch (error) {
      toast.error('Error in fetching employees!!')
      console.error('Error fetching employees:', error);
    }
  };

  const fetchEmployee = async (id) => {
    try {
      dispatch({ type: 'SET_LOADER' });
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/employees/${id}`);
      dispatch({ type: 'FETCH_EMPLOYEE', payload: response.data });
      return response.data?.employee
    } catch (error) {
      toast.error('Error in fetching employee!!')
      console.error('Error fetching employees:', error);
    }
  };

  const createEmployee = async (employee, navigate) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/employees`, employee);
      showToast(response.data.message)
      navigate('/employeeList')
    } catch (error) {
      const message = error.response && error.response.data ? error.response.data.message : 'Error in creating employees!!'
      toast.error(message)
      console.error('Error deleting employee:', message);
    }
  };

  const updateEmployee = async (employeeId, employee, navigate) => {
    try {
      const response = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/v1/employees/${employeeId}`, employee);
      showToast(response.data.message)
      navigate('/employeeList')
    } catch (error) {
      toast.error('Error in updating employees!!')
      console.error('Error deleting employee:', error);
    }
  };

  const deleteEmployee = async (id) => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/v1/employees/${id}`);
      showToast(response.data.message)
    } catch (error) {
      toast.error('Error in deleting employees!!')
      console.error('Error deleting employee:', error);
    }
  };

  const showToast = (message) => {
    toast.success(message)
    fetchEmployees();
  }

  return (
    <EmployeeContext.Provider
      value={{
        employees: state.employees,
        loading: state.loading,
        totalPages: state.totalPages,
        currentPage: state.currentPage,
        fetchEmployees,
        fetchEmployee,
        createEmployee,
        updateEmployee,
        deleteEmployee
        // Other CRUD methods
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};

// Create custom hook to use the context
const useEmployeeContext = () => useContext(EmployeeContext);

export { EmployeeProvider, useEmployeeContext };
