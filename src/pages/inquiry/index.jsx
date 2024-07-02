import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
import { getInquiry } from "../../api/inquiry";

const columns = [
  { field: "id", headerName: "ID", width: 50 },
  { field: "name", headerName: "Name", width: 150 },
  { field: "email", headerName: "Email", width: 250 },
  { field: "description", headerName: "Description", width: 200 },
];

export default function Inquiry() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getInquiry();
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
          Inquiry List
        </Typography>
        <Link to="/dashboard/inquiry/create">
          <Button variant="outlined">Add Inquiry</Button>
        </Link>
      </Box>
      <Box style={{ width: "100%" }}>
        <DataGrid rows={rows} columns={columns} />
      </Box>
    </Box>
  );
}
