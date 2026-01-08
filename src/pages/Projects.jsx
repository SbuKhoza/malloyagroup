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
  useMediaQuery,
  Fade,
  Stack,
  Slide
} from "@mui/material"
import {
  Close as CloseIcon,
  Launch as LaunchIcon,
  RequestQuote as QuoteIcon,
  Visibility as ViewIcon,
  ArrowForward as ArrowIcon
} from "@mui/icons-material"
import { collection, getDocs, query, orderBy } from "firebase/firestore"
import { db } from "../firebase/config"
import QuoteForm from "../components/QuoteForm"
import { motion } from "framer-motion"

// Format currency helper
const formatPrice = (price) => {
  if (!price) return "R"
  return typeof price === 'number' 
    ? new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR', maximumFractionDigits: 0 }).format(price)
    : price
}

function Projects() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const isTablet = useMediaQuery(theme.breakpoints.down('md'))
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
          const data = doc.data()
          if (!data.price) {
            data.price = "R"
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

  // Loading skeleton
  if (loading) {
    return (
      <Box sx={{ 
        bgcolor: "#f8f9fa", 
        minHeight: "100vh", 
        py: { xs: 4, sm: 6, md: 8 } 
      }}>
        <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
          <Box sx={{ textAlign: "center", mb: { xs: 4, md: 6 } }}>
            <Skeleton 
              variant="text" 
              height={isMobile ? 45 : 60} 
              width={isMobile ? "80%" : "40%"} 
              sx={{ mx: "auto", borderRadius: 2 }} 
            />
            <Skeleton 
              variant="text" 
              height={isMobile ? 24 : 30} 
              width={isMobile ? "95%" : "60%"} 
              sx={{ mx: "auto", mt: 1, borderRadius: 1 }} 
            />
          </Box>
          <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
            {[...Array(isMobile ? 4 : 6)].map((_, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card sx={{ borderRadius: { xs: 3, md: 4 }, overflow: "hidden" }}>
                  <Skeleton variant="rectangular" height={isMobile ? 180 : 240} />
                  <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                    <Skeleton variant="text" height={28} width="70%" />
                    <Skeleton variant="rounded" height={24} width={80} sx={{ my: 1, borderRadius: 1 }} />
                    <Skeleton variant="text" height={18} />
                    <Skeleton variant="text" height={18} width="80%" />
                  </CardContent>
                  <Box sx={{ px: { xs: 2, sm: 3 }, pb: { xs: 2, sm: 3 } }}>
                    <Stack direction="row" spacing={1} justifyContent="space-between">
                      <Skeleton variant="rounded" width={90} height={36} sx={{ borderRadius: 2 }} />
                      <Skeleton variant="rounded" width={100} height={36} sx={{ borderRadius: 2 }} />
                    </Stack>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    )
  }

  // Error state
  if (error) {
    return (
      <Box sx={{ 
        bgcolor: "#f8f9fa", 
        minHeight: "100vh", 
        py: { xs: 4, md: 8 },
        px: 2 
      }}>
        <Container maxWidth="lg">
          <Alert 
            severity="error" 
            sx={{ 
              borderRadius: 3, 
              fontSize: { xs: "0.9rem", sm: "1rem" } 
            }}
          >
            {error}
          </Alert>
        </Container>
      </Box>
    )
  }

  return (
    <Box sx={{ 
      bgcolor: "#f8f9fa", 
      minHeight: "100vh", 
      py: { xs: 4, sm: 6, md: 8 } 
    }}>
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header Section */}
          <Box sx={{ textAlign: "center", mb: { xs: 4, sm: 6, md: 8 } }}>
            <Typography 
              variant="h2" 
              component="h1" 
              sx={{ 
                mb: { xs: 1.5, md: 2 }, 
                fontWeight: 800,
                fontSize: { xs: "1.75rem", sm: "2.25rem", md: "3rem", lg: "3.5rem" },
                background: "linear-gradient(135deg, #3a0ca3 0%, #4361ee 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                lineHeight: 1.2,
                px: { xs: 1, sm: 0 }
              }}
            >
              Our Masterpieces
            </Typography>

            <Typography 
              variant="h5" 
              color="text.secondary" 
              sx={{ 
                maxWidth: 700, 
                mx: "auto", 
                fontWeight: 400,
                fontSize: { xs: "0.95rem", sm: "1.1rem", md: "1.25rem" },
                lineHeight: 1.6,
                px: { xs: 1, sm: 2 }
              }}
            >
              Explore our portfolio of custom-built solutions designed to grow businesses.
            </Typography>
          </Box>
        </motion.div>

        {/* Projects Grid */}
        <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
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
                    borderRadius: { xs: 3, md: 4 },
                    overflow: "hidden",
                    border: "1px solid",
                    borderColor: "rgba(0,0,0,0.06)",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    bgcolor: "#ffffff",
                    "&:hover": {
                      transform: { xs: "none", sm: "translateY(-8px)" },
                      boxShadow: "0 12px 40px rgba(0,0,0,0.12)",
                      "& .project-image": {
                        transform: "scale(1.05)"
                      }
                    },
                    "&:active": {
                      transform: { xs: "scale(0.98)", sm: "translateY(-8px)" }
                    }
                  }}
                >
                  {/* Image Container */}
                  <Box sx={{ 
                    position: "relative", 
                    overflow: "hidden", 
                    height: { xs: 180, sm: 200, md: 240 }
                  }}>
                    <CardMedia
                      component="img"
                      className="project-image"
                      image={
                        project.images && project.images.length > 0
                          ? project.images[0].url
                          : "/placeholder.svg?height=240&width=400"
                      }
                      alt={project.name}
                      sx={{ 
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)" 
                      }}
                    />
                    {/* Price Badge */}
                    <Box 
                      sx={{ 
                        position: "absolute", 
                        top: { xs: 12, md: 16 }, 
                        right: { xs: 12, md: 16 },
                        bgcolor: "rgba(255, 255, 255, 0.95)",
                        backdropFilter: "blur(8px)",
                        px: { xs: 1.5, md: 2 },
                        py: { xs: 0.5, md: 0.75 },
                        borderRadius: "24px",
                        fontWeight: 700,
                        fontSize: { xs: "0.75rem", sm: "0.8rem", md: "0.85rem" },
                        color: "#3a0ca3",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
                      }}
                    >
                      {formatPrice(project.price)}
                    </Box>
                    {/* Gradient Overlay */}
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: "50%",
                        background: "linear-gradient(to top, rgba(0,0,0,0.1), transparent)",
                        pointerEvents: "none"
                      }}
                    />
                  </Box>

                  {/* Content */}
                  <CardContent sx={{ 
                    flexGrow: 1, 
                    p: { xs: 2, sm: 2.5, md: 3 },
                    "&:last-child": { pb: 0 }
                  }}>
                    <Typography 
                      variant="h6" 
                      component="h2" 
                      sx={{ 
                        fontWeight: 700, 
                        lineHeight: 1.3,
                        fontSize: { xs: "1rem", sm: "1.1rem", md: "1.15rem" },
                        mb: 1,
                        color: "#1a1a2e"
                      }}
                    >
                      {project.name}
                    </Typography>
                    
                    <Chip 
                      label={project.type} 
                      size="small" 
                      sx={{ 
                        mb: { xs: 1.5, md: 2 }, 
                        bgcolor: "rgba(67, 97, 238, 0.1)", 
                        color: "#4361ee", 
                        fontWeight: 600,
                        borderRadius: "8px",
                        height: { xs: 24, md: 28 },
                        fontSize: { xs: "0.7rem", md: "0.75rem" }
                      }} 
                    />
                    
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        display: "-webkit-box",
                        WebkitLineClamp: { xs: 2, md: 3 },
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        lineHeight: 1.6,
                        fontSize: { xs: "0.85rem", md: "0.875rem" }
                      }}
                    >
                      {project.description}
                    </Typography>
                  </CardContent>
                  
                  {/* Actions */}
                  <Box sx={{ 
                    px: { xs: 2, sm: 2.5, md: 3 }, 
                    pb: { xs: 2, sm: 2.5, md: 3 }, 
                    pt: { xs: 1.5, md: 2 }
                  }}>
                    <Stack 
                      direction="row" 
                      spacing={1} 
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Button 
                        size={isMobile ? "small" : "medium"}
                        color="inherit"
                        onClick={() => handleViewDetails(project)}
                        sx={{ 
                          textTransform: "none", 
                          fontWeight: 600, 
                          color: "#64748b",
                          fontSize: { xs: "0.8rem", md: "0.875rem" },
                          px: { xs: 1.5, md: 2 },
                          "&:hover": {
                            bgcolor: "rgba(100, 116, 139, 0.08)"
                          }
                        }}
                      >
                        Details
                      </Button>
                      <Button
                        size={isMobile ? "small" : "medium"}
                        variant="contained"
                        onClick={() => handleRequestQuote(project)}
                        endIcon={!isMobile && <ArrowIcon sx={{ fontSize: 18 }} />}
                        sx={{ 
                          bgcolor: "#3a0ca3",
                          borderRadius: { xs: 2, md: 2.5 },
                          textTransform: "none",
                          fontWeight: 600,
                          fontSize: { xs: "0.8rem", md: "0.875rem" },
                          px: { xs: 2, md: 2.5 },
                          py: { xs: 0.75, md: 1 },
                          boxShadow: "0 4px 14px rgba(58, 12, 163, 0.3)",
                          "&:hover": { 
                            bgcolor: "#2e0a82",
                            boxShadow: "0 6px 20px rgba(58, 12, 163, 0.4)"
                          }
                        }}
                      >
                        Get Quote
                      </Button>
                    </Stack>
                  </Box>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Empty State */}
        {projects.length === 0 && !loading && (
          <Box 
            textAlign="center" 
            py={{ xs: 6, md: 10 }}
            px={2}
          >
            <Typography 
              variant="h6" 
              color="text.secondary"
              sx={{ fontSize: { xs: "1rem", md: "1.25rem" } }}
            >
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
          fullScreen={isMobile}
          TransitionComponent={isMobile ? Slide : Fade}
          TransitionProps={isMobile ? { direction: "up" } : {}}
          PaperProps={{
            sx: { 
              borderRadius: isMobile ? 0 : 4, 
              overflow: "hidden",
              m: isMobile ? 0 : 2
            },
          }}
        >
          <DialogTitle 
            sx={{ 
              display: "flex", 
              justifyContent: "space-between", 
              alignItems: "center", 
              p: { xs: 2, sm: 3 },
              borderBottom: "1px solid",
              borderColor: "divider",
              position: isMobile ? "sticky" : "relative",
              top: 0,
              bgcolor: "background.paper",
              zIndex: 1
            }}
          >
            <Typography 
              variant="h5" 
              fontWeight="700"
              sx={{ 
                fontSize: { xs: "1.1rem", sm: "1.35rem", md: "1.5rem" },
                pr: 2,
                lineHeight: 1.3
              }}
            >
              {selectedProject?.name}
            </Typography>
            <IconButton 
              onClick={handleCloseDetails} 
              size={isMobile ? "medium" : "small"}
              sx={{ 
                bgcolor: "#f1f5f9",
                flexShrink: 0,
                "&:hover": { bgcolor: "#e2e8f0" }
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          
          <DialogContent 
            sx={{ 
              p: { xs: 2, sm: 3 },
              overflowY: "auto"
            }}
          >
            {selectedProject && (
              <Box>
                <Grid container spacing={{ xs: 2, md: 3 }} sx={{ mb: { xs: 3, md: 4 } }}>
                  {/* Description - Full width on mobile */}
                  <Grid item xs={12} md={8} order={{ xs: 2, md: 1 }}>
                    <Typography 
                      variant="body1" 
                      paragraph 
                      sx={{ 
                        fontSize: { xs: "0.95rem", md: "1.05rem" }, 
                        lineHeight: 1.7, 
                        color: "#334155",
                        mb: 0
                      }}
                    >
                      {selectedProject.description}
                    </Typography>
                  </Grid>
                  
                  {/* Info Card */}
                  <Grid item xs={12} md={4} order={{ xs: 1, md: 2 }}>
                    <Box 
                      sx={{ 
                        p: { xs: 2, md: 3 }, 
                        bgcolor: "#f8fafc", 
                        borderRadius: 3,
                        border: "1px solid",
                        borderColor: "rgba(0,0,0,0.04)"
                      }}
                    >
                      <Stack 
                        direction={{ xs: "row", md: "column" }} 
                        spacing={{ xs: 0, md: 2 }}
                        justifyContent={{ xs: "space-between", md: "flex-start" }}
                        flexWrap="wrap"
                      >
                        <Box sx={{ minWidth: { xs: "auto", sm: "30%" }, mb: { xs: 1.5, md: 0 } }}>
                          <Typography 
                            variant="subtitle2" 
                            color="text.secondary" 
                            gutterBottom
                            sx={{ fontSize: { xs: "0.7rem", md: "0.75rem" }, textTransform: "uppercase", letterSpacing: 0.5 }}
                          >
                            Project Type
                          </Typography>
                          <Typography 
                            variant="body1" 
                            fontWeight="600"
                            sx={{ fontSize: { xs: "0.9rem", md: "1rem" } }}
                          >
                            {selectedProject.type}
                          </Typography>
                        </Box>
                        
                        <Box sx={{ minWidth: { xs: "auto", sm: "30%" }, mb: { xs: 1.5, md: 0 } }}>
                          <Typography 
                            variant="subtitle2" 
                            color="text.secondary" 
                            gutterBottom
                            sx={{ fontSize: { xs: "0.7rem", md: "0.75rem" }, textTransform: "uppercase", letterSpacing: 0.5 }}
                          >
                            Price Range
                          </Typography>
                          <Typography 
                            variant="body1" 
                            fontWeight="600" 
                            sx={{ color: "#3a0ca3", fontSize: { xs: "0.9rem", md: "1rem" } }}
                          >
                            {formatPrice(selectedProject.price)}
                          </Typography>
                        </Box>

                        <Box sx={{ minWidth: { xs: "auto", sm: "30%" } }}>
                          <Typography 
                            variant="subtitle2" 
                            color="text.secondary" 
                            gutterBottom
                            sx={{ fontSize: { xs: "0.7rem", md: "0.75rem" }, textTransform: "uppercase", letterSpacing: 0.5 }}
                          >
                            Launched
                          </Typography>
                          <Typography 
                            variant="body1" 
                            fontWeight="600"
                            sx={{ fontSize: { xs: "0.9rem", md: "1rem" } }}
                          >
                            {formatDate(selectedProject.createdAt)}
                          </Typography>
                        </Box>
                      </Stack>
                    </Box>
                  </Grid>
                </Grid>

                {/* Gallery */}
                {selectedProject.images && selectedProject.images.length > 0 && (
                  <Box>
                    <Typography 
                      variant="h6" 
                      gutterBottom 
                      fontWeight="700"
                      sx={{ fontSize: { xs: "1rem", md: "1.15rem" }, mb: 2 }}
                    >
                      Gallery
                    </Typography>
                    <ImageList 
                      cols={isMobile ? 1 : 2} 
                      gap={isMobile ? 12 : 16} 
                      rowHeight={isMobile ? 220 : 300}
                    >
                      {selectedProject.images.map((image, index) => (
                        <ImageListItem 
                          key={index} 
                          sx={{ 
                            borderRadius: { xs: 2, md: 3 }, 
                            overflow: "hidden",
                            boxShadow: "0 2px 12px rgba(0,0,0,0.08)"
                          }}
                        >
                          <img
                            src={image.url || "/placeholder.svg"}
                            alt={`${selectedProject.name} - Image ${index + 1}`}
                            loading="lazy"
                            style={{ 
                              width: "100%", 
                              height: "100%", 
                              objectFit: "cover" 
                            }}
                          />
                        </ImageListItem>
                      ))}
                    </ImageList>
                  </Box>
                )}
              </Box>
            )}
          </DialogContent>
          
          <DialogActions 
            sx={{ 
              p: { xs: 2, sm: 3 }, 
              bgcolor: "#f8f9fa",
              borderTop: "1px solid",
              borderColor: "divider",
              flexDirection: { xs: "column", sm: "row" },
              gap: { xs: 1, sm: 1 },
              position: isMobile ? "sticky" : "relative",
              bottom: 0
            }}
          >
            <Button
              variant="outlined"
              startIcon={<QuoteIcon />}
              onClick={() => {
                handleCloseDetails()
                handleRequestQuote(selectedProject)
              }}
              fullWidth={isMobile}
              size={isMobile ? "medium" : "large"}
              sx={{ 
                borderRadius: 2, 
                textTransform: "none",
                fontWeight: 600,
                borderColor: "#3a0ca3",
                color: "#3a0ca3",
                order: { xs: 2, sm: 1 },
                "&:hover": {
                  borderColor: "#2e0a82",
                  bgcolor: "rgba(58, 12, 163, 0.04)"
                }
              }}
            >
              Request Custom Quote
            </Button>
            {selectedProject?.hostedLink && (
              <Button
                variant="contained"
                startIcon={<LaunchIcon />}
                onClick={() => handleViewDemo(selectedProject.hostedLink)}
                fullWidth={isMobile}
                size={isMobile ? "medium" : "large"}
                sx={{ 
                  borderRadius: 2, 
                  textTransform: "none", 
                  fontWeight: 600,
                  bgcolor: "#4361ee",
                  order: { xs: 1, sm: 2 },
                  boxShadow: "0 4px 14px rgba(67, 97, 238, 0.3)",
                  "&:hover": { 
                    bgcolor: "#3a0ca3",
                    boxShadow: "0 6px 20px rgba(58, 12, 163, 0.4)"
                  }
                }}
              >
                Visit Live Site
              </Button>
            )}
          </DialogActions>
        </Dialog>

        {/* Quote Form Modal */}
        <Dialog 
          open={quoteFormOpen} 
          onClose={handleCloseQuoteForm} 
          maxWidth="sm" 
          fullWidth
          fullScreen={isMobile}
          TransitionComponent={isMobile ? Slide : Fade}
          TransitionProps={isMobile ? { direction: "up" } : {}}
          PaperProps={{ 
            sx: { 
              borderRadius: isMobile ? 0 : 4,
              m: isMobile ? 0 : 2
            } 
          }}
        >
          <DialogTitle 
            sx={{ 
              display: "flex", 
              justifyContent: "space-between", 
              alignItems: "center", 
              p: { xs: 2, sm: 3 },
              borderBottom: "1px solid",
              borderColor: "divider",
              background: "linear-gradient(135deg, #3a0ca3 0%, #4361ee 100%)",
              color: "white"
            }}
          >
            <Typography 
              variant="h5" 
              fontWeight="700"
              sx={{ fontSize: { xs: "1.1rem", sm: "1.35rem" } }}
            >
              Start Your Project
            </Typography>
            <IconButton 
              onClick={handleCloseQuoteForm}
              sx={{ color: "white" }}
            >
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
