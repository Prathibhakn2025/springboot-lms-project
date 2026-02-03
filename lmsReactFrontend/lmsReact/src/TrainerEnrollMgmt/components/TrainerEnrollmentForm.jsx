// import { TextField, Button, Stack, MenuItem } from "@mui/material";

// const TrainerEnrollmentForm = ({ data, onChange, onSubmit }) => (
//     <Stack spacing={2}>
//         <TextField label="Trainer ID" name="trainerId" value={data.trainerId} onChange={onChange} fullWidth />
//         <TextField label="Program ID" name="programId" value={data.programId} onChange={onChange} fullWidth />
//         <TextField type="date" label="Start Date" name="startDate" value={data.startDate} onChange={onChange} InputLabelProps={{ shrink: true }} />
//         <TextField type="date" label="End Date" name="endDate" value={data.endDate} onChange={onChange} InputLabelProps={{ shrink: true }} />
//         <TextField select label="Status" name="status" value={data.status} onChange={onChange}>
//             <MenuItem value="ACTIVE">ACTIVE</MenuItem>
//             <MenuItem value="INACTIVE">INACTIVE</MenuItem>
//         </TextField>
//         <Button variant="contained" onClick={onSubmit}>Save</Button>
//     </Stack>
// );

// export default TrainerEnrollmentForm;


// import { useState, useEffect } from "react";
// import { Container, Typography, Button, Stack } from "@mui/material";
// import { DataGrid } from "@mui/x-data-grid";
// import TrainerEnrollmentForm, { emptyEnrollment } from "./TrainerEnrollmentForm";
// import { getAllEnrollments, enrollTrainer, updateEnrollment, deleteEnrollment } from "../api/trainerEnrollmentApi";

// export default function TrainerEnrollmentPage() {
//     const [enrollments, setEnrollments] = useState([]);
//     const [formData, setFormData] = useState(emptyEnrollment);
//     const [editingId, setEditingId] = useState(null);
//     const [showForm, setShowForm] = useState(false);

//     // Load all enrollments
//     const loadData = async () => {
//         try {
//             const data = await getAllEnrollments();
//             setEnrollments(data);
//         } catch (err) {
//             console.error("Failed to fetch enrollments:", err);
//         }
//     };

//     useEffect(() => {
//         loadData();
//     }, []);

//     // Handle form input change
//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     // Handle save
//     const handleSubmit = async () => {
//         try {
//             if (editingId) {
//                 await updateEnrollment(editingId, formData);
//             } else {
//                 await enrollTrainer(formData);
//             }
//             setShowForm(false);
//             setFormData(emptyEnrollment);
//             setEditingId(null);
//             loadData();
//         } catch (err) {
//             console.error("Failed to save enrollment:", err);
//         }
//     };

//     // Handle edit button
//     const handleEdit = (row) => {
//         setFormData(row);
//         setEditingId(row.id);
//         setShowForm(true);
//     };

//     // Handle delete button
//     const handleDelete = async (id) => {
//         if (window.confirm("Are you sure you want to delete this enrollment?")) {
//             await deleteEnrollment(id);
//             loadData();
//         }
//     };

//     return (
//         <Container style={{ marginLeft: 240, paddingTop: 80 }}>
//             <Typography variant="h5" gutterBottom>
//                 Trainer Enrollments
//             </Typography>

//             <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={() => {
//                     setFormData(emptyEnrollment);
//                     setEditingId(null);
//                     setShowForm(true);
//                 }}
//             >
//                 Add Enrollment
//             </Button>

//             {showForm && (
//                 <div style={{ marginTop: 20, marginBottom: 20 }}>
//                     <TrainerEnrollmentForm
//                         data={formData}
//                         onChange={handleChange}
//                         onSubmit={handleSubmit}
//                     />
//                 </div>
//             )}

//             <div style={{ height: 400, marginTop: 20 }}>
//                 <DataGrid
//                     rows={enrollments}
//                     columns={[
//                         { field: "id", headerName: "ID", width: 70 },
//                         { field: "trainerId", headerName: "Trainer ID", width: 120 },
//                         { field: "programId", headerName: "Program ID", width: 120 },
//                         { field: "startDate", headerName: "Start Date", width: 120 },
//                         { field: "endDate", headerName: "End Date", width: 120 },
//                         { field: "status", headerName: "Status", width: 120 },
//                         {
//                             field: "actions",
//                             headerName: "Actions",
//                             width: 200,
//                             renderCell: (params) => (
//                                 <Stack direction="row" spacing={1}>
//                                     <Button size="small" onClick={() => handleEdit(params.row)}>
//                                         Edit
//                                     </Button>
//                                     <Button
//                                         size="small"
//                                         color="error"
//                                         onClick={() => handleDelete(params.row.id)}
//                                     >
//                                         Delete
//                                     </Button>
//                                 </Stack>
//                             ),
//                         },
//                     ]}
//                     pageSize={5}
//                 />
//             </div>
//         </Container>
//     );
// }


// import { TextField, Button, Stack, MenuItem } from "@mui/material";

// const TrainerEnrollmentForm = ({ data, onChange, onSubmit }) => (
//     <Stack spacing={2} sx={{ marginBottom: 2 }}>
//         <TextField
//             label="Trainer ID"
//             name="trainerId"
//             value={data.trainerId}
//             onChange={onChange}
//             fullWidth
//         />
//         <TextField
//             label="Program ID"
//             name="programId"
//             value={data.programId}
//             onChange={onChange}
//             fullWidth
//         />
//         <TextField
//             type="date"
//             label="Start Date"
//             name="startDate"
//             value={data.startDate}
//             onChange={onChange}
//             InputLabelProps={{ shrink: true }}
//         />
//         <TextField
//             type="date"
//             label="End Date"
//             name="endDate"
//             value={data.endDate}
//             onChange={onChange}
//             InputLabelProps={{ shrink: true }}
//         />
//         <TextField
//             select
//             label="Status"
//             name="status"
//             value={data.status}
//             onChange={onChange}
//         >
//             <MenuItem value="ACTIVE">ACTIVE</MenuItem>
//             <MenuItem value="INACTIVE">INACTIVE</MenuItem>
//         </TextField>
//         <Button variant="contained" onClick={onSubmit}>Save</Button>
//     </Stack>
// );

// export default TrainerEnrollmentForm;


import { TextField, Button, Stack, MenuItem } from "@mui/material";

const TrainerEnrollmentForm = ({ data, onChange, onSubmit }) => (
    <Stack spacing={2} sx={{ width: "100%", mb: 2 }}>
        <TextField
            label="Trainer ID"
            name="trainerId"
            value={data.trainerId}
            onChange={onChange}
            fullWidth
        />

        <TextField
            label="Program ID"
            name="programId"
            value={data.programId}
            onChange={onChange}
            fullWidth
        />

        <TextField
            type="date"
            label="Start Date"
            name="startDate"
            value={data.startDate}
            onChange={onChange}
            InputLabelProps={{ shrink: true }}
            fullWidth
        />

        <TextField
            type="date"
            label="End Date"
            name="endDate"
            value={data.endDate}
            onChange={onChange}
            InputLabelProps={{ shrink: true }}
            fullWidth
        />

        <TextField
            select
            label="Status"
            name="status"
            value={data.status}
            onChange={onChange}
            fullWidth
        >
            <MenuItem value="ACTIVE">ACTIVE</MenuItem>
            <MenuItem value="INACTIVE">INACTIVE</MenuItem>
        </TextField>

        <Button variant="contained" onClick={onSubmit}>
            {data.id ? "Update" : "Save"}
        </Button>
    </Stack>
);

export default TrainerEnrollmentForm;
