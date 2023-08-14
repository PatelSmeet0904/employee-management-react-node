const { calculateSalary } = require('../helpers/calculateSalary');
const { validatePhone, validateEmail } = require('../helpers/validations');
const Employee = require('../models/employee');

const employees = [
  {
    id: 1,
    firstName: 'Rudra',
    lastName: 'Patel',
    phone: '8320210032',
    email: 'rudra@gmail.com',
    workHours: '100',
    salaryType: 2,
    salary: 2000,
    department: 'IT'
  },
  {
    id: 2,
    firstName: 'Smeet',
    lastName: 'Patel',
    phone: '8320210032',
    email: 'smeetpatel0904@gmail.com',
    workHours: '100',
    salaryType: 2,
    salary: 2000,
    department: 'IT'
  },
  {
    id: 3,
    firstName: 'Meet',
    lastName: 'Patel',
    phone: '8320210032',
    email: 'meet@gmail.com',
    workHours: '100',
    salaryType: 2,
    salary: 2000,
    department: 'IT'
  },
  {
    id: 4,
    firstName: 'harsh',
    lastName: 'Patel',
    phone: '8320210032',
    email: 'xyz@gmail.com',
    workHours: '100',
    salaryType: 2,
    salary: 2000,
    department: 'IT'
  },
  {
    id: 5,
    firstName: 'Bhargav',
    lastName: 'Patel',
    phone: '8320210032',
    email: 'bhargav@gmail.com',
    workHours: '100',
    salaryType: 2,
    salary: 2000,
    department: 'IT'
  },
  {
    id: 6,
    firstName: 'Mahak',
    lastName: 'Patel',
    phone: '8320210032',
    email: 'mahak@gmail.com',
    workHours: '100',
    salaryType: 2,
    salary: 2000,
    department: 'IT'
  },
  {
    id: 7,
    firstName: 'Mitali',
    lastName: 'Patel',
    phone: '8320210032',
    email: 'mitali@gmail.com',
    workHours: '100',
    salaryType: 2,
    salary: 2000,
    department: 'IT'
  },
  {
    id: 8,
    firstName: 'harsh',
    lastName: 'Patel',
    phone: '8320210032',
    email: 'harsh@gmail.com',
    workHours: '100',
    salaryType: 2,
    salary: 2000,
    department: 'IT'
  }
];

const addEmployee = (req, res, next) => {
  try {
    let { firstName, lastName, phone, email, workHours, salaryType, department } = req.body;

    // Check field is not empty
    if (!firstName || !lastName || !phone || !email || !workHours || !salaryType || !department) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Perform data validation
    if (
      typeof firstName !== 'string' ||
      typeof lastName !== 'string' ||
      typeof phone !== 'string' || !validatePhone(phone) ||
      typeof email !== 'string' || !validateEmail(email) ||
      typeof +workHours !== 'number' || +workHours < 0 ||
      typeof +salaryType !== 'number' || ![1, 2, 3].includes(+salaryType) ||
      typeof department !== 'string'
    ) {
      return res.status(400).json({ message: 'Invalid input data' });
    }

    // Check if email already exists in employees array
    if (employees.some(emp => emp.email === email)) {
      return res.status(409).json({ message: 'Email already exists' });
    }

    // Calculate the salary based on salaryType and workHours
    const salary = calculateSalary(+salaryType, workHours);
    firstName = firstName[0].toUpperCase() + firstName.slice(1).toLowerCase()
    lastName = lastName[0].toUpperCase() + lastName.slice(1).toLowerCase()

    const id = employees.slice(-1)[0]?.id + 1;
    const newEmployee = new Employee(id, firstName, lastName, phone, email, workHours, salaryType, salary, department);
    employees.push(newEmployee);
    return res.status(201).json({ message: 'Employee Created Successfully!' });
  } catch (error) {
    next(error); // Pass the error to the error handling middleware
  }
};

const getEmployees = (req, res) => {
  const ITEMS_PER_PAGE = 5
  const page = +req.query?.page || 1;
  const searchQuery = req.query?.search || '';
  const sort = req.query?.sort || 'DESC';

  // Create a case-insensitive regular expression from the search query
  const searchRegex = new RegExp(searchQuery, 'i');

  let filteredEmployees = []
  if (searchQuery.length === 0) {
    filteredEmployees = [...employees]
  } else {
    // Filter employees based on the regular expression
    filteredEmployees = employees.filter(employee =>
      searchRegex.test(employee.firstName) ||
      searchRegex.test(employee.lastName) ||
      searchRegex.test(employee.phone) ||
      searchRegex.test(employee.email)
    );
  }

  // Sort the paginated employees
  if (sort === 'DESC') {
    filteredEmployees.reverse()
  }

  // Calculate pagination limits
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  // Get paginated employees
  const paginatedEmployees = filteredEmployees.slice(startIndex, endIndex);



  res.status(200).json({
    currentPage: page,
    totalPages: Math.ceil(filteredEmployees.length / ITEMS_PER_PAGE),
    employees: paginatedEmployees
  });
};

const getEmployee = (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const employee = employees.find(emp => emp.id === id);

    if (!employee) {
      return res.status(404).json({ message: 'All fields are required' });

      throw { status: 404, message: 'Employee not found' };
    }

    return res.status(200).json({ employee });
  } catch (error) {
    next(error); // Pass the error to the error handling middleware
  }
};

const updateEmployee = (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const { firstName, lastName, phone, email, workHours, salaryType, department } = req.body;
    const employeeIndex = employees.findIndex(emp => emp.id === id);
    if (employeeIndex === -1) return res.status(404).json({ message: 'Employee not found' });

    // Check field is not empty
    if (!firstName || !lastName || !phone || !email || !workHours || !salaryType || !department) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Perform data validation
    if (
      typeof firstName !== 'string' ||
      typeof lastName !== 'string' ||
      typeof phone !== 'string' || !validatePhone(phone) ||
      typeof email !== 'string' || !validateEmail(email) ||
      typeof +workHours !== 'number' || +workHours < 0 ||
      typeof +salaryType !== 'number' || ![1, 2, 3].includes(+salaryType) ||
      typeof department !== 'string'
    ) {
      return res.status(400).json({ message: 'Invalid input data' });
    }

    // Calculate the salary based on salaryType and workHours
    const salary = calculateSalary(+salaryType, workHours);
    employees[employeeIndex] = { id, firstName, lastName, phone, email, workHours, salaryType, salary, department };
    return res.status(200).json({ message: 'Employee Updated Successfully!' });
  } catch (error) {
    next(error);
  }

}

const deleteEmployee = (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const employeeIndex = employees.findIndex(emp => emp.id === id);
    if (employeeIndex === -1) {
      return res.status(404).json({ message: 'Employee not found' });
    } else {
      employees.splice(employeeIndex, 1);
      return res.json({ message: 'Employee Deleted Successfully!' });
    }
  } catch (error) {
    next(error); // Pass the error to the error handling middleware
  }
};

module.exports = {
  addEmployee,
  getEmployees,
  getEmployee,
  updateEmployee,
  deleteEmployee,
};
