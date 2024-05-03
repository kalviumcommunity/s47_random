import { useState, useEffect } from "react";
import axios from "axios";
import "./User.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Usercard = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [click, setClick] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:2000");
        setUsers(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, [click]);

  const editUser = (user) => {
    navigate('/edit-user', {
      state: { user }
    });
  };

  const deleteUser = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this user?");
    if (confirmed) {
      try {
        await axios.delete(`http://localhost:2000/users/${id}`);
        setClick(!click);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <>
      <Link to="/add-user"><button className="adduser">Add User</button></Link>

      <div className="usercard-container">
        {selectedUser ? (
          <div className="usercard">
            <h1>ID: {selectedUser._id}</h1>
            <h1>Created By: {selectedUser.username}</h1>
            <h1>EMAIL: {selectedUser.email}</h1>
            <div className="button-container">
              <button onClick={() => editUser(selectedUser)}>Edit</button>
              <button onClick={() => deleteUser(selectedUser._id)}>Delete</button>
            </div>
          </div>
        ) : (
          users.map((user) => (
            <div key={user._id} className="usercard">
              <h1>ID: {user._id}</h1>
              <h1>NAME: {user.username}</h1>
              <h1>EMAIL: {user.email}</h1>
              <div className="button-container">
                <button onClick={() => editUser(user)}>Edit</button>
                <button onClick={() => deleteUser(user._id)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
      <select className="select-dropdown" onChange={(e) => e.target.value ? setSelectedUser(JSON.parse(e.target.value)) : setSelectedUser(null)}>
        <option value=''>Select a user</option>
        {users.map((user) => (
          <option key={user._id} value={JSON.stringify(user)}>
            {user.username}
          </option>
        ))}
      </select>
    </>
  );
};
export default Usercard;