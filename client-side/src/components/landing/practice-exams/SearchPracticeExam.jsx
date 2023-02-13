import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import {
  Button,
  ChakraProvider,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";

function SearchPracticeExam() {
  return (
    <ChakraProvider>
      <InputGroup size="lg">
        <Input
          pr="4.5rem"
          type="text"
          placeholder="Search Subject..."
          className="bg-white"
        />
        <InputRightElement width="4.5rem">
          <Button
            h="2rem"
            size="md"
            colorScheme="blue"
            onClick={() => {
              console.log("hello");
            }}
          >
            <SearchIcon />
          </Button>
        </InputRightElement>
      </InputGroup>
    </ChakraProvider>
  );
}

export default SearchPracticeExam;
