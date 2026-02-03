import { Container, Typography } from '@mui/material';

export default function DashboardPage() {
    return (
        <Container style={{ marginLeft: 240, paddingTop: 80 }}>
            <Typography variant="h4">Welcome to LMS Dashboard</Typography>

            <Typography variant="body1" color="text.white">
                Manage trainer enrollments, courses, and users from here.
            </Typography>
        </Container>


    );
}
