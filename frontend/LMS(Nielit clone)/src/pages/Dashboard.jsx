import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [stats, setStats] = useState({ enrolled: "", active: "", completed: "", students: "" });

  useEffect(() => {
    axios.get("http://localhost:5000/api/dashboard")
      .then(response => {
        if (response.data) {
          setStats(response.data);
        } else {
          setStats({ enrolled: "", active: "", completed: "", students: "" });
        }
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        setStats({ enrolled: "", active: "", completed: "", students: "" }); // Fallback
      });
  }, []);
  
  

  return (
    <div className="container-fluid p-4">
      <h2>Student Dashboard</h2>
      <div className="row">
        <div className="col-md-3"><div className="card p-3 text-white bg-dark"><h5>Enrolled Courses</h5><h3>{stats.enrolled}</h3></div></div>
        <div className="col-md-3"><div className="card p-3 text-white bg-dark"><h5>Active Courses</h5><h3>{stats.active}</h3></div></div>
        <div className="col-md-3"><div className="card p-3 text-white bg-dark"><h5>Completed Courses</h5><h3>{stats.completed}</h3></div></div>
        <div className="col-md-3"><div className="card p-3 text-white bg-dark"><h5>Total Students</h5><h3>{stats.students}</h3></div></div>
      </div>
    </div>
  );
};

export default Dashboard;
