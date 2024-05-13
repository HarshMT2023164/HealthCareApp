import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import React, { useEffect, useState } from "react";

import { Grid } from "@mui/material";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL, getRoleCounts } from "../../utils/constants/URLS";
import { ROLES } from "../../utils/constants/Roles";
export default function RoleCards() {
  const [roleCounts, setRoleCounts] = useState(null);

  const token = localStorage.getItem("JwtToken");

  const navigate = useNavigate();

  const getIconForRole = (role) => {
    let imgurl;
    switch (role.toLowerCase()) {
      case ROLES.DOCTOR.toLowerCase():
        imgurl = "/doctor.png";
        break;
      case ROLES.SUPERVISOR.toLowerCase():
        imgurl = "/supervisor.png";
        break;
      case ROLES.FHW.toLowerCase():
        imgurl = "/fhw.png";
        break;
      case ROLES.CITIZEN.toLowerCase():
        imgurl = "/patient.png";
        break;
      default:
        imgurl = "/supervisor.png"; // Default to getDoctors if role not specified or recognized
        break;
        
    }
    return imgurl;
  };

  const fetchRoleCount = async () => {
    const  response = await axios.
      get(BASE_URL + getRoleCounts, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        const tempRoleCounts = Object.entries(response.data.counts).map(
          ([key, value]) => ({
            role: key,
            display_name: (key==="receptionist"?key+"s":key)
              .split(/(?=[A-Z])/)
              .join(" ")
              .replace( /\w\S*/g,
              function(txt) {
                return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
              }), // Convert camelCase to Title Case
            count: value,
            icon: getIconForRole(key),
          })
        );
    
        console.log(tempRoleCounts);
    
        setRoleCounts(tempRoleCounts);
      }).catch((err) => {
        console.log(err);
      });

    
  };

  useEffect(() => {
    if(!token){
      navigate("/");
      return;
    }
    fetchRoleCount();
  }, []);

  return (
    <Grid
      container
      columnSpacing={5}
      rowSpacing={5}
      width={"70vw"}
      margin={"0 auto"}
    >
      {roleCounts &&
        roleCounts.map((elem) => (
          <Grid item key={elem.display_name} xs={12} md={6}>
            <Card style={{ height: "30vh", width: "30vw" }} elevation={5}>
              <Link to={"/admin/viewList/" + elem.display_name} className="link-tag">
                <CardContent className="admin-cardcontent">
                  <div className="admin-cardcontent-items">
                    <h2>{elem.display_name}</h2>
                    <h2>{elem.count}</h2>
                  </div>
                  <div className="admin-cardcontent-items">
                    <img
                      src={elem.icon}
                      alt="nothing"
                      width={"100%"}
                      height={"100%"}
                    ></img>
                  </div>
                </CardContent>
              </Link>
            </Card>
          </Grid>
        ))}
    </Grid>
  );
}
