"use client"

import { useState, useEffect } from "react"
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth"
import { getFirestore, collection, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore"
import { app } from "../../firebase/config" // Adjust path as needed
import LoginAdmin from "./LoginAdmin"
import {
  Box,
  Typography,
  Paper,
  Button,
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Tabs,
  Tab,
  Card,
  CardContent,
  Grid,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Menu,
  MenuItem,
} from "@mui/material"
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  ExitToApp as LogoutIcon,
  Refresh as RefreshIcon,
  MoreVert as MoreVertIcon,
  Delete as DeleteIcon,
  Archive as ArchiveIcon,
  Reply as ReplyIcon,
  CheckCircle as CheckCircleIcon,
  Email as EmailIcon,
} from "@mui/icons-material"

function AdminDashboard() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [quotes, setQuotes] = useState([])
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [activeTab, setActiveTab] = useState(0)
  const [selectedQuote, setSelectedQuote] = useState(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [error, setError] = useState(null)
  const [refreshing, setRefreshing] = useState(false)
  const [actionMenuAnchor, setActionMenuAnchor] = useState(null)
  const [currentQuote, setCurrentQuote] = useState(null)
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false)
  const [confirmAction, setConfirmAction] = useState(null)
  const [actionSuccess, setActionSuccess] = useState(null)

  const auth = getAuth(app)
  const db = getFirestore(app)

  // Authentication listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [auth])

  // Fetch quotes when user is authenticated
  useEffect(() => {
    if (user) {
      fetchQuotes()
    }
  }, [user])

  // Clear success message after 3 seconds
  useEffect(() => {
    if (actionSuccess) {
      const timer = setTimeout(() => {
        setActionSuccess(null)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [actionSuccess])

  const fetchQuotes = async () => {
    setRefreshing(true)
    setError(null)
    try {
      const quotesCollection = collection(db, "quotes")
      const quotesSnapshot = await getDocs(quotesCollection)
      const quotesList = quotesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))

      // Sort quotes by timestamp (newest first)
      quotesList.sort((a, b) => {
        if (!a.timestamp) return 1
        if (!b.timestamp) return -1
        return new Date(b.timestamp) - new Date(a.timestamp)
      })

      setQuotes(quotesList)
    } catch (err) {
      console.error("Error fetching quotes:", err)
      setError("Failed to load quotes. Please try again.")
    } finally {
      setRefreshing(false)
    }
  }

  const handleSignOut = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      console.error("Sign out error:", error)
    }
  }

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue)
  }

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen)
  }

  const handleViewQuote = (quote) => {
    setSelectedQuote(quote)
    setDialogOpen(true)
  }

  const handleActionMenuOpen = (event, quote) => {
    event.stopPropagation()
    setActionMenuAnchor(event.currentTarget)
    setCurrentQuote(quote)
  }

  const handleActionMenuClose = () => {
    setActionMenuAnchor(null)
  }

  const openConfirmDialog = (action) => {
    setConfirmAction(action)
    setConfirmDialogOpen(true)
    handleActionMenuClose()
  }

  const handleConfirmAction = async () => {
    if (!currentQuote) return

    try {
      const quoteRef = doc(db, "quotes", currentQuote.id)
      const timestamp = new Date().toISOString()

      if (confirmAction === "archive") {
        await updateDoc(quoteRef, {
          status: "Archived",
          archivedAt: timestamp,
          archivedBy: user.email,
        })
        setActionSuccess("Quote archived successfully")
      } else if (confirmAction === "delete") {
        // For delete, we'll record the deletion info before actually deleting
        // This could be stored in a separate "deletedQuotes" collection if needed
        await updateDoc(quoteRef, {
          status: "Deleted",
          deletedAt: timestamp,
          deletedBy: user.email,
        })
        await deleteDoc(quoteRef)
        setActionSuccess("Quote deleted successfully")
      } else if (confirmAction === "respond") {
        // Open email client
        window.location.href = `mailto:${currentQuote.email}?subject=Re: Your Quote Request`

        // Update status in Firebase
        await updateDoc(quoteRef, {
          status: "In progress",
          respondedAt: timestamp,
          respondedBy: user.email,
        })
        setActionSuccess("Email client opened")
      } else if (confirmAction === "responded") {
        await updateDoc(quoteRef, {
          status: "Complete",
          completedAt: timestamp,
          completedBy: user.email,
        })
        setActionSuccess("Quote marked as responded")
      }

      // Refresh quotes
      fetchQuotes()
    } catch (err) {
      console.error(`Error performing ${confirmAction} action:`, err)
      setError(`Failed to ${confirmAction} quote. Please try again.`)
    } finally {
      setConfirmDialogOpen(false)
      setConfirmAction(null)
    }
  }

  // Format date to day/month/year
  const formatDate = (dateString) => {
    if (!dateString) return "No date"
    const date = new Date(dateString)
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  // Format time to military format (00h00)
  const formatTime = (dateString) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    const hours = date.getHours().toString().padStart(2, "0")
    const minutes = date.getMinutes().toString().padStart(2, "0")
    return `${hours}h${minutes}`
  }

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "warning"
      case "In progress":
        return "info"
      case "Complete":
        return "success"
      case "Submitted":
        return "primary"
      case "Archived":
        return "default"
      default:
        return "default"
    }
  }

  // Filter quotes based on selected tab
  const getFilteredQuotes = () => {
    if (activeTab === 0) return quotes.filter((q) => q.status !== "Archived")
    if (activeTab === 1) return quotes.filter((quote) => quote.services?.website && quote.status !== "Archived")
    if (activeTab === 2) return quotes.filter((quote) => quote.services?.app && quote.status !== "Archived")
    if (activeTab === 3) return quotes.filter((quote) => quote.services?.hosting && quote.status !== "Archived")
    if (activeTab === 4) return quotes.filter((quote) => quote.status === "Archived")
    return quotes
  }

  // Count quotes by service type
  const websiteQuotesCount = quotes.filter((quote) => quote.services?.website && quote.status !== "Archived").length
  const appQuotesCount = quotes.filter((quote) => quote.services?.app && quote.status !== "Archived").length
  const hostingQuotesCount = quotes.filter((quote) => quote.services?.hosting && quote.status !== "Archived").length
  const archivedQuotesCount = quotes.filter((quote) => quote.status === "Archived").length

  // If still loading, show a loading spinner
  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </Box>
    )
  }

  // If not authenticated, show login screen
  if (!user) {
    return <LoginAdmin />
  }

  // Drawer content
  const drawer = (
    <div>
      <Box sx={{ p: 2, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Typography variant="h6" noWrap component="div">
          Admin Dashboard
        </Typography>
      </Box>
      <Divider />
      <List>
        <ListItem button selected={true}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button onClick={handleSignOut}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Sign Out" />
        </ListItem>
      </List>
    </div>
  )

  // Quote details dialog
  const QuoteDetailsDialog = () => {
    if (!selectedQuote) return null

    return (
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            Quote Details
            <Typography variant="subtitle2" color="text.secondary">
              {selectedQuote.timestamp
                ? `${formatDate(selectedQuote.timestamp)} at ${formatTime(selectedQuote.timestamp)}`
                : "No date"}
            </Typography>
          </div>
          <Chip
            label={selectedQuote.status || "Pending"}
            color={getStatusColor(selectedQuote.status || "Pending")}
            size="small"
          />
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Client Information
              </Typography>
              <Typography>
                <strong>Name:</strong> {selectedQuote.name}
              </Typography>
              <Typography>
                <strong>Email:</strong> {selectedQuote.email}
              </Typography>
              <Typography>
                <strong>Phone:</strong> {selectedQuote.phone}
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Services Requested
              </Typography>
              {selectedQuote.services?.website && <Chip label="Website Development" color="primary" sx={{ m: 0.5 }} />}
              {selectedQuote.services?.app && <Chip label="App Development" color="secondary" sx={{ m: 0.5 }} />}
              {selectedQuote.services?.hosting && <Chip label="Hosting" color="info" sx={{ m: 0.5 }} />}
            </Grid>

            {selectedQuote.services?.website && (
              <Grid item xs={12}>
                <Paper sx={{ p: 2, mt: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    Website Development Details
                  </Typography>
                  <Typography>
                    <strong>Type:</strong> {selectedQuote.websiteType?.new ? "New Website" : "Existing Website Update"}
                  </Typography>

                  {selectedQuote.websiteType?.new ? (
                    <>
                      <Typography>
                        <strong>Website Type:</strong> {selectedQuote.websiteDetails?.type}
                      </Typography>
                      {selectedQuote.websiteDetails?.features?.length > 0 && (
                        <Typography>
                          <strong>Features:</strong> {selectedQuote.websiteDetails.features.join(", ")}
                        </Typography>
                      )}
                    </>
                  ) : (
                    <>
                      <Typography>
                        <strong>Domain:</strong> {selectedQuote.websiteDetails?.domain}
                      </Typography>
                    </>
                  )}

                  {selectedQuote.websiteDetails?.otherFeatures && (
                    <Typography>
                      <strong>Other Features:</strong> {selectedQuote.websiteDetails.otherFeatures}
                    </Typography>
                  )}

                  <Typography>
                    <strong>Budget:</strong> {selectedQuote.websiteDetails?.budget?.currency}{" "}
                    {selectedQuote.websiteDetails?.budget?.amount}
                  </Typography>
                  <Typography>
                    <strong>CMS:</strong> {selectedQuote.websiteDetails?.cms ? "Yes" : "No"}
                  </Typography>
                </Paper>
              </Grid>
            )}

            {selectedQuote.services?.app && (
              <Grid item xs={12}>
                <Paper sx={{ p: 2, mt: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    App Development Details
                  </Typography>
                  <Typography>
                    <strong>App Type:</strong> {selectedQuote.appDetails?.type}
                  </Typography>

                  {selectedQuote.appDetails?.features?.length > 0 && (
                    <Typography>
                      <strong>Features:</strong> {selectedQuote.appDetails.features.join(", ")}
                    </Typography>
                  )}

                  {selectedQuote.appDetails?.otherFeatures && (
                    <Typography>
                      <strong>Other Features:</strong> {selectedQuote.appDetails.otherFeatures}
                    </Typography>
                  )}

                  <Typography>
                    <strong>Budget:</strong> {selectedQuote.appDetails?.budget?.currency}{" "}
                    {selectedQuote.appDetails?.budget?.amount}
                  </Typography>
                </Paper>
              </Grid>
            )}

            {selectedQuote.services?.hosting && (
              <Grid item xs={12}>
                <Paper sx={{ p: 2, mt: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    Hosting Package
                  </Typography>
                  <Typography>
                    <strong>Selected Package:</strong> {selectedQuote.hostingPackage}
                  </Typography>
                </Paper>
              </Grid>
            )}
            <Grid item xs={12}>
              <Paper sx={{ p: 2, mt: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Activity Log
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  <Typography variant="body2">
                    <strong>Created:</strong>{" "}
                    {selectedQuote.timestamp
                      ? `${formatDate(selectedQuote.timestamp)} at ${formatTime(selectedQuote.timestamp)}`
                      : "Unknown"}
                  </Typography>

                  {selectedQuote.respondedAt && (
                    <Typography variant="body2">
                      <strong>Responded:</strong> {formatDate(selectedQuote.respondedAt)} at{" "}
                      {formatTime(selectedQuote.respondedAt)}
                      {selectedQuote.respondedBy && ` by ${selectedQuote.respondedBy}`}
                    </Typography>
                  )}

                  {selectedQuote.completedAt && (
                    <Typography variant="body2">
                      <strong>Marked Complete:</strong> {formatDate(selectedQuote.completedAt)} at{" "}
                      {formatTime(selectedQuote.completedAt)}
                      {selectedQuote.completedBy && ` by ${selectedQuote.completedBy}`}
                    </Typography>
                  )}

                  {selectedQuote.archivedAt && (
                    <Typography variant="body2">
                      <strong>Archived:</strong> {formatDate(selectedQuote.archivedAt)} at{" "}
                      {formatTime(selectedQuote.archivedAt)}
                      {selectedQuote.archivedBy && ` by ${selectedQuote.archivedBy}`}
                    </Typography>
                  )}
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "space-between", p: 2 }}>
          <Box>
            <Button
              onClick={() => {
                setCurrentQuote(selectedQuote)
                openConfirmDialog("respond")
              }}
              startIcon={<EmailIcon />}
              variant="contained"
              color="primary"
              sx={{ mr: 1 }}
            >
              Respond
            </Button>
            <Button
              onClick={() => {
                setCurrentQuote(selectedQuote)
                openConfirmDialog("responded")
              }}
              startIcon={<CheckCircleIcon />}
              variant="outlined"
              color="success"
              sx={{ mr: 1 }}
            >
              Mark Responded
            </Button>
            <Button
              onClick={() => {
                setCurrentQuote(selectedQuote)
                openConfirmDialog("archive")
              }}
              startIcon={<ArchiveIcon />}
              variant="outlined"
              color="warning"
            >
              Archive
            </Button>
          </Box>
          <Box>
            <Button onClick={() => setDialogOpen(false)} color="inherit">
              Close
            </Button>
            <Button
              onClick={() => {
                setCurrentQuote(selectedQuote)
                openConfirmDialog("delete")
              }}
              startIcon={<DeleteIcon />}
              color="error"
              sx={{ ml: 1 }}
            >
              Delete
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    )
  }

  // Confirmation dialog
  const ConfirmationDialog = () => {
    const getActionText = () => {
      switch (confirmAction) {
        case "archive":
          return "archive this quote"
        case "delete":
          return "permanently delete this quote"
        case "respond":
          return "respond to this quote"
        case "responded":
          return "mark this quote as responded"
        default:
          return "perform this action"
      }
    }

    return (
      <Dialog open={confirmDialogOpen} onClose={() => setConfirmDialogOpen(false)}>
        <DialogTitle>Confirm Action</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to {getActionText()}?{confirmAction === "delete" && " This action cannot be undone."}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialogOpen(false)} color="inherit">
            Cancel
          </Button>
          <Button
            onClick={handleConfirmAction}
            color={confirmAction === "delete" ? "error" : "primary"}
            variant="contained"
            autoFocus
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    )
  }

  return (
    <Box sx={{ display: "flex" }}>
      {/* App Bar */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          background: "linear-gradient(135deg, #3a0ca3 0%, #4361ee 100%)",
        }}
      >
        <Toolbar>
          <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Malloya Admin Dashboard
          </Typography>
          <Typography variant="body2" sx={{ mr: 2 }}>
            {user.email}
          </Typography>
          <Button color="inherit" onClick={handleSignOut} startIcon={<LogoutIcon />}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Drawer
        variant="temporary"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile
        }}
        sx={{
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
        }}
      >
        {drawer}
      </Drawer>

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: "100%",
          mt: 8,
          mb: 5, // Add bottom margin
          pb: 5, // Add bottom padding
          backgroundColor: "#f8f9ff",
        }}
      >
        {/* Success Alert */}
        {actionSuccess && (
          <Alert severity="success" sx={{ mb: 2, position: "fixed", top: 70, right: 20, zIndex: 1000 }}>
            {actionSuccess}
          </Alert>
        )}

        {/* Statistics Cards */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={6} sm={6} md={3}>
            <Card
              sx={{
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                borderRadius: "10px",
                transition: "transform 0.3s ease",
                "&:hover": { transform: "translateY(-5px)" },
              }}
            >
              <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
                <Typography color="textSecondary" gutterBottom sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}>
                  Total Quotes
                </Typography>
                <Typography
                  variant="h3"
                  sx={{ color: "#3a0ca3", fontSize: { xs: "1.5rem", sm: "2.5rem", md: "3rem" } }}
                >
                  {quotes.filter((q) => q.status !== "Archived").length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} sm={6} md={3}>
            <Card
              sx={{
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                borderRadius: "10px",
                transition: "transform 0.3s ease",
                "&:hover": { transform: "translateY(-5px)" },
              }}
            >
              <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
                <Typography color="textSecondary" gutterBottom sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}>
                  Website Quotes
                </Typography>
                <Typography
                  variant="h3"
                  sx={{ color: "#4361ee", fontSize: { xs: "1.5rem", sm: "2.5rem", md: "3rem" } }}
                >
                  {websiteQuotesCount}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} sm={6} md={3}>
            <Card
              sx={{
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                borderRadius: "10px",
                transition: "transform 0.3s ease",
                "&:hover": { transform: "translateY(-5px)" },
              }}
            >
              <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
                <Typography color="textSecondary" gutterBottom sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}>
                  App Quotes
                </Typography>
                <Typography
                  variant="h3"
                  sx={{ color: "#4cc9f0", fontSize: { xs: "1.5rem", sm: "2.5rem", md: "3rem" } }}
                >
                  {appQuotesCount}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} sm={6} md={3}>
            <Card
              sx={{
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                borderRadius: "10px",
                transition: "transform 0.3s ease",
                "&:hover": { transform: "translateY(-5px)" },
              }}
            >
              <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
                <Typography color="textSecondary" gutterBottom sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}>
                  Archived Quotes
                </Typography>
                <Typography
                  variant="h3"
                  sx={{ color: "#6c757d", fontSize: { xs: "1.5rem", sm: "2.5rem", md: "3rem" } }}
                >
                  {archivedQuotesCount}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Action Bar */}
        <Paper
          sx={{
            mb: 2,
            p: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderRadius: "10px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          }}
        >
          <Button
            startIcon={<RefreshIcon />}
            onClick={fetchQuotes}
            disabled={refreshing}
            variant="contained"
            sx={{
              background: "linear-gradient(135deg, #3a0ca3 0%, #4361ee 100%)",
              "&:hover": {
                background: "linear-gradient(135deg, #4361ee 0%, #3a0ca3 100%)",
              },
            }}
          >
            {refreshing ? "Refreshing..." : "Refresh Quotes"}
          </Button>
        </Paper>

        {/* Error Alert */}
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {/* Tabs */}
        <Paper
          sx={{
            width: "100%",
            mb: 2,
            borderRadius: "10px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          }}
        >
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              "& .MuiTabs-indicator": {
                backgroundColor: "#3a0ca3",
              },
            }}
          >
            <Tab label="All Quotes" />
            <Tab label={`Website (${websiteQuotesCount})`} />
            <Tab label={`App (${appQuotesCount})`} />
            <Tab label={`Hosting (${hostingQuotesCount})`} />
            <Tab label={`Archived (${archivedQuotesCount})`} />
          </Tabs>
        </Paper>

        {/* Quotes Table */}
        <Paper
          sx={{
            width: "100%",
            overflow: "hidden",
            borderRadius: "10px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          }}
        >
          <TableContainer sx={{ maxHeight: { xs: 350, sm: 440 } }}>
            <Table stickyHeader aria-label="quotes table" size="small">
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{ fontWeight: "bold", backgroundColor: "#f0f2ff", fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                  >
                    Date & Time
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: "bold", backgroundColor: "#f0f2ff", fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                  >
                    Client
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      backgroundColor: "#f0f2ff",
                      fontSize: { xs: "0.75rem", sm: "0.875rem" },
                      display: { xs: "none", sm: "table-cell" },
                    }}
                  >
                    Email
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: "bold", backgroundColor: "#f0f2ff", fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                  >
                    Services
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: "bold", backgroundColor: "#f0f2ff", fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                  >
                    Status
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{ fontWeight: "bold", backgroundColor: "#f0f2ff", fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                  >
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {getFilteredQuotes().length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      No quotes found
                    </TableCell>
                  </TableRow>
                ) : (
                  getFilteredQuotes().map((quote) => (
                    <TableRow
                      key={quote.id}
                      hover
                      onClick={() => handleViewQuote(quote)}
                      sx={{
                        cursor: "pointer",
                        "&:hover": { backgroundColor: "#f8f9ff" },
                      }}
                    >
                      <TableCell sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}>
                        {quote.timestamp ? (
                          <Box>
                            <Typography variant="body2" sx={{ fontSize: { xs: "0.7rem", sm: "0.875rem" } }}>
                              {formatDate(quote.timestamp)}
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                              sx={{ fontSize: { xs: "0.65rem", sm: "0.75rem" } }}
                            >
                              {formatTime(quote.timestamp)}
                            </Typography>
                          </Box>
                        ) : (
                          "No date"
                        )}
                      </TableCell>
                      <TableCell sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}>{quote.name}</TableCell>
                      <TableCell
                        sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" }, display: { xs: "none", sm: "table-cell" } }}
                      >
                        {quote.email}
                      </TableCell>
                      <TableCell sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}>
                        {quote.services?.website && (
                          <Chip
                            size="small"
                            label="Website"
                            color="primary"
                            sx={{
                              mr: 0.5,
                              mb: 0.5,
                              height: { xs: 20, sm: 24 },
                              fontSize: { xs: "0.65rem", sm: "0.75rem" },
                            }}
                          />
                        )}
                        {quote.services?.app && (
                          <Chip
                            size="small"
                            label="App"
                            color="secondary"
                            sx={{
                              mr: 0.5,
                              mb: 0.5,
                              height: { xs: 20, sm: 24 },
                              fontSize: { xs: "0.65rem", sm: "0.75rem" },
                            }}
                          />
                        )}
                        {quote.services?.hosting && (
                          <Chip
                            size="small"
                            label="Hosting"
                            color="info"
                            sx={{
                              mr: 0.5,
                              mb: 0.5,
                              height: { xs: 20, sm: 24 },
                              fontSize: { xs: "0.65rem", sm: "0.75rem" },
                            }}
                          />
                        )}
                      </TableCell>
                      <TableCell sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}>
                        <Chip
                          size="small"
                          label={quote.status || "Pending"}
                          color={getStatusColor(quote.status || "Pending")}
                          sx={{ height: { xs: 20, sm: 24 }, fontSize: { xs: "0.65rem", sm: "0.75rem" } }}
                        />
                      </TableCell>
                      <TableCell align="right" sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}>
                        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                          <Button
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleViewQuote(quote)
                            }}
                            sx={{ mr: 1, fontSize: { xs: "0.7rem", sm: "0.8rem" }, py: { xs: 0.5 }, px: { xs: 1 } }}
                          >
                            View
                          </Button>
                          <IconButton
                            size="small"
                            onClick={(e) => handleActionMenuOpen(e, quote)}
                            aria-label="more actions"
                          >
                            <MoreVertIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        {/* Action Menu */}
        <Menu anchorEl={actionMenuAnchor} open={Boolean(actionMenuAnchor)} onClose={handleActionMenuClose}>
          <MenuItem onClick={() => openConfirmDialog("respond")}>
            <ListItemIcon>
              <ReplyIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Respond</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => openConfirmDialog("responded")}>
            <ListItemIcon>
              <CheckCircleIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Mark as Responded</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => openConfirmDialog("archive")}>
            <ListItemIcon>
              <ArchiveIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Archive</ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem onClick={() => openConfirmDialog("delete")}>
            <ListItemIcon>
              <DeleteIcon fontSize="small" color="error" />
            </ListItemIcon>
            <ListItemText sx={{ color: "error.main" }}>Delete</ListItemText>
          </MenuItem>
        </Menu>

        {/* Quote Details Dialog */}
        {QuoteDetailsDialog()}

        {/* Confirmation Dialog */}
        {ConfirmationDialog()}
      </Box>
    </Box>
  )
}

export default AdminDashboard
