import { Formik, Form } from "formik";
import { FiSend } from "react-icons/fi";
import Button from "../common/Button";
import Card from "../common/Card";
import Input from "../common/Input";

const SubmissionForm = ({
  initialValues = { title: "", link: "", notes: "" },
  validationSchema,
  onSubmit,
  loading = false,
}) => (
  <Card>
    <h2 className="h5 fw-bold mb-3">Submit your work</h2>
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ values, errors, touched, handleChange, handleBlur }) => (
        <Form>
          <Input label="Submission title" name="title" value={values.title} error={errors.title} touched={touched.title} onChange={handleChange} onBlur={handleBlur} />
          <Input label="Work link" name="link" placeholder="https://..." value={values.link} error={errors.link} touched={touched.link} onChange={handleChange} onBlur={handleBlur} />
          <div className="mb-3">
            <label className="form-label fw-semibold" htmlFor="notes">Notes</label>
            <textarea id="notes" name="notes" className="form-control app-input" rows="4" value={values.notes} onChange={handleChange} onBlur={handleBlur} />
          </div>
          <Button type="submit" fullWidth icon={FiSend} loading={loading}>
            Send submission
          </Button>
        </Form>
      )}
    </Formik>
  </Card>
);

export default SubmissionForm;