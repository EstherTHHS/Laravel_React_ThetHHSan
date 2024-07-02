import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Stack,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { EditNote, DeleteOutline } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import { getCategory, deleteCategory } from "../../api/category";

const columns = (handleEdit, handleDelete) => [
  { field: "id", headerName: "ID", width: 50 },
  { field: "title", headerName: "Title", width: 150 },
  { field: "category", headerName: "Category", width: 120 },
  { field: "description", headerName: "Description", width: 150 },
  {
    field: "action",
    headerName: "Action",
    width: 150,
    renderCell: (params) => (
      <Stack sx={{ flexDirection: "row", alignItems: "center" }}>
        <IconButton onClick={() => handleEdit(params.row.id)}>
          <EditNote />
        </IconButton>
        <IconButton
          onClick={() => handleDelete(params.row.id)}
          sx={{ color: "red" }}
        >
          <DeleteOutline />
        </IconButton>
      </Stack>
    ),
  },
];

export default function CategoryData() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCategory();
        setRows(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (id) => {
    navigate(`/dashboard/category-data/${id}/update`);
  };

  const handleDelete = async (id) => {
    try {
      await deleteCategory(id);
      setRows(rows.filter((row) => row.id !== id));
    } catch (error) {
      console.error("Error deleting category:", error);
      setError(error);
    }
  };

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

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Typography variant="h6" color="error">
          Failed to load data
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        mb={2}
      >
        <Typography variant="h6" component="h6" fontWeight={"bold"}>
          Category Data Table
        </Typography>
        <Link to="/dashboard/category-data/create">
          <Button variant="outlined">Add Category Data</Button>
        </Link>
      </Box>
      <Box style={{ width: "100%" }}>
        <DataGrid rows={rows} columns={columns(handleEdit, handleDelete)} />
      </Box>
    </Box>
  );
}
