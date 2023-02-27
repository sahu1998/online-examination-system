import { Modal, Input, Table, Button, Text, Dropdown } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import "./index.css";
import {
  deleteApiHandler,
  getApiHandler,
  serverURL,
} from "../../../apiHandler";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
import OwnerLayout from "../../../layouts/owner-layout";
import swal from "sweetalert";

export default function UsersTable() {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");

  const getData = async () => {
    const res = await getApiHandler(`/get-users/${token}`);
    console.log("aaaaaaaaa=?", res);
    setData(res.data);
  };
  useEffect(() => {
    getData();
  }, []);

  const deleteData = async (id) => {
    const response = await deleteApiHandler(`/delete-users/${token}/${id}`);
    console.log("DELETE", response);
    swal("deleted  successfully!", "You clicked the button!", "success");
    getData();
  };

  return (
    <OwnerLayout>
      <Table
        bordered
        css={{
          height: "auto",
          minWidth: "100%",
        }}
      >
        <Table.Header>
          <Table.Column>Name</Table.Column>

          <Table.Column>Email</Table.Column>

          <Table.Column>Image</Table.Column>
          <Table.Column>Role</Table.Column>
          <Table.Column>Status</Table.Column>
          <Table.Column></Table.Column>
        </Table.Header>

        <Table.Body>
          {data.map((row) => (
            <Table.Row>
              <Table.Cell>{row.name}</Table.Cell>

              <Table.Cell>{row.email}</Table.Cell>

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
              <Table.Cell>{row.role}</Table.Cell>
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
    </OwnerLayout>
  );
}
