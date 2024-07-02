import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Stack,
  FormLabel,
  TextField,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  categoryCreate,
  getCategoryById,
  updateCategoryById,
} from "../../api/category";
import { useNavigate, useParams } from "react-router-dom";

const validationSchema = Yup.object({
  title: Yup.string().required("Name is required"),
  category: Yup.string().required("Category is required"),
  description: Yup.string().required(
    "Please provide some information about the category"
  ),
});

const CategoryForm = () => {
  const [initialValues, setInitialValues] = useState({
    title: "",
    category: "",
    description: "",
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchCategory = async () => {
      if (id) {
        try {
          const category = await getCategoryById(id).data;
          setInitialValues({
            title: category?.title,
            category: category?.category,
            description: category?.description,
          });
          
        } catch (error) {
          console.error("Error fetching category:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };
    fetchCategory();
  }, [id]);

  useEffect(() => {
    console.log("Initial values updated:", initialValues);
  }, [initialValues]);

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        let response;
        if (id) {
          response = await updateCategoryById(id, values);
          console.log("Category updated successfully:", response);
        } else {
          response = await categoryCreate(values);
          console.log("Category created successfully:", response);
        }
        if (response.code === 201 || response.code === 200) {
          navigate("/");
        }
        resetForm();
      } catch (error) {
        console.error("Error saving category:", error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Typography variant="h5" component="h5" textAlign={"center"} mb={3}>
        {id ? "Edit Category" : "Create Category"}
      </Typography>
      <Box mx={"auto"} width={500}>
        <form onSubmit={formik.handleSubmit}>
          <Stack direction={"row"} alignItems={"center"} mb={2}>
            <FormLabel sx={{ width: 100 }}>Title</FormLabel>
            <TextField
              fullWidth
              required
              size="small"
              id="title"
              name="title"
              autoComplete="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
            />
          </Stack>
          <Stack direction={"row"} alignItems={"center"} mb={2}>
            <FormLabel sx={{ width: 100 }}>Category</FormLabel>
            <Select
              fullWidth
              required
              size="small"
              id="category"
              name="category"
              value={formik.values?.category || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.category && Boolean(formik.errors.category)}
            >
              <MenuItem value="">Select a category</MenuItem>
              <MenuItem value="category1">Category1</MenuItem>
              <MenuItem value="category2">Category2</MenuItem>
              <MenuItem value="category3">Category3</MenuItem>
            </Select>
            {formik.touched.category && formik.errors.category && (
              <Typography color="error">{formik.errors.category}</Typography>
            )}
          </Stack>
          <Stack direction={"row"} alignItems={"center"} mb={2}>
            <FormLabel sx={{ width: 100 }}>About</FormLabel>
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
                formik.touched.description && Boolean(formik.errors.description)
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
              {id ? "Update" : "Create"}
            </Button>
          </Stack>
        </form>
      </Box>
    </>
  );
};

export default CategoryForm;
