exports.calculateSalary = (salaryType, workHours) => {
  const hourlyWage = 15; // Example hourly wage
  const fixedSalary = 2000; // Example fixed monthly salary
  const hourlyPayRate = 0.0075; // Example pay rate per hour for type 3

  if (salaryType === 1) {
    // Calculate salary based on hourly wage
    return hourlyWage * workHours;
  } else if (salaryType === 2) {
    // Fixed monthly salary
    return fixedSalary;
  } else if (salaryType === 3) {
    // Calculate salary based on type 3 criteria
    if (workHours > 100) {
      return fixedSalary;
    } else {
      return Math.ceil(fixedSalary * (workHours * hourlyPayRate));
    }
  } else {
    throw new Error('Invalid salary type');
  }
}
