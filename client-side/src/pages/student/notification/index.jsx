import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Popover from "@mui/material/Popover";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import { deleteApiHandler, getApiHandler } from "../../../apiHandler";
import StudentLayout from "../../../layouts/student-layout";
import { NavLink, useNavigate } from "react-router-dom";
import { HiOutlineEllipsisVertical } from "react-icons/hi2";
import { Button } from "@mui/material";

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  maxWidth: 400,
  color: theme.palette.text.primary,
}));

export default function NotificationMsg() {
  const [data, setData] = React.useState([]);
  const token = localStorage.getItem("token");
  const history = useNavigate();
  const getData = async () => {
    const res = await getApiHandler(`/get-notification/${token}`);
    console.log("RESPONSE", res);
    if (res.auth === "false") {
      localStorage.removeItem("token");
      history("/logIn");
    }

    setData(res.data);
  };
  React.useEffect(() => {
    getData();
  }, []);
  const deleteData = async (id) => {
    const response = await deleteApiHandler(
      `/delete-notification/${token}/${id}`
    );
    console.log("DELETE", response);
    if (response.status === 200 && response.auth === "true") {
      swal("delete  successfully!", "You clicked the button!", "success");
    } else {
      localStorage.removeItem("token");
      history("/logIn");
    }

    getData();
  };

  return (
    <StudentLayout>
      {data.map((row) => {
        console.log("DATA", row);
        return (
          <Box
            sx={{
              flexGrow: 1,
              overflow: "hidden",
              px: 3,
              marginRight: "44rem",
            }}
          >
            {" "}
            <StyledPaper
              sx={{
                my: 1,
                mx: "auto",
                p: 2,
              }}
            >
              <PopupState variant="popover" popupId="demo-popup-popover">
                {(popupState) => (
                  <div>
                    <Button
                      {...bindTrigger(popupState)}
                      style={{
                        marginLeft: "21rem",
                        fontSize: "27px",
                        color: " grey",
                      }}
                    >
                      <HiOutlineEllipsisVertical />
                    </Button>
                    <Popover
                      {...bindPopover(popupState)}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "center",
                      }}
                    >
                      <Typography sx={{ p: 2 }}>
                        <Button
                          style={{
                            textTransform: "capitalize",
                            height: "1px",
                            color: " black",
                          }}
                          onClick={() => {
                            deleteData(row._id);
                          }}
                        >
                          Delete
                        </Button>
                      </Typography>
                    </Popover>
                  </div>
                )}
              </PopupState>
              <Grid container wrap="nowrap" spacing={2}>
                <Grid item>
                  <Avatar>N</Avatar>
                </Grid>
                <Grid item xs>
                  <Typography>{row.title}</Typography>
                  <NavLink to={row.url}>
                    {" "}
                    <Typography>{row.url}</Typography>
                  </NavLink>
                  <Typography>Valid From- {row.validFrom}</Typography>
                  <Typography>Valid To- {row.validTo}</Typography>
                  <Typography>{row.desc}</Typography>
                  <Typography
                    style={{
                      fontWeight: "600",
                      marginLeft: "9rem",
                      color: "grey",
                    }}
                  >
                    {row.postedOn}
                  </Typography>
                </Grid>
              </Grid>
            </StyledPaper>
          </Box>
        );
      })}
    </StudentLayout>
  );
}

// const App: React.FC = () => (
//   <Badge count={5} offset={[10, 10]}>
//     <Avatar shape="square" size="large" />
//   </Badge>
// );

// export default App;
