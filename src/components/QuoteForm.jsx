import { useState, useEffect } from "react"
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Paper,
  Container,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  Checkbox,
  MenuItem,
  Select,
  InputLabel,
  Divider,
  Alert,
  CircularProgress,
  Chip,
  Grid,
} from "@mui/material"
import { Clear as ClearIcon, Folder as FolderIcon, CheckCircle as CheckCircleIcon } from "@mui/icons-material"
import { collection, doc, setDoc, getFirestore } from "firebase/firestore"
import ProjectSelector from "./ProjectSelector"
import { app } from "../firebase/config"

const db = getFirestore(app)

const steps = ["Personal Information", "Service Selection", "Service Details", "Review & Submit"]

const websiteTypes = [
  "E-commerce Store",
  "Business Website",
  "Blog",
  "Portfolio",
  "Landing Page",
  "Educational Website",
  "News/Magazine",
  "Other",
]

const websiteFeatures = [
  "User Authentication",
  "Payment Integration",
  "Contact Form",
  "Newsletter Subscription",
  "Blog Section",
  "Search Functionality",
  "Social Media Integration",
  "Multi-language Support",
  "SEO Optimization",
  "Analytics Integration",
  "Custom Admin Panel",
]

const appTypes = [
  "E-commerce App",
  "Social Media App",
  "Utility App",
  "Educational App",
  "Health & Fitness App",
  "Entertainment App",
  "Business App",
  "Travel App",
  "Food & Drink App",
  "Other",
]

const appFeatures = [
  "User Authentication",
  "Push Notifications",
  "In-app Purchases",
  "Offline Mode",
  "Social Media Integration",
  "Location Services",
  "Camera Integration",
  "File Upload/Download",
  "Chat/Messaging",
  "Analytics Integration",
  "Custom Admin Panel",
]

const hostingPackages = [
  {
    name: "Starter Plan",
    price: "R49/month",
    description: "1 GB NVMe SSD Storage, 2 Websites, 2 Databases, 5 Email Accounts",
    popular: false,
    features: [
      "cPanel Access",
      "1 GB NVMe SSD Storage",
      "Unlimited Bandwidth",
      "2 Websites",
      "2 Databases",
      "5 Email Accounts",
      "Free SSL Certificate",
      "LiteSpeed Caching",
      "Softaculous (400+ Apps)",
      "JetBackup Weekly Backups",
    ],
  },
  {
    name: "Standard Plan",
    price: "R99/month",
    description: "5 GB NVMe SSD Storage, Up to 4 Websites, 4 Databases, 10 Email Accounts",
    popular: true,
    features: [
      "cPanel Access",
      "5 GB NVMe SSD Storage",
      "Unlimited Bandwidth",
      "Up to 4 Websites",
      "4 Databases",
      "10 Email Accounts",
      "Free SSL Certificate",
      "LiteSpeed Caching",
      "Softaculous (400+ Apps)",
      "JetBackup Weekly Backups",
      "Imunify360 Protection",
    ],
  },
  {
    name: "Business Plan",
    price: "R149/month",
    description: "10 GB NVMe SSD Storage, Up to 10 Websites, 10 Databases, 20 Email Accounts",
    popular: false,
    features: [
      "cPanel Access",
      "10 GB NVMe SSD Storage",
      "Unlimited Bandwidth",
      "Up to 10 Websites",
      "10 Databases",
      "20 Email Accounts",
      "Free SSL Certificate",
      "LiteSpeed Caching",
      "Softaculous (400+ Apps)",
      "JetBackup Weekly Backups",
      "Imunify360 Protection",
      "Premium Site Builder",
    ],
  },
  {
    name: "Pro Plan",
    price: "R199/month",
    description: "20 GB NVMe SSD Storage, Unlimited Websites, 20 Databases, 30 Email Accounts",
    popular: false,
    features: [
      "cPanel Access",
      "20 GB NVMe SSD Storage",
      "Unlimited Bandwidth",
      "Unlimited Websites",
      "20 Databases",
      "30 Email Accounts",
      "Free SSL Certificate",
      "LiteSpeed Caching",
      "Softaculous (400+ Apps)",
      "JetBackup Weekly Backups",
      "Imunify360 Protection",
      "Premium Site Builder",
      "Private Nameservers",
    ],
  },
]

const currencies = [
  { code: "ZAR", label: "South African Rand (ZAR)" },
  { code: "USD", label: "US Dollar (USD)" },
  { code: "GBP", label: "British Pound (GBP)" },
  { code: "EUR", label: "Euro (EUR)" },
  { code: "AUD", label: "Australian Dollar (AUD)" },
]

function QuoteForm({ prefilledProject = null }) {
  const [activeStep, setActiveStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState("")
  const [projectSelectorOpen, setProjectSelectorOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState(prefilledProject)

  const [formData, setFormData] = useState({
    // Personal Information
    name: "",
    email: "",
    phone: "",
    referralCode: "",

    // Project Information
    projectName: prefilledProject?.projectName || "",
    projectId: prefilledProject?.projectId || "",

    // Service Selection
    services: {
      website: false,
      app: false,
      hosting: false,
    },

    // Website Details
    websiteType: {
      new: true,
      existing: false,
    },
    websiteDetails: {
      type: "",
      domain: "",
      features: [],
      otherFeatures: "",
      budget: {
        amount: "",
        currency: "ZAR",
      },
      cms: false,
    },

    // App Details
    appDetails: {
      type: "",
      features: [],
      otherFeatures: "",
      budget: {
        amount: "",
        currency: "ZAR",
      },
    },

    // Hosting Details
    hostingPackage: "",
  })

  useEffect(() => {
    if (prefilledProject) {
      setSelectedProject(prefilledProject)
      setFormData((prev) => ({
        ...prev,
        projectName: prefilledProject.projectName,
        projectId: prefilledProject.projectId,
      }))
    }
  }, [prefilledProject])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleReferralCodeChange = (e) => {
    let value = e.target.value.toUpperCase()

    // Remove any non-alphanumeric characters
    value = value.replace(/[^A-Z0-9]/g, "")

    // Ensure first 3 characters are letters
    if (value.length <= 3) {
      value = value.replace(/[^A-Z]/g, "")
    } else {
      // Ensure characters after position 3 are numbers
      const letters = value.substring(0, 3)
      let numbers = value.substring(3).replace(/[^0-9]/g, "")

      // Limit numbers to 3 digits
      numbers = numbers.substring(0, 3)

      value = letters + (numbers.length > 0 ? "-" + numbers : "")
    }

    // Limit total length to 7 characters (including hyphen)
    if (value.includes("-")) {
      const parts = value.split("-")
      if (parts[1].length > 3) {
        value = parts[0] + "-" + parts[1].substring(0, 3)
      }
    }

    setFormData({
      ...formData,
      referralCode: value,
    })
  }

  const handleNestedInputChange = (category, field, value) => {
    setFormData({
      ...formData,
      [category]: {
        ...formData[category],
        [field]: value,
      },
    })
  }

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target
    const [category, field] = name.split(".")

    setFormData({
      ...formData,
      [category]: {
        ...formData[category],
        [field]: checked,
      },
    })
  }

  const handleArrayChange = (category, field, value) => {
    const currentArray = formData[category][field]
    const newArray = currentArray.includes(value)
      ? currentArray.filter((item) => item !== value)
      : [...currentArray, value]

    handleNestedInputChange(category, field, newArray)
  }

  const handleProjectSelect = (project) => {
    if (project) {
      setSelectedProject(project)
      setFormData((prev) => ({
        ...prev,
        projectName: project.projectName,
        projectId: project.projectId,
      }))
    } else {
      setSelectedProject(null)
      setFormData((prev) => ({
        ...prev,
        projectName: "",
        projectId: "",
      }))
    }
    setProjectSelectorOpen(false)
  }

  const handleClearProject = () => {
    setSelectedProject(null)
    setFormData((prev) => ({
      ...prev,
      projectName: "",
      projectId: "",
    }))
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleSubmit = async () => {
    setLoading(true)
    setSubmitError("")

    try {
      // Create a reference to the quotes collection
      const quotesRef = collection(db, "quotes")

      // Use the user's email as the document ID
      const userDocRef = doc(quotesRef, formData.email)

      // Add the quote data with a timestamp
      await setDoc(
        userDocRef,
        {
          ...formData,
          timestamp: new Date().toISOString(),
        },
        { merge: true },
      ) // Use merge to append to existing document if it exists

      setSubmitSuccess(true)
      setLoading(false)
    } catch (error) {
      console.error("Error submitting quote: ", error)
      setSubmitError("There was an error submitting your quote. Please try again.")
      setLoading(false)
    }
  }

  const validatePersonalInfo = () => {
    return formData.name && formData.email && formData.phone
  }

  const validateServiceSelection = () => {
    return formData.services.website || formData.services.app || formData.services.hosting
  }

  const validateServiceDetails = () => {
    let isValid = true

    if (formData.services.website) {
      if (formData.websiteType.new) {
        isValid = isValid && formData.websiteDetails.type && formData.websiteDetails.budget.amount
      } else if (formData.websiteType.existing) {
        isValid = isValid && formData.websiteDetails.domain && formData.websiteDetails.budget.amount
      }
    }

    if (formData.services.app) {
      isValid = isValid && formData.appDetails.type && formData.appDetails.budget.amount
    }

    if (formData.services.hosting) {
      isValid = isValid && formData.hostingPackage
    }

    return isValid
  }

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: "#1e293b", mb: 3 }}>
              Personal Information
            </Typography>

            {/* Project Selection Section */}
            <Paper
              variant="outlined"
              sx={{
                p: 3,
                mb: 4,
                borderRadius: 1,
                borderColor: selectedProject ? "#0f4c81" : "#e2e8f0",
                backgroundColor: selectedProject ? "#f8fafc" : "white",
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "#1e293b" }}>
                  Project Reference (Optional)
                </Typography>
                <Button
                  variant="outlined"
                  startIcon={<FolderIcon />}
                  onClick={() => setProjectSelectorOpen(true)}
                  sx={{
                    borderColor: "#0f4c81",
                    color: "#0f4c81",
                    "&:hover": {
                      borderColor: "#0c3c64",
                      backgroundColor: "rgba(15, 76, 129, 0.04)",
                    },
                  }}
                >
                  Select Project
                </Button>
              </Box>

              {selectedProject ? (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
                  <Chip
                    label={`${selectedProject.projectName} (${selectedProject.projectId})`}
                    color="primary"
                    onDelete={handleClearProject}
                    deleteIcon={<ClearIcon />}
                    sx={{
                      backgroundColor: "#0f4c81",
                      "& .MuiChip-deleteIcon": { color: "white" },
                    }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    This project will be referenced in your quote
                  </Typography>
                </Box>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  You can select one of your existing projects to reference in this quote request.
                </Typography>
              )}
            </Paper>

            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "&:hover fieldset": { borderColor: "#0f4c81" },
                      "&.Mui-focused fieldset": { borderColor: "#0f4c81" },
                    },
                    "& .MuiInputLabel-root.Mui-focused": { color: "#0f4c81" },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "&:hover fieldset": { borderColor: "#0f4c81" },
                      "&.Mui-focused fieldset": { borderColor: "#0f4c81" },
                    },
                    "& .MuiInputLabel-root.Mui-focused": { color: "#0f4c81" },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Phone Number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "&:hover fieldset": { borderColor: "#0f4c81" },
                      "&.Mui-focused fieldset": { borderColor: "#0f4c81" },
                    },
                    "& .MuiInputLabel-root.Mui-focused": { color: "#0f4c81" },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Referral Code (Optional)"
                  name="referralCode"
                  value={formData.referralCode}
                  onChange={handleReferralCodeChange}
                  placeholder="ABC-123"
                  inputProps={{ maxLength: 7 }}
                  helperText="Format: 3 letters followed by 3 numbers (e.g., ABC-123)"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "&:hover fieldset": { borderColor: "#0f4c81" },
                      "&.Mui-focused fieldset": { borderColor: "#0f4c81" },
                    },
                    "& .MuiInputLabel-root.Mui-focused": { color: "#0f4c81" },
                  }}
                />
              </Grid>
            </Grid>
          </Box>
        )

      case 1:
        return (
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: "#1e293b", mb: 3 }}>
              Which services are you interested in?
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Paper
                  variant="outlined"
                  sx={{
                    p: 3,
                    height: "100%",
                    borderRadius: 1,
                    borderColor: formData.services.website ? "#0f4c81" : "#e2e8f0",
                    borderWidth: formData.services.website ? 2 : 1,
                    backgroundColor: formData.services.website ? "#f8fafc" : "white",
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    handleCheckboxChange({
                      target: { name: "services.website", checked: !formData.services.website },
                    })
                  }
                >
                  <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600, color: "#1e293b" }}>
                    Website Development
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Custom websites, e-commerce stores, and web applications
                  </Typography>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.services.website}
                        onChange={handleCheckboxChange}
                        name="services.website"
                        sx={{ color: "#0f4c81", "&.Mui-checked": { color: "#0f4c81" } }}
                      />
                    }
                    label="Select"
                  />
                </Paper>
              </Grid>

              <Grid item xs={12} md={4}>
                <Paper
                  variant="outlined"
                  sx={{
                    p: 3,
                    height: "100%",
                    borderRadius: 1,
                    borderColor: formData.services.app ? "#0f4c81" : "#e2e8f0",
                    borderWidth: formData.services.app ? 2 : 1,
                    backgroundColor: formData.services.app ? "#f8fafc" : "white",
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    handleCheckboxChange({ target: { name: "services.app", checked: !formData.services.app } })
                  }
                >
                  <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600, color: "#1e293b" }}>
                    App Development
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Mobile apps for iOS and Android platforms
                  </Typography>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.services.app}
                        onChange={handleCheckboxChange}
                        name="services.app"
                        sx={{ color: "#0f4c81", "&.Mui-checked": { color: "#0f4c81" } }}
                      />
                    }
                    label="Select"
                  />
                </Paper>
              </Grid>

              <Grid item xs={12} md={4}>
                <Paper
                  variant="outlined"
                  sx={{
                    p: 3,
                    height: "100%",
                    borderRadius: 1,
                    borderColor: formData.services.hosting ? "#0f4c81" : "#e2e8f0",
                    borderWidth: formData.services.hosting ? 2 : 1,
                    backgroundColor: formData.services.hosting ? "#f8fafc" : "white",
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    handleCheckboxChange({
                      target: { name: "services.hosting", checked: !formData.services.hosting },
                    })
                  }
                >
                  <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600, color: "#1e293b" }}>
                    Hosting Services
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Reliable web hosting with premium features
                  </Typography>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.services.hosting}
                        onChange={handleCheckboxChange}
                        name="services.hosting"
                        sx={{ color: "#0f4c81", "&.Mui-checked": { color: "#0f4c81" } }}
                      />
                    }
                    label="Select"
                  />
                </Paper>
              </Grid>
            </Grid>
          </Box>
        )

      case 2:
        return (
          <Box sx={{ p: 3 }}>
            {formData.services.website && (
              <Paper variant="outlined" sx={{ p: 3, mb: 4, borderRadius: 1 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: "#1e293b", mb: 3 }}>
                  Website Development Details
                </Typography>

                <FormControl component="fieldset" sx={{ mb: 3 }}>
                  <FormLabel component="legend" sx={{ fontWeight: 500, color: "#475569" }}>
                    Website Type
                  </FormLabel>
                  <RadioGroup
                    row
                    value={formData.websiteType.new ? "new" : "existing"}
                    onChange={(e) => {
                      const isNew = e.target.value === "new"
                      setFormData({
                        ...formData,
                        websiteType: {
                          new: isNew,
                          existing: !isNew,
                        },
                      })
                    }}
                    sx={{ mt: 1 }}
                  >
                    <FormControlLabel
                      value="new"
                      control={<Radio sx={{ color: "#0f4c81", "&.Mui-checked": { color: "#0f4c81" } }} />}
                      label="New Website"
                    />
                    <FormControlLabel
                      value="existing"
                      control={<Radio sx={{ color: "#0f4c81", "&.Mui-checked": { color: "#0f4c81" } }} />}
                      label="Update Existing Website"
                    />
                  </RadioGroup>
                </FormControl>

                {formData.websiteType.new ? (
                  <>
                    <FormControl fullWidth sx={{ mb: 3 }}>
                      <InputLabel>Website Type</InputLabel>
                      <Select
                        value={formData.websiteDetails.type}
                        onChange={(e) => handleNestedInputChange("websiteDetails", "type", e.target.value)}
                        sx={{
                          "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#0f4c81" },
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#0f4c81" },
                        }}
                      >
                        {websiteTypes.map((type) => (
                          <MenuItem key={type} value={type}>
                            {type}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 500, color: "#475569", mt: 3 }}>
                      Select Features
                    </Typography>
                    <Grid container spacing={2}>
                      {websiteFeatures.map((feature) => (
                        <Grid item xs={12} sm={6} key={feature}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={formData.websiteDetails.features.includes(feature)}
                                onChange={() => handleArrayChange("websiteDetails", "features", feature)}
                                sx={{ color: "#0f4c81", "&.Mui-checked": { color: "#0f4c81" } }}
                              />
                            }
                            label={feature}
                          />
                        </Grid>
                      ))}
                    </Grid>

                    <TextField
                      fullWidth
                      label="Other Features"
                      multiline
                      rows={3}
                      value={formData.websiteDetails.otherFeatures}
                      onChange={(e) => handleNestedInputChange("websiteDetails", "otherFeatures", e.target.value)}
                      sx={{
                        mt: 3,
                        "& .MuiOutlinedInput-root": {
                          "&:hover fieldset": { borderColor: "#0f4c81" },
                          "&.Mui-focused fieldset": { borderColor: "#0f4c81" },
                        },
                        "& .MuiInputLabel-root.Mui-focused": { color: "#0f4c81" },
                      }}
                    />
                  </>
                ) : (
                  <>
                    <TextField
                      fullWidth
                      label="Existing Website Domain"
                      placeholder="e.g., example.com"
                      value={formData.websiteDetails.domain}
                      onChange={(e) => handleNestedInputChange("websiteDetails", "domain", e.target.value)}
                      sx={{
                        mb: 3,
                        "& .MuiOutlinedInput-root": {
                          "&:hover fieldset": { borderColor: "#0f4c81" },
                          "&.Mui-focused fieldset": { borderColor: "#0f4c81" },
                        },
                        "& .MuiInputLabel-root.Mui-focused": { color: "#0f4c81" },
                      }}
                    />

                    <TextField
                      fullWidth
                      label="Features You Want to Add/Update"
                      multiline
                      rows={4}
                      value={formData.websiteDetails.otherFeatures}
                      onChange={(e) => handleNestedInputChange("websiteDetails", "otherFeatures", e.target.value)}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "&:hover fieldset": { borderColor: "#0f4c81" },
                          "&.Mui-focused fieldset": { borderColor: "#0f4c81" },
                        },
                        "& .MuiInputLabel-root.Mui-focused": { color: "#0f4c81" },
                      }}
                    />
                  </>
                )}

                <Grid container spacing={2} sx={{ mt: 3 }}>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel>Currency</InputLabel>
                      <Select
                        value={formData.websiteDetails.budget.currency}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            websiteDetails: {
                              ...formData.websiteDetails,
                              budget: {
                                ...formData.websiteDetails.budget,
                                currency: e.target.value,
                              },
                            },
                          })
                        }
                        sx={{
                          "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#0f4c81" },
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#0f4c81" },
                        }}
                      >
                        {currencies.map((currency) => (
                          <MenuItem key={currency.code} value={currency.code}>
                            {currency.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Budget Amount"
                      type="number"
                      value={formData.websiteDetails.budget.amount}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          websiteDetails: {
                            ...formData.websiteDetails,
                            budget: {
                              ...formData.websiteDetails.budget,
                              amount: e.target.value,
                            },
                          },
                        })
                      }
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "&:hover fieldset": { borderColor: "#0f4c81" },
                          "&.Mui-focused fieldset": { borderColor: "#0f4c81" },
                        },
                        "& .MuiInputLabel-root.Mui-focused": { color: "#0f4c81" },
                      }}
                    />
                  </Grid>
                </Grid>

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.websiteDetails.cms}
                      onChange={(e) => handleNestedInputChange("websiteDetails", "cms", e.target.checked)}
                      sx={{ color: "#0f4c81", "&.Mui-checked": { color: "#0f4c81" } }}
                    />
                  }
                  label="Include Content Management System (CMS)"
                  sx={{ mt: 2 }}
                />

                <Alert
                  severity="info"
                  sx={{
                    mt: 3,
                    backgroundColor: "#f0f9ff",
                    borderColor: "#0f4c81",
                  }}
                >
                  A Content Management System (CMS) allows you to easily update your website content without technical
                  knowledge. Some website features like blogs, e-commerce, and user accounts may require a CMS even if
                  not explicitly selected.
                </Alert>

                <Divider sx={{ my: 4 }} />
              </Paper>
            )}

            {formData.services.app && (
              <Paper variant="outlined" sx={{ p: 3, mb: 4, borderRadius: 1 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: "#1e293b", mb: 3 }}>
                  App Development Details
                </Typography>

                <FormControl fullWidth sx={{ mb: 3 }}>
                  <InputLabel>App Type</InputLabel>
                  <Select
                    value={formData.appDetails.type}
                    onChange={(e) => handleNestedInputChange("appDetails", "type", e.target.value)}
                    sx={{
                      "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#0f4c81" },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#0f4c81" },
                    }}
                  >
                    {appTypes.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 500, color: "#475569" }}>
                  Select Features
                </Typography>
                <Grid container spacing={2}>
                  {appFeatures.map((feature) => (
                    <Grid item xs={12} sm={6} key={feature}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={formData.appDetails.features.includes(feature)}
                            onChange={() => handleArrayChange("appDetails", "features", feature)}
                            sx={{ color: "#0f4c81", "&.Mui-checked": { color: "#0f4c81" } }}
                          />
                        }
                        label={feature}
                      />
                    </Grid>
                  ))}
                </Grid>

                <TextField
                  fullWidth
                  label="Other Features"
                  multiline
                  rows={3}
                  value={formData.appDetails.otherFeatures}
                  onChange={(e) => handleNestedInputChange("appDetails", "otherFeatures", e.target.value)}
                  sx={{
                    mt: 3,
                    "& .MuiOutlinedInput-root": {
                      "&:hover fieldset": { borderColor: "#0f4c81" },
                      "&.Mui-focused fieldset": { borderColor: "#0f4c81" },
                    },
                    "& .MuiInputLabel-root.Mui-focused": { color: "#0f4c81" },
                  }}
                />

                <Grid container spacing={2} sx={{ mt: 3 }}>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel>Currency</InputLabel>
                      <Select
                        value={formData.appDetails.budget.currency}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            appDetails: {
                              ...formData.appDetails,
                              budget: {
                                ...formData.appDetails.budget,
                                currency: e.target.value,
                              },
                            },
                          })
                        }
                        sx={{
                          "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#0f4c81" },
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#0f4c81" },
                        }}
                      >
                        {currencies.map((currency) => (
                          <MenuItem key={currency.code} value={currency.code}>
                            {currency.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Budget Amount"
                      type="number"
                      value={formData.appDetails.budget.amount}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          appDetails: {
                            ...formData.appDetails,
                            budget: {
                              ...formData.appDetails.budget,
                              amount: e.target.value,
                            },
                          },
                        })
                      }
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "&:hover fieldset": { borderColor: "#0f4c81" },
                          "&.Mui-focused fieldset": { borderColor: "#0f4c81" },
                        },
                        "& .MuiInputLabel-root.Mui-focused": { color: "#0f4c81" },
                      }}
                    />
                  </Grid>
                </Grid>

                <Divider sx={{ my: 4 }} />
              </Paper>
            )}

            {formData.services.hosting && (
              <Paper variant="outlined" sx={{ p: 3, borderRadius: 1 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: "#1e293b", mb: 3 }}>
                  Hosting Package
                </Typography>

                <Grid container spacing={3}>
                  {hostingPackages.map((pkg) => (
                    <Grid item xs={12} md={6} key={pkg.name}>
                      <Paper
                        variant="outlined"
                        sx={{
                          p: 3,
                          borderRadius: 1,
                          borderColor: formData.hostingPackage === pkg.name ? "#0f4c81" : "#e2e8f0",
                          borderWidth: formData.hostingPackage === pkg.name ? 2 : 1,
                          backgroundColor: formData.hostingPackage === pkg.name ? "#f8fafc" : "white",
                          cursor: "pointer",
                          position: "relative",
                        }}
                        onClick={() => setFormData({ ...formData, hostingPackage: pkg.name })}
                      >
                        {pkg.popular && (
                          <Chip
                            label="Most Popular"
                            size="small"
                            sx={{
                              position: "absolute",
                              top: -10,
                              right: 16,
                              backgroundColor: "#0f4c81",
                              color: "white",
                              fontWeight: 600,
                            }}
                          />
                        )}
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
                          <Typography variant="h6" sx={{ fontWeight: 600, color: "#1e293b" }}>
                            {pkg.name}
                          </Typography>
                          <Radio
                            checked={formData.hostingPackage === pkg.name}
                            value={pkg.name}
                            sx={{ color: "#0f4c81", "&.Mui-checked": { color: "#0f4c81" } }}
                          />
                        </Box>
                        <Typography variant="h5" sx={{ fontWeight: 700, color: "#0f4c81", mb: 1 }}>
                          {pkg.price}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                          {pkg.description}
                        </Typography>
                        <Box>
                          {pkg.features.slice(0, 5).map((feature, index) => (
                            <Typography
                              key={index}
                              variant="body2"
                              sx={{ display: "flex", alignItems: "center", mb: 0.5 }}
                            >
                              <CheckCircleIcon sx={{ fontSize: 16, color: "#0f4c81", mr: 1 }} />
                              {feature}
                            </Typography>
                          ))}
                          {pkg.features.length > 5 && (
                            <Typography variant="body2" color="text.secondary">
                              +{pkg.features.length - 5} more features
                            </Typography>
                          )}
                        </Box>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            )}
          </Box>
        )

      case 3:
        return (
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: "#1e293b", mb: 3 }}>
              Review Your Quote Request
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Paper variant="outlined" sx={{ p: 3, borderRadius: 1, height: "100%" }}>
                  <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600, color: "#1e293b" }}>
                    Personal Information
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                    <Typography variant="body2">
                      <strong>Name:</strong> {formData.name}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Email:</strong> {formData.email}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Phone:</strong> {formData.phone}
                    </Typography>
                    {formData.referralCode && (
                      <Typography variant="body2">
                        <strong>Referral Code:</strong> {formData.referralCode}
                      </Typography>
                    )}
                  </Box>
                </Paper>
              </Grid>

              <Grid item xs={12} md={6}>
                <Paper variant="outlined" sx={{ p: 3, borderRadius: 1, height: "100%" }}>
                  <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600, color: "#1e293b" }}>
                    Services Requested
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {Object.entries(formData.services)
                      .filter(([_, selected]) => selected)
                      .map(([service]) => (
                        <Chip
                          key={service}
                          label={service.charAt(0).toUpperCase() + service.slice(1)}
                          sx={{ backgroundColor: "#0f4c81", color: "white" }}
                        />
                      ))}
                  </Box>
                </Paper>
              </Grid>

              {selectedProject && (
                <Grid item xs={12}>
                  <Paper variant="outlined" sx={{ p: 3, borderRadius: 1 }}>
                    <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600, color: "#1e293b" }}>
                      Project Reference
                    </Typography>
                    <Typography variant="body2">
                      <strong>Project:</strong> {selectedProject.projectName}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Project ID:</strong> {selectedProject.projectId}
                    </Typography>
                  </Paper>
                </Grid>
              )}

              {formData.services.website && (
                <Grid item xs={12}>
                  <Paper variant="outlined" sx={{ p: 3, borderRadius: 1 }}>
                    <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600, color: "#1e293b" }}>
                      Website Development Details
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2">
                          <strong>Type:</strong> {formData.websiteType.new ? "New Website" : "Existing Website Update"}
                        </Typography>
                        {formData.websiteType.new ? (
                          <Typography variant="body2">
                            <strong>Website Type:</strong> {formData.websiteDetails.type}
                          </Typography>
                        ) : (
                          <Typography variant="body2">
                            <strong>Domain:</strong> {formData.websiteDetails.domain}
                          </Typography>
                        )}
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2">
                          <strong>Budget:</strong> {formData.websiteDetails.budget.currency}{" "}
                          {formData.websiteDetails.budget.amount}
                        </Typography>
                        <Typography variant="body2">
                          <strong>CMS:</strong> {formData.websiteDetails.cms ? "Yes" : "No"}
                        </Typography>
                      </Grid>
                      {formData.websiteDetails.features.length > 0 && (
                        <Grid item xs={12}>
                          <Typography variant="body2" sx={{ mb: 1 }}>
                            <strong>Features:</strong>
                          </Typography>
                          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                            {formData.websiteDetails.features.map((feature) => (
                              <Chip
                                key={feature}
                                label={feature}
                                size="small"
                                variant="outlined"
                                sx={{ borderColor: "#0f4c81", color: "#0f4c81" }}
                              />
                            ))}
                          </Box>
                        </Grid>
                      )}
                      {formData.websiteDetails.otherFeatures && (
                        <Grid item xs={12}>
                          <Typography variant="body2">
                            <strong>Other Features:</strong> {formData.websiteDetails.otherFeatures}
                          </Typography>
                        </Grid>
                      )}
                    </Grid>
                  </Paper>
                </Grid>
              )}

              {formData.services.app && (
                <Grid item xs={12}>
                  <Paper variant="outlined" sx={{ p: 3, borderRadius: 1 }}>
                    <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600, color: "#1e293b" }}>
                      App Development Details
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2">
                          <strong>App Type:</strong> {formData.appDetails.type}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2">
                          <strong>Budget:</strong> {formData.appDetails.budget.currency}{" "}
                          {formData.appDetails.budget.amount}
                        </Typography>
                      </Grid>
                      {formData.appDetails.features.length > 0 && (
                        <Grid item xs={12}>
                          <Typography variant="body2" sx={{ mb: 1 }}>
                            <strong>Features:</strong>
                          </Typography>
                          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                            {formData.appDetails.features.map((feature) => (
                              <Chip
                                key={feature}
                                label={feature}
                                size="small"
                                variant="outlined"
                                sx={{ borderColor: "#0f4c81", color: "#0f4c81" }}
                              />
                            ))}
                          </Box>
                        </Grid>
                      )}
                      {formData.appDetails.otherFeatures && (
                        <Grid item xs={12}>
                          <Typography variant="body2">
                            <strong>Other Features:</strong> {formData.appDetails.otherFeatures}
                          </Typography>
                        </Grid>
                      )}
                    </Grid>
                  </Paper>
                </Grid>
              )}

              {formData.services.hosting && (
                <Grid item xs={12}>
                  <Paper variant="outlined" sx={{ p: 3, borderRadius: 1 }}>
                    <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600, color: "#1e293b" }}>
                      Hosting Package
                    </Typography>
                    <Typography variant="body2">
                      <strong>Selected Package:</strong> {formData.hostingPackage}
                    </Typography>
                    {hostingPackages
                      .find((pkg) => pkg.name === formData.hostingPackage)
                      ?.features.slice(0, 5)
                      .map((feature, index) => (
                        <Typography key={index} variant="body2" sx={{ ml: 2, display: "flex", alignItems: "center" }}>
                          <CheckCircleIcon sx={{ fontSize: 16, color: "#0f4c81", mr: 1 }} />
                          {feature}
                        </Typography>
                      ))}
                  </Paper>
                </Grid>
              )}
            </Grid>
          </Box>
        )

      default:
        return "Unknown step"
    }
  }

  const isStepValid = (step) => {
    switch (step) {
      case 0:
        return validatePersonalInfo()
      case 1:
        return validateServiceSelection()
      case 2:
        return validateServiceDetails()
      default:
        return true
    }
  }

  if (submitSuccess) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Paper
          sx={{
            p: 4,
            textAlign: "center",
            borderRadius: 1,
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          }}
        >
          <CheckCircleIcon sx={{ fontSize: 64, color: "#0f4c81", mb: 2 }} />
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, color: "#1e293b" }}>
            Thank You!
          </Typography>
          <Typography variant="h6" gutterBottom sx={{ color: "#475569" }}>
            Your quote request has been submitted successfully.
          </Typography>
          <Typography variant="body1" paragraph sx={{ color: "#64748b", mb: 4 }}>
            We'll review your requirements and get back to you shortly at <strong>{formData.email}</strong>.
          </Typography>
          {selectedProject && (
            <Alert
              severity="info"
              sx={{
                mb: 4,
                backgroundColor: "#f0f9ff",
                borderColor: "#0f4c81",
              }}
            >
              Reference Project: {selectedProject.projectName} ({selectedProject.projectId})
            </Alert>
          )}
          <Button
            variant="contained"
            onClick={() => {
              setActiveStep(0)
              setSubmitSuccess(false)
              setSelectedProject(null)
              setFormData({
                name: "",
                email: "",
                phone: "",
                referralCode: "",
                projectName: "",
                projectId: "",
                services: {
                  website: false,
                  app: false,
                  hosting: false,
                },
                websiteType: {
                  new: true,
                  existing: false,
                },
                websiteDetails: {
                  type: "",
                  domain: "",
                  features: [],
                  otherFeatures: "",
                  budget: {
                    amount: "",
                    currency: "ZAR",
                  },
                  cms: false,
                },
                appDetails: {
                  type: "",
                  features: [],
                  otherFeatures: "",
                  budget: {
                    amount: "",
                    currency: "ZAR",
                  },
                },
                hostingPackage: "",
              })
            }}
            sx={{
              backgroundColor: "#0f4c81",
              "&:hover": { backgroundColor: "#0c3c64" },
              px: 4,
              py: 1.5,
            }}
          >
            Submit Another Quote
          </Button>
        </Paper>
      </Container>
    )
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper
        sx={{
          borderRadius: 1,
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            backgroundColor: "#0f4c81",
            color: "white",
            p: 3,
            textAlign: "center",
          }}
        >
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
            Get a Custom Quote
          </Typography>
          <Typography variant="body1">
            Tell us about your project and we'll provide you with a personalized quote
          </Typography>
        </Box>

        {/* Stepper */}
        <Box sx={{ p: 3, pb: 0 }}>
          <Stepper
            activeStep={activeStep}
            alternativeLabel
            sx={{
              "& .MuiStepLabel-label": {
                fontWeight: 500,
                "&.Mui-active": { color: "#0f4c81", fontWeight: 600 },
                "&.Mui-completed": { color: "#0f4c81" },
              },
              "& .MuiStepIcon-root": {
                "&.Mui-active": { color: "#0f4c81" },
                "&.Mui-completed": { color: "#0f4c81" },
              },
            }}
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>

        {/* Content */}
        <Box>{getStepContent(activeStep)}</Box>

        {/* Error Alert */}
        {submitError && (
          <Box sx={{ px: 3 }}>
            <Alert
              severity="error"
              sx={{
                borderRadius: 1,
              }}
            >
              {submitError}
            </Alert>
          </Box>
        )}

        {/* Navigation */}
        <Box sx={{ display: "flex", justifyContent: "space-between", p: 3 }}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            variant="outlined"
            sx={{
              borderColor: "#0f4c81",
              color: "#0f4c81",
              "&:hover": {
                borderColor: "#0c3c64",
                backgroundColor: "rgba(15, 76, 129, 0.04)",
              },
              "&:disabled": {
                borderColor: "#e2e8f0",
                color: "#94a3b8",
              },
            }}
          >
            Back
          </Button>

          <Box>
            {activeStep === steps.length - 1 ? (
              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={loading}
                sx={{
                  backgroundColor: "#0f4c81",
                  "&:hover": { backgroundColor: "#0c3c64" },
                  "&:disabled": { backgroundColor: "#94a3b8" },
                }}
              >
                {loading ? (
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <CircularProgress size={20} sx={{ color: "white" }} />
                    Submitting...
                  </Box>
                ) : (
                  "Submit Quote"
                )}
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={handleNext}
                disabled={!isStepValid(activeStep)}
                sx={{
                  backgroundColor: "#0f4c81",
                  "&:hover": { backgroundColor: "#0c3c64" },
                  "&:disabled": { backgroundColor: "#94a3b8" },
                }}
              >
                Next
              </Button>
            )}
          </Box>
        </Box>
      </Paper>

      {/* Project Selector Dialog */}
      <ProjectSelector
        open={projectSelectorOpen}
        onClose={() => setProjectSelectorOpen(false)}
        onSelectProject={handleProjectSelect}
      />
    </Container>
  )
}

export default QuoteForm
