import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    userType: "",
    firstName: "",
    lastName: "",
    fatherName: "",
    dateOfBirth: "",
    tel: "",
    highSchoolName: "",
    address: "",
    level: "1st Year",
    email: "",
    degreeProgram: "BS in Pre-Med Physics",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/registerform", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message || "Registration successful");
        setFormData({
          userType: "",
          firstName: "",
          lastName: "",
          fatherName: "",
          motherName: "",
          tel: "",
          highestQualification: "",
          address: "",
          email: "",
          dateOfBirth: "",
          gender: "",
          level: "1st Year",
          degreeProgram: "BS in Pre-Med Physics",
          profilepic: "BS in Pre-Med Physics",
        });
        navigate("/dashboard"); // Redirect to a success page if needed
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Error occurred during registration");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="col-md-8 col-lg-6">
        <div className="card shadow-lg">
          <div className="card-body p-4">
            <h2 className="text-center mb-4 text-primary fw-bold">
              Registration Form
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="userType" className="form-label">
                  Select User
                </label>
                <input
                  type="text"
                  className="form-control"
                  list="browsers"
                  id="userType"
                  name="userType"
                  placeholder="Select User"
                  value={formData.userType}
                  onChange={handleChange}
                  required
                />
                <datalist id="browsers">
                  <option value="Admin" />
                  <option value="Staff" />
                  <option value="Student" />
                </datalist>
              </div>
              {[
                "firstName",
                "lastName",
                "fatherName",
                "motherName",
                "tel",
                "highestQualification",
                "address",
                "email",
              ].map((field) => (
                <div className="mb-3" key={field}>
                  <label htmlFor={field} className="form-label">
                    {field
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^./, (str) => str.toUpperCase())}
                    <span className="text-danger"> *</span>
                  </label>
                  <input
                    type={
                      field === "email"
                        ? "email"
                        : field === "tel"
                        ? "tel"
                        : "text"
                    }
                    className="form-control"
                    id={field}
                    name={field}
                    placeholder={`Enter your ${field
                      .replace(/([A-Z])/g, " $1")
                      .toLowerCase()}`}
                    value={formData[field]}
                    onChange={handleChange}
                    required
                  />
                </div>
              ))}
              <div className="mb-3">
                <label htmlFor="dateOfBirth" className="form-label">
                  Date of Birth<span className="text-danger"> *</span>
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="gender" className="form-label">
                  Gender
                </label>
                <select
                  className="form-select"
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="level" className="form-label">
                  Your Level
                </label>
                <select
                  className="form-select"
                  id="level"
                  name="level"
                  value={formData.level}
                  onChange={handleChange}
                >
                  <option>1st Year</option>
                  <option>2nd Year</option>
                  <option>3rd Year</option>
                  <option>4th Year</option>
                  <option>Graduate</option>
                  <option>NA</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="degreeProgram" className="form-label">
                  Degree Program
                </label>
                <select
                  className="form-select"
                  id="degreeProgram"
                  name="degreeProgram"
                  value={formData.degreeProgram}
                  onChange={handleChange}
                >
                  <option>O level</option>
                  <option>A level</option>
                  <option>B level</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="profilepic" className="form-label">
                  Profile Picture<span className="text-danger"> *</span>
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="profilepic"
                  name="profilepic"
                  value={formData.profilepic}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-primary btn-lg w-100">
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
