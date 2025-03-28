import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, ProgressBar } from 'react-bootstrap';

const EnrollCourses = () => {
    const [student, setStudent] = useState(null);

    useEffect(() => {
        const fetchStudentData = async () => {
            const mockStudentData = {
                name: "John Doe",
                courses: [
                    { name: "Mathematics", completed: true, progress: 100, grade: "A" },
                    { name: "Physics", completed: false, progress: 75, grade: "B" },
                    { name: "Chemistry", completed: false, progress: 50, grade: "C" },
                ],
            };
            setStudent(mockStudentData);
        };

        fetchStudentData();
    }, []);

    if (!student) return <div>Loading...</div>;

    return (
        <Container fluid>
            <Col md={9} className="p-4">
                <h3>Enrolled Courses</h3>
                <Row>
                    {student.courses.map((course, index) => (
                        <Col md={6} key={index} className="mb-4">
                            <Card>
                                <Card.Body>
                                    <Card.Title>{course.name}</Card.Title>
                                    <Card.Text>
                                        Status: {course.completed ? 'Completed' : 'In Progress'} <br />
                                        Progress: {course.progress}% <br />
                                        Grade: {course.grade || 'N/A'}
                                    </Card.Text>
                                    <ProgressBar 
                                        now={course.progress} 
                                        label={`${course.progress}%`} 
                                        variant={course.completed ? 'success' : 'primary'} 
                                    />
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Col>
        </Container>
    );
};

export default EnrollCourses;
