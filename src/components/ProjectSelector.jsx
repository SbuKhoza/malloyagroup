"use client"

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
} from "@mui/material"
import { Close as CloseIcon, Launch as LaunchIcon, CheckCircle as CheckCircleIcon } from "@mui/icons-material"
import { collection, getDocs, getFirestore } from "firebase/firestore"
import { app } from "../firebase/config"

const db = getFirestore(app)

function ProjectSelector({ open, onClose, onSelectProject }) {
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
      PaperProps={{
        sx: { borderRadius: 2, maxHeight: "90vh" },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "linear-gradient(135deg, #3a0ca3 0%, #4361ee 100%)",
          color: "white",
        }}
      >
        <Typography variant="h6">Select a Project for Quote Request</Typography>
        <IconButton onClick={handleClose} sx={{ color: "white" }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ pt: 3 }}>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: 200 }}>
            <CircularProgress />
          </Box>
        ) : projects.length === 0 ? (
          <Paper sx={{ p: 4, textAlign: "center" }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No projects available
            </Typography>
            <Typography variant="body2" color="text.secondary">
              You need to add some projects first before you can select them for quote requests.
            </Typography>
          </Paper>
        ) : (
          <>
            <Typography variant="body1" sx={{ mb: 3, color: "text.secondary" }}>
              Choose a project to automatically fill the quote form with project details:
            </Typography>
            <Grid container spacing={2}>
              {projects.map((project) => (
                <Grid item xs={12} sm={6} md={4} key={project.projectId}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      border:
                        selectedProject?.projectId === project.projectId ? "2px solid #4361ee" : "1px solid #e0e0e0",
                      "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                      },
                    }}
                    onClick={() => handleSelectProject(project)}
                  >
                    <Box sx={{ position: "relative" }}>
                      <CardMedia
                        component="img"
                        height="150"
                        image={
                          project.images && project.images.length > 0
                            ? project.images[0].url
                            : "/placeholder.svg?height=150&width=250"
                        }
                        alt={project.name}
                        sx={{ objectFit: "cover" }}
                      />
                      {selectedProject?.projectId === project.projectId && (
                        <Box
                          sx={{
                            position: "absolute",
                            top: 8,
                            right: 8,
                            backgroundColor: "#4361ee",
                            borderRadius: "50%",
                            p: 0.5,
                          }}
                        >
                          <CheckCircleIcon sx={{ color: "white", fontSize: 20 }} />
                        </Box>
                      )}
                    </Box>
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1 }}>
                        <Typography variant="h6" component="h3" sx={{ fontWeight: "bold", fontSize: "1rem" }}>
                          {project.name}
                        </Typography>
                        <Chip label={project.projectId} size="small" color="primary" variant="outlined" />
                      </Box>
                      <Chip label={project.type} size="small" color="secondary" sx={{ mb: 1 }} />
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        {project.description.length > 80
                          ? `${project.description.substring(0, 80)}...`
                          : project.description}
                      </Typography>
                      {project.hostedLink && (
                        <Button
                          size="small"
                          startIcon={<LaunchIcon />}
                          href={project.hostedLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          sx={{ fontSize: "0.75rem" }}
                        >
                          View Live
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={() => onSelectProject && onSelectProject(null)}>Continue Without Project</Button>
        <Button
          variant="contained"
          onClick={handleConfirmSelection}
          disabled={!selectedProject}
          sx={{
            background: "linear-gradient(135deg, #3a0ca3 0%, #4361ee 100%)",
          }}
        >
          Use Selected Project
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ProjectSelector
