import { Container, Typography, Box } from "@mui/material"
import QuoteForm from "../components/QuoteForm"

// src/pages/Quote.jsx
// This page allows users to request a quote for their project
function Quote() {
  return (
    <Box sx={{ py: 4, bgcolor: "#f5f5f5", minHeight: "100vh" }}>
      <Container>
        <Typography variant="h3" component="h1" align="center" gutterBottom>
          Request a Quote
        </Typography>
        <Typography variant="h6" align="center" color="text.secondary" paragraph>
          Fill out the form below to get a personalized quote for your project
        </Typography>
        <QuoteForm />
      </Container>
    </Box>
  )
}

export default Quote
