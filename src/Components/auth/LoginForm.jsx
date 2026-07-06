import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import { FiLock, FiMail, FiLogIn } from "react-icons/fi";
import Button from "../common/Button";
import Card from "../common/Card";
import Input from "../common/Input";

const LoginForm = ({ initialValues = { email: "", password: "" }, validationSchema, onSubmit, loading = false }) => (
  <Card>
    <h2 className="h4 fw-bold mb-1">Welcome back</h2>
    <p className="text-muted-app mb-4">Log in to continue learning.</p>
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ values, errors, touched, handleChange, handleBlur }) => (
        <Form>
          <Input
            label="Email"
            name="email"
            type="email"
            placeholder="you@example.com"
            icon={FiMail}
            value={values.email}
            error={errors.email}
            touched={touched.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="Enter your password"
            icon={FiLock}
            value={values.password}
            error={errors.password}
            touched={touched.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Button type="submit" fullWidth icon={FiLogIn} loading={loading}>
            Log in
          </Button>
          <p className="text-center mt-3 mb-0 text-muted-app">
            New here? <Link to="/register">Create account</Link>
          </p>
        </Form>
      )}
    </Formik>
  </Card>
);

export default LoginForm;