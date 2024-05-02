import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./EditForm.css";
import Cookies from 'js-cookie';


const EditForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const token = Cookies.get('admin');
  // console.log(token);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/users", formData,{
        headers: {
          'Authorization': `Bearer ${token}`
      }
      });
      const receivedData = response.data;
      console.log("Server response:", receivedData);

      // Redirect to "/users" with a success message
      navigate("/users", { state: { successMessage: "User added successfully!" } });
    } catch (error) {
      // console.error("Error posting data:", error.response.data);
      const message = error.response.data.error.details;
      // console.log(message)
      message.map((value)=>{
        alert(value.message)
      })
    }
  };

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <label className="form-label">
        Username:
        <input
          className="form-input"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </label>

      <label className="form-label">
        Email:
        <input
          className="form-input"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </label>

      <button className="form-button" type="submit">
        Submit
      </button>
    </form>
  );
};
export default EditForm;