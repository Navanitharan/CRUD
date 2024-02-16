import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useContext } from "react";
import { useEffect } from "react";
import { DataContext } from "./App";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { userData, setUserData, setEditData } = useContext(DataContext);

  const getData = async () => {
    try {
      let resp = await axios.get(
        "https://65c0d4dedc74300bce8ccf61.mockapi.io/data/test/blog"
      );
      setUserData(resp.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  // Delete function to delete the user
  let deleteData = async (id) => {
    try {
      let resp = await axios.delete(
        `https://65c0d4dedc74300bce8ccf61.mockapi.io/data/test/blog/${id}`
      );
      console.log(resp.data, "Delete...");
      let updatedData = userData.filter((user) => {
        return user.id !== id;
      });
      setUserData([...updatedData]);
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="createData d-flex justify-content-between align-items-center">
        <h2>User List</h2>
        <Link to="/createPage">
          <button className="btn btn-primary" onClick={() => setEditData(null)}>
            Create User
          </button>
        </Link>
      </div>

      {/* Create the table */}
      <div className="table-responsive">
        <table className="table table-dark">
          <thead>
            <tr>
              <th scope="col">S.No</th>
              <th scope="col">Name</th>
              <th scope="col">Username</th>
              <th scope="col">Email</th>
              <th scope="col">Address</th>
              <th scope="col">Zip Code</th>
              <th scope="col">Phone</th>
              <th scope="col">Website</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((user, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{user.id}</th>
                  <td>{user.name}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.address.city}</td>
                  <td>{user.address.zipcode}</td>
                  <td>{user.phone}</td>
                  <td>{user.website}</td>
                  <td>
                    <Link to="/createPage">
                      <button
                        className="btn btn-primary"
                        onClick={() => setEditData(user)}
                      >
                        Edit
                      </button>
                    </Link>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteData(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default HomePage;
