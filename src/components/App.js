import { useNavigate } from "react-router";
import { useAppContext } from "../context/AppProvider";
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  IconButton,
  Input,
  FormLabel,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableContainer,
  DrawerFooter,
} from "@chakra-ui/react";
import { FaTimes } from "react-icons/fa";
import { useAlert } from "react-alert";
import { setHistory } from "../context/AppProvider";
import { firstRoute, secondRoute } from "../api/index";
import Loader from "./Loader";
import Route from "./Route";

function App() {
  const {
    setCoordinates,
    origin,
    setOrigin,
    destination,
    setDestination,
    travelHistory,
    setTravelHistory,
    loading,
    setLoading,
  } = useAppContext();
  const navigate = useNavigate();
  const alert = useAlert();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const getRoutes = async () => {
    if (!origin) {
      alert.error("Please provide origin data.");
      return;
    }
    if (!destination) {
      alert.error("Please provide destination data.");
      return;
    }
    try {
      setLoading(true);
      const result = await Promise.all([
        firstRoute(origin),
        secondRoute(destination),
      ]);
      setCoordinates({
        cord1: [+result[0][0].lat, +result[0][0].lon],
        cord2: [+result[1][0].lat, +result[1][0].lon],
      });
      const historyData = [
        { origin, destination, date: new Date().toLocaleString() },
      ];
      setHistory(historyData, setTravelHistory);
      navigate("/map");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      alert.error("Something went wrong. Please try again later.");
    }
  };

  const clearHistory = () => {
    localStorage.removeItem("history");
    setTravelHistory([]);
  };

  const clearRoute = () => {
    setOrigin("");
    setDestination("");
  };

  return (
    <>
      <Flex
        position="relative"
        flexDirection="column"
        alignItems="center"
        h="100vh"
        w="100vw"
        backgroundImage={"background.jpg"}
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
      >
        {!loading ? (
          <Box
            p={50}
            borderRadius="lg"
            mt={250}
            bgColor="white"
            shadow="base"
            minW="container.md"
            zIndex="1"
          >
            <HStack spacing={2} justifyContent="space-between">
              <Box flexGrow={1}>
                <FormLabel htmlFor="origin">Origin</FormLabel>
                <Input
                  id="origin"
                  type="text"
                  placeholder="House Number Street City"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                />
              </Box>
              <Box flexGrow={1}>
                <FormLabel htmlFor="destination">Destination</FormLabel>
                <Input
                  id="destination"
                  type="text"
                  placeholder="House Number Street City"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                />
              </Box>
              <ButtonGroup>
                <Button colorScheme="pink" type="submit" onClick={getRoutes}>
                  Calculate Route
                </Button>
                <IconButton
                  aria-label="center back"
                  icon={<FaTimes />}
                  onClick={clearRoute}
                />
              </ButtonGroup>
            </HStack>
          </Box>
        ) : (
          <Loader />
        )}
        <Button
          position="absolute"
          top={5}
          right={30}
          colorScheme="pink"
          onClick={onOpen}
        >
          History of Your routes
        </Button>
      </Flex>
      <Drawer size="xl" placement="right" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader
            display="flex"
            justifyContent="space-between"
            borderBottomWidth="1px"
          >
            Routes History
            <Button colorScheme="pink" mr={3} onClick={clearHistory}>
              Clear History
            </Button>
          </DrawerHeader>
          <DrawerBody>
            <TableContainer>
              <Table variant="striped">
                <Thead>
                  <Tr width="100%">
                    <Th width="45%">Origin</Th>
                    <Th width="45%">Destination</Th>
                    <Th width="10%">Date</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {travelHistory?.map((route, index) => (
                    <Route key={index} route={route} />
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </DrawerBody>
          <DrawerFooter borderTopWidth="1px">
            <Button colorScheme="pink" mr={3} onClick={onClose}>
              Close
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default App;
