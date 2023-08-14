import { Container } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ProfileCard from '../components/ProfileCard';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const EmployeeProfile = () => {
  const { id } = useParams()
  const [employee, setEmployee] = useState({})

  useEffect(() => {
    if (id) {
      fetchEmployee(id)
    }
  }, [id])

  const fetchEmployee = async (id) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/employees/${id}`);
      setEmployee(response.data);
    } catch (error) {
      console.error('Error fetching employee:', error);
    }
  };

  return (
    <Container>
      <ProfileCard employee={employee} />
    </Container>
  );
};

export default EmployeeProfile;
