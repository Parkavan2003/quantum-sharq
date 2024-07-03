import { useEffect, useState } from "react";
import avatar from "../assets/avatar.webp";
import axios from "axios";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Paginator } from 'primereact/paginator';

const AllEmployee = () => {
  const [employees, setEmployees] = useState([
    { name: "Suresh", email: "suresh@example.com", employee_ID: "#2345fGHj67Yt6", role: "Frontend Developer", status: "Active", teams: ["Marketing", "Design", "+1"] },
    { name: "ramesh", email: "suresh@example.com", employee_ID: "#2345fGH5vb7Yt6", role: "Frontend Developer", status: "Inactive", teams: ["Marketing", "Design", "+1"] },
    { name: "ramesh", email: "suresh@example.com", employee_ID: "#2345fGH5vf7Yt6", role: "Frontend Developer", status: "Inactive", teams: ["Marketing", "Design", "+1"] },
    { name: "ramesh", email: "suresh@example.com", employee_ID: "#2345fGH5vas7Yt6", role: "Frontend Developer", status: "Inactive", teams: ["Marketing", "Design", "+1"] },
    { name: "ramesh", email: "suresh@example.com", employee_ID: "#2345fGH5vbyYt6", role: "Frontend Developer", status: "Inactive", teams: ["Marketing", "Design", "+1"] },
    { name: "ramesh", email: "suresh@example.com", employee_ID: "#2345fGH5vbzYt6", role: "Frontend Developer", status: "Inactive", teams: ["Marketing", "Design", "+1"] },
    { name: "ramesh", email: "suresh@example.com", employee_ID: "#2345fGH5vbiYt6", role: "Frontend Developer", status: "Inactive", teams: ["Marketing", "Design", "+1"] },
    { name: "ramesh", email: "suresh@example.com", employee_ID: "#2345fGH5v77Yt6", role: "Frontend Developer", status: "Inactive", teams: ["Marketing", "Design", "+1"] },
    { name: "ramesh", email: "suresh@example.com", employee_ID: "#2345fGH2mvb7Yt6", role: "Frontend Developer", status: "Inactive", teams: ["Marketing", "Design", "+1"] },
    { name: "ramesh", email: "suresh@example.com", employee_ID: "#2345fGH75vb7Yt6", role: "Frontend Developer", status: "Inactive", teams: ["Marketing", "Design", "+1"] },
    { name: "ramesh", email: "suresh@example.com", employee_ID: "#2345fGH0vb7Yt6", role: "Frontend Developer", status: "Inactive", teams: ["Marketing", "Design", "+1"] },
    
  ]);

  const [showCreate, setShowCreate] = useState(false);
  const [rowClick, setRowClick] = useState(true);
  const [selectedEmployees, setSelectedEmployees] = useState(null);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [EmployeeName, setEmployeeName] = useState("")
  const [EmployeeID, setEmployeeID] = useState("")
  const [EmployeeRole, setEmployeeRole] = useState("")
  const [EmployeeStatus, setEmployeeStatus] = useState("")
  const [EmployeeTeam, setEmployeeTeam] = useState("")

  const statusBodyTemplate = (rowData) => {
    return (
      <span className={`px-3 py-1 rounded-full font-semibold ${rowData.status === 'Active' ? 'bg-green-100 text-green-700 border border-green-400' : 'bg-red-100 text-red-700 border border-red-400'}`}>
        {rowData.status}
      </span>
    );
  };

  const teamsBodyTemplate = (rowData) => {
    return (
      <div>
        {rowData.teams.map((team, index) => (
          <span key={index} className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full mr-1 inline-block">{team}</span>
        ))}
      </div>
    );
  };

  const nameBodyTemplate = (rowData) => {
    return (
      <div className="flex flex-col">
        <div className="flex gap-2 items-center">
          <img src={avatar} alt={rowData.name} className="h-6 w-6 rounded-full" />
          {rowData.name}
        </div>
        <div className="ml-8 text-gray-500 text-sm">{rowData.email}</div>
      </div>
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/employees');
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        console.error("Fetch AllEmployees error:", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = (e) => {
    console.log(
      "Employee Name",
      EmployeeName,
      EmployeeID,
      "EmployeeID",
      EmployeeRole,
      "EmployeeRole",
      EmployeeStatus,
      "EmployeeStatus",
      EmployeeTeam,
      "EmployeeTeam"
    );

    e.preventDefault();
    axios
      .post("http://localhost:3001/employees", {
        name: EmployeeName,
        employee_ID: EmployeeID,
        role: EmployeeRole,
        details: {
          status: EmployeeStatus,
        },
        team: EmployeeTeam,
      })
      .then((result) => {
        console.log(result);
        setShowCreate(!showCreate);
      })
      .catch((err) => console.log(err));
  };

  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  return (
    <div className="mt-0 mb-10">
      <h2 className="text-2xl font-bold text-center ">List of All Employees</h2>
      <div className="flex flex-col items-center justify-center ">
        <div className="flex justify-between my-10 px-5 py-3 rounded-lg w-full">
          <h4 className="flex items-center font-semibold">Employees</h4>

          {showCreate && (
            <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50">
              <div className="bg-white px-4 py-6 rounded-md w-full md:w-1/2 relative z-10">
                <form
                  className="w-full md:w-9/12 mx-auto mb-4 md:mb-0"
                  onSubmit={handleSubmit}
                >
                  <div className="text-center">
                    <h1 className="text-3xl font-semibold">
                      Create New Employee
                    </h1>
                  </div>

                  <div className="flex flex-col py-3">
                    <label htmlFor="projectName" className="py-2 font-medium">
                      Employee Name
                    </label>
                    <input
                      className="border border-slate-400 rounded-md px-2 py-1"
                      type="text"
                      id="projectName"
                      name="projectName"
                      placeholder="Enter the Employee Name"
                      required
                      onChange={(e) => setEmployeeName(e.target.value)}
                      value={EmployeeName}
                    />
                  </div>

                  <div className="flex flex-col py-3">
                    <label
                      htmlFor="projectOverview"
                      className="py-2 font-medium"
                    >
                      Employee ID
                    </label>
                    <input
                      className="border border-slate-400 rounded-md px-2 py-1"
                      value={EmployeeID}
                      name=""
                      id="projectOverview"
                      placeholder="Enter the Unique Employee ID"
                      onChange={(e) => setEmployeeID(e.target.value)}
                    ></input>
                  </div>

                  <div className="flex flex-col py-3">
                    <label className="py-2 font-medium" htmlFor="role">
                      Role
                    </label>
                    <select
                      className="border border-slate-400 rounded-md px-2 py-1"
                      name="role"
                      id="role"
                      required
                      value={EmployeeRole}
                      onChange={(e) => setEmployeeRole(e.target.value)}
                    >
                      <option value="Frontend">Frontend</option>
                      <option value="Backend">Backend</option>
                      <option value="UI/UX">UI/UX</option>
                    </select>
                  </div>

                  <div className="flex flex-col py-3">
                    <label className="py-2 font-medium">Status</label>
                    <select
                      className="border border-slate-400 rounded-md px-2 py-1"
                      required
                      value={EmployeeStatus}
                      onChange={(e) => setEmployeeStatus(e.target.value)}
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>

                  <div className="flex flex-col py-3">
                    <label className="py-2 font-medium">Team</label>
                    <select
                      className="border border-slate-400 rounded-md px-2 py-1"
                      required
                      value={EmployeeTeam}
                      onChange={(e) => setEmployeeTeam(e.target.value)}
                    >
                      <option value="Marketing">Marketing</option>
                      <option value="Design">Design</option>
                      <option value="Sales">Sales</option>
                    </select>
                  </div>

                  <div className="text-center flex w-full items-center justify-between">
                    <button
                      className="text-center bg-blue-600  rounded-md text-white px-4 py-2"
                      type="submit"
                    >
                      Create Employee
                    </button>
                    <button className="bg-red-500 hover:bg-red-600 transition duration-300 text-white px-4 py-2  rounded-md uppercase font-medium"
          onClick={() => setShowCreate(!showCreate)}
          >Cancel</button>
                  </div>
                </form>
              </div>
            </div>
          )}

          <div className="flex gap-5">
            <Button label="Export" className="p-button-outlined border border-black rounded-lg px-4" />
            <Button label="Filter" icon="pi pi-filter" className="p-button-secondary border border-black rounded-md px-4" />
            <Button
              label="Add Employee"
              className="p-button-info"
              onClick={() => setShowCreate(!showCreate)}
            />
          </div>
        </div>

        <div className="card w-full border border-black mb-10 h-full">
          <DataTable
            value={employees}
            selection={selectedEmployees}
            onSelectionChange={(e) => setSelectedEmployees(e.value)}
            dataKey="employee_ID"
            tableStyle={{ minWidth: '50rem' }}
            paginator
            rows={10}
            rowsPerPageOptions={[15, 20, 25]}
            paginatorTemplate="RowsPerPageDropdown CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries "
          >

            <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
            <Column field="name" header="Name" body={nameBodyTemplate}></Column>
            <Column field="employee_ID" header="Employees ID"></Column>
            <Column field="role" header="Role"></Column>
            <Column field="status" header="Status" body={statusBodyTemplate}></Column>
            <Column field="teams" header="Teams" body={teamsBodyTemplate}></Column>
          </DataTable>
        </div>
      </div>
      <style jsx>{`
        .p-datatable thead th {
          border-bottom: 1px solid black;
          padding: 10px;
        }
        .p-datatable-tbody > tr {
          border-bottom: 1px solid black;
          padding: 10px;
        }
        .p-datatable-tbody > tr > td {
          padding: 10px;
        }
        .p-datatable-tbody > tr.p-highlight {
          background-color: #ccc;
        }
        .p-checkbox-box {
          width: 100%;
          height: 100%;
        }
        .p-checkbox-box:checked {
          background-color: blue;
        }
          .p-button-info{
            background-color: lightblue;
            padding:5px 10px;
            border-radius:10px;
          }
      `}</style>
    </div>
  );
};

export default AllEmployee;
