"use client"

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
  FormGroup,
  MenuItem,
  Select,
  InputLabel,
  Divider,
  Alert,
  CircularProgress,
  Chip,
} from "@mui/material"
import { Clear as ClearIcon, Folder as FolderIcon } from "@mui/icons-material"
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
          <Box sx={{ p: { xs: 1, sm: 2 }, overflowX: "hidden" }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontSize: { xs: "1rem", sm: "1.1rem", md: "1.25rem" }, color: "#3a0ca3", fontWeight: "bold" }}
            >
              Personal Information
            </Typography>

            {/* Project Selection Section */}
            <Paper
              variant="outlined"
              sx={{
                p: 2,
                mb: 3,
                borderRadius: 2,
                borderColor: selectedProject ? "#4361ee" : "#e0e0e0",
                backgroundColor: selectedProject ? "#f8f9ff" : "transparent",
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "#3a0ca3" }}>
                  Project Reference (Optional)
                </Typography>
                <Button
                  variant="outlined"
                  startIcon={<FolderIcon />}
                  onClick={() => setProjectSelectorOpen(true)}
                  size="small"
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

            <TextField
              required
              fullWidth
              margin="normal"
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              sx={{
                "& .MuiInputLabel-root": {
                  fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                },
                "& .MuiOutlinedInput-input": {
                  fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                  py: { xs: 1, sm: 1.5 },
                },
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "#4361ee",
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
            <TextField
              required
              fullWidth
              margin="normal"
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              sx={{
                "& .MuiInputLabel-root": {
                  fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                },
                "& .MuiOutlinedInput-input": {
                  fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                  py: { xs: 1, sm: 1.5 },
                },
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "#4361ee",
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
            <TextField
              required
              fullWidth
              margin="normal"
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              sx={{
                "& .MuiInputLabel-root": {
                  fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                },
                "& .MuiOutlinedInput-input": {
                  fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                  py: { xs: 1, sm: 1.5 },
                },
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "#4361ee",
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
            <TextField
              fullWidth
              margin="normal"
              label="Referral Code (Optional)"
              name="referralCode"
              value={formData.referralCode}
              onChange={handleReferralCodeChange}
              placeholder="ABC-123"
              inputProps={{ maxLength: 7 }}
              helperText="Format: 3 letters followed by 3 numbers (e.g., ABC-123)"
              sx={{
                "& .MuiInputLabel-root": {
                  fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                },
                "& .MuiOutlinedInput-input": {
                  fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                  py: { xs: 1, sm: 1.5 },
                },
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "#4361ee",
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
          </Box>
        )

      case 1:
        return (
          <Box sx={{ p: { xs: 1, sm: 2 }, overflowX: "hidden" }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontSize: { xs: "1rem", sm: "1.1rem", md: "1.25rem" }, color: "#3a0ca3", fontWeight: "bold" }}
            >
              Which services are you interested in?
            </Typography>
            <FormGroup>
              <FormControlLabel
                sx={{
                  "& .MuiFormControlLabel-label": {
                    fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                  },
                }}
                control={
                  <Checkbox
                    checked={formData.services.website}
                    onChange={handleCheckboxChange}
                    name="services.website"
                  />
                }
                label="Website Development"
              />
              <FormControlLabel
                sx={{
                  "& .MuiFormControlLabel-label": {
                    fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                  },
                }}
                control={
                  <Checkbox checked={formData.services.app} onChange={handleCheckboxChange} name="services.app" />
                }
                label="App Development"
              />
              <FormControlLabel
                sx={{
                  "& .MuiFormControlLabel-label": {
                    fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                  },
                }}
                control={
                  <Checkbox
                    checked={formData.services.hosting}
                    onChange={handleCheckboxChange}
                    name="services.hosting"
                  />
                }
                label="Hosting Services"
              />
            </FormGroup>
          </Box>
        )

      case 2:
        return (
          <Box sx={{ p: { xs: 1, sm: 2 }, overflowX: "hidden" }}>
            {formData.services.website && (
              <>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    fontSize: { xs: "1rem", sm: "1.1rem", md: "1.25rem" },
                    color: "#3a0ca3",
                    fontWeight: "bold",
                  }}
                >
                  Website Development Details
                </Typography>
                <FormControl component="fieldset" margin="normal">
                  <FormLabel component="legend">Website Type</FormLabel>
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
                  >
                    <FormControlLabel
                      sx={{
                        "& .MuiFormControlLabel-label": {
                          fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                        },
                      }}
                      value="new"
                      control={<Radio />}
                      label="New Website"
                    />
                    <FormControlLabel
                      sx={{
                        "& .MuiFormControlLabel-label": {
                          fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                        },
                      }}
                      value="existing"
                      control={<Radio />}
                      label="Update Existing Website"
                    />
                  </RadioGroup>
                </FormControl>

                {formData.websiteType.new ? (
                  <>
                    <FormControl fullWidth margin="normal">
                      <InputLabel sx={{ fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" } }}>
                        Website Type
                      </InputLabel>
                      <Select
                        value={formData.websiteDetails.type}
                        onChange={(e) => handleNestedInputChange("websiteDetails", "type", e.target.value)}
                        sx={{
                          "& .MuiSelect-select": {
                            fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                            py: { xs: 1, sm: 1.5 },
                          },
                        }}
                      >
                        {websiteTypes.map((type) => (
                          <MenuItem key={type} value={type}>
                            {type}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
                      Select Features
                    </Typography>
                    <FormGroup>
                      {websiteFeatures.map((feature) => (
                        <FormControlLabel
                          sx={{
                            "& .MuiFormControlLabel-label": {
                              fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                            },
                          }}
                          key={feature}
                          control={
                            <Checkbox
                              checked={formData.websiteDetails.features.includes(feature)}
                              onChange={() => handleArrayChange("websiteDetails", "features", feature)}
                            />
                          }
                          label={feature}
                        />
                      ))}
                    </FormGroup>

                    <TextField
                      fullWidth
                      margin="normal"
                      label="Other Features"
                      multiline
                      rows={3}
                      value={formData.websiteDetails.otherFeatures}
                      onChange={(e) => handleNestedInputChange("websiteDetails", "otherFeatures", e.target.value)}
                      sx={{
                        "& .MuiInputLabel-root": {
                          fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                        },
                        "& .MuiOutlinedInput-input": {
                          fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                          py: { xs: 1, sm: 1.5 },
                        },
                      }}
                    />
                  </>
                ) : (
                  <>
                    <TextField
                      fullWidth
                      margin="normal"
                      label="Existing Website Domain"
                      placeholder="e.g., example.com"
                      value={formData.websiteDetails.domain}
                      onChange={(e) => handleNestedInputChange("websiteDetails", "domain", e.target.value)}
                      sx={{
                        "& .MuiInputLabel-root": {
                          fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                        },
                        "& .MuiOutlinedInput-input": {
                          fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                          py: { xs: 1, sm: 1.5 },
                        },
                      }}
                    />

                    <TextField
                      fullWidth
                      margin="normal"
                      label="Features You Want to Add/Update"
                      multiline
                      rows={4}
                      value={formData.websiteDetails.otherFeatures}
                      onChange={(e) => handleNestedInputChange("websiteDetails", "otherFeatures", e.target.value)}
                      sx={{
                        "& .MuiInputLabel-root": {
                          fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                        },
                        "& .MuiOutlinedInput-input": {
                          fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                          py: { xs: 1, sm: 1.5 },
                        },
                      }}
                    />
                  </>
                )}

                <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2, mt: 2 }}>
                  <FormControl fullWidth margin="normal">
                    <InputLabel sx={{ fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" } }}>Currency</InputLabel>
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
                        "& .MuiSelect-select": {
                          fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                          py: { xs: 1, sm: 1.5 },
                        },
                      }}
                    >
                      {currencies.map((currency) => (
                        <MenuItem key={currency.code} value={currency.code}>
                          {currency.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <TextField
                    fullWidth
                    margin="normal"
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
                      "& .MuiInputLabel-root": {
                        fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                      },
                      "& .MuiOutlinedInput-input": {
                        fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                        py: { xs: 1, sm: 1.5 },
                      },
                    }}
                  />
                </Box>

                <FormControlLabel
                  sx={{
                    "& .MuiFormControlLabel-label": {
                      fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                    },
                  }}
                  control={
                    <Checkbox
                      checked={formData.websiteDetails.cms}
                      onChange={(e) => handleNestedInputChange("websiteDetails", "cms", e.target.checked)}
                    />
                  }
                  label="Include Content Management System (CMS)"
                />

                <Alert severity="info" sx={{ mt: 2, fontSize: { xs: "0.75rem", sm: "0.8rem", md: "0.875rem" } }}>
                  A Content Management System (CMS) allows you to easily update your website content without technical
                  knowledge. Some website features like blogs, e-commerce, and user accounts may require a CMS even if
                  not explicitly selected.
                </Alert>

                <Divider sx={{ my: 3 }} />
              </>
            )}

            {formData.services.app && (
              <>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    fontSize: { xs: "1rem", sm: "1.1rem", md: "1.25rem" },
                    color: "#3a0ca3",
                    fontWeight: "bold",
                  }}
                >
                  App Development Details
                </Typography>

                <FormControl fullWidth margin="normal">
                  <InputLabel sx={{ fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" } }}>App Type</InputLabel>
                  <Select
                    value={formData.appDetails.type}
                    onChange={(e) => handleNestedInputChange("appDetails", "type", e.target.value)}
                    sx={{
                      "& .MuiSelect-select": {
                        fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                        py: { xs: 1, sm: 1.5 },
                      },
                    }}
                  >
                    {appTypes.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
                  Select Features
                </Typography>
                <FormGroup>
                  {appFeatures.map((feature) => (
                    <FormControlLabel
                      sx={{
                        "& .MuiFormControlLabel-label": {
                          fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                        },
                      }}
                      key={feature}
                      control={
                        <Checkbox
                          checked={formData.appDetails.features.includes(feature)}
                          onChange={() => handleArrayChange("appDetails", "features", feature)}
                        />
                      }
                      label={feature}
                    />
                  ))}
                </FormGroup>

                <TextField
                  fullWidth
                  margin="normal"
                  label="Other Features"
                  multiline
                  rows={3}
                  value={formData.appDetails.otherFeatures}
                  onChange={(e) => handleNestedInputChange("appDetails", "otherFeatures", e.target.value)}
                  sx={{
                    "& .MuiInputLabel-root": {
                      fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                    },
                    "& .MuiOutlinedInput-input": {
                      fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                      py: { xs: 1, sm: 1.5 },
                    },
                  }}
                />

                <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2, mt: 2 }}>
                  <FormControl fullWidth margin="normal">
                    <InputLabel sx={{ fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" } }}>Currency</InputLabel>
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
                        "& .MuiSelect-select": {
                          fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                          py: { xs: 1, sm: 1.5 },
                        },
                      }}
                    >
                      {currencies.map((currency) => (
                        <MenuItem key={currency.code} value={currency.code}>
                          {currency.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <TextField
                    fullWidth
                    margin="normal"
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
                      "& .MuiInputLabel-root": {
                        fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                      },
                      "& .MuiOutlinedInput-input": {
                        fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                        py: { xs: 1, sm: 1.5 },
                      },
                    }}
                  />
                </Box>

                <Divider sx={{ my: 3 }} />
              </>
            )}

            {formData.services.hosting && (
              <>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    fontSize: { xs: "1rem", sm: "1.1rem", md: "1.25rem" },
                    color: "#3a0ca3",
                    fontWeight: "bold",
                  }}
                >
                  Hosting Package
                </Typography>

                <FormControl component="fieldset" margin="normal">
                  <RadioGroup
                    value={formData.hostingPackage}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        hostingPackage: e.target.value,
                      })
                    }
                  >
                    {hostingPackages.map((pkg) => (
                      <FormControlLabel
                        sx={{
                          "& .MuiFormControlLabel-label": {
                            fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                          },
                        }}
                        key={pkg.name}
                        value={pkg.name}
                        control={<Radio />}
                        label={
                          <Box>
                            <Typography variant="subtitle1">
                              {pkg.name} - {pkg.price}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {pkg.description}
                            </Typography>
                            <Box sx={{ mt: 1 }}>
                              {pkg.features.map((feature, index) => (
                                <Typography key={index} variant="body2" color="text.secondary" sx={{ ml: 2 }}>
                                  • {feature}
                                </Typography>
                              ))}
                            </Box>
                          </Box>
                        }
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </>
            )}
          </Box>
        )

      case 3:
        return (
          <Box sx={{ p: { xs: 1, sm: 2 }, overflowX: "hidden" }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontSize: { xs: "1rem", sm: "1.1rem", md: "1.25rem" }, color: "#3a0ca3", fontWeight: "bold" }}
            >
              Review Your Quote Request
            </Typography>

            <Paper
              variant="outlined"
              sx={{
                p: { xs: 1.5, sm: 2 },
                mb: 2,
                borderRadius: 1,
                boxShadow: 1,
                borderLeft: "4px solid #4361ee",
                transition: "transform 0.2s ease",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 4px 12px rgba(67, 97, 238, 0.15)",
                },
              }}
            >
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{
                  fontSize: { xs: "0.9rem", sm: "1rem" },
                  fontWeight: "bold",
                  color: "#3a0ca3",
                }}
              >
                Personal Information
              </Typography>
              <Typography sx={{ fontSize: { xs: "0.8rem", sm: "0.9rem" } }}>Name: {formData.name}</Typography>
              <Typography sx={{ fontSize: { xs: "0.8rem", sm: "0.9rem" } }}>Email: {formData.email}</Typography>
              <Typography sx={{ fontSize: { xs: "0.8rem", sm: "0.9rem" } }}>Phone: {formData.phone}</Typography>
              {formData.referralCode && (
                <Typography sx={{ fontSize: { xs: "0.8rem", sm: "0.9rem" } }}>
                  Referral Code: {formData.referralCode}
                </Typography>
              )}
            </Paper>

            {selectedProject && (
              <Paper
                variant="outlined"
                sx={{
                  p: { xs: 1.5, sm: 2 },
                  mb: 2,
                  borderRadius: 1,
                  boxShadow: 1,
                  borderLeft: "4px solid #4361ee",
                  transition: "transform 0.2s ease",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 4px 12px rgba(67, 97, 238, 0.15)",
                  },
                }}
              >
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  sx={{
                    fontSize: { xs: "0.9rem", sm: "1rem" },
                    fontWeight: "bold",
                    color: "#3a0ca3",
                  }}
                >
                  Project Reference
                </Typography>
                <Typography sx={{ fontSize: { xs: "0.8rem", sm: "0.9rem" } }}>
                  Project: {selectedProject.projectName}
                </Typography>
                <Typography sx={{ fontSize: { xs: "0.8rem", sm: "0.9rem" } }}>
                  Project ID: {selectedProject.projectId}
                </Typography>
              </Paper>
            )}

            <Paper
              variant="outlined"
              sx={{
                p: { xs: 1.5, sm: 2 },
                mb: 2,
                borderRadius: 1,
                boxShadow: 1,
                borderLeft: "4px solid #4361ee",
                transition: "transform 0.2s ease",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 4px 12px rgba(67, 97, 238, 0.15)",
                },
              }}
            >
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{
                  fontSize: { xs: "0.9rem", sm: "1rem" },
                  fontWeight: "bold",
                  color: "#3a0ca3",
                }}
              >
                Services Requested
              </Typography>
              <Typography sx={{ fontSize: { xs: "0.8rem", sm: "0.9rem" } }}>
                {Object.entries(formData.services)
                  .filter(([_, selected]) => selected)
                  .map(([service]) => service.charAt(0).toUpperCase() + service.slice(1))
                  .join(", ")}
              </Typography>
            </Paper>

            {formData.services.website && (
              <Paper
                variant="outlined"
                sx={{
                  p: { xs: 1.5, sm: 2 },
                  mb: 2,
                  borderRadius: 1,
                  boxShadow: 1,
                  borderLeft: "4px solid #4361ee",
                  transition: "transform 0.2s ease",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 4px 12px rgba(67, 97, 238, 0.15)",
                  },
                }}
              >
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  sx={{
                    fontSize: { xs: "0.9rem", sm: "1rem" },
                    fontWeight: "bold",
                    color: "#3a0ca3",
                  }}
                >
                  Website Development Details
                </Typography>
                <Typography sx={{ fontSize: { xs: "0.8rem", sm: "0.9rem" } }}>
                  Type: {formData.websiteType.new ? "New Website" : "Existing Website Update"}
                </Typography>

                {formData.websiteType.new ? (
                  <>
                    <Typography sx={{ fontSize: { xs: "0.8rem", sm: "0.9rem" } }}>
                      Website Type: {formData.websiteDetails.type}
                    </Typography>
                    {formData.websiteDetails.features.length > 0 && (
                      <Typography sx={{ fontSize: { xs: "0.8rem", sm: "0.9rem" } }}>
                        Features: {formData.websiteDetails.features.join(", ")}
                      </Typography>
                    )}
                  </>
                ) : (
                  <>
                    <Typography sx={{ fontSize: { xs: "0.8rem", sm: "0.9rem" } }}>
                      Domain: {formData.websiteDetails.domain}
                    </Typography>
                  </>
                )}

                {formData.websiteDetails.otherFeatures && (
                  <Typography sx={{ fontSize: { xs: "0.8rem", sm: "0.9rem" } }}>
                    Other Features: {formData.websiteDetails.otherFeatures}
                  </Typography>
                )}

                <Typography sx={{ fontSize: { xs: "0.8rem", sm: "0.9rem" } }}>
                  Budget: {formData.websiteDetails.budget.currency} {formData.websiteDetails.budget.amount}
                </Typography>
                <Typography sx={{ fontSize: { xs: "0.8rem", sm: "0.9rem" } }}>
                  CMS: {formData.websiteDetails.cms ? "Yes" : "No"}
                </Typography>
              </Paper>
            )}

            {formData.services.app && (
              <Paper
                variant="outlined"
                sx={{
                  p: { xs: 1.5, sm: 2 },
                  mb: 2,
                  borderRadius: 1,
                  boxShadow: 1,
                  borderLeft: "4px solid #4361ee",
                  transition: "transform 0.2s ease",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 4px 12px rgba(67, 97, 238, 0.15)",
                  },
                }}
              >
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  sx={{
                    fontSize: { xs: "0.9rem", sm: "1rem" },
                    fontWeight: "bold",
                    color: "#3a0ca3",
                  }}
                >
                  App Development Details
                </Typography>
                <Typography sx={{ fontSize: { xs: "0.8rem", sm: "0.9rem" } }}>
                  App Type: {formData.appDetails.type}
                </Typography>

                {formData.appDetails.features.length > 0 && (
                  <Typography sx={{ fontSize: { xs: "0.8rem", sm: "0.9rem" } }}>
                    Features: {formData.appDetails.features.join(", ")}
                  </Typography>
                )}

                {formData.appDetails.otherFeatures && (
                  <Typography sx={{ fontSize: { xs: "0.8rem", sm: "0.9rem" } }}>
                    Other Features: {formData.appDetails.otherFeatures}
                  </Typography>
                )}

                <Typography sx={{ fontSize: { xs: "0.8rem", sm: "0.9rem" } }}>
                  Budget: {formData.appDetails.budget.currency} {formData.appDetails.budget.amount}
                </Typography>
              </Paper>
            )}

            {formData.services.hosting && (
              <Paper
                variant="outlined"
                sx={{
                  p: { xs: 1.5, sm: 2 },
                  mb: 2,
                  borderRadius: 1,
                  boxShadow: 1,
                  borderLeft: "4px solid #4361ee",
                  transition: "transform 0.2s ease",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 4px 12px rgba(67, 97, 238, 0.15)",
                  },
                }}
              >
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  sx={{
                    fontSize: { xs: "0.9rem", sm: "1rem" },
                    fontWeight: "bold",
                    color: "#3a0ca3",
                  }}
                >
                  Hosting Package
                </Typography>
                <Typography sx={{ fontSize: { xs: "0.8rem", sm: "0.9rem" } }}>
                  Selected Package: {formData.hostingPackage}
                </Typography>
                {hostingPackages
                  .find((pkg) => pkg.name === formData.hostingPackage)
                  ?.features.map((feature, index) => (
                    <Typography key={index} variant="body2" sx={{ ml: 2, fontSize: { xs: "0.7rem", sm: "0.8rem" } }}>
                      • {feature}
                    </Typography>
                  ))}
              </Paper>
            )}
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
      <Container maxWidth="md" sx={{ mt: 4, px: { xs: 1, sm: 2, md: 3 } }}>
        <Paper
          sx={{
            p: { xs: 2, sm: 3, md: 4 },
            textAlign: "center",
            borderRadius: 2,
            boxShadow: 3,
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "6px",
              background: "linear-gradient(135deg, #3a0ca3 0%, #4361ee 100%)",
            },
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              fontSize: { xs: "1.5rem", sm: "2rem", md: "2.25rem" },
              fontWeight: "bold",
              background: "linear-gradient(135deg, #3a0ca3 0%, #4361ee 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Thank You!
          </Typography>
          <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: "1rem", sm: "1.1rem", md: "1.25rem" } }}>
            Your quote request has been submitted successfully.
          </Typography>
          <Typography variant="body1" paragraph sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}>
            We'll review your requirements and get back to you shortly at {formData.email}.
          </Typography>
          {selectedProject && (
            <Typography
              variant="body2"
              paragraph
              sx={{ fontSize: { xs: "0.8rem", sm: "0.9rem" }, color: "text.secondary" }}
            >
              Reference Project: {selectedProject.projectName} ({selectedProject.projectId})
            </Typography>
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
              background: "linear-gradient(135deg, #3a0ca3 0%, #4361ee 100%)",
              color: "white",
              fontWeight: 600,
              boxShadow: "0 4px 10px rgba(67, 97, 238, 0.3)",
              transition: "all 0.3s ease",
              "&:hover": {
                opacity: 0.9,
                transform: "translateY(-2px)",
                boxShadow: "0 6px 15px rgba(67, 97, 238, 0.4)",
              },
            }}
          >
            Submit Another Quote
          </Button>
        </Paper>
      </Container>
    )
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, px: { xs: 1, sm: 2, md: 3 } }}>
      <Paper
        sx={{
          p: { xs: 1, sm: 2, md: 3 },
          borderRadius: 2,
          boxShadow: 3,
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "6px",
            background: "linear-gradient(135deg, #3a0ca3 0%, #4361ee 100%)",
          },
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{
            fontSize: { xs: "1.5rem", sm: "2rem", md: "2.25rem" },
            fontWeight: "bold",
            background: "linear-gradient(135deg, #3a0ca3 0%, #4361ee 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            mt: 2,
          }}
        >
          Get a Custom Quote
        </Typography>
        <Typography
          variant="body1"
          align="center"
          paragraph
          sx={{ fontSize: { xs: "0.875rem", sm: "1rem" }, mb: 3, color: "text.secondary" }}
        >
          Tell us about your project and we'll provide you with a personalized quote.
        </Typography>

        <Stepper
          activeStep={activeStep}
          alternativeLabel
          sx={{
            mb: 4,
            "& .MuiStepLabel-label": {
              fontSize: { xs: "0.7rem", sm: "0.8rem", md: "0.875rem" },
              mt: { xs: 0.5, sm: 1 },
            },
            "& .MuiSvgIcon-root": {
              fontSize: { xs: "1.2rem", sm: "1.5rem", md: "1.75rem" },
            },
            "& .MuiStepIcon-root.Mui-active": {
              color: "#4361ee",
            },
            "& .MuiStepIcon-root.Mui-completed": {
              color: "#3a0ca3",
            },
          }}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {getStepContent(activeStep)}

        {submitError && (
          <Alert severity="error" sx={{ mt: 2, fontSize: { xs: "0.75rem", sm: "0.8rem", md: "0.875rem" } }}>
            {submitError}
          </Alert>
        )}

        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3, px: 1 }}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{
              fontSize: { xs: "0.8rem", sm: "0.875rem" },
              color: "#3a0ca3",
              "&:hover": {
                backgroundColor: "rgba(67, 97, 238, 0.05)",
              },
            }}
          >
            Back
          </Button>

          <Box>
            {activeStep === steps.length - 1 ? (
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                disabled={loading}
                sx={{
                  fontSize: { xs: "0.8rem", sm: "0.875rem" },
                  px: { xs: 2, sm: 3 },
                  py: { xs: 0.8, sm: 1 },
                  background: "linear-gradient(135deg, #3a0ca3 0%, #4361ee 100%)",
                  boxShadow: "0 4px 10px rgba(67, 97, 238, 0.3)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    opacity: 0.9,
                    transform: "translateY(-2px)",
                    boxShadow: "0 6px 15px rgba(67, 97, 238, 0.4)",
                  },
                }}
              >
                {loading ? <CircularProgress size={24} /> : "Submit Quote"}
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                disabled={!isStepValid(activeStep)}
                sx={{
                  fontSize: { xs: "0.8rem", sm: "0.875rem" },
                  px: { xs: 2, sm: 3 },
                  py: { xs: 0.8, sm: 1 },
                  background: "linear-gradient(135deg, #3a0ca3 0%, #4361ee 100%)",
                  boxShadow: "0 4px 10px rgba(67, 97, 238, 0.3)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    opacity: 0.9,
                    transform: "translateY(-2px)",
                    boxShadow: "0 6px 15px rgba(67, 97, 238, 0.4)",
                  },
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
