"use client"

import { useState, useEffect } from "react"
import {
  Box,
  Typography,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  CircularProgress,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Grid,
  Tooltip,
  TablePagination,
  InputAdornment,
  Fab,
} from "@mui/material"
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Close as CloseIcon,
  Search as SearchIcon,
  Person as PersonIcon,
  Save as SaveIcon,
} from "@mui/icons-material"
import { collection, getDocs, doc, setDoc, deleteDoc, updateDoc, getFirestore, query, where } from "firebase/firestore"
import { app } from "../../firebase/config" // Adjust path as needed

const db = getFirestore(app)

function Referral() {
  const [referrals, setReferrals] = useState([])
  const [filteredReferrals, setFilteredReferrals] = useState([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [currentReferral, setCurrentReferral] = useState(null)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const [detailDialogOpen, setDetailDialogOpen] = useState(false)
  const [selectedReferrer, setSelectedReferrer] = useState(null)
  const [referrerProjects, setReferrerProjects] = useState([])
  const [referrerStats, setReferrerStats] = useState({})
  const [loadingDetails, setLoadingDetails] = useState(false)
  const [allProjects, setAllProjects] = useState([])

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    phoneNumber: "",
  })

  useEffect(() => {
    fetchReferrals()
    fetchAllProjects()
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

  useEffect(() => {
    // Filter referrals based on search term
    const filtered = referrals.filter(
      (referral) =>
        referral.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        referral.surname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        referral.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        referral.referralCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        referral.phoneNumber.includes(searchTerm),
    )
    setFilteredReferrals(filtered)
    setPage(0) // Reset to first page when searching
  }, [referrals, searchTerm])

  const fetchReferrals = async () => {
    try {
      setLoading(true)
      const referralsCollection = collection(db, "referrals")
      const referralsSnapshot = await getDocs(referralsCollection)
      const referralsList = referralsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))

      // Sort by creation date (newest first)
      referralsList.sort((a, b) => {
        if (!a.createdAt) return 1
        if (!b.createdAt) return -1
        return new Date(b.createdAt) - new Date(a.createdAt)
      })

      setReferrals(referralsList)
    } catch (err) {
      console.error("Error fetching referrals:", err)
      setError("Failed to load referrals")
    } finally {
      setLoading(false)
    }
  }

  const fetchAllProjects = async () => {
    try {
      const projectsCollection = collection(db, "projects")
      const projectsSnapshot = await getDocs(projectsCollection)
      const projectsList = projectsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))

      setAllProjects(projectsList)
    } catch (err) {
      console.error("Error fetching projects:", err)
    }
  }

  const generateReferralCode = (name, existingCodes) => {
    const letters = name
      .replace(/[^A-Za-z]/g, "")
      .substring(0, 3)
      .toUpperCase()
      .padEnd(3, "A")

    let attempts = 0
    const maxAttempts = 1000

    while (attempts < maxAttempts) {
      const numbers = Math.floor(Math.random() * 1000)
        .toString()
        .padStart(3, "0")

      const referralCode = `${letters}-${numbers}`

      if (!existingCodes.includes(referralCode)) {
        return referralCode
      }

      attempts++
    }

    const timestamp = Date.now().toString().slice(-3)
    return `${letters}-${timestamp}`
  }

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError("Name is required")
      return false
    }
    if (!formData.surname.trim()) {
      setError("Surname is required")
      return false
    }
    if (!formData.email.trim()) {
      setError("Email is required")
      return false
    }
    if (!formData.phoneNumber.trim()) {
      setError("Phone number is required")
      return false
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address")
      return false
    }

    return true
  }

  const checkEmailUnique = async (email, excludeId = null) => {
    try {
      const referralsCollection = collection(db, "referrals")
      const q = query(referralsCollection, where("email", "==", email))
      const querySnapshot = await getDocs(q)

      if (excludeId) {
        // When editing, exclude the current referral from uniqueness check
        return querySnapshot.docs.every((doc) => doc.id === excludeId)
      }

      return querySnapshot.empty
    } catch (err) {
      console.error("Error checking email uniqueness:", err)
      throw err
    }
  }

  const handleSubmit = async () => {
    if (!validateForm()) {
      return
    }

    setSaving(true)
    setError("")

    try {
      if (editMode) {
        // Update existing referral
        const isEmailUnique = await checkEmailUnique(formData.email, currentReferral.id)
        if (!isEmailUnique) {
          setError("A referral with this email already exists")
          setSaving(false)
          return
        }

        const referralData = {
          name: formData.name.trim(),
          surname: formData.surname.trim(),
          email: formData.email.trim().toLowerCase(),
          phoneNumber: formData.phoneNumber.trim(),
          updatedAt: new Date().toISOString(),
        }

        const referralRef = doc(db, "referrals", currentReferral.id)
        await updateDoc(referralRef, referralData)

        setSuccess("Referral updated successfully!")
      } else {
        // Create new referral
        const isEmailUnique = await checkEmailUnique(formData.email)
        if (!isEmailUnique) {
          setError("A referral with this email already exists")
          setSaving(false)
          return
        }

        const existingCodes = referrals.map((referral) => referral.referralCode)
        const referralCode = generateReferralCode(formData.name, existingCodes)

        const referralData = {
          name: formData.name.trim(),
          surname: formData.surname.trim(),
          email: formData.email.trim().toLowerCase(),
          phoneNumber: formData.phoneNumber.trim(),
          referralCode: referralCode,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }

        const referralRef = doc(db, "referrals", referralCode)
        await setDoc(referralRef, referralData)

        setSuccess(`Referral created successfully! Code: ${referralCode}`)
      }

      setDialogOpen(false)
      resetForm()
      fetchReferrals()
    } catch (err) {
      console.error("Error saving referral:", err)
      setError("Failed to save referral. Please try again.")
    } finally {
      setSaving(false)
    }
  }

  const handleEdit = (referral) => {
    setCurrentReferral(referral)
    setFormData({
      name: referral.name,
      surname: referral.surname,
      email: referral.email,
      phoneNumber: referral.phoneNumber,
    })
    setEditMode(true)
    setDialogOpen(true)
  }

  const handleDelete = async (referral) => {
    if (!window.confirm(`Are you sure you want to delete referral for "${referral.name} ${referral.surname}"?`)) {
      return
    }

    try {
      await deleteDoc(doc(db, "referrals", referral.id))
      setSuccess("Referral deleted successfully!")
      fetchReferrals()
    } catch (err) {
      console.error("Error deleting referral:", err)
      setError("Failed to delete referral")
    }
  }

  const resetForm = () => {
    setFormData({
      name: "",
      surname: "",
      email: "",
      phoneNumber: "",
    })
    setEditMode(false)
    setCurrentReferral(null)
  }

  const handleCloseDialog = () => {
    setDialogOpen(false)
    resetForm()
    setError("")
  }

  const handleAddNew = () => {
    resetForm()
    setDialogOpen(true)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(Number.parseInt(event.target.value, 10))
    setPage(0)
  }

  const fetchReferrerDetails = async (referrer) => {
    try {
      setLoadingDetails(true)

      // For demonstration purposes, we'll assume projects with projectId starting with the first 3 letters
      // of the referral code were referred by this referrer
      // In a real application, you would have a more explicit relationship in your data model

      // Extract the prefix from the referral code (e.g., "JOH" from "JOH-123")
      const referralPrefix = referrer.referralCode.split("-")[0]

      // Find projects that match this referrer's code pattern
      // This is a simplified approach - in a real app, you'd have an explicit referral field
      const projects = allProjects.filter((project) => {
        // Check if the project has a referralCode field that matches this referrer
        if (project.referralCode === referrer.referralCode) return true

        // Check if the projectId starts with the referrer's code prefix
        if (project.projectId && project.projectId.startsWith(referralPrefix)) return true

        // Check if there's a referredBy field
        if (project.referredBy === referrer.referralCode) return true

        // Check if there's a referrerCode field
        if (project.referrerCode === referrer.referralCode) return true

        return false
      })

      // Sort projects by creation date (newest first)
      projects.sort((a, b) => {
        if (!a.createdAt) return 1
        if (!b.createdAt) return -1
        return new Date(b.createdAt) - new Date(a.createdAt)
      })

      // Calculate statistics
      const totalProjects = projects.length
      const totalValue = projects.reduce((sum, project) => sum + (project.value || 0), 0)
      const activeProjects = projects.filter(
        (project) => project.status === "active" || project.status === "in-progress" || project.status === "ongoing",
      ).length
      const completedProjects = projects.filter((project) => project.status === "completed").length
      const pendingProjects = projects.filter((project) => project.status === "pending").length

      // Group projects by type
      const projectsByType = projects.reduce((acc, project) => {
        const type = project.type || "Other"
        acc[type] = (acc[type] || 0) + 1
        return acc
      }, {})

      // Group projects by status
      const projectsByStatus = projects.reduce((acc, project) => {
        const status = project.status || "unknown"
        acc[status] = (acc[status] || 0) + 1
        return acc
      }, {})

      // Recent activity (projects in last 30 days)
      const thirtyDaysAgo = new Date()
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
      const recentProjects = projects.filter(
        (project) => project.createdAt && new Date(project.createdAt) > thirtyDaysAgo,
      ).length

      // Calculate success rate (completed vs total)
      const successRate = totalProjects > 0 ? (completedProjects / totalProjects) * 100 : 0

      setReferrerProjects(projects)
      setReferrerStats({
        totalProjects,
        totalValue,
        activeProjects,
        completedProjects,
        pendingProjects,
        projectsByType,
        projectsByStatus,
        recentProjects,
        successRate,
        averageProjectValue: totalProjects > 0 ? totalValue / totalProjects : 0,
      })
    } catch (err) {
      console.error("Error fetching referrer details:", err)
      setError("Failed to load referrer details")
    } finally {
      setLoadingDetails(false)
    }
  }

  const handleRowClick = async (referrer) => {
    setSelectedReferrer(referrer)
    setDetailDialogOpen(true)
    await fetchReferrerDetails(referrer)
  }

  const handleCloseDetailDialog = () => {
    setDetailDialogOpen(false)
    setSelectedReferrer(null)
    setReferrerProjects([])
    setReferrerStats({})
  }

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "#4caf50"
      case "active":
      case "in-progress":
        return "#2196f3"
      case "pending":
        return "#ff9800"
      case "cancelled":
        return "#f44336"
      default:
        return "#9e9e9e"
    }
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount || 0)
  }

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: 400 }}>
        <CircularProgress size={60} sx={{ color: "#3a0ca3" }} />
      </Box>
    )
  }

  const paginatedReferrals = filteredReferrals.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

  return (
    <Box sx={{ p: 3, position: "relative" }}>
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
          Referral Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddNew}
          sx={{
            background: "linear-gradient(135deg, #3a0ca3 0%, #4361ee 100%)",
            "&:hover": {
              background: "linear-gradient(135deg, #4361ee 0%, #3a0ca3 100%)",
            },
            borderRadius: 2,
            px: 3,
          }}
        >
          Add Referral
        </Button>
      </Box>

      {/* Search Bar */}
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          placeholder="Search by name, email, phone, or referral code..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "#3a0ca3" }} />
              </InputAdornment>
            ),
          }}
          sx={{
            maxWidth: 500,
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
              "&:hover fieldset": {
                borderColor: "#3a0ca3",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#3a0ca3",
              },
            },
          }}
        />
      </Box>

      {/* Table */}
      {filteredReferrals.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: "center", borderRadius: 2 }}>
          <PersonIcon sx={{ fontSize: 64, color: "text.secondary", mb: 2 }} />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            {searchTerm ? "No referrals found" : "No referrals yet"}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {searchTerm
              ? "Try adjusting your search criteria"
              : "Start building your referral network by adding referrals"}
          </Typography>
          {!searchTerm && (
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAddNew}
              sx={{
                background: "linear-gradient(135deg, #3a0ca3 0%, #4361ee 100%)",
                borderRadius: 2,
              }}
            >
              Add First Referral
            </Button>
          )}
        </Paper>
      ) : (
        <Paper sx={{ borderRadius: 2, overflow: "hidden" }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#f8f9fa" }}>
                  <TableCell sx={{ fontWeight: "bold", color: "#3a0ca3" }}>Name</TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "#3a0ca3" }}>Email</TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "#3a0ca3" }}>Phone</TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "#3a0ca3" }}>Referral Code</TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "#3a0ca3" }}>Created</TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "#3a0ca3", textAlign: "center" }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedReferrals.map((referral, index) => (
                  <TableRow
                    key={referral.id}
                    onClick={() => handleRowClick(referral)}
                    sx={{
                      "&:hover": {
                        backgroundColor: "#e3f2fd",
                        cursor: "pointer",
                        transform: "scale(1.01)",
                        transition: "all 0.2s ease",
                      },
                      backgroundColor: index % 2 === 0 ? "#fafafa" : "white",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Box
                          sx={{
                            width: 40,
                            height: 40,
                            borderRadius: "50%",
                            background: "linear-gradient(135deg, #3a0ca3 0%, #4361ee 100%)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "white",
                            fontWeight: "bold",
                            mr: 2,
                          }}
                        >
                          {referral.name.charAt(0)}
                          {referral.surname.charAt(0)}
                        </Box>
                        <Box>
                          <Typography variant="body1" sx={{ fontWeight: "medium" }}>
                            {referral.name} {referral.surname}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Click to view details
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{referral.email}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{referral.phoneNumber}</Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={referral.referralCode}
                        size="small"
                        sx={{
                          background: "linear-gradient(135deg, #3a0ca3 0%, #4361ee 100%)",
                          color: "white",
                          fontWeight: "bold",
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {new Date(referral.createdAt).toLocaleDateString()}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
                        <Tooltip title="Edit Referral">
                          <IconButton
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleEdit(referral)
                            }}
                            sx={{
                              color: "#3a0ca3",
                              "&:hover": { backgroundColor: "#e3f2fd" },
                            }}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete Referral">
                          <IconButton
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleDelete(referral)
                            }}
                            sx={{
                              color: "#d32f2f",
                              "&:hover": { backgroundColor: "#ffebee" },
                            }}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 50]}
            component="div"
            count={filteredReferrals.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{
              borderTop: "1px solid #e0e0e0",
              "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows": {
                color: "#3a0ca3",
                fontWeight: "medium",
              },
            }}
          />
        </Paper>
      )}

      {/* Floating Action Button for Mobile */}
      <Fab
        color="primary"
        aria-label="add"
        onClick={handleAddNew}
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
          background: "linear-gradient(135deg, #3a0ca3 0%, #4361ee 100%)",
          "&:hover": {
            background: "linear-gradient(135deg, #4361ee 0%, #3a0ca3 100%)",
          },
          display: { xs: "flex", sm: "none" },
        }}
      >
        <AddIcon />
      </Fab>

      {/* Add/Edit Referral Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        maxWidth="sm"
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
          <Typography variant="h6">{editMode ? "Edit Referral" : "Add New Referral"}</Typography>
          <IconButton onClick={handleCloseDialog} sx={{ color: "white" }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": {
                      borderColor: "#3a0ca3",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#3a0ca3",
                    },
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#3a0ca3",
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name"
                value={formData.surname}
                onChange={(e) => setFormData({ ...formData, surname: e.target.value })}
                required
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": {
                      borderColor: "#3a0ca3",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#3a0ca3",
                    },
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#3a0ca3",
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": {
                      borderColor: "#3a0ca3",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#3a0ca3",
                    },
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#3a0ca3",
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Phone Number"
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                required
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": {
                      borderColor: "#3a0ca3",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#3a0ca3",
                    },
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#3a0ca3",
                  },
                }}
              />
            </Grid>
          </Grid>

          {!editMode && (
            <Box sx={{ mt: 2, p: 2, bgcolor: "#f8f9fa", borderRadius: 1 }}>
              <Typography variant="body2" color="text.secondary">
                <strong>Note:</strong> The referral code will be automatically generated using the first 3 letters of
                the first name (in uppercase) followed by 3 random numbers, separated by a hyphen (e.g., JOH-123).
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={handleCloseDialog} sx={{ color: "#666" }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={saving}
            startIcon={saving ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
            sx={{
              background: "linear-gradient(135deg, #3a0ca3 0%, #4361ee 100%)",
              minWidth: 120,
              "&:hover": {
                background: "linear-gradient(135deg, #4361ee 0%, #3a0ca3 100%)",
              },
            }}
          >
            {saving ? "Saving..." : editMode ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Referrer Detail Dialog */}
      <Dialog
        open={detailDialogOpen}
        onClose={handleCloseDetailDialog}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 2, minHeight: "80vh" },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "linear-gradient(135deg, #3a0ca3 0%, #4361ee 100%)",
            color: "white",
            pb: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {selectedReferrer && (
              <Box
                sx={{
                  width: 50,
                  height: 50,
                  borderRadius: "50%",
                  backgroundColor: "rgba(255,255,255,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontWeight: "bold",
                  mr: 2,
                  fontSize: "1.2rem",
                }}
              >
                {selectedReferrer.name.charAt(0)}
                {selectedReferrer.surname.charAt(0)}
              </Box>
            )}
            <Box>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                {selectedReferrer?.name} {selectedReferrer?.surname}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Referrer Details & Activity
              </Typography>
            </Box>
          </Box>
          <IconButton onClick={handleCloseDetailDialog} sx={{ color: "white" }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ p: 0 }}>
          {loadingDetails ? (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: 400 }}>
              <CircularProgress size={60} sx={{ color: "#3a0ca3" }} />
            </Box>
          ) : selectedReferrer ? (
            <Box>
              {/* Referrer Information Section */}
              <Box sx={{ p: 3, borderBottom: "1px solid #e0e0e0" }}>
                <Typography variant="h6" sx={{ color: "#3a0ca3", fontWeight: "bold", mb: 2 }}>
                  Contact Information
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2, backgroundColor: "#f8f9fa", borderRadius: 2 }}>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Full Name
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: "medium" }}>
                        {selectedReferrer.name} {selectedReferrer.surname}
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2, backgroundColor: "#f8f9fa", borderRadius: 2 }}>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Email Address
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: "medium" }}>
                        {selectedReferrer.email}
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2, backgroundColor: "#f8f9fa", borderRadius: 2 }}>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Phone Number
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: "medium" }}>
                        {selectedReferrer.phoneNumber}
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2, backgroundColor: "#f8f9fa", borderRadius: 2 }}>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Referral Code
                      </Typography>
                      <Chip
                        label={selectedReferrer.referralCode}
                        sx={{
                          background: "linear-gradient(135deg, #3a0ca3 0%, #4361ee 100%)",
                          color: "white",
                          fontWeight: "bold",
                        }}
                      />
                    </Paper>
                  </Grid>
                </Grid>
              </Box>

              {/* Statistics Section */}
              <Box sx={{ p: 3, borderBottom: "1px solid #e0e0e0" }}>
                <Typography variant="h6" sx={{ color: "#3a0ca3", fontWeight: "bold", mb: 2 }}>
                  Referral Statistics
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6} md={2.4}>
                    <Paper sx={{ p: 2, textAlign: "center", backgroundColor: "#e3f2fd", borderRadius: 2 }}>
                      <Typography variant="h4" sx={{ color: "#1976d2", fontWeight: "bold" }}>
                        {referrerStats.totalProjects || 0}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Total Projects
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={6} md={2.4}>
                    <Paper sx={{ p: 2, textAlign: "center", backgroundColor: "#e8f5e8", borderRadius: 2 }}>
                      <Typography variant="h4" sx={{ color: "#4caf50", fontWeight: "bold" }}>
                        {referrerStats.activeProjects || 0}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Active Projects
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={6} md={2.4}>
                    <Paper sx={{ p: 2, textAlign: "center", backgroundColor: "#fff3e0", borderRadius: 2 }}>
                      <Typography variant="h4" sx={{ color: "#ff9800", fontWeight: "bold" }}>
                        {referrerStats.recentProjects || 0}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Recent (30 days)
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={6} md={2.4}>
                    <Paper sx={{ p: 2, textAlign: "center", backgroundColor: "#f3e5f5", borderRadius: 2 }}>
                      <Typography variant="h4" sx={{ color: "#9c27b0", fontWeight: "bold" }}>
                        {formatCurrency(referrerStats.totalValue)}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Total Value
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={6} md={2.4}>
                    <Paper sx={{ p: 2, textAlign: "center", backgroundColor: "#e1f5fe", borderRadius: 2 }}>
                      <Typography variant="h4" sx={{ color: "#0277bd", fontWeight: "bold" }}>
                        {referrerStats.successRate ? `${referrerStats.successRate.toFixed(1)}%` : "0%"}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Success Rate
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>
              </Box>

              {/* Project Status Breakdown */}
              {Object.keys(referrerStats.projectsByStatus || {}).length > 0 && (
                <Box sx={{ p: 3, borderTop: "1px solid #e0e0e0" }}>
                  <Typography variant="h6" sx={{ color: "#3a0ca3", fontWeight: "bold", mb: 2 }}>
                    Projects by Status
                  </Typography>
                  <Grid container spacing={2}>
                    {Object.entries(referrerStats.projectsByStatus).map(([status, count]) => (
                      <Grid item xs={6} md={3} key={status}>
                        <Paper
                          sx={{
                            p: 2,
                            textAlign: "center",
                            borderRadius: 2,
                            backgroundColor: `${getStatusColor(status)}15`,
                            border: `2px solid ${getStatusColor(status)}30`,
                          }}
                        >
                          <Typography variant="h5" sx={{ color: getStatusColor(status), fontWeight: "bold" }}>
                            {count}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ textTransform: "capitalize" }}>
                            {status}
                          </Typography>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )}

              {/* Projects Section */}
              <Box sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ color: "#3a0ca3", fontWeight: "bold", mb: 2 }}>
                  Referred Projects ({referrerProjects.length})
                </Typography>

                {referrerProjects.length === 0 ? (
                  <Paper sx={{ p: 4, textAlign: "center", backgroundColor: "#f8f9fa", borderRadius: 2 }}>
                    <Typography variant="body1" color="text.secondary">
                      No projects referred yet
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      Projects with IDs starting with "{selectedReferrer.referralCode.split("-")[0]}" will appear here
                    </Typography>
                  </Paper>
                ) : (
                  <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
                    <Table>
                      <TableHead>
                        <TableRow sx={{ backgroundColor: "#f8f9fa" }}>
                          <TableCell sx={{ fontWeight: "bold", color: "#3a0ca3" }}>Project ID</TableCell>
                          <TableCell sx={{ fontWeight: "bold", color: "#3a0ca3" }}>Project Name</TableCell>
                          <TableCell sx={{ fontWeight: "bold", color: "#3a0ca3" }}>Type</TableCell>
                          <TableCell sx={{ fontWeight: "bold", color: "#3a0ca3" }}>Description</TableCell>
                          <TableCell sx={{ fontWeight: "bold", color: "#3a0ca3" }}>Created</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {referrerProjects.map((project, index) => (
                          <TableRow
                            key={project.id}
                            sx={{
                              backgroundColor: index % 2 === 0 ? "#fafafa" : "white",
                              "&:hover": { backgroundColor: "#f5f5f5" },
                            }}
                          >
                            <TableCell>
                              <Chip
                                label={project.projectId}
                                size="small"
                                sx={{
                                  background: "linear-gradient(135deg, #3a0ca3 0%, #4361ee 100%)",
                                  color: "white",
                                  fontWeight: "bold",
                                }}
                              />
                            </TableCell>
                            <TableCell>
                              <Typography variant="body1" sx={{ fontWeight: "medium" }}>
                                {project.name}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Chip
                                label={project.type || "Other"}
                                size="small"
                                variant="outlined"
                                sx={{ borderColor: "#3a0ca3", color: "#3a0ca3" }}
                              />
                            </TableCell>
                            <TableCell>
                              <Typography variant="body2" color="text.secondary">
                                {project.description
                                  ? project.description.length > 50
                                    ? `${project.description.substring(0, 50)}...`
                                    : project.description
                                  : "No description"}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography variant="body2" color="text.secondary">
                                {project.createdAt ? new Date(project.createdAt).toLocaleDateString() : "N/A"}
                              </Typography>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </Box>

              {/* Project Types Breakdown */}
              {Object.keys(referrerStats.projectsByType || {}).length > 0 && (
                <Box sx={{ p: 3, borderTop: "1px solid #e0e0e0", backgroundColor: "#f8f9fa" }}>
                  <Typography variant="h6" sx={{ color: "#3a0ca3", fontWeight: "bold", mb: 2 }}>
                    Projects by Type
                  </Typography>
                  <Grid container spacing={2}>
                    {Object.entries(referrerStats.projectsByType).map(([type, count]) => (
                      <Grid item xs={6} md={4} key={type}>
                        <Paper sx={{ p: 2, textAlign: "center", borderRadius: 2 }}>
                          <Typography variant="h5" sx={{ color: "#3a0ca3", fontWeight: "bold" }}>
                            {count}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {type}
                          </Typography>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )}
            </Box>
          ) : null}
        </DialogContent>

        <DialogActions sx={{ p: 3, backgroundColor: "#f8f9fa" }}>
          <Button
            onClick={handleCloseDetailDialog}
            variant="contained"
            sx={{
              background: "linear-gradient(135deg, #3a0ca3 0%, #4361ee 100%)",
              "&:hover": {
                background: "linear-gradient(135deg, #4361ee 0%, #3a0ca3 100%)",
              },
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default Referral
