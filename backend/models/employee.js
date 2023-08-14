// models/employee.js
class Employee {
  constructor(id, firstName, lastName, phone, email, workHours, salaryType, salary, department) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phone = phone;
    this.email = email;
    this.workHours = workHours;
    this.salaryType = salaryType;
    this.salary = salary;
    this.department = department;
  }
}

module.exports = Employee;
