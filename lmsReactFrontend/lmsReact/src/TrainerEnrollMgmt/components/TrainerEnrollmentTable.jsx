import { Table, TableHead, TableRow, TableCell, TableBody, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const TrainerEnrollmentTable = ({ rows, onEdit, onDelete }) => (
    <Table>
        <TableHead>
            <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Trainer</TableCell>
                <TableCell>Program</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {rows.map((row) => (
                <TableRow key={row.id}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.trainerId}</TableCell>
                    <TableCell>{row.programId}</TableCell>
                    <TableCell>{row.status}</TableCell>
                    <TableCell>
                        <IconButton onClick={() => onEdit(row)}><EditIcon /></IconButton>
                        <IconButton onClick={() => onDelete(row.id)}><DeleteIcon /></IconButton>
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
);

export default TrainerEnrollmentTable;
