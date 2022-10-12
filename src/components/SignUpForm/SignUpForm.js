import Input from "../../common/Input/input";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./SignUpForm.css";
import { signupUser } from "../../services/signupService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, useAuthActions } from "../../Providers/AuthProvider/AuthProvider";
import { useQuery } from "../../hooks/useQuery";

const initialValues = {
  name: "",
  email: "",
  phoneNumber: "",
  password: "",
  passwordConfirm: "",
};

const validationSchema = Yup.object({
  name: Yup.string()
    .required("Name is required")
    .min(6, "Name length is not valid"),
  email: Yup.string()
    .email("Invalid Email format")
    .required("Email is required"),
  phoneNumber: Yup.string()
    .required("Phone Number is required")
    .matches(/^[0-9]{11}$/, "invalid Phone Number")
    .nullable(),
  password: Yup.string().required("Password is required"),
  // .matches(
  //   /^(?=.*[A-Za-z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-zd@$!%*#?&]{8,}$/,
  //   "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
  // ),
  passwordConfirm: Yup.string()
    .required("Password Confirmation is required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

const SignupForm = () => {
  const setAuth = useAuthActions();
  const auth = useAuth();
  const navigate = useNavigate();

  const query = useQuery();
  const redirect = query.get("redirect") || "/";

  const [error, setError] = useState(null);

  useEffect(() => {
    if (auth) {
      navigate(`/${redirect}`);
    }
  }, [redirect, auth]);

  const onSubmit = async (values) => {
    const { name, email, phoneNumber, password } = values;
    const userData = {
      name,
      email,
      phoneNumber,
      password,
    };
    try {
      const { data } = await signupUser(userData);
      setAuth(data);
      setError(null);
      navigate(`/${redirect}`);
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      }
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
    validateOnMount: true,
  });
  return (
    <div className="formContainer">
      <form onSubmit={formik.handleSubmit}>
        <Input formik={formik} name="name" label="Name" />
        <Input formik={formik} name="email" label="Email" type="email" />
        <Input
          formik={formik}
          name="phoneNumber"
          label="Phone Number"
          type="tel"
        />
        <Input
          formik={formik}
          name="password"
          label="Password"
          type="password"
        />
        <Input
          formik={formik}
          name="passwordConfirm"
          label="Password Confirmation"
          type="password"
        />
        <button
          type="submit"
          disabled={!formik.isValid}
          className="btn primary"
          style={{ width: "100%" }}
        >
          Signup
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <Link to={`/login?redirect=${redirect}`}>
          <p style={{ marginTop: "15px" }}>Already Signup ?</p>
        </Link>
      </form>
    </div>
  );
};

export default SignupForm;
