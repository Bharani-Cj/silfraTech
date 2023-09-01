import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    const res = await axios.get(`http://127.0.0.1:8000/users/api/getalluser`);
    console.log(res.data.user);
    setUsers(res.data.user);
  };
  useEffect(() => {
    getUsers();
  }, []);

  const deleteUser = (id) => {
    console.log(id);
    axios
      .delete(`http://127.0.0.1:8000/users/api/deleteUser/${id}`)
      .then(() => {
        toast.success(`User deleted successfully`);
        setTimeout(() => {
          getUsers();
        }, 500);
      })
      .catch((err) => {
        toast.error(`${err.response.data.error}`);
      });
  };

  return (
    <div className="table_wrapper">
      <Link to={"./adduser"}>
        <button className="btn">Add Contact</button>
      </Link>
      <table className="table_container">
        <thead>
          <tr>
            <th>No.</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Course-Name</th>
            <th>Edit/Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((el, index) => {
            return (
              <tr key={el.student_id}>
                <th>{index + 1}</th>
                <td>{el.email}</td>
                <td>{el.phone_number}</td>
                <td>{el.course_name}</td>
                <td className="btn_container">
                  <Link to={`/edituser/${el.student_id}`}>
                    <button className="btn btn-edit">Edit</button>
                  </Link>
                  <Link onClick={() => deleteUser(el.student_id)}>
                    <button className="btn btn-delete">Delete</button>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
