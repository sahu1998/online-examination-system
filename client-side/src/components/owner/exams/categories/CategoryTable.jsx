import React from "react";

function CategoryTable() {
  return (
    <div>
      <Table
        bordered
        css={{
          height: "auto",
          minWidth: "100%",
        }}
      >
        <Table.Header>
          <Table.Column>Name</Table.Column>
          <Table.Column>Description</Table.Column>
          <Table.Column>Action</Table.Column>
        </Table.Header>

        <Table.Body>
          {data.map((a) => (
            <Table.Row>
              <Table.Cell>{a.examName}</Table.Cell>
              {/* <Table.Cell>{a.examDesc}</Table.Cell> */}
              <Table.Cell>sdfjkdsljfdsjkfjsk</Table.Cell>

              <Table.Cell>
                <Dropdown>
                  <Dropdown.Button
                    flat
                    css={{ background: "$gray400", color: "$gray800" }}
                  >
                    Action
                  </Dropdown.Button>
                  <Dropdown.Menu aria-label="Static Actions">
                    <Dropdown.Item aria-label="edit-action" key="edit">
                      <button
                        className="catg-btn-desing"
                        onClick={async () => {
                          setCatgId(a._id);
                          await prefilledForm(a);
                          setVisible(true);
                        }}
                      >
                        Edit
                      </button>
                    </Dropdown.Item>
                    <Dropdown.Item aria-label="delete-action" key="delete">
                      <button
                        className="catg-btn-desing"
                        // onPress={() => {
                        //   deleteData(a._id);
                        // }}
                      >
                        Delete
                      </button>
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
          //   onPageChange={(page) => console.log({ page })}
        />
      </Table>
    </div>
  );
}

export default CategoryTable;
