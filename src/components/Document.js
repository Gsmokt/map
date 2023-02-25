import { Document, Page, Text, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#E4E4E5",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

const MyDocument = ({ data }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text>{`Route:
                ${data.origin} - ${data.destination}
        `}</Text>
        <Text>{`Distance:
                ${data.distance} km
        `}</Text>
        <Text>{`Travel Cost:
          ${data.cost} $
          `}</Text>
      </Page>
    </Document>
  );
};

export default MyDocument;
