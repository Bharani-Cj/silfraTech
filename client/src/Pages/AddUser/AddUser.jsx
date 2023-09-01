import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "./AddUser.css";

const initialState = {
  email: "",
  courseName: "FSWD" || "",
  phoneNumber: "",
};
const AddUser = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(initialState);

  const { email, phoneNumber, courseName } = data;
  console.log(data);

  function handleSubmit(e) {
    e.preventDefault();
    if (!id) {
      axios
        .post("http://127.0.0.1:8000/users/api/createUser", data)
        .then((res) => {
          setData(initialState);
          toast.success("User created successfully");
          navigate("/");
        })
        .catch((err) => {
          const error = err.response.data.error;
          console.log(error);
          toast.warn(error);
        });
    } else {
      axios
        .put(`http://127.0.0.1:8000/users/api/updateUser/${id}`, data)
        .then((res) => {
          setData(initialState);
          toast.success("User updated successfully");
          navigate("/");
        })
        .catch((err) => {
          const error = err.response.data.error;
          console.log(error);
          toast.warn(error);
        });
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }

  const { id } = useParams();

  useEffect(() => {
    try {
      axios.get(`http://127.0.0.1:8000/users/api/getuser/${id}`).then((res) => {
        console.log();

        setData({
          ...res.data.result[0],
          phoneNumber: res.data.result[0]?.phone_number,
          courseName: res.data.result[0]?.course_name || "FSWD",
        });
      });
    } catch (err) {
      toast.error("not helpful");
    }
  }, [id]);

  return (
    <div className="form_wrapper">
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email || ""}
          onChange={handleChange}
          placeholder="Enter Email.."
          required
        />
        <label htmlFor="phoneNumber">Ph. Number</label>
        <input
          type="number"
          id="phoneNumber"
          name="phoneNumber"
          value={phoneNumber || ""}
          onChange={handleChange}
          placeholder="Enter Number.."
          required
        />
        <label htmlFor="courseName">Course</label>
        <select
          name="courseName"
          id="courseName"
          value={courseName}
          onChange={handleChange}
        >
          <option value="FSWD">FSWD</option>
          <option value="Mysql">Mysql</option>
          <option value="MERNStack">Mernstack</option>
        </select>

        <input type="submit" />
        <Link to={"/"}>
          <button>Go back</button>
        </Link>
      </form>
    </div>
  );
};

export default AddUser;
