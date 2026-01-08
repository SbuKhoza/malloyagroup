import { useState, useEffect } from "react"
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  CircularProgress,
  Stack,
  useTheme,
  useMediaQuery,
  Slide,
  Fade
} from "@mui/material"
import { 
  Close as CloseIcon, 
  Launch as LaunchIcon, 
  CheckCircle as CheckCircleIcon 
} from "@mui/icons-material"
import { collection, getDocs, getFirestore } from "firebase/firestore"
import { app } from "../firebase/config"

const db = getFirestore(app)

function ProjectSelector({ open, onClose, onSelectProject }) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const isTablet = useMediaQuery(theme.breakpoints.down('md'))
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedProject, setSelectedProject] = useState(null)

  useEffect(() => {
    if (open) {
      fetchProjects()
    }
  }, [open])

  const fetchProjects = async () => {
    try {
      const projectsCollection = collection(db, "projects")
      const projectsSnapshot = await getDocs(projectsCollection)
      const projectsList = projectsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))

      // Sort by creation date (newest first)
      projectsList.sort((a, b) => {
        if (!a.createdAt) return 1
        if (!b.createdAt) return -1
        return new Date(b.createdAt) - new Date(a.createdAt)
      })

      setProjects(projectsList)
    } catch (err) {
      console.error("Error fetching projects:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleSelectProject = (project) => {
    setSelectedProject(project)
  }

  const handleConfirmSelection = () => {
    if (selectedProject && onSelectProject) {
      onSelectProject({
        projectName: selectedProject.name,
        projectId: selectedProject.projectId,
      })
    }
    onClose()
    setSelectedProject(null)
  }

  const handleClose = () => {
    onClose()
    setSelectedProject(null)
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="lg"
      fullWidth
      fullScreen={isMobile}
      TransitionComponent={isMobile ? Slide : Fade}
      TransitionProps={isMobile ? { direction: "up" } : {}}
      PaperProps={{
        sx: { 
          borderRadius: isMobile ? 0 : 4, 
          maxHeight: isMobile ? "100vh" : "90vh",
          m: isMobile ? 0 : 2
        },
      }}
    >
      {/* Header */}
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "linear-gradient(135deg, #3a0ca3 0%, #4361ee 100%)",
          color: "white",
          p: { xs: 2, sm: 3 },
          position: isMobile ? "sticky" : "relative",
          top: 0,
          zIndex: 1
        }}
      >
        <Typography 
          variant="h6"
          sx={{ 
            fontSize: { xs: "1rem", sm: "1.1rem", md: "1.25rem" },
            fontWeight: 700,
            pr: 2,
            lineHeight: 1.3
          }}
        >
          Select a Project for Quote Request
        </Typography>
        <IconButton 
          onClick={handleClose} 
          sx={{ 
            color: "white",
            bgcolor: "rgba(255,255,255,0.1)",
            "&:hover": { bgcolor: "rgba(255,255,255,0.2)" }
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      {/* Content */}
      <DialogContent sx={{ p: { xs: 2, sm: 3 } }}>
        {loading ? (
          <Box 
            sx={{ 
              display: "flex", 
              flexDirection: "column",
              justifyContent: "center", 
              alignItems: "center", 
              height: { xs: 150, md: 200 },
              gap: 2
            }}
          >
            <CircularProgress sx={{ color: "#4361ee" }} />
            <Typography variant="body2" color="text.secondary">
              Loading projects...
            </Typography>
          </Box>
        ) : projects.length === 0 ? (
          <Paper 
            sx={{ 
              p: { xs: 3, md: 4 }, 
              textAlign: "center",
              borderRadius: 3,
              bgcolor: "#f8fafc"
            }}
          >
            <Typography 
              variant="h6" 
              color="text.secondary" 
              gutterBottom
              sx={{ fontSize: { xs: "1rem", md: "1.15rem" } }}
            >
              No projects available
            </Typography>
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{ fontSize: { xs: "0.85rem", md: "0.875rem" } }}
            >
              You need to add some projects first before you can select them for quote requests.
            </Typography>
          </Paper>
        ) : (
          <>
            <Typography 
              variant="body1" 
              sx={{ 
                mb: { xs: 2, md: 3 }, 
                color: "text.secondary",
                fontSize: { xs: "0.9rem", md: "1rem" }
              }}
            >
              Choose a project to automatically fill the quote form with project details:
            </Typography>
            
            <Grid container spacing={{ xs: 1.5, sm: 2 }}>
              {projects.map((project) => {
                const isSelected = selectedProject?.projectId === project.projectId
                
                return (
                  <Grid item xs={12} sm={6} md={4} key={project.projectId}>
                    <Card
                      onClick={() => handleSelectProject(project)}
                      sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: { xs: "row", sm: "column" },
                        cursor: "pointer",
                        transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                        border: isSelected ? "2px solid #4361ee" : "1px solid",
                        borderColor: isSelected ? "#4361ee" : "rgba(0,0,0,0.08)",
                        borderRadius: { xs: 2, md: 3 },
                        overflow: "hidden",
                        bgcolor: isSelected ? "rgba(67, 97, 238, 0.04)" : "#ffffff",
                        boxShadow: isSelected 
                          ? "0 4px 20px rgba(67, 97, 238, 0.2)" 
                          : "0 2px 8px rgba(0,0,0,0.04)",
                        "&:hover": {
                          transform: { xs: "none", sm: "translateY(-4px)" },
                          boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
                          borderColor: isSelected ? "#4361ee" : "#4361ee"
                        },
                        "&:active": {
                          transform: { xs: "scale(0.98)", sm: "translateY(-4px)" }
                        }
                      }}
                    >
                      {/* Image */}
                      <Box 
                        sx={{ 
                          position: "relative",
                          width: { xs: 100, sm: "100%" },
                          height: { xs: 100, sm: 140, md: 150 },
                          flexShrink: 0
                        }}
                      >
                        <CardMedia
                          component="img"
                          image={
                            project.images && project.images.length > 0
                              ? project.images[0].url
                              : "/placeholder.svg?height=150&width=250"
                          }
                          alt={project.name}
                          sx={{ 
                            width: "100%",
                            height: "100%",
                            objectFit: "cover"
                          }}
                        />
                        {/* Selection Check */}
                        {isSelected && (
                          <Box
                            sx={{
                              position: "absolute",
                              top: { xs: 6, md: 10 },
                              right: { xs: 6, md: 10 },
                              backgroundColor: "#4361ee",
                              borderRadius: "50%",
                              p: 0.5,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              boxShadow: "0 2px 8px rgba(67, 97, 238, 0.4)"
                            }}
                          >
                            <CheckCircleIcon sx={{ color: "white", fontSize: { xs: 16, md: 20 } }} />
                          </Box>
                        )}
                      </Box>

                      {/* Content */}
                      <CardContent 
                        sx={{ 
                          flexGrow: 1, 
                          p: { xs: 1.5, sm: 2 },
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between"
                        }}
                      >
                        <Box>
                          {/* Header with name and ID */}
                          <Stack 
                            direction={{ xs: "column", sm: "row" }}
                            justifyContent="space-between" 
                            alignItems={{ xs: "flex-start", sm: "flex-start" }}
                            spacing={0.5}
                            sx={{ mb: 1 }}
                          >
                            <Typography 
                              variant="h6" 
                              component="h3" 
                              sx={{ 
                                fontWeight: 700, 
                                fontSize: { xs: "0.85rem", sm: "0.9rem", md: "1rem" },
                                lineHeight: 1.3,
                                color: "#1a1a2e"
                              }}
                            >
                              {project.name}
                            </Typography>
                            <Chip 
                              label={project.projectId} 
                              size="small" 
                              color="primary" 
                              variant="outlined"
                              sx={{ 
                                height: { xs: 20, md: 24 },
                                fontSize: { xs: "0.65rem", md: "0.7rem" },
                                display: { xs: "none", sm: "flex" }
                              }}
                            />
                          </Stack>

                          {/* Type Chip */}
                          <Chip 
                            label={project.type} 
                            size="small" 
                            sx={{ 
                              mb: 1,
                              height: { xs: 20, md: 24 },
                              fontSize: { xs: "0.65rem", md: "0.7rem" },
                              bgcolor: "rgba(67, 97, 238, 0.1)",
                              color: "#4361ee",
                              fontWeight: 600
                            }} 
                          />

                          {/* Description - Hidden on mobile in row layout */}
                          <Typography 
                            variant="body2" 
                            color="text.secondary" 
                            sx={{ 
                              mb: 1,
                              display: { xs: "none", sm: "-webkit-box" },
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                              fontSize: { xs: "0.75rem", md: "0.8rem" },
                              lineHeight: 1.5
                            }}
                          >
                            {project.description}
                          </Typography>
                        </Box>

                        {/* View Live Link */}
                        {project.hostedLink && (
                          <Button
                            size="small"
                            startIcon={<LaunchIcon sx={{ fontSize: { xs: 14, md: 16 } }} />}
                            href={project.hostedLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            sx={{ 
                              fontSize: { xs: "0.7rem", md: "0.75rem" },
                              textTransform: "none",
                              p: 0,
                              minWidth: "auto",
                              color: "#4361ee",
                              justifyContent: "flex-start",
                              "&:hover": {
                                bgcolor: "transparent",
                                textDecoration: "underline"
                              }
                            }}
                          >
                            View Live
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  </Grid>
                )
              })}
            </Grid>
          </>
        )}
      </DialogContent>

      {/* Actions */}
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
          onClick={handleClose}
          sx={{ 
            order: { xs: 3, sm: 1 },
            color: "#64748b",
            textTransform: "none",
            fontWeight: 600,
            width: { xs: "100%", sm: "auto" }
          }}
        >
          Cancel
        </Button>
        <Button 
          onClick={() => onSelectProject && onSelectProject(null)}
          variant="outlined"
          fullWidth={isMobile}
          sx={{ 
            order: { xs: 2, sm: 2 },
            textTransform: "none",
            fontWeight: 600,
            borderRadius: 2,
            borderColor: "#cbd5e1",
            color: "#475569",
            "&:hover": {
              borderColor: "#94a3b8",
              bgcolor: "rgba(71, 85, 105, 0.04)"
            }
          }}
        >
          Continue Without Project
        </Button>
        <Button
          variant="contained"
          onClick={handleConfirmSelection}
          disabled={!selectedProject}
          fullWidth={isMobile}
          sx={{
            order: { xs: 1, sm: 3 },
            background: selectedProject 
              ? "linear-gradient(135deg, #3a0ca3 0%, #4361ee 100%)"
              : undefined,
            textTransform: "none",
            fontWeight: 600,
            borderRadius: 2,
            py: { xs: 1.2, sm: 1 },
            boxShadow: selectedProject 
              ? "0 4px 14px rgba(58, 12, 163, 0.3)" 
              : undefined,
            "&:hover": {
              background: "linear-gradient(135deg, #2e0a82 0%, #3a0ca3 100%)",
              boxShadow: "0 6px 20px rgba(58, 12, 163, 0.4)"
            },
            "&.Mui-disabled": {
              bgcolor: "#e2e8f0",
              color: "#94a3b8"
            }
          }}
        >
          Use Selected Project
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ProjectSelector
