import { Search } from "@mui/icons-material";
import { AppBar, Chip, Stack, TextField, Typography } from "@mui/material";
import { useContext } from "react";
import DoctorMainContext from "../../utils/Context/DoctorMainContext";

export default function DoctorSearchBar() {

  const {setselectedStatus, patientCount,searchText, setSearchText} = useContext(DoctorMainContext);
  const onChipClick = (status) => {
    setselectedStatus(status.toLowerCase());
  } 

  const onChangeSearchText = (e) => {
    setSearchText(e.target.value);
  }

  return (
    <div>
    <AppBar position="static">
      <div className="doctor-bar-main-cont">
      <div className="doctor-bar-container">
        <div className="doctor-bar-btn-container">
          <div className="doctor-bar-btn-inner">
            <Stack direction="row" spacing={1}>
              <Chip
                label={"New - " + patientCount.new}
                component="a"
                href="#basic-chip"
                clickable
                className="doctor-bar-chip"
                onClick={() => onChipClick("New")}
              />
              <Chip
                label={"Ongoing - " + patientCount.ongoing}
                component="a"
                href="#basic-chip"
                className="doctor-bar-chip"
                clickable
                onClick={() => onChipClick("Ongoing")}
              />

              <Chip
                label={"Ongoing - "+ patientCount.completed}
                component="a"
                href="#basic-chip"
                className="doctor-bar-chip"
                clickable
                onClick={() => onChipClick("Completed")}
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
                value={searchText}
                onChange={onChangeSearchText}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="doctor-bar-demographic">
      <div className="demographic-header">
        <Typography variant="h2" gutterBottom>
          Demographics
        </Typography>
      </div>
      </div>
    </div>  
    </AppBar>
    </div>
  );
}
