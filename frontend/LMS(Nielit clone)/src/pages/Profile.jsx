import { useEffect, useState } from "react";
import { Card, Row, Col } from "react-bootstrap";

const StudentProfile = () => {
  const [student, setStudent] = useState({
    userType: "",
    firstName: "",
    lastName: "",
    fatherName: "",
    dateOfBirth: "",
    tel: "",
    highSchoolName: "",
    address: "",
    level: "",
    email: "",
    degreeProgram: "",
  });

  useEffect(() => {
    // Fetch student data from the API when the component mounts
    fetch("http://localhost:5000/registerform")
      .then((response) => response.json())
      .then((data) => setStudent(data))
      .catch((error) => console.error("Error fetching student data:", error));
  }, []);

  // Display a loading message while waiting for the data
  if (!student) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-4">
      <Row>
        <Col md={6} className="mx-auto">
          <Card>
            <Card.Header as="h5">Student Profile</Card.Header>
            <Card.Body>
              <Row>
                <Col md={4}>
                  <img
                    src={student.profilePic}
                    alt="Profile"
                    className="img-fluid rounded-circle"
                  />
                </Col>
                <Col md={8}>
                  <h5>{student.name}</h5>
                  <p>
                    <strong>Select User:</strong> {student.userType}
                  </p>
                  <p>
                    <strong>Name:</strong> {student.firstName.lastName}
                  </p>
                  <p>
                    <strong>Father Name:</strong> {student.fatherName}
                  </p>
                  <p>
                    <strong>Mother Name:</strong> {student.motherName}
                  </p>
                  <p>
                    <strong>Tel:</strong> {student.tel}
                  </p>
                  <p>
                    <strong>Highest Qualification:</strong>{" "}
                    {student.highestQualification}
                  </p>
                  <p>
                    <strong>Address:</strong> {student.address}
                  </p>
                  <p>
                    <strong>Email:</strong> {student.email}
                  </p>
                  <p>
                    <strong>Date of Birth:</strong> {student.dateOfBirth}
                  </p>
                  <p>
                    <strong>Gender:</strong> {student.gender}
                  </p>
                  <p>
                    <strong>Your Level:</strong> {student.level}
                  </p>
                  <p>
                    <strong>Degree Program:</strong> {student.degreeProgram}
                  </p>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default StudentProfile;
