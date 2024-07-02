import {
  Box,
  FormLabel,
  Stack,
  TextField,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { inquiryCreate } from "../../api/inquiry";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  description: Yup.string().required(
    "Please provide some information about your inquiry"
  ),
});

const CreateInquiry = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      description: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const response = await inquiryCreate(values);
        console.log("Inquiry created successfully:", response);
        if (response.code == 201) {
          navigate("/");
        }
        resetForm();
      } catch (error) {
        console.error("Error creating inquiry:", error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <>
      <Typography variant="h5" component="h5" textAlign={"center"} mb={3}>
        Inquiry Form
      </Typography>
      <Box mx={"auto"} width={500}>
        {formik.isSubmitting ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
          >
            <CircularProgress />
          </Box>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <Stack direction={"row"} alignItems={"center"} mb={2}>
              <FormLabel sx={{ width: 100 }}>Name</FormLabel>
              <TextField
                fullWidth
                required
                size="small"
                id="name"
                name="name"
                autoComplete="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Stack>
            <Stack direction={"row"} alignItems={"center"} mb={2}>
              <FormLabel sx={{ width: 100 }}>Email</FormLabel>
              <TextField
                fullWidth
                required
                size="small"
                id="email"
                name="email"
                autoComplete="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Stack>
            <Stack direction={"row"} alignItems={"center"} mb={2}>
              <FormLabel sx={{ width: 100 }}>Description</FormLabel>
              <TextField
                fullWidth
                multiline
                rows={3}
                required
                id="description"
                name="description"
                autoComplete="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.description &&
                  Boolean(formik.errors.description)
                }
                helperText={
                  formik.touched.description && formik.errors.description
                }
              />
            </Stack>
            <Stack alignItems={"center"}>
              <Button
                type="submit"
                variant="contained"
                sx={{ width: "50%" }}
                disabled={formik.isSubmitting || !formik.isValid}
              >
                Create
              </Button>
            </Stack>
          </form>
        )}
      </Box>
    </>
  );
};

export default CreateInquiry;
