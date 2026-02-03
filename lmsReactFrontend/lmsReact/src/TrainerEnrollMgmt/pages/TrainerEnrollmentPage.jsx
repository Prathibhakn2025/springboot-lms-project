// import { useEffect, useState } from "react";
// import { Grid, Paper } from "@mui/material";
// import { emptyEnrollment } from "../models/trainerEnrollment";
// import { getEnrollments, createEnrollment, updateEnrollment, deleteEnrollment } from "../api/trainerEnrollmentApi";

// import TrainerEnrollmentForm from "../components/TrainerEnrollmentForm";
// import TrainerEnrollmentTable from "../components/TrainerEnrollmentTable";
// import ConfirmDeleteDialog from "../components/ConfirmDeleteDialog";

// const TrainerEnrollmentPage = () => {
//     const [data, setData] = useState([]);
//     const [form, setForm] = useState(emptyEnrollment);
//     const [editingId, setEditingId] = useState(null);

//     // Delete dialog state
//     const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
//     const [deleteId, setDeleteId] = useState(null);

//     // Load enrollments from backend
//     useEffect(() => {
//         loadData();
//     }, []);

//     const loadData = async () => {
//         try {
//             const res = await getEnrollments();
//             setData(res.data);
//         } catch (err) {
//             console.error("Failed to fetch enrollments:", err);
//         }
//     };

//     // Handle form field changes
//     const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

//     // Handle form submit (Create or Update)
//     const handleSubmit = async () => {
//         try {
//             if (editingId) {
//                 await updateEnrollment(editingId, form);
//             } else {
//                 await createEnrollment(form);
//             }
//             setForm(emptyEnrollment);
//             setEditingId(null);
//             loadData();
//         } catch (err) {
//             console.error("Failed to save enrollment:", err);
//         }
//     };

//     // Handle edit click
//     const handleEdit = (row) => {
//         setForm(row);
//         setEditingId(row.id);
//     };

//     // Open confirm delete dialog
//     const handleDeleteClick = (id) => {
//         setDeleteId(id);
//         setDeleteDialogOpen(true);
//     };

//     // Confirm delete
//     const handleDeleteConfirm = async () => {
//         try {
//             await deleteEnrollment(deleteId);
//             setDeleteDialogOpen(false);
//             setDeleteId(null);
//             loadData();
//         } catch (err) {
//             console.error("Failed to delete enrollment:", err);
//         }
//     };

//     return (
//         <>
//             <Grid container spacing={2}>
//                 {/* Form on the left */}
//                 <Grid item xs={4}>
//                     <Paper sx={{ p: 2 }}>
//                         <TrainerEnrollmentForm
//                             data={form}
//                             onChange={handleChange}
//                             onSubmit={handleSubmit}
//                         />
//                     </Paper>
//                 </Grid>

//                 {/* Table on the right */}
//                 <Grid item xs={8}>
//                     <Paper sx={{ p: 2 }}>
//                         <TrainerEnrollmentTable
//                             rows={data}
//                             onEdit={handleEdit}
//                             onDelete={handleDeleteClick} // open delete dialog
//                         />
//                     </Paper>
//                 </Grid>
//             </Grid>

//             {/* Confirm Delete Dialog */}
//             <ConfirmDeleteDialog
//                 open={deleteDialogOpen}
//                 onClose={() => setDeleteDialogOpen(false)}
//                 onConfirm={handleDeleteConfirm}
//                 itemName={`Enrollment ID ${deleteId}`}
//             />
//         </>
//     );
// };

// export default TrainerEnrollmentPage;import { useEffect, useState } from 'react';

// import React, { useState, useEffect } from 'react';

// import { Container, Typography, Button } from '@mui/material';
// import { DataGrid } from '@mui/x-data-grid';
// import TrainerEnrollmentForm from '../components/TrainerEnrollmentForm';
// import { emptyEnrollment } from "../models/trainerEnrollment";
// import { getAllEnrollments, enrollTrainer } from '../api/trainerEnrollmentApi';

// export default function TrainerEnrollmentPage() {
//     const [enrollments, setEnrollments] = useState([]);
//     const [formData, setFormData] = useState(emptyEnrollment);
//     const [showForm, setShowForm] = useState(false);

//     const loadData = async () => {
//         try {
//             const data = await getAllEnrollments();
//             setEnrollments(data);
//         } catch (err) {
//             console.error('Failed to fetch enrollments', err);
//         }
//     };

//     useEffect(() => { loadData(); }, []);

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async () => {
//         try {
//             await enrollTrainer(formData);
//             setShowForm(false);
//             setFormData(emptyEnrollment);
//             loadData();
//         } catch (err) {
//             console.error('Failed to save enrollment', err);
//         }
//     };

//     const columns = [
//         { field: 'id', headerName: 'ID', width: 70 },
//         { field: 'trainerId', headerName: 'Trainer ID', width: 120 },
//         { field: 'programId', headerName: 'Program ID', width: 120 },
//         { field: 'startDate', headerName: 'Start Date', width: 120 },
//         { field: 'endDate', headerName: 'End Date', width: 120 },
//         { field: 'status', headerName: 'Status', width: 120 },
//     ];

//     return (
//         <Container style={{ marginLeft: 240, paddingTop: 80 }}>
//             <Typography variant="h5" gutterBottom>Trainer Enrollments</Typography>

//             <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={() => setShowForm(true)}
//                 style={{ marginBottom: 20 }}
//             >
//                 Add Enrollment
//             </Button>

//             {showForm && (
//                 <TrainerEnrollmentForm
//                     data={formData}
//                     onChange={handleChange}
//                     onSubmit={handleSubmit}
//                 />
//             )}

//             <div style={{ height: 400 }}>
//                 <DataGrid rows={enrollments} columns={columns} pageSize={5} />
//             </div>
//         </Container>
//     );
// }


// import React, { useState, useEffect } from "react";
// import { Container, Typography, Button, Box, Paper } from "@mui/material";
// import { DataGrid } from "@mui/x-data-grid";
// import TrainerEnrollmentForm from "../components/TrainerEnrollmentForm";
// import { emptyEnrollment } from "../models/trainerEnrollment";
// import { getAllEnrollments, enrollTrainer } from "../api/trainerEnrollmentApi";

// export default function TrainerEnrollmentPage() {
//     const [enrollments, setEnrollments] = useState([]);
//     const [formData, setFormData] = useState(emptyEnrollment);
//     const [showForm, setShowForm] = useState(false);

//     // Fetch enrollments from backend
//     const loadData = async () => {
//         try {
//             const data = await getAllEnrollments();
//             setEnrollments(data);
//         } catch (err) {
//             console.error("Failed to fetch enrollments", err);
//         }
//     };

//     useEffect(() => {
//         loadData();
//     }, []);

//     // Handle form input changes
//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     // Submit new enrollment
//     const handleSubmit = async () => {
//         try {
//             await enrollTrainer(formData);
//             setShowForm(false);
//             setFormData(emptyEnrollment);
//             loadData();
//         } catch (err) {
//             console.error("Failed to save enrollment", err);
//         }
//     };

//     // DataGrid columns
//     const columns = [
//         { field: "id", headerName: "ID", width: 70 },
//         { field: "trainerId", headerName: "Trainer ID", width: 120 },
//         { field: "programId", headerName: "Program ID", width: 120 },
//         { field: "startDate", headerName: "Start Date", width: 120 },
//         { field: "endDate", headerName: "End Date", width: 120 },
//         { field: "status", headerName: "Status", width: 120 },
//     ];

//     return (
//         <Container
//             maxWidth="lg"
//             sx={{
//                 marginLeft: "240px", // adjust if you have a sidebar
//                 paddingTop: 5,
//                 paddingBottom: 5,
//                 backgroundColor: "#f5f5f5", // light grey background
//                 minHeight: "100vh",
//             }}
//         >
//             <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
//                 Trainer Enrollments
//             </Typography>

//             {/* Add Enrollment Button */}
//             <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={() => setShowForm(!showForm)}
//                 sx={{ mb: 3 }}
//             >
//                 {showForm ? "Close Form" : "Add Enrollment"}
//             </Button>

//             {/* Form */}
//             {showForm && (
//                 <Paper sx={{ p: 3, mb: 4, backgroundColor: "#ffffff", borderRadius: 2 }}>
//                     <TrainerEnrollmentForm
//                         data={formData}
//                         onChange={handleChange}
//                         onSubmit={handleSubmit}
//                     />
//                 </Paper>
//             )}

//             {/* DataGrid Table */}
//             <Box sx={{ height: 500, backgroundColor: "#ffffff", borderRadius: 2, p: 2 }}>
//                 <DataGrid
//                     rows={enrollments}
//                     columns={columns}
//                     pageSize={5}
//                     rowsPerPageOptions={[5, 10, 20]}
//                     sx={{
//                         "& .MuiDataGrid-row": { bgcolor: "#fafafa" },
//                         "& .MuiDataGrid-columnHeaders": { bgcolor: "#e0e0e0" },
//                     }}
//                 />
//             </Box>
//         </Container>
//     );
// }



// import React, { useEffect, useState } from "react";
// import { Container, Typography, Button, Paper } from "@mui/material";

// import TrainerEnrollmentForm from "../components/TrainerEnrollmentForm";
// import TrainerEnrollmentTable from "../components/TrainerEnrollmentTable";

// import {
//     getAllEnrollments,
//     enrollTrainer,
//     updateEnrollment,
//     deleteEnrollment,
// } from "../api/trainerEnrollmentApi";

// import { emptyEnrollment } from "../models/trainerEnrollment";

// export default function TrainerEnrollmentPage() {
//     const [enrollments, setEnrollments] = useState([]);
//     const [formData, setFormData] = useState(emptyEnrollment);
//     const [showForm, setShowForm] = useState(false);

//     useEffect(() => {
//         loadData();
//     }, []);

//     const loadData = async () => {
//         const data = await getAllEnrollments();
//         setEnrollments(data);
//     };

//     // FORM HANDLERS
//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async () => {
//         if (formData.id) {
//             await updateEnrollment(formData.id, formData);
//         } else {
//             await enrollTrainer(formData);
//         }
//         closeForm();
//         loadData();
//     };

//     const openAddForm = () => {
//         setFormData(emptyEnrollment);
//         setShowForm(true);
//     };

//     const openEditForm = (row) => {
//         setFormData(row);
//         setShowForm(true);
//     };

//     const closeForm = () => {
//         setShowForm(false);
//         setFormData(emptyEnrollment);
//     };

//     const handleDelete = async (id) => {
//         await deleteEnrollment(id);
//         loadData();
//     };

//     return (
//         <Container
//             maxWidth="lg"
//             sx={{
//                 marginLeft: "200px",
//                 paddingTop: 4,
//                 backgroundColor: "#fff",
//                 minHeight: "100vh",
//             }}
//         >
//             <Typography variant="h5" gutterBottom>
//                 Trainer Enrollments
//             </Typography>

//             {!showForm && (
//                 <Button variant="contained" onClick={openAddForm} sx={{ mb: 2 }}>
//                     Add Enrollment
//                 </Button>
//             )}

//             {showForm && (
//                 <Paper sx={{ p: 3, mb: 3 }}>
//                     <TrainerEnrollmentForm
//                         data={formData}
//                         onChange={handleChange}
//                         onSubmit={handleSubmit}
//                     />

//                     <Button
//                         variant="outlined"
//                         color="secondary"
//                         onClick={closeForm}
//                         sx={{ mt: 2 }}
//                     >
//                         Cancel
//                     </Button>
//                 </Paper>
//             )}

//             {/* ✅ TABLE RENDERED ONLY ONCE */}
//             <Paper sx={{ p: 2 }}>
//                 <TrainerEnrollmentTable
//                     rows={enrollments}
//                     onEdit={openEditForm}
//                     onDelete={handleDelete}
//                 />
//             </Paper>
//         </Container>
//     );
// }



import React, { useEffect, useState } from "react";
import { Container, Typography, Button, Paper } from "@mui/material";

import TrainerEnrollmentForm from "../components/TrainerEnrollmentForm";
import TrainerEnrollmentTable from "../components/TrainerEnrollmentTable";
import ConfirmDeleteDialog from "../components/ConfirmDeleteDialog";

import {
    getAllEnrollments,
    enrollTrainer,
    updateEnrollment,
    deleteEnrollment,
} from "../api/trainerEnrollmentApi";

import { emptyEnrollment } from "../models/trainerEnrollment";

export default function TrainerEnrollmentPage() {
    const [enrollments, setEnrollments] = useState([]);
    const [formData, setFormData] = useState(emptyEnrollment);
    const [showForm, setShowForm] = useState(false);

    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    // Load data on page load
    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const data = await getAllEnrollments();
        setEnrollments(data);
    };

    // FORM HANDLERS
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        if (formData.id) {
            await updateEnrollment(formData.id, formData);
        } else {
            await enrollTrainer(formData);
        }
        closeForm();
        loadData();
    };

    const openAddForm = () => {
        setFormData(emptyEnrollment);
        setShowForm(true);
    };

    const openEditForm = (row) => {
        setFormData(row);
        setShowForm(true);
    };

    const closeForm = () => {
        setShowForm(false);
        setFormData(emptyEnrollment);
    };

    // DELETE HANDLERS
    const handleDeleteClick = (id) => {
        setDeleteId(id);
        setOpenDeleteDialog(true);
    };

    const handleConfirmDelete = async () => {
        await deleteEnrollment(deleteId);
        setOpenDeleteDialog(false);
        setDeleteId(null);
        loadData();
    };

    const handleCloseDeleteDialog = () => {
        setOpenDeleteDialog(false);
        setDeleteId(null);
    };

    return (
        <Container
            maxWidth="lg"
            sx={{
                marginLeft: "240px", // remove if no sidebar
                paddingTop: 5,
                backgroundColor: "#ffffff",
                minHeight: "100vh",

            }}
        >
            <Typography variant="h5" gutterBottom>
                Trainer Enrollments
            </Typography>

            {/* ADD BUTTON */}
            {!showForm && (
                <Button
                    variant="contained"
                    onClick={openAddForm}
                    sx={{ mb: 2 }}
                >
                    Add Enrollment
                </Button>
            )}

            {/* FORM */}
            {showForm && (
                <Paper sx={{ p: 3, mb: 3 }}>
                    <TrainerEnrollmentForm
                        data={formData}
                        onChange={handleChange}
                        onSubmit={handleSubmit}
                    />

                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={closeForm}
                        sx={{ mt: 2 }}
                    >
                        Cancel
                    </Button>
                </Paper>
            )}

            {/* TABLE (ONLY ONCE) */}
            <Paper sx={{ p: 2 }}>
                <TrainerEnrollmentTable
                    rows={enrollments}
                    onEdit={openEditForm}
                    onDelete={handleDeleteClick}
                />
            </Paper>

            {/* DELETE CONFIRMATION DIALOG */}
            <ConfirmDeleteDialog
                open={openDeleteDialog}
                onClose={handleCloseDeleteDialog}
                onConfirm={handleConfirmDelete}
                itemName="this enrollment"
            />
        </Container>
    );
}
