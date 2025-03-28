// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { Card, Button, Container, Row, Col, Form } from "react-bootstrap";

// const CoursesPage = () => {
//   const [courses, setCourses] = useState([
//     { id: 1, title: "React Basics", description: "Learn the basics of React." },
//     {
//       id: 2,
//       title: "Node.js Essentials",
//       description: "Master Node.js for backend.",
//     },
//     { id: 3, title: "MongoDB 101", description: "Introduction to MongoDB." },
//   ]);

//   const [newCourse, setNewCourse] = useState({ title: "", description: "" });

//   // Add a new course
//   const addCourse = () => {
//     if (newCourse.title && newCourse.description) {
//       const id = courses.length ? courses[courses.length - 1].id + 1 : 1;
//       setCourses([...courses, { id, ...newCourse }]);
//       setNewCourse({ title: "", description: "" });
//     }
//   };

//   // Delete a course
//   const deleteCourse = (id) => {
//     setCourses(courses.filter((course) => course.id !== id));
//   };

//   return (
//     <>
//       {/* Search Bar */}
//       <section className="py-4 bg-primary-subtle">
//         <div className="container text-center">
//           <h2 className="mb-3 fw-bold">Find the Right Course for You</h2>
//           <input
//             type="text"
//             className="form-control w-50 mx-auto"
//             placeholder="Search for courses..."
//             aria-label="Search for courses"
//           />
//         </div>
//       </section>

//       <Container>
//         <h1 className="mt-4 mb-4 text-center">Available Courses</h1>

//         {/* Form to add a new course */}
//         <Form className="mb-4">
//           <Row>
//             <Col md={4}>
//               <Form.Control
//                 type="text"
//                 placeholder="Course Title"
//                 value={newCourse.title}
//                 onChange={(e) =>
//                   setNewCourse({ ...newCourse, title: e.target.value })
//                 }
//               />
//             </Col>
//             <Col md={5}>
//               <Form.Control
//                 type="text"
//                 placeholder="Course Description"
//                 value={newCourse.description}
//                 onChange={(e) =>
//                   setNewCourse({ ...newCourse, description: e.target.value })
//                 }
//               />
//             </Col>
//             <Col md={3}>
//               <Button variant="primary" onClick={addCourse}>
//                 Add Course
//               </Button>
//             </Col>
//           </Row>
//         </Form>

//         {/* Display courses */}
//         <Row>
//           {courses.map((course) => (
//             <Col md={4} key={course.id} className="mb-4">
//               <Card>
//                 <Card.Body>
//                   <Card.Title>{course.title}</Card.Title>
//                   <Card.Text>{course.description}</Card.Text>
//                   <Link
//                     to={`/course/${course.id}`}
//                     className="btn btn-info me-2"
//                   >
//                     View Details
//                   </Link>
//                   <Button
//                     variant="danger"
//                     onClick={() => deleteCourse(course.id)}
//                   >
//                     Delete
//                   </Button>
//                 </Card.Body>
//               </Card>
//             </Col>
//           ))}
//         </Row>
//       </Container>
//     </>
//   );
// };

// export default CoursesPage;

// const Courses = () => {
//   return (
//     <>
//       <div className="bg-white">
//         <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
//           <h2 className="text-2xl font-bold tracking-tight text-gray-900">
//             Customers also purchased
//           </h2>
//           <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
//             <div className="group relative">
//               <img
//                 src="https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-01.jpg"
//                 alt="Front of men&#039;s Basic Tee in black."
//                 className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
//               />
//               <div className="mt-4 flex justify-between">
//                 <div>
//                   <h3 className="text-sm text-gray-700">
//                     <a href="#">
//                       <span
//                         aria-hidden="true"
//                         className="absolute inset-0"
//                       ></span>
//                       Basic Tee
//                     </a>
//                   </h3>
//                   <p className="mt-1 text-sm text-gray-500">Black</p>
//                 </div>
//                 <p className="text-sm font-medium text-gray-900">$35</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Courses;

/* eslint-disable no-unused-vars */
// import {
//   Card,
//   CardHeader,
//   CardBody,
//   CardFooter,
//   Typography,
//   Button,
// } from "@material-tailwind/react";
// import { useState } from "react";
// import toast, { Toaster } from "react-hot-toast";

// const Courses = () => {
//   const [amount, setamount] = useState(350);

//   // handlePayment Function
//   const handlePayment = async () => {
//     try {
//       const res = await fetch(
//         `${import.meta.env.VITE_BACKEND_HOST_URL}/api/payment/order`,
//         {
//           method: "POST",
//           headers: {
//             "content-type": "application/json",
//           },
//           body: JSON.stringify({
//             amount,
//           }),
//         }
//       );

//       const data = await res.json();
//       console.log(data);
//       handlePaymentVerify(data.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // handlePaymentVerify Function
//   const handlePaymentVerify = async (data) => {
//     const options = {
//       key: import.meta.env.RAZORPAY_KEY_ID,
//       amount: data.amount,
//       currency: data.currency,
//       name: "Devknus",
//       description: "Test Mode",
//       order_id: data.id,
//       handler: async (response) => {
//         console.log("response", response);
//         try {
//           const res = await fetch(
//             `${import.meta.env.VITE_BACKEND_HOST_URL}/api/payment/verify`,
//             {
//               method: "POST",
//               headers: {
//                 "content-type": "application/json",
//               },
//               body: JSON.stringify({
//                 razorpay_order_id: response.razorpay_order_id,
//                 razorpay_payment_id: response.razorpay_payment_id,
//                 razorpay_signature: response.razorpay_signature,
//               }),
//             }
//           );

//           const verifyData = await res.json();
//           if (verifyData.message) {
//             toast.success(verifyData.message);
//           }
//         } catch (error) {
//           console.log(error);
//         }
//       },
//       theme: {
//         color: "#5f63b8",
//       },
//     };
//     const rzp1 = new window.Razorpay(options);
//     rzp1.open();
//   };
//   return (
//     <Card className="mt-6 bg-[#222f3e] text-white">
//       {/* CardHeader */}
//       <CardHeader color="" className="relative h-96 bg-[#2C3A47]">
//         {/* Image  */}
//         <img
//           className="w-25 h-25"
//           src="https://codeswear.nyc3.cdn.digitaloceanspaces.com/tshirts/pack-of-five-plain-tshirt-white/1.webp"
//           alt="card-image"
//         />
//       </CardHeader>

//       {/* CardBody */}
//       <CardBody>
//         {/* Typography For Title */}
//         <Typography variant="h5" className="mb-2">
//           My First Product
//         </Typography>

//         {/* Typography For Price  */}
//         <Typography>
//           ₹350 <span className=" line-through">₹699</span>
//         </Typography>
//       </CardBody>

//       {/* CardFooter  */}
//       <CardFooter className="pt-0">
//         {/* Buy Now Button  */}
//         <Button onClick={handlePayment} className="w-full bg-[#1B9CFC]">
//           Buy Now
//         </Button>
//         <Toaster />
//       </CardFooter>
//     </Card>

//   );
// };

// export default Courses;

import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import img1 from "../assets/web_development.png";
import img2 from "../assets/data_science.png";
import img3 from "../assets/cyber-security.png";
import img4 from "../assets/IOT.png";
import img5 from "../assets/python.png";
import img6 from "../assets/Digital marketing.png";
import img7 from "../assets/data analytics.png";
import img8 from "../assets/Machine learning.png";
import img9 from "../assets/cloud.png";
import img10 from "../assets/Mobile app development.png";
import img11 from "../assets/CCC.png";
import img12 from "../assets/O level.png";
import img13 from "../assets/A level.png";

const courses = [
  {
    id: 1,
    title: "CCC Course",
    price: 299,
    originalPrice: 999,
    image: img11,
  },
  {
    id: 2,
    title: "O Level Course",
    price: 999,
    originalPrice: 1200,
    image: img12,
  },
  {
    id: 3,
    title: "A Level Course",
    price: 899,
    originalPrice: 999,
    image: img13,
  },
  {
    id: 4,
    title: "Fullstack Web Development",
    price: 499,
    originalPrice: 999,
    image: img1,
  },
  {
    id: 5,
    title: "Data Science with Python",
    price: 599,
    originalPrice: 1099,
    image: img2,
  },
  {
    id: 6,
    title: "Cyber Security",
    price: 399,
    originalPrice: 799,
    image: img3,
  },
  {
    id: 7,
    title: "Internet of things",
    price: 699,
    originalPrice: 799,
    image: img4,
  },
  {
    id: 8,
    title: "Python",
    price: 299,
    originalPrice: 799,
    image: img5,
  },
  {
    id: 9,
    title: "Digital Marketing",
    price: 199,
    originalPrice: 799,
    image: img6,
  },
  {
    id: 10,
    title: "Data Analytics",
    price: 599,
    originalPrice: 799,
    image: img7,
  },
  {
    id: 11,
    title: "Machine Learning",
    price: 299,
    originalPrice: 799,
    image: img8,
  },
  {
    id: 12,
    title: "Cloud Computing",
    price: 499,
    originalPrice: 799,
    image: img9,
  },
  {
    id: 13,
    title: "Mobile app Development",
    price: 399,
    originalPrice: 799,
    image: img10,
  },
];

const Courses = () => {
  const [amount, setAmount] = useState(499);

  const handlePayment = async (price) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_HOST_URL}/order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount: price }),
        }
      );
      const data = await res.json();
      handlePaymentVerify(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePaymentVerify = async (data) => {
    const options = {
      key: import.meta.env.RAZORPAY_KEY_ID,
      amount: data.amount,
      currency: data.currency,
      name: "LMSPlatform",
      description: "Test mode",
      order_id: data.id,
      handler: async (response) => {
        console.log("response", response);
        try {
          const res = await fetch(
            `${import.meta.env.VITE_BACKEND_HOST_URL}/verify`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            }
          );
          const verifyData = await res.json();
          if (verifyData.message) {
            toast.success(verifyData.message);
          }
        } catch (error) {
          console.error(error);
        }
      },
      theme: { color: "#5f63b8" },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  return (
    <div className="container mt-5">
      <div className="row">
        {courses.map((course) => (
          <div key={course.id} className="col-md-4 mb-4">
            <div className="card text-black bg-light">
              <img
                src={course.image}
                className="card-img-top"
                alt={course.title}
              />
              <div className="card-body">
                <h5 className="card-title">{course.title}</h5>
                <p className="card-text">
                  ₹{course.price}{" "}
                  <span className="text-decoration-line-through">
                    ₹{course.originalPrice}
                  </span>
                </p>
                <button
                  onClick={() => handlePayment(course.price)}
                  className="btn btn-primary w-100"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Toaster />
    </div>
  );
};

export default Courses;
