"use client"

import { useState, useEffect } from "react"
import {
  Box,
  Typography,
  Paper,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  IconButton,
  Alert,
  CircularProgress,
} from "@mui/material"
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Launch as LaunchIcon,
  RequestQuote as RequestQuoteIcon,
  Close as CloseIcon,
  CloudUpload as CloudUploadIcon,
} from "@mui/icons-material"
import { collection, getDocs, doc, setDoc, deleteDoc, getFirestore } from "firebase/firestore"
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage"
import { app } from "../../firebase/config" // Adjust path as needed

const db = getFirestore(app)
const storage = getStorage(app)

const projectTypes = [
  "E-commerce Website",
  "Business Website",
  "Portfolio Website",
  "Blog Website",
  "Landing Page",
  "Educational Website",
  "News/Magazine Website",
  "Web Application",
  "Mobile App",
  "Other",
]

function ProjectManager({ onRequestQuote }) {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingProject, setEditingProject] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const [formData, setFormData] = useState({
    name: "",
    type: "",
    description: "",
    hostedLink: "",
    images: [],
  })

  const [selectedImages, setSelectedImages] = useState([])
  const [imagePreviewUrls, setImagePreviewUrls] = useState([])

  useEffect(() => {
    fetchProjects()
  }, [])

  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess("")
        setError("")
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [success, error])

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
      setError("Failed to load projects")
    } finally {
      setLoading(false)
    }
  }

  const generateProjectId = (name) => {
    const letters = name
      .replace(/[^A-Za-z]/g, "")
      .substring(0, 3)
      .toUpperCase()
    const numbers = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0")
    return `${letters}-${numbers}`
  }

  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files)
    if (files.length === 0) return

    // Limit to 5 images
    const limitedFiles = files.slice(0, 5)
    setSelectedImages(limitedFiles)

    // Create preview URLs
    const previewUrls = limitedFiles.map((file) => URL.createObjectURL(file))
    setImagePreviewUrls(previewUrls)
  }

  const uploadImages = async (projectId) => {
    const imageUrls = []

    for (let i = 0; i < selectedImages.length; i++) {
      const file = selectedImages[i]
      const fileName = `${projectId}_${i}_${Date.now()}`
      const imageRef = ref(storage, `projects/${projectId}/${fileName}`)

      try {
        await uploadBytes(imageRef, file)
        const downloadURL = await getDownloadURL(imageRef)
        imageUrls.push({
          url: downloadURL,
          fileName: fileName,
          path: `projects/${projectId}/${fileName}`,
        })
      } catch (err) {
        console.error("Error uploading image:", err)
        throw new Error(`Failed to upload image ${i + 1}`)
      }
    }

    return imageUrls
  }

  const handleSubmit = async () => {
    if (!formData.name || !formData.type || !formData.description) {
      setError("Please fill in all required fields")
      return
    }

    if (selectedImages.length === 0 && !editingProject) {
      setError("Please select at least one image")
      return
    }

    setUploading(true)
    setError("")

    try {
      let projectId
      let imageUrls = []

      if (editingProject) {
        projectId = editingProject.projectId
        imageUrls = editingProject.images || []

        // Upload new images if any selected
        if (selectedImages.length > 0) {
          const newImageUrls = await uploadImages(projectId)
          imageUrls = [...imageUrls, ...newImageUrls]
        }
      } else {
        projectId = generateProjectId(formData.name)
        imageUrls = await uploadImages(projectId)
      }

      const projectData = {
        name: formData.name,
        type: formData.type,
        description: formData.description,
        hostedLink: formData.hostedLink,
        projectId: projectId,
        images: imageUrls,
        createdAt: editingProject ? editingProject.createdAt : new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      const projectRef = doc(db, "projects", projectId)
      await setDoc(projectRef, projectData)

      setSuccess(editingProject ? "Project updated successfully!" : "Project created successfully!")
      setDialogOpen(false)
      resetForm()
      fetchProjects()
    } catch (err) {
      console.error("Error saving project:", err)
      setError(err.message || "Failed to save project")
    } finally {
      setUploading(false)
    }
  }

  const handleEdit = (project) => {
    setEditingProject(project)
    setFormData({
      name: project.name,
      type: project.type,
      description: project.description,
      hostedLink: project.hostedLink || "",
    })
    setSelectedImages([])
    setImagePreviewUrls([])
    setDialogOpen(true)
  }

  const handleDelete = async (project) => {
    if (!window.confirm(`Are you sure you want to delete "${project.name}"?`)) {
      return
    }

    try {
      // Delete images from storage
      if (project.images && project.images.length > 0) {
        for (const image of project.images) {
          try {
            const imageRef = ref(storage, image.path)
            await deleteObject(imageRef)
          } catch (err) {
            console.warn("Failed to delete image:", image.path)
          }
        }
      }

      // Delete project document
      await deleteDoc(doc(db, "projects", project.projectId))

      setSuccess("Project deleted successfully!")
      fetchProjects()
    } catch (err) {
      console.error("Error deleting project:", err)
      setError("Failed to delete project")
    }
  }

  const resetForm = () => {
    setFormData({
      name: "",
      type: "",
      description: "",
      hostedLink: "",
    })
    setSelectedImages([])
    setImagePreviewUrls([])
    setEditingProject(null)
  }

  const handleCloseDialog = () => {
    setDialogOpen(false)
    resetForm()
  }

  const handleRequestQuote = (project) => {
    if (onRequestQuote) {
      onRequestQuote({
        projectName: project.name,
        projectId: project.projectId,
      })
    }
  }

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: 400 }}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Success/Error Alerts */}
      {success && (
        <Alert severity="success" sx={{ mb: 2, position: "fixed", top: 70, right: 20, zIndex: 1000 }}>
          {success}
        </Alert>
      )}
      {error && (
        <Alert severity="error" sx={{ mb: 2, position: "fixed", top: 70, right: 20, zIndex: 1000 }}>
          {error}
        </Alert>
      )}

      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h4" sx={{ color: "#3a0ca3", fontWeight: "bold" }}>
          Project Portfolio
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setDialogOpen(true)}
          sx={{
            background: "linear-gradient(135deg, #3a0ca3 0%, #4361ee 100%)",
            "&:hover": {
              background: "linear-gradient(135deg, #4361ee 0%, #3a0ca3 100%)",
            },
          }}
        >
          Add Project
        </Button>
      </Box>

      {/* Projects Grid */}
      {projects.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: "center" }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No projects yet
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Start building your portfolio by adding your first project
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setDialogOpen(true)}
            sx={{
              background: "linear-gradient(135deg, #3a0ca3 0%, #4361ee 100%)",
            }}
          >
            Add Your First Project
          </Button>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {projects.map((project) => (
            <Grid item xs={12} sm={6} md={4} key={project.projectId}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
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
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1 }}>
                    <Typography variant="h6" component="h2" sx={{ fontWeight: "bold" }}>
                      {project.name}
                    </Typography>
                    <Chip label={project.projectId} size="small" color="primary" variant="outlined" />
                  </Box>
                  <Chip label={project.type} size="small" color="secondary" sx={{ mb: 1 }} />
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {project.description.length > 100
                      ? `${project.description.substring(0, 100)}...`
                      : project.description}
                  </Typography>
                  {project.hostedLink && (
                    <Button
                      size="small"
                      startIcon={<LaunchIcon />}
                      href={project.hostedLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ mb: 1 }}
                    >
                      View Live Site
                    </Button>
                  )}
                </CardContent>
                <CardActions sx={{ justifyContent: "space-between", px: 2, pb: 2 }}>
                  <Box>
                    <IconButton size="small" onClick={() => handleEdit(project)} color="primary">
                      <EditIcon />
                    </IconButton>
                    <IconButton size="small" onClick={() => handleDelete(project)} color="error">
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                  <Button
                    size="small"
                    variant="contained"
                    startIcon={<RequestQuoteIcon />}
                    onClick={() => handleRequestQuote(project)}
                    sx={{
                      background: "linear-gradient(135deg, #3a0ca3 0%, #4361ee 100%)",
                      fontSize: "0.75rem",
                    }}
                  >
                    Request Quote
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Add/Edit Project Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 2 },
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
          <Typography variant="h6">{editingProject ? "Edit Project" : "Add New Project"}</Typography>
          <IconButton onClick={handleCloseDialog} sx={{ color: "white" }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Project Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Project Type</InputLabel>
                <Select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  label="Project Type"
                >
                  {projectTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Hosted Project Link"
                value={formData.hostedLink}
                onChange={(e) => setFormData({ ...formData, hostedLink: e.target.value })}
                placeholder="https://example.com"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Project Images {!editingProject && "*"}
                </Typography>
                <Button variant="outlined" component="label" startIcon={<CloudUploadIcon />} sx={{ mb: 2 }}>
                  {editingProject ? "Add More Images" : "Upload Images"} (Max 5)
                  <input type="file" hidden multiple accept="image/*" onChange={handleImageSelect} />
                </Button>

                {/* Show existing images for editing */}
                {editingProject && editingProject.images && editingProject.images.length > 0 && (
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Current Images:
                    </Typography>
                    <Grid container spacing={1}>
                      {editingProject.images.map((image, index) => (
                        <Grid item xs={6} sm={4} md={3} key={index}>
                          <img
                            src={image.url || "/placeholder.svg"}
                            alt={`Current ${index + 1}`}
                            style={{
                              width: "100%",
                              height: "80px",
                              objectFit: "cover",
                              borderRadius: "4px",
                            }}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                )}

                {/* Show new image previews */}
                {imagePreviewUrls.length > 0 && (
                  <Box>
                    <Typography variant="subtitle2" gutterBottom>
                      {editingProject ? "New Images:" : "Selected Images:"}
                    </Typography>
                    <Grid container spacing={1}>
                      {imagePreviewUrls.map((url, index) => (
                        <Grid item xs={6} sm={4} md={3} key={index}>
                          <img
                            src={url || "/placeholder.svg"}
                            alt={`Preview ${index + 1}`}
                            style={{
                              width: "100%",
                              height: "80px",
                              objectFit: "cover",
                              borderRadius: "4px",
                            }}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                )}
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={uploading}
            sx={{
              background: "linear-gradient(135deg, #3a0ca3 0%, #4361ee 100%)",
            }}
          >
            {uploading ? (
              <CircularProgress size={24} color="inherit" />
            ) : editingProject ? (
              "Update Project"
            ) : (
              "Create Project"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default ProjectManager
