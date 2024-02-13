import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import http from "../http";

function Activities() {
  const [activityList, setActivityList] = useState([]);

  useEffect(() => {
    // Fetch activities from your API
    http.get("/Activity")
      .then((res) => {
        console.log('Response:', res); // Log the entire response for troubleshooting
        setActivityList(res.data);
      })
      .catch((error) => {
        console.error("Error fetching activities:", error);
      });
  }, []);

  return (
    <Box m={2}>
      <Grid container spacing={2}>
        {activityList.map((activity) => (
          <Grid item key={activity.id} xs={12} sm={6} md={4} lg={3}>
            <Card component={Link} to={`/activities/${activity.id}`}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt={activity.activity_Name}
                  height="140"
                  image={activity.ImageFile}
                />
                <CardContent>
                  <Typography variant="h6" component="div">
                    {activity.activity_Name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Tag: {activity.tag_Name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Price: {activity.activity_price}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Activities;


// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import {
//   Box,
//   Grid,
//   Card,
//   CardActionArea,
//   CardContent,
//   CardMedia,
//   Typography,
// } from "@mui/material";
// import http from "../http";

// function Activities() {
//   const [activityList, setActivityList] = useState([]);

//   useEffect(() => {
//     // Fetch activities from your API
//     http.get("/Activity").then((res) => {
//       setActivityList(res.data);
//     }).catch((error) => {
//       console.error("Error fetching activities:", error);
//     });
//   }, []);

//   return (
//     <Box m={2}>
//       <Grid container spacing={2}>
//         {activityList.map((activity) => (
//           <Grid item key={activity.id} xs={12} sm={6} md={4} lg={3}>
//             <Card component={Link} to={`/activities/${activity.id}`}>
//               <CardActionArea>
//                 <CardMedia
//                   component="img"
//                   alt={activity.activity_Name}
//                   height="140"
//                   image={activity.ImageFile}
//                 />
//                 <CardContent>
//                   <Typography variant="h6" component="div">
//                     {activity.activity_Name}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     Tag: {activity.tag_Name}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     Price: {activity.activity_price}
//                   </Typography>
//                 </CardContent>
//               </CardActionArea>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </Box>
//   );
// }

// export default Activities;


// import React from 'react';

// const ActivityList = ({ activities, handleBook }) => {
//   return (
//     <div>
//       <h2>Available Activities</h2>
//       <ul>
//         {activities.map((activity) => (
//           <li key={activity.id}>
//             {activity.name} - {activity.price}
//             <button onClick={() => handleBook(activity.id)}>Book Now</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ActivityList;