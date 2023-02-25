import { useState } from "react";
import {
  Box,
  Button,
  HStack,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import * as L from "leaflet";
import { useAppContext } from "../context/AppProvider";
import MyDocument from "./Document";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router";
import TravelCostInput from "./TravelCostInput";

const Map = () => {
  const navigate = useNavigate();
  const LeafIcon = L.Icon.extend({
    options: {},
    iconSize: [20, 20],
  });
  const greenIcon = new LeafIcon({
    iconUrl: require("../assets/images/icons8-marker.png"),
  });
  const { coordinates, origin, destination } = useAppContext();
  const limeOptions = { color: "lime" };
  const polyline = [coordinates?.cord1, coordinates?.cord2];
  let latlng1 = L.latLng(coordinates?.cord1);
  let latlng2 = L.latLng(coordinates?.cord2);

  let distance = latlng1?.distanceTo(latlng2) / 1000;
  const [value, setValue] = useState("1.53");
  const alert = useAlert();
  const cost = (value * distance).toFixed(3);

  return (
    <Box
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "end",
      }}
    >
      <MapContainer
        style={{ width: "100%", height: "100vh" }}
        zoom={7}
        center={[
          parseInt(coordinates?.cord1[0]),
          parseInt(coordinates?.cord1[1]),
        ]}
        scrollWheelZoom={false}
        fadeAnimation={true}
        markerZoomAnimation={true}
        data-testid="map-container"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Polyline pathOptions={limeOptions} positions={polyline} />
        <Marker icon={greenIcon} position={coordinates.cord1}>
          <Popup>{origin}</Popup>
        </Marker>
        <Marker icon={greenIcon} position={coordinates.cord2}>
          <Popup>{destination}</Popup>
        </Marker>
      </MapContainer>
      <Button
        onClick={() => navigate("/")}
        colorScheme="pink"
        type="submit"
        top={5}
        p={6}
        left={20}
        position="absolute"
        zIndex={1000}
        leftIcon={<ArrowBackIcon />}
      >
        Go Back
      </Button>
      <Box
        p={10}
        borderRadius="lg"
        mr={8}
        pos="absolute"
        top="40px"
        bgColor="white"
        shadow="base"
        minW="container.md"
        zIndex="10000"
      >
        <HStack spacing={2} justifyContent="space-between">
          <TableContainer minW="container.sm">
            <Table variant="striped">
              <Thead>
                <Tr>
                  <Th>Origin</Th>
                  <Th>Destination</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>{origin}</Td>
                  <Td>{destination}</Td>
                </Tr>
              </Tbody>
              <Tfoot>
                <Tr>
                  <Th>Dinstance: {distance?.toFixed(2)} km</Th>
                  <Th>Travel Cost: {cost} $</Th>
                </Tr>
              </Tfoot>
            </Table>
          </TableContainer>
          <Box display="flex" flexDirection="column" alignItems="center">
            <FormControl>
              <FormLabel>KM Cost</FormLabel>
              {<TravelCostInput value={value} setValue={setValue} />}
            </FormControl>
            <PDFDownloadLink
              document={
                <MyDocument data={{ cost, origin, destination, distance }} />
              }
              fileName="travel_map.pdf"
            >
              {({ blob, url, loading, error }) => {
                if (error) {
                  alert.error("Error while saving the file.");
                }
                return (
                  <Button colorScheme="pink" type="submit" mt={8}>
                    {loading ? "Loading document" : "Save to PDF"}
                  </Button>
                );
              }}
            </PDFDownloadLink>
          </Box>
        </HStack>
      </Box>
    </Box>
  );
};

export default Map;
