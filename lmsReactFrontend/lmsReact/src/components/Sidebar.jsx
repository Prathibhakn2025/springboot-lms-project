// import { Drawer, List, ListItem, ListItemText } from '@mui/material';
// import { Link } from 'react-router-dom';

// export default function Sidebar() {
//     return (
//         <Drawer variant="permanent" anchor="left">
//             <List>
//                 <ListItem button component={Link} to="/">
//                     <ListItemText primary="Dashboard" />
//                 </ListItem>
//                 <ListItem button component={Link} to="/trainer-enrollments">
//                     <ListItemText primary="Trainer Enrollment" />
//                 </ListItem>
//                 {/* Add other modules later */}
//             </List>
//         </Drawer>
//     );
// }

// import {
//     Drawer,
//     List,
//     ListItemButton,
//     ListItemIcon,
//     ListItemText,
//     Toolbar,
// } from "@mui/material";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import SchoolIcon from "@mui/icons-material/School";
// import { NavLink } from "react-router-dom";

// const drawerWidth = 240;

// export default function Sidebar() {
//     return (
//         <Drawer
//             variant="permanent"
//             sx={{
//                 width: drawerWidth,
//                 flexShrink: 0,
//                 "& .MuiDrawer-paper": {
//                     width: drawerWidth,
//                     boxSizing: "border-box",
//                     backgroundColor: "#0f172a", // dark modern bg
//                     color: "#e5e7eb",
//                 },
//             }}
//         >
//             <Toolbar sx={{ fontWeight: "bold", fontSize: 18 }}>
//                 LMS Admin
//             </Toolbar>

//             <List>
//                 <ListItemButton
//                     component={NavLink}
//                     to="/"
//                     sx={{
//                         "&.active": {
//                             backgroundColor: "#1e293b",
//                         },
//                         "&:hover": {
//                             backgroundColor: "#1e293b",
//                         },
//                     }}
//                 >
//                     <ListItemIcon sx={{ color: "#38bdf8" }}>
//                         <DashboardIcon />
//                     </ListItemIcon>
//                     <ListItemText primary="Dashboard" />
//                 </ListItemButton>

//                 <ListItemButton
//                     component={NavLink}
//                     to="/trainer-enrollments"
//                     sx={{
//                         "&.active": {
//                             backgroundColor: "#1e293b",
//                         },
//                         "&:hover": {
//                             backgroundColor: "#1e293b",
//                         },
//                     }}
//                 >
//                     <ListItemIcon sx={{ color: "#38bdf8" }}>
//                         <SchoolIcon />
//                     </ListItemIcon>
//                     <ListItemText primary="Trainer Enrollment" />
//                 </ListItemButton>
//             </List>
//         </Drawer>
//     );
// }



import {
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SchoolIcon from "@mui/icons-material/School";
import { NavLink } from "react-router-dom";

const drawerWidth = 240;

export default function Sidebar() {
    return (
        <Drawer
            variant="permanent"
            sx={{
                display: { xs: "none", md: "block" }, // 👈 hide on mobile
                "& .MuiDrawer-paper": {
                    width: drawerWidth,
                    boxSizing: "border-box",
                    backgroundColor: "#0f172a",
                    color: "#e5e7eb",
                    top: 5,
                    height: "calc(100% - 64px)",

                },
            }}
        >
            <Toolbar />

            <List>
                <ListItemButton
                    component={NavLink}
                    to="/"
                    sx={{
                        "&.active": { backgroundColor: "#1e293b" },
                        "&:hover": { backgroundColor: "#1e293b" },
                    }}
                >
                    <ListItemIcon sx={{ color: "#38bdf8" }}>
                        <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                </ListItemButton>

                <ListItemButton
                    component={NavLink}
                    to="/trainer-enrollments"
                    sx={{
                        "&.active": { backgroundColor: "#1e293b" },
                        "&:hover": { backgroundColor: "#1e293b" },
                    }}
                >
                    <ListItemIcon sx={{ color: "#38bdf8" }}>
                        <SchoolIcon />
                    </ListItemIcon>
                    <ListItemText primary="Trainer Enrollment" />
                </ListItemButton>
            </List>
        </Drawer>
    );
}
