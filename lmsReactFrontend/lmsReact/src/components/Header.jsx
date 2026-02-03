// import { AppBar, Toolbar, Typography } from '@mui/material';

// export default function Header() {
//     return (
//         <AppBar position="fixed" style={{ zIndex: 1201 }}>
//             <Toolbar>
//                 <Typography variant="h6">Simple LMS Dashboard</Typography>
//             </Toolbar>
//         </AppBar>
//     );
// }

// import { AppBar, Toolbar, Typography, Box } from "@mui/material";

// const drawerWidth = 240;

// export default function Header() {
//     return (
//         <AppBar
//             position="fixed"
//             elevation={0}
//             sx={{
//                 width: `calc(100% - ${drawerWidth}px)`,
//                 ml: `${drawerWidth}px`,
//                 backgroundColor: "#020617", // dark modern
//                 borderBottom: "1px solid #1e293b",
//                 zIndex: 1201,
//             }}
//         >
//             <Toolbar sx={{ minHeight: 64 }}>
//                 <Typography
//                     variant="h6"
//                     sx={{
//                         fontWeight: 600,
//                         letterSpacing: "0.5px",
//                     }}
//                 >
//                     LMS Dashboard
//                 </Typography>

//                 <Box sx={{ flexGrow: 1 }} />

//                 {/* Future: profile / logout / notifications */}
//                 <Typography variant="body2" sx={{ opacity: 0.8 }}>
//                     Admin
//                 </Typography>
//             </Toolbar>
//         </AppBar>
//     );
// }



import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export default function Header() {
    return (
        <AppBar
            position="fixed"
            elevation={0}
            sx={{
                width: "100%",
                backgroundColor: "#020617",
                borderBottom: "1px solid #1e293b",
                zIndex: 1300,
            }}
        >
            <Toolbar>
                {/* Mobile menu icon */}
                <IconButton
                    edge="start"
                    color="inherit"
                    sx={{ display: { md: "none" }, mr: 2 }}
                >
                    <MenuIcon />
                </IconButton>

                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    LMS Dashboard
                </Typography>

                <Box sx={{ flexGrow: 1 }} />

                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Admin
                </Typography>
            </Toolbar>
        </AppBar>
    );
}
