import Input from "../../common/Input/input";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./LoginForm";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { loginUser } from "../../services/loginService";
import { useNavigate } from "react-router-dom";
import { useAuthActions, useAuth } from "../../Providers/AuthProvider/AuthProvider";
import { useQuery } from "../../hooks/useQuery";

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email("invalid email format")
    .required("email is required"),

  password: Yup.string().required("password is required"),
});

const LoginForm = () => {
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
    try {
      const { data } = await loginUser(values);
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
        <Input formik={formik} name="email" label="Email" type="email" />

        <Input
          formik={formik}
          name="password"
          label="Password"
          type="password"
        />
        <button
          type="submit"
          disabled={!formik.isValid}
          className="btn primary"
          style={{ width: "100%" }}
        >
          Login
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <Link to={`/signup?redirect=${redirect}`}>
          <p style={{ marginTop: "15px" }}>Not Signup Yet ?</p>
        </Link>
      </form>
    </div>
  );
};

export default LoginForm;
