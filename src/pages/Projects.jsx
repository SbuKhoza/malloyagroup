"use client"

import { useState, useEffect } from "react"
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  ImageList,
  ImageListItem,
  Skeleton,
  Alert,
} from "@mui/material"
import {
  Close as CloseIcon,
  Launch as LaunchIcon,
  RequestQuote as QuoteIcon,
  Visibility as ViewIcon,
} from "@mui/icons-material"
import { collection, getDocs, query, orderBy } from "firebase/firestore"
import { db } from "../firebase/config" // Adjust import path as needed
import QuoteForm from "../components/QuoteForm" // Adjust import path as needed

function Projects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedProject, setSelectedProject] = useState(null)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [quoteFormOpen, setQuoteFormOpen] = useState(false)
  const [selectedProjectForQuote, setSelectedProjectForQuote] = useState(null)

  // Fetch projects from Firebase
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true)
        const projectsRef = collection(db, "projects")
        const q = query(projectsRef, orderBy("createdAt", "desc"))
        const querySnapshot = await getDocs(q)

        const projectsData = []
        querySnapshot.forEach((doc) => {
          projectsData.push({
            id: doc.id,
            ...doc.data(),
          })
        })

        setProjects(projectsData)
        setError(null)
      } catch (err) {
        console.error("Error fetching projects:", err)
        setError("Failed to load projects. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  const handleViewDetails = (project) => {
    setSelectedProject(project)
    setDetailsOpen(true)
  }

  const handleCloseDetails = () => {
    setDetailsOpen(false)
    setSelectedProject(null)
  }

  const handleRequestQuote = (project) => {
    setSelectedProjectForQuote(project)
    setQuoteFormOpen(true)
  }

  const handleCloseQuoteForm = () => {
    setQuoteFormOpen(false)
    setSelectedProjectForQuote(null)
  }

  const handleViewDemo = (hostedLink) => {
    if (hostedLink) {
      window.open(hostedLink, "_blank", "noopener,noreferrer")
    }
  }

  const formatDate = (timestamp) => {
    if (!timestamp) return "N/A"
    const date = new Date(timestamp)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Our Projects
        </Typography>
        <Grid container spacing={4}>
          {[...Array(6)].map((_, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <Skeleton variant="rectangular" height={200} />
                <CardContent>
                  <Skeleton variant="text" height={32} />
                  <Skeleton variant="text" height={20} />
                  <Skeleton variant="text" height={20} width="60%" />
                </CardContent>
                <CardActions>
                  <Skeleton variant="rectangular" width={80} height={36} />
                  <Skeleton variant="rectangular" width={100} height={36} />
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    )
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 4 }}>
          {error}
        </Alert>
      </Container>
    )
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
        Our Projects
      </Typography>

      <Typography variant="h6" color="text.secondary" align="center" sx={{ mb: 6 }}>
        Explore our portfolio of successful projects and get inspired for your next venture
      </Typography>

      <Grid container spacing={4}>
        {projects.map((project) => (
          <Grid item xs={12} sm={6} md={4} key={project.id}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: 4,
                },
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={
                  project.images && project.images.length > 0
                    ? project.images[0].url
                    : "/placeholder.svg?height=200&width=300"
                }
                alt={project.name}
                sx={{ objectFit: "cover" }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="h2" noWrap>
                  {project.name}
                </Typography>
                <Chip label={project.type} size="small" color="primary" sx={{ mb: 1 }} />
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    mb: 2,
                  }}
                >
                  {project.description}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Created: {formatDate(project.createdAt)}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: "space-between", px: 2, pb: 2 }}>
                <Button size="small" startIcon={<ViewIcon />} onClick={() => handleViewDetails(project)}>
                  View Details
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  startIcon={<QuoteIcon />}
                  onClick={() => handleRequestQuote(project)}
                >
                  Get Quote
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {projects.length === 0 && !loading && (
        <Box textAlign="center" py={8}>
          <Typography variant="h6" color="text.secondary">
            No projects available at the moment.
          </Typography>
        </Box>
      )}

      {/* Project Details Modal */}
      <Dialog
        open={detailsOpen}
        onClose={handleCloseDetails}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: { minHeight: "60vh" },
        }}
      >
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h5">{selectedProject?.name}</Typography>
          <IconButton onClick={handleCloseDetails}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {selectedProject && (
            <Box>
              <Box sx={{ mb: 3 }}>
                <Chip label={selectedProject.type} color="primary" sx={{ mb: 2 }} />
                <Typography variant="body1" paragraph>
                  {selectedProject.description}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Project ID: {selectedProject.projectId}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Created: {formatDate(selectedProject.createdAt)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Last Updated: {formatDate(selectedProject.updatedAt)}
                </Typography>
              </Box>

              {selectedProject.images && selectedProject.images.length > 0 && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Project Images
                  </Typography>
                  <ImageList cols={2} gap={8}>
                    {selectedProject.images.map((image, index) => (
                      <ImageListItem key={index}>
                        <img
                          src={image.url || "/placeholder.svg"}
                          alt={`${selectedProject.name} - Image ${index + 1}`}
                          loading="lazy"
                          style={{ borderRadius: 8 }}
                        />
                      </ImageListItem>
                    ))}
                  </ImageList>
                </Box>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button
            variant="outlined"
            startIcon={<QuoteIcon />}
            onClick={() => {
              handleCloseDetails()
              handleRequestQuote(selectedProject)
            }}
          >
            Request Quote
          </Button>
          {selectedProject?.hostedLink && (
            <Button
              variant="contained"
              startIcon={<LaunchIcon />}
              onClick={() => handleViewDemo(selectedProject.hostedLink)}
            >
              View Demo
            </Button>
          )}
        </DialogActions>
      </Dialog>

      {/* Quote Form Modal */}
      <Dialog open={quoteFormOpen} onClose={handleCloseQuoteForm} maxWidth="md" fullWidth>
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h5">Request Quote</Typography>
          <IconButton onClick={handleCloseQuoteForm}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <QuoteForm selectedProject={selectedProjectForQuote} onClose={handleCloseQuoteForm} />
        </DialogContent>
      </Dialog>
    </Container>
  )
}

export default Projects
