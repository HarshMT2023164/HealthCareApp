import { Search } from "@mui/icons-material";
import { AppBar, Button, Chip, Stack, TextField, Toolbar } from "@mui/material";

export default function DoctorNavBar() {
  return (
    <div>
    <AppBar position="static">
      <div className="doctor-bar-container">
        <div className="doctor-bar-btn-container">
          <div className="doctor-bar-btn-inner">
            <Stack direction="row" spacing={1}>
              <Chip
                label="New "
                component="a"
                href="#basic-chip"
                clickable
              />
              <Chip
                label="Ongoing"
                component="a"
                href="#basic-chip"
                clickable
              />

              <Chip
                label="Completed"
                component="a"
                href="#basic-chip"
                clickable
              />
            </Stack>
          </div>
        </div>
        <div className="doctor-bar-search-container">
          <div className="doctor-bar-search-inner">
            <div className="doctor-bar-search-icon">
              <Search />
            </div>
            <div className="doctor-bar-search-text">
              <TextField
                variant="standard"
                placeholder="Search here"
                fullWidth
              />
            </div>
          </div>
        </div>
      </div>
    </AppBar>
    </div>
  );
}
