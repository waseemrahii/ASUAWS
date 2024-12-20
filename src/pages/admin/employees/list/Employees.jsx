import React, { useEffect, useState } from "react";
import { FaSearch, FaDownload, FaPlus, FaEdit, FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { getAuthData } from "../../../../utils/authHelper";
import apiConfig from "../../../../config/apiConfig";
// const ApiUrl = apiConfig.admin
const ApiUrl = `${apiConfig.admin}`;

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const { token } = getAuthData(); // Assuming this function retrieves the token
        const response = await axios.get(`${ApiUrl}/employees`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          // Map response data to the required format
          const formattedEmployees = response.data.doc.map(emp => ({
            id: emp?._id,
            name: emp?.name,
            email: emp?.email,
            phone: emp?.phoneNumber,
            role: emp?.role?.name, // Assuming you want the role name
            status: emp?.status === "active", // Convert to boolean for checkbox
            imageUrl: emp?.image ? `${apiConfig.bucket}/${emp?.image}` : '/image-place-holder.png', 
          }));
          setEmployees(formattedEmployees);
        }
      } catch (error) {
        console.error("Error fetching employees:", error);
        toast.error("Failed to fetch employee data!");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Add a loading state as needed
  }

  return (
    <div className="content container-fluid snipcss-YXrS6">
      <div className="mb-3">
        <h2 className="h1 mb-0 text-capitalize d-flex align-items-center gap-2">
          <img src="/employee.png" width="20" alt="" /> Employee list
        </h2>
      </div>
      <div className="card">
        <div className="card-header flex-wrap gap-10">
          <div className="px-sm-3 py-4 flex-grow-1">
            <div className="d-flex justify-content-between gap-3 flex-wrap align-items-center">
              <div>
                <h5 className="mb-0 text-capitalize gap-2"> Employee table <span className="badge badge-soft-dark radius-50 fz-12">{employees.length}</span></h5>
              </div>
              <div className="align-items-center d-flex gap-3 justify-content-lg-end flex-wrap flex-lg-nowrap flex-grow-1">
                <div>
                  <form action="" method="GET">
                    <div className="input-group input-group-merge input-group-custom">
                      <div className="input-group-prepend">
                        <div className="input-group-text">
                          <FaSearch />
                        </div>
                      </div>
                      <input type="search" name="searchValue" className="form-control" placeholder="Search by name or email or phone" required />
                      <button type="submit" className="btn bg-primary text-white" style={{color:"white"}}>Search</button>
                    </div>
                  </form>
                </div>
               
                <div>
                  <button type="" className="btn border-primary text-nowrap flex justify-center align-items-center gap-1" style={{borderColor:"green", color:"green"}} data-toggle="dropdown">
                    <FaDownload /> Export 
                  </button>
                  <ul className="dropdown-menu dropdown-menu-right">
                    <li>
                      <a className="dropdown-item" href="">
                        <img width="14" src="https://6valley.6amtech.com/public/assets/back-end/img/excel.png" alt="" /> Excel 
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
                  <Link to="/addemploye" className="btn bg-primary  text-white  hover:text-white flex justify-center align-items-center gap-1">
                    <FaPlus />
                    <span className="text ">Add new</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="table-responsive">
            <table id="datatable" className="table table-hover table-borderless table-thead-bordered table-align-middle card-table w-100 style-CI8zs">
              <thead className="thead-light thead-50 text-capitalize table-nowrap">
                <tr>
                  <th>SL</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee, index) => (
                  <tr key={employee.id}>
                    <td>{index + 1}</td>
                    <td className="text-capitalize">
                      <div className="media align-items-center gap-10">
                        <img className="rounded-circle avatar avatar-lg" alt="" src={employee?.imageUrl} />
                        <div className="media-body"> {employee.name} </div>
                      </div>
                    </td>
                    <td>{employee.email}</td>
                    <td>{employee.phone}</td>
                    <td>{employee.role}</td>
                    <td>
                      <label className="switcher">
                        <input type="checkbox" className="switcher_input" checked={employee.status} onChange={() => {}} />
                        <span className="switcher_control"></span>
                      </label>
                    </td>
                    <td className="text-center">
                      <div className="d-flex gap-10 justify-content-center">
                        {/* <Link to={`/update/${employee.id}`} className="btn btn-outline--primary btn-sm square-btn" title="Edit">
                          <FaEdit />
                        </Link> */}
                        <Link className="btn btn-outline-info btn-sm square-btn" title="View" to={`/view/${employee.id}`}>
                          <FaEye />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeList;
