import { Formik, Form } from "formik";
import { FiKey } from "react-icons/fi";
import Button from "../common/Button";
import Card from "../common/Card";
import Input from "../common/Input";

const AccessCodeForm = ({ initialValues = { code: "" }, validationSchema, onSubmit, loading = false }) => (
  <Card>
    <h2 className="h4 fw-bold mb-1">Enter access code</h2>
    <p className="text-muted-app mb-4">Use the code given by your instructor or admin.</p>
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ values, errors, touched, handleChange, handleBlur }) => (
        <Form>
          <Input
            label="Access code"
            name="code"
            placeholder="Example: LEARN-2026"
            icon={FiKey}
            value={values.code}
            error={errors.code}
            touched={touched.code}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Button type="submit" fullWidth loading={loading}>
            Continue
          </Button>
        </Form>
      )}
    </Formik>
  </Card>
);

export default AccessCodeForm;