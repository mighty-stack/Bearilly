import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import { FiMail, FiUser, FiLock, FiUserPlus } from "react-icons/fi";
import Button from "../common/Button";
import Card from "../common/Card";
import Input from "../common/Input";

const RegisterForm = ({
  initialValues = { name: "", email: "", password: "", confirmPassword: "" },
  validationSchema,
  onSubmit,
  loading = false,
}) => (
  <Card>
    <h2 className="h4 fw-bold mb-1">Create account</h2>
    <p className="text-muted-app mb-4">Start your learning path in minutes.</p>
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ values, errors, touched, handleChange, handleBlur }) => (
        <Form>
          <Input
            label="Full name"
            name="name"
            placeholder="John Doe"
            icon={FiUser}
            value={values.name}
            error={errors.name}
            touched={touched.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
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
          <Input
            label="Confirm password"
            name="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            icon={FiLock}
            value={values.confirmPassword}
            error={errors.confirmPassword}
            touched={touched.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Button type="submit" fullWidth icon={FiUserPlus} loading={loading}>
            Register
          </Button>
          <p className="text-center mt-3 mb-0 text-muted-app">
            Already registered? <Link to="/login">Log in</Link>
          </p>
        </Form>
      )}
    </Formik>
  </Card>
);

export default RegisterForm;