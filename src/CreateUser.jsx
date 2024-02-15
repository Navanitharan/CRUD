import { useFormik } from "formik";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useContext, useState } from "react";
import { DataContext } from "./App";
import { useNavigate } from "react-router-dom";

//form validation condition

const validate = (values) => {
  const errors = {};

  if (!values.name) {
    errors.name = "Required";
  }

  if (!values.username) {
    errors.username = "Required";
  }
  if (!values.email) {
    errors.email = "Required";
  }
  if (!values.address) {
    errors.address = "Required";
  }
  if (!values.address) {
    errors.address = "Required";
  }
  if (!values.phone) {
    errors.phone = "Required";
  }
  if (!values.website) {
    errors.website = "Required";
  }

  return errors;
};

const CreateUser = () => {
  const Navigate = useNavigate();

  const { editData } = useContext(DataContext);

  const [isLoading, setIsLoading] = useState(false);

  //formik initial condition
  const formik = useFormik({
    initialValues:
      editData === null
        ? {
            name: "",
            username: "",
            email: "",
            address: {
              city: "",
              zipcode: "",
            },
            phone: "",
            website: "",
          }
        : {
            name: editData.name,
            username: editData.username,
            email: editData.email,
            address: {
              city: editData.address.city,
              zipcode: editData.address.zipcode,
            },
            phone: editData.phone,
            website: editData.website,
          },
    validate,
    onSubmit: async (values) => {
      try {
        setIsLoading(true); // Initiating spinner
        if (editData === null) {
          await axios.post(
            "https://65c0d4dedc74300bce8ccf61.mockapi.io/data/test/blog",
            values
          );
        } else {
          await axios.put(
            `https://65c0d4dedc74300bce8ccf61.mockapi.io/data/test/blog/${editData.id}`,
            values
          );
        }
        Navigate("/"); // Redirect after successful submission
      } catch (error) {
        setIsLoading(false);
      }
    },
  });

  return (
    <div className="col-10 d-block justify-content-center">
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group mb-2">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name ? (
            <div style={{ color: "red" }}>{formik.errors.name}</div>
          ) : null}
        </div>

        <div className="form-group mb-2">
          <label htmlFor="username">username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            onChange={formik.handleChange}
            value={formik.values.username}
          />
          {formik.touched.username && formik.errors.username ? (
            <div style={{ color: "red" }}>{formik.errors.username}</div>
          ) : null}
        </div>

        <div className="form-group mb-2">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            className="form-control"
            id="email"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <div style={{ color: "red" }}>{formik.errors.email}</div>
          ) : null}
        </div>

        <div className="form-group mb-2">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            className="form-control"
            id="city"
            name="city"
            onChange={(e) =>
              formik.setFieldValue("address.city", e.target.value)
            }
            value={formik.values.address.city}
          />
          {formik.touched.address && formik.errors.address ? (
            <div style={{ color: "red" }}>{formik.errors.address.city}</div>
          ) : null}
        </div>

        <div className="form-group mb-2">
          <label htmlFor="zipcode">zipcode</label>
          <input
            type="text"
            className="form-control"
            id="zipcode"
            name="zipcode"
            onChange={(e) =>
              formik.setFieldValue("address.zipcode", e.target.value)
            }
            value={formik.values.address.zipcode}
          />
          {formik.touched.zipcode && formik.errors.address ? (
            <div style={{ color: "red" }}>{formik.errors.address.zipcode}</div>
          ) : null}
        </div>

        <div className="form-group mb-2">
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            className="form-control"
            id="phone"
            name="phone"
            onChange={formik.handleChange}
            value={formik.values.phone}
          />
          {formik.touched.phone && formik.errors.phone ? (
            <div style={{ color: "red" }}>{formik.errors.phone}</div>
          ) : null}
        </div>

        <div className="form-group mb-2">
          <label htmlFor="website">Website</label>
          <input
            type="text"
            className="form-control"
            id="website"
            name="website"
            onChange={formik.handleChange}
            value={formik.values.website}
          />
          {formik.touched.website && formik.errors.website ? (
            <div style={{ color: "red" }}>{formik.errors.website}</div>
          ) : null}
        </div>

        <div className="form-group mb-2">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Loading...</span>
              </>
            ) : editData === null ? (
              "Create User"
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateUser;
