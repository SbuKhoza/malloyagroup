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
  useTheme,
  Fade
} from "@mui/material"
import {
  Close as CloseIcon,
  Launch as LaunchIcon,
  RequestQuote as QuoteIcon,
  Visibility as ViewIcon,
} from "@mui/icons-material"
import { collection, getDocs, query, orderBy } from "firebase/firestore"
import { db } from "../firebase/config" 
import QuoteForm from "../components/QuoteForm" 
import { motion } from "framer-motion"

// Format currency helper
const formatPrice = (price) => {
  if (!price) return "From R4,500"; // Default fallback price
  return typeof price === 'number' 
    ? new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR', maximumFractionDigits: 0 }).format(price)
    : price;
}

function Projects() {
  const theme = useTheme();
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
          const data = doc.data();
          // Add default price if missing, logic as requested
          if (!data.price) {
            data.price = "From R4,500";
          }
          projectsData.push({
            id: doc.id,
            ...data,
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
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ textAlign: "center", mb: 6 }}>
           <Skeleton variant="text" height={60} width="40%" sx={{ mx: "auto" }} />
           <Skeleton variant="text" height={30} width="60%" sx={{ mx: "auto" }} />
        </Box>
        <Grid container spacing={4}>
          {[...Array(6)].map((_, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ borderRadius: 4 }}>
                <Skeleton variant="rectangular" height={240} />
                <CardContent>
                  <Skeleton variant="text" height={32} />
                  <Skeleton variant="text" height={20} />
                  <Skeleton variant="text" height={20} width="60%" />
                </CardContent>
                <CardActions sx={{ p: 2 }}>
                  <Skeleton variant="rectangular" width={100} height={36} sx={{ borderRadius: 2 }} />
                  <Skeleton variant="rectangular" width={100} height={36} sx={{ borderRadius: 2 }} />
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
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Alert severity="error" sx={{ mb: 4, borderRadius: 2 }}>
          {error}
        </Alert>
      </Container>
    )
  }

  return (
    <Box sx={{ bgcolor: "#f8f9fa", minHeight: "100vh", py: 8 }}>
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography 
            variant="h2" 
            component="h1" 
            align="center" 
            sx={{ 
              mb: 2, 
              fontWeight: 800,
              fontSize: { xs: "2.5rem", md: "3.5rem" },
              background: "linear-gradient(135deg, #3a0ca3 0%, #4361ee 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}
          >
            Our Masterpieces
          </Typography>

          <Typography 
            variant="h5" 
            color="text.secondary" 
            align="center" 
            sx={{ mb: 8, maxWidth: 700, mx: "auto", fontWeight: 400 }}
          >
            Explore our portfolio of custom-built solutions designed to grow businesses.
          </Typography>
        </motion.div>

        <Grid container spacing={4}>
          {projects.map((project, index) => (
            <Grid item xs={12} sm={6} md={4} key={project.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: 4,
                    overflow: "hidden",
                    border: "1px solid",
                    borderColor: "divider",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
                      "& .project-image": {
                        transform: "scale(1.05)"
                      }
                    },
                  }}
                >
                  <Box sx={{ position: "relative", overflow: "hidden", height: 240 }}>
                    <CardMedia
                      component="img"
                      height="240"
                      className="project-image"
                      image={
                        project.images && project.images.length > 0
                          ? project.images[0].url
                          : "/placeholder.svg?height=240&width=400"
                      }
                      alt={project.name}
                      sx={{ 
                        objectFit: "cover",
                        transition: "transform 0.5s ease" 
                      }}
                    />
                    <Box 
                      sx={{ 
                        position: "absolute", 
                        top: 16, 
                        right: 16,
                        bgcolor: "rgba(255, 255, 255, 0.9)",
                        backdropFilter: "blur(4px)",
                        px: 1.5,
                        py: 0.5,
                        borderRadius: "20px",
                        fontWeight: 700,
                        fontSize: "0.85rem",
                        color: "#3a0ca3",
                        boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
                      }}
                    >
                      {formatPrice(project.price)}
                    </Box>
                  </Box>

                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1 }}>
                      <Typography gutterBottom variant="h6" component="h2" sx={{ fontWeight: 700, lineHeight: 1.3 }}>
                        {project.name}
                      </Typography>
                    </Box>
                    
                    <Chip 
                      label={project.type} 
                      size="small" 
                      sx={{ 
                        mb: 2, 
                        bgcolor: "rgba(67, 97, 238, 0.1)", 
                        color: "#4361ee", 
                        fontWeight: 600,
                        borderRadius: "6px"
                      }} 
                    />
                    
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        mb: 2,
                        lineHeight: 1.6
                      }}
                    >
                      {project.description}
                    </Typography>
                  </CardContent>
                  
                  <Box sx={{ px: 3, pb: 3, pt: 0 }}>
                    <CardActions sx={{ p: 0, justifyContent: "space-between" }}>
                      <Button 
                        size="medium" 
                        color="inherit"
                        onClick={() => handleViewDetails(project)}
                        sx={{ textTransform: "none", fontWeight: 600, color: "#64748b" }}
                      >
                        Details
                      </Button>
                      <Button
                        size="medium"
                        variant="contained"
                        onClick={() => handleRequestQuote(project)}
                        sx={{ 
                          bgcolor: "#3a0ca3",
                          borderRadius: 2,
                          textTransform: "none",
                          fontWeight: 600,
                          boxShadow: "0 4px 14px rgba(58, 12, 163, 0.3)",
                          "&:hover": { bgcolor: "#2e0a82" }
                        }}
                      >
                        Get Quote
                      </Button>
                    </CardActions>
                  </Box>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {projects.length === 0 && !loading && (
          <Box textAlign="center" py={10}>
            <Typography variant="h6" color="text.secondary">
              No projects to display yet. Check back soon!
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
            sx: { borderRadius: 4, overflow: "hidden" },
          }}
        >
          <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 3 }}>
            <Typography variant="h5" fontWeight="700">{selectedProject?.name}</Typography>
            <IconButton onClick={handleCloseDetails} size="small" sx={{ bgcolor: "#f1f5f9" }}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers sx={{ p: 3 }}>
            {selectedProject && (
              <Box>
                <Grid container spacing={3} sx={{ mb: 4 }}>
                   <Grid item xs={12} md={8}>
                      <Typography variant="body1" paragraph sx={{ fontSize: "1.05rem", lineHeight: 1.7, color: "#334155" }}>
                        {selectedProject.description}
                      </Typography>
                   </Grid>
                   <Grid item xs={12} md={4}>
                      <Box sx={{ p: 3, bgcolor: "#f8fafc", borderRadius: 3 }}>
                        <Typography variant="subtitle2" color="text.secondary" gutterBottom>Project Type</Typography>
                        <Typography variant="body1" fontWeight="600" sx={{ mb: 2 }}>{selectedProject.type}</Typography>
                        
                        <Typography variant="subtitle2" color="text.secondary" gutterBottom>Price Range</Typography>
                        <Typography variant="body1" fontWeight="600" sx={{ color: "#3a0ca3", mb: 2 }}>
                          {formatPrice(selectedProject.price)}
                        </Typography>

                        <Typography variant="subtitle2" color="text.secondary" gutterBottom>Launched</Typography>
                        <Typography variant="body1" fontWeight="600">{formatDate(selectedProject.createdAt)}</Typography>
                      </Box>
                   </Grid>
                </Grid>

                {selectedProject.images && selectedProject.images.length > 0 && (
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" gutterBottom fontWeight="700">
                      Gallery
                    </Typography>
                    <ImageList cols={2} gap={16} rowHeight={300}>
                      {selectedProject.images.map((image, index) => (
                        <ImageListItem key={index} sx={{ borderRadius: 3, overflow: "hidden" }}>
                          <img
                            src={image.url || "/placeholder.svg"}
                            alt={`${selectedProject.name} - Image ${index + 1}`}
                            loading="lazy"
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                          />
                        </ImageListItem>
                      ))}
                    </ImageList>
                  </Box>
                )}
              </Box>
            )}
          </DialogContent>
          <DialogActions sx={{ p: 3, bgcolor: "#f8f9fa" }}>
            <Button
              variant="outlined"
              startIcon={<QuoteIcon />}
              onClick={() => {
                handleCloseDetails()
                handleRequestQuote(selectedProject)
              }}
              size="large"
              sx={{ borderRadius: 2, textTransform: "none", mr: 1 }}
            >
              Request Custom Quote
            </Button>
            {selectedProject?.hostedLink && (
              <Button
                variant="contained"
                startIcon={<LaunchIcon />}
                onClick={() => handleViewDemo(selectedProject.hostedLink)}
                size="large"
                sx={{ 
                  borderRadius: 2, 
                  textTransform: "none", 
                  bgcolor: "#4361ee",
                  "&:hover": { bgcolor: "#3a0ca3" }
                }}
              >
                Visit Live Site
              </Button>
            )}
          </DialogActions>
        </Dialog>

        {/* Quote Form Modal */}
        <Dialog open={quoteFormOpen} onClose={handleCloseQuoteForm} maxWidth="md" fullWidth PaperProps={{ sx: { borderRadius: 4 } }}>
          <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 3 }}>
            <Typography variant="h5" fontWeight="700">Start Your Project</Typography>
            <IconButton onClick={handleCloseQuoteForm}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent sx={{ p: 0 }}>
            <QuoteForm selectedProject={selectedProjectForQuote} onClose={handleCloseQuoteForm} />
          </DialogContent>
        </Dialog>
      </Container>
    </Box>
  )
}

export default Projects