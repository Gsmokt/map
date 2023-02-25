import { Tr, Td } from "@chakra-ui/react";

const Route = ({ route }) => {
  return (
    <Tr>
      <Td>{route?.origin}</Td>
      <Td>{route?.destination}</Td>
      <Td>{route?.date}</Td>
    </Tr>
  );
};

export default Route;
