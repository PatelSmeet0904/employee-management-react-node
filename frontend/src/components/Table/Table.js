import React, { useEffect, useState } from 'react'
import { TbArrowsSort, TbSearch } from "react-icons/tb"
import { MdOutlineDeleteOutline, MdEditSquare } from "react-icons/md"
import { BsSearch } from "react-icons/bs"
import { useNavigate } from 'react-router-dom'
import './Table.css'
import { useEmployeeContext } from '../../context/EmployeeContext'
import ReactPaginate from 'react-paginate';

const Table = () => {
  const { fetchEmployees, deleteEmployee, employees, loading, totalPages } = useEmployeeContext()
  const navigate = useNavigate()
  const [isSortOpen, setIsSortOpen] = useState(false)
  const [queryValue, setQueryValue] = useState('')
  const [sort, setSort] = useState('DESC')
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    const getData = setTimeout(() => {
      fetchEmployees(queryValue, sort, pageNumber)
    }, 500);
    return () => clearTimeout(getData);
  }, [queryValue, sort, pageNumber]);

  const handleQueryValue = (value) => {
    value = value.trim()
    setQueryValue(value);
    setPageNumber(0);
  }

  const handleDelete = async (id) => {
    deleteEmployee(id)
    setPageNumber(0);
    setQueryValue('')
  };

  const handlePageClick = (data) => {
    const selectedPage = data.selected;
    setPageNumber(selectedPage + 1); // Update the current page number
  };

  return (
    <div className="card-container">
      <div className="card">
        <div className="card-header">
          <div className="search-bar-container">
            <TbSearch />
            <input type="text" id="myInput" value={queryValue} placeholder="Search" onChange={(e) => handleQueryValue(e.target.value)} className="input-field"></input>
          </div>
          <div className="filter">
            <button className="sortbtn" onClick={() => { setIsSortOpen((prev) => !prev) }}>
              <TbArrowsSort size='16' />
              <p>Sort</p>
            </button>
            {isSortOpen &&
              <>
                <div className="overlay-dropdown" onClick={() => setIsSortOpen(false)}>&nbsp;</div>
                <div className="sort-dropdown-content">
                  <div className="checkbox-list">
                    <p>Emp. Created At</p>
                  </div>
                  <div className="checkbox-list" onClick={() => setSort('DESC')}>
                    <input type="radio" name="descending" value="Descending" readOnly={true} checked={sort === 'DESC' ? true : false} />
                    <p>Descending</p>
                  </div>
                  <div className="checkbox-list" onClick={() => setSort('ASC')}>
                    <input type="radio" name="ascending" value="Ascending" readOnly={true} checked={sort === 'ASC' ? true : false} />
                    <p>Ascending</p>
                  </div>
                </div>
              </>
            }
          </div>
        </div>
        {!loading ?
          <>
            {employees.length === 0 ?
              <div className="empty-card">
                <div className="icon"><BsSearch /></div>
                <div className="empty-card-title">
                  No users
                </div>
              </div> :
              <>
                <div className="card-body">
                  <table>
                    <thead>
                      <tr>
                        <th>Emp. ID</th>
                        <th>Full Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Work Hours</th>
                        <th>Salary</th>
                        <th>Department</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {employees?.map((emp) => (
                        <tr key={emp.id}>
                          <td>{emp.id}</td>
                          <td>{emp.firstName[0].toUpperCase() + emp.firstName.slice(1).toLowerCase()} {emp.lastName[0].toUpperCase() + emp.lastName.slice(1).toLowerCase()}</td>
                          <td>{emp.phone}</td>
                          <td>{emp.email}</td>
                          <td>{emp.workHours}</td>
                          <td>{emp.salary}</td>
                          <td>{emp.department}</td>
                          <td className="employee-list-actions">
                            <button
                              onClick={() => navigate(`/updateEmp/${emp.id}`)}
                              className="action-button edit-button"
                            >
                              <MdEditSquare color='white' size='20' />
                            </button>
                            <button
                              onClick={() => handleDelete(emp.id)}
                              className="action-button delete-button"
                            >
                              <MdOutlineDeleteOutline color='white' size='20' />
                            </button>

                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

              </>
            }
          </>
          :
          <div className='empty-card'>
            <h3>loading...</h3>
          </div>
        }
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageCount={totalPages}
        previousLabel="< prev"
        renderOnZeroPageCount={null}
        containerClassName="pagination-container"
        activeClassName="active-page"
        previousLinkClassName={pageNumber === 1 ? "disabled" : ""}
        nextLinkClassName={pageNumber === totalPages ? "disabled" : ""}
      />
    </div>
  )
}

export default Table