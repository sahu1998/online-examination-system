import { Modal, Input, Table, Button, Text, Dropdown } from "@nextui-org/react";
import { useEffect, useState } from "react";
import {
  deleteApiHandler,
  getApiHandler,
  postApiHandler,
  serverURL,
} from "../../../apiHandler";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
import FeedbackForm from "../../student/feedback/temp";
import * as React from "react";
import OwnerLayout from "../../../layouts/owner-layout";

export default function FeedbackOwner() {
  const [data, setData] = React.useState([]);
  const token = localStorage.getItem("token");

  const getData = async () => {
    const res = await getApiHandler(`/get-feedbackaggregate/${token}`);
    console.log("Aggregate", res.data);
    setData(res.data);
  };
  useEffect(() => {
    getData();
  }, []);

  const deleteData = async (id) => {
    const response = await deleteApiHandler(`/delete-feedback/${token}/${id}`);
    console.log("DELETE", response);

    getData();
  };

  return (
    <OwnerLayout>
      <div className="my-5">
        <Table
          bordered
          css={{
            height: "auto",
            minWidth: "100%",
          }}
        >
          <Table.Header>
            <Table.Column>TITLE</Table.Column>
            <Table.Column>IMAGE</Table.Column>
            <Table.Column>NAME</Table.Column>
            <Table.Column>SUBJECT</Table.Column>
            <Table.Column>DESCRIPTION</Table.Column>
            <Table.Column>POSTED ON</Table.Column>
            <Table.Column>STATUS</Table.Column>
            <Table.Column></Table.Column>
          </Table.Header>

          <Table.Body>
            {data.map((row) => (
              <Table.Row>
                <Table.Cell>{row.title}</Table.Cell>
                <Table.Cell>
                  {row.image ? (
                    <img
                      src={`${serverURL}/${row.image}`}
                      width="80"
                      height="80"
                    />
                  ) : (
                    <img
                      src={`https://www.theschoolrun.com/sites/theschoolrun.com/files/article_images/child_taking_exam_0.jpg`}
                      width="80"
                      height="80"
                    />
                  )}
                </Table.Cell>

                <Table.Cell>{row.name}</Table.Cell>
                <Table.Cell>{row.subject}</Table.Cell>
                <Table.Cell>{row.desc}</Table.Cell>
                <Table.Cell>{row.postedOn}</Table.Cell>
                <Table.Cell>
                  {row.status ? (
                    <CheckIcon style={{ background: "darkgray" }} />
                  ) : (
                    <ClearIcon style={{ background: "darkgray" }} />
                  )}
                </Table.Cell>
                <Table.Cell>
                  <Dropdown>
                    <Dropdown.Button
                      flat
                      css={{
                        background: "$gray400",
                        color: "$gray800",
                      }}
                    >
                      Action
                    </Dropdown.Button>
                    <Dropdown.Menu aria-label="Static Actions">
                      <Dropdown.Item key="delete">
                        <Button
                          onClick={() => {
                            deleteData(row._id);
                          }}
                          className="btn"
                        >
                          Delete
                        </Button>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>

          <Table.Pagination
            shadow
            noMargin
            align="center"
            color="neutral"
            rowsPerPage={5}
            onPageChange={(page) => console.log({ page })}
          />
        </Table>
      </div>
    </OwnerLayout>
  );
}
