
import { Container } from "@mui/material";

const ProgramMgmt = () => {
  return (
    <Container>
    </Container>
  );
};

export default ProgramMgmt;


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Button,
//   TextField,
//   Container,
//   Typography,
//   Grid,
//   Card,
//   CardMedia,
//   CardContent,
//   CardActions,
//   Box,
//   IconButton,
//   Modal,
//   Chip,
//   Snackbar,
//   Alert,
// } from "@mui/material";
// import { Delete, Edit, AddPhotoAlternate } from "@mui/icons-material";

// const API_URL = "http://localhost:8080/api/programs";

// const ProgramMgmt = () => {
//   const [programs, setPrograms] = useState([]);
//   const [editingId, setEditingId] = useState(null);
//   const [existingImages, setExistingImages] = useState([]);
//   const [removedImages, setRemovedImages] = useState([]);
//   const [newImages, setNewImages] = useState([]);
//   const [previewImage, setPreviewImage] = useState(null);
//   const [saving, setSaving] = useState(false);
//   const [snack, setSnack] = useState({ open: false, msg: "", type: "success" });

//   const [formData, setFormData] = useState({
//     programCode: "",
//     programName: "",
//     description: "",
//     level: "",
//     mode: "",
//     durationInWeeks: "",
//     maxStudents: "",
//     startDate: "",
//     endDate: "",
//     active: true,
//     createdBy: "Admin",
//   });

//   const fetchPrograms = async () => {
//     try {
//       const res = await axios.get(API_URL);
//       setPrograms(res.data);
//     } catch (err) {
//       setSnack({ open: true, msg: "Failed to fetch programs", type: "error" });
//     }
//   };

//   useEffect(() => {
//     fetchPrograms();
//   }, []);

//   const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleFileChange = (e) => {
//     setNewImages((prev) => [...prev, ...Array.from(e.target.files)]);
//     e.target.value = null;
//   };

//   const removeNewImage = (index) => setNewImages((prev) => prev.filter((_, i) => i !== index));

//   const removeExistingImage = (imgPath) => {
//     setRemovedImages((prev) => [...prev, imgPath]);
//     setExistingImages((prev) => prev.filter((i) => i !== imgPath));
//   };

//   const handleSubmit = async () => {
//     if (!formData.programCode || !formData.programName) {
//       setSnack({ open: true, msg: "Program Code & Name required", type: "warning" });
//       return;
//     }

//     setSaving(true);
//     const data = new FormData();
//     data.append("program", new Blob([JSON.stringify(formData)], { type: "application/json" }));
//     newImages.forEach((img) => data.append("images", img));
//     removedImages.forEach((img) => data.append("remove_images", img));

//     try {
//       if (editingId) {
//         await axios.put(`${API_URL}/${editingId}`, data, {
//           headers: { "Content-Type": "multipart/form-data" },
//         });
//         setSnack({ open: true, msg: "Program Updated", type: "success" });
//       } else {
//         await axios.post(API_URL, data, {
//           headers: { "Content-Type": "multipart/form-data" },
//         });
//         setSnack({ open: true, msg: "Program Created", type: "success" });
//       }
//       resetForm();
//       fetchPrograms();
//     } catch (err) {
//       setSnack({ open: true, msg: "Error saving program", type: "error" });
//     } finally {
//       setSaving(false);
//     }
//   };

//   const resetForm = () => {
//     setFormData({
//       programCode: "",
//       programName: "",
//       description: "",
//       level: "",
//       mode: "",
//       durationInWeeks: "",
//       maxStudents: "",
//       startDate: "",
//       endDate: "",
//       active: true,
//       createdBy: "Admin",
//     });
//     setNewImages([]);
//     setExistingImages([]);
//     setRemovedImages([]);
//     setEditingId(null);
//   };

//   const editProgram = (p) => {
//     setFormData({ ...p });
//     setEditingId(p.id);
//     setExistingImages(p.imageUrls || []);
//     setRemovedImages([]);
//     setNewImages([]);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const deleteProgram = async (id) => {
//     if (!window.confirm("Delete this program?")) return;
//     try {
//       await axios.delete(`${API_URL}/${id}`);
//       fetchPrograms();
//       setSnack({ open: true, msg: "Program Deleted", type: "info" });
//     } catch (err) {
//       setSnack({ open: true, msg: "Failed to delete program", type: "error" });
//     }
//   };

//   const resolveImage = (path) =>
//     path?.startsWith("http") ? path : `http://localhost:8080/uploads/programs/${path}`;

//   return (
//     <Container sx={{ mt: 5, mb: 5 }}>
//       <Typography variant="h4" align="center" sx={{ fontWeight: 700, mb: 4, color: "#0D47A1" }}>
//         Program Management
//       </Typography>

//       {/* Form */}
//       <Box sx={{ mb: 5, p: 4, border: "1px solid #ccc", borderRadius: 3, background: "#f9f9f9" }}>
//        <Typography
//   variant="h6"
//   sx={{
//     mb: 3,
//     fontWeight: 600,
//     color: "#000000" // black
//     // color: "#0D47A1" // dark blue
//   }}
// >
//   {editingId ? "Edit Program" : "Add New Program"}
// </Typography>


//         <Grid container spacing={2}>
//           {Object.entries(formData).map(
//             ([key, value]) =>
//               key !== "active" && (
//                 <Grid item xs={12} md={6} key={key}>
//                   <TextField
//                     fullWidth
//                     label={key.replace(/([A-Z])/g, " $1")}
//                     name={key}
//                     value={value}
//                     onChange={handleChange}
//                     type={
//                       key.includes("Date")
//                         ? "date"
//                         : key.includes("Weeks") || key.includes("Students")
//                         ? "number"
//                         : "text"
//                     }
//                     InputLabelProps={key.includes("Date") ? { shrink: true } : {}}
//                   />
//                 </Grid>
//               )
//           )}

//           <Grid item xs={12}>
//             <Button variant="outlined" component="label" startIcon={<AddPhotoAlternate />}>
//               Upload Images
//               <input type="file" hidden multiple accept="image/*" onChange={handleFileChange} />
//             </Button>

//             <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
//               {existingImages.map((img, i) => (
//                 <Box key={i} sx={{ position: "relative" }}>
//                   <img
//                     src={resolveImage(img)}
//                     alt="preview"
//                     width={80}
//                     height={80}
//                     style={{ borderRadius: 6, objectFit: "cover", cursor: "pointer" }}
//                     onClick={() => setPreviewImage(resolveImage(img))}
//                   />
//                   <IconButton
//                     size="small"
//                     sx={{ position: "absolute", top: -5, right: -5, background: "#f44336", color: "#fff" }}
//                     onClick={() => removeExistingImage(img)}
//                   >
//                     <Delete fontSize="small" />
//                   </IconButton>
//                 </Box>
//               ))}
//               {newImages.map((img, i) => (
//                 <Box key={i} sx={{ position: "relative" }}>
//                   <img
//                     src={URL.createObjectURL(img)}
//                     alt="preview"
//                     width={80}
//                     height={80}
//                     style={{ borderRadius: 6, objectFit: "cover", cursor: "pointer" }}
//                     onClick={() => setPreviewImage(URL.createObjectURL(img))}
//                   />
//                   <IconButton
//                     size="small"
//                     sx={{ position: "absolute", top: -5, right: -5, background: "#f44336", color: "#fff" }}
//                     onClick={() => removeNewImage(i)}
//                   >
//                     <Delete fontSize="small" />
//                   </IconButton>
//                 </Box>
//               ))}
//             </Box>
//           </Grid>

//           <Grid item xs={12}>
//             <Button
//               variant="contained"
//               onClick={handleSubmit}
//               disabled={saving}
//               sx={{ backgroundColor: "#0D47A1", "&:hover": { backgroundColor: "#1565C0" } }}
//             >
//               {saving ? "Saving..." : editingId ? "Update Program" : "Create Program"}
//             </Button>
//           </Grid>
//         </Grid>
//       </Box>

//       {/* Programs List */}
     

// <Grid container spacing={3}>
//   {programs.map((p) => (
//     <Grid item xs={12} sm={6} md={4} key={p.id}>
//       <Card
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "space-between",
//           height: "100%",           // ensures card fills the grid item
//           borderRadius: 3,
//           overflow: "hidden",
//           boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
//         }}
//       >
//         {/* Fixed height image */}
//         {p.imageUrls && p.imageUrls.length > 0 ? (
//           <CardMedia
//             component="img"
//             height="180"               // fixed height for all cards
//             image={resolveImage(p.imageUrls[0])}
//             alt={p.programName}
//             sx={{ objectFit: "cover", cursor: "pointer" }}
//             onClick={() => setPreviewImage(resolveImage(p.imageUrls[0]))}
//           />
//         ) : (
//           <Box
//             sx={{
//               height: 180,
//               backgroundColor: "#f0f0f0",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               color: "#999",
//               fontWeight: 600,
//             }}
//           >
//             No Image
//           </Box>
//         )}

//         <CardContent sx={{ flexGrow: 1 }}>
//           <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
//             {p.programName}
//           </Typography>
//           <Chip label={p.level} size="small" color="primary" sx={{ mb: 1 }} />
//           <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
//             {p.description.length > 100
//               ? p.description.slice(0, 100) + "..."
//               : p.description}
//           </Typography>
//           <Typography variant="body2" color="text.secondary">
//             Mode: {p.mode} | Duration: {p.durationInWeeks} weeks
//           </Typography>
//           <Typography variant="body2" color="text.secondary">
//             Start: {new Date(p.startDate).toLocaleDateString("en-GB")} | End:{" "}
//             {new Date(p.endDate).toLocaleDateString("en-GB")}
//           </Typography>
//         </CardContent>

//         {/* Centered buttons */}
//         <CardActions
//           sx={{
//             justifyContent: "center", // centers buttons
//             gap: 1,
//             mb: 1,
//           }}
//         >
//           <Button
//             size="small"
//             startIcon={<Edit />}
//             variant="contained"
//             color="primary"
//             onClick={() => editProgram(p)}
//             sx={{ textTransform: "none" }}
//           >
//             Edit
//           </Button>
//           <Button
//             size="small"
//             startIcon={<Delete />}
//             variant="contained"
//             color="error"
//             onClick={() => deleteProgram(p.id)}
//             sx={{ textTransform: "none" }}
//           >
//             Delete
//           </Button>
//         </CardActions>
//       </Card>
//     </Grid>
//   ))}
// </Grid>

//       {/* Image Preview Modal */}
//       <Modal open={!!previewImage} onClose={() => setPreviewImage(null)} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
//         <Box sx={{ outline: "none", maxWidth: "80%", maxHeight: "80%" }}>
//           <img src={previewImage} alt="preview" style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: 8 }} />
//         </Box>
//       </Modal>

//       <Snackbar open={snack.open} autoHideDuration={3000} onClose={() => setSnack({ ...snack, open: false })}>
//         <Alert severity={snack.type}>{snack.msg}</Alert>
//       </Snackbar>
//     </Container>
//   );
// };

// export default ProgramMgmt;


