import React from "react";

import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";

function PracticeCategory({
  exams,
  selectedIndex,
  setSelectedIndex,
  setSelectedExam,
  getSubjectByCategory,
}) {
  return (
    <Paper sx={{ width: "100%", maxWidth: "100%" }}>
      <MenuList>
        <List
          // key={exam.examName}
          component="nav"
          aria-label="main mailbox folders"
          sx={{
            width: "100%",
            // maxWidth: 360,
            bgcolor: "background.paper",
            position: "relative",
            overflow: "auto",
            maxHeight: 300,
            // "& ul": { padding: 0 },
          }}
        >
          {exams.map((exam, index) => {
            return (
              <ListItemButton
                key={exam.examName}
                selected={selectedIndex === exam._id}
                onClick={() => {
                  setSelectedIndex(exam._id);
                  setSelectedExam(exam.examName);
                  getSubjectByCategory(exam._id);
                }}
              >
                <ListItemText>{exam.examName}</ListItemText>
              </ListItemButton>
            );
          })}
        </List>
      </MenuList>
    </Paper>
  );
}

export default PracticeCategory;
