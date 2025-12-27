// src/components/CertificatePDF.tsx
import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
    paddingTop: 10,     // Even more reduced top padding
    paddingBottom: 10,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  container: {
    width: "100%",
    textAlign: "center",
  },
  logo: {
    width: 200,         // Smaller logo to save space
    height: 100,
    marginBottom: 0,
    marginTop : 10,
    alignSelf: "center",
  },
  title: {
    fontSize: 38,
    fontFamily: "Helvetica-Bold",
    color: "#1e293b",
    marginBottom: 10,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 26,
    fontFamily: "Helvetica-Bold",
    color: "#10b981",
    marginBottom: 10,
  },
  body: {
    fontSize: 18,
    fontFamily: "Helvetica",
    lineHeight: 1.4,
    marginBottom: 20,
  },
  name: {
    fontSize: 42,
    fontFamily: "Times-Italic",
    color: "#1e40af",
    marginVertical: 10,
  },
  footer: {
    marginTop: 15,
    fontSize: 14,
    fontFamily: "Helvetica",
    color: "#64748b",
  },
  border: {
    position: "absolute",
    top: 10,
    left: 10,
    right: 10,
    bottom: 10,
    border: "3px double #10b981",
    borderRadius: 5,
  },
});

type Props = {
  event: {
    name: string;
    type: "SELL" | "DONATION";
    date: Date | null;
    ngo: { name: string } | null;
    school: { name: string };
  };
  studentName: string;
};

export default function CertificatePDF({ event, studentName }: Props) {
  const completionDate = event.date
    ? new Date(event.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Date TBD";

  return (
    <Document>
      <Page size="A4" orientation="landscape" style={styles.page}>
        <View style={styles.border} />

        <View style={styles.container}>
          <Image style={styles.logo} src="/logo.jpg" />

          <Text style={styles.title}>Certificate of Participation</Text>
          <Text style={styles.subtitle}>EcoChamp</Text>

          <View style={styles.body}>
            <Text>This certifies that</Text>
            <Text style={styles.name}>{studentName}</Text>
            <Text style={{ marginTop: 15 }}>has successfully participated in</Text>
            <Text style={{ fontSize: 30, marginVertical: 8 }}>{event.name}</Text>
            <Text>organized by</Text>
            <Text style={{ fontSize: 26, marginVertical: 6 }}>{event.school.name}</Text>
            {event.ngo && (
              <Text style={{ marginVertical: 6 }}>
                and contributed scrap for the benefit of <Text style={{ fontWeight: "bold" }}>{event.ngo.name}</Text>
              </Text>
            )}
            <Text style={{ marginTop: 15 }}>
              Completed on {completionDate}
            </Text>
          </View>

          <View style={styles.footer}>
            <Text>Thank you for making a difference!</Text>
            <Text>SocietySalvor EcoChamp Program</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}