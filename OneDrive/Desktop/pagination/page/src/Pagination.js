import React, { useState, useEffect } from "react";
import "./Pagination.css";

function Pagination() {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;


  useEffect(() => {
    fetch(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    )
      .then((response) => response.json())
      .then((data) => setEmployees(data))
      .catch(() => alert("Failed to fetch data"));
  }, []);


  const indexOfLastEmployee = currentPage * rowsPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - rowsPerPage;
  const currentEmployees = employees.slice(indexOfFirstEmployee, indexOfLastEmployee);


  const nextPage = () => {
    if (currentPage < Math.ceil(employees.length / rowsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };


  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="employee-table">
      <h1>Employee Table Data</h1>
      <table>
        <thead>
          <tr className="table-header">
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {currentEmployees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination-controls">
        <button onClick={previousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>{currentPage}</span>
        <button
          onClick={nextPage}
          disabled={currentPage === Math.ceil(employees.length / rowsPerPage)}
        >
            
          Next
        </button>
      </div>
    </div>
  );
}
//new 
export default Pagination;
