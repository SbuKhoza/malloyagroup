"use client"

import { useState, useEffect } from "react"
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  CircularProgress,
  Snackbar,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputAdornment,
  IconButton,
} from "@mui/material"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import EmailIcon from "@mui/icons-material/Email"
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail, onAuthStateChanged } from "firebase/auth"
import { app } from "../../firebase/config" // Adjust path as needed
import { useNavigate } from "react-router-dom"

function LoginAdmin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "info",
  })
  const [resetDialog, setResetDialog] = useState(false)
  const [resetEmail, setResetEmail] = useState("")

  const auth = getAuth(app)
  const navigate = useNavigate()

  // Check if user is already authenticated
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is already signed in, no need to show login
        navigate("/malloyaadmin")
      }
    })

    return () => unsubscribe()
  }, [auth, navigate])

  const handleLogin = async (e) => {
    e.preventDefault()

    if (!email || !password) {
      setAlert({
        open: true,
        message: "Please enter both email and password",
        severity: "error",
      })
      return
    }

    setLoading(true)

    try {
      await signInWithEmailAndPassword(auth, email, password)
      setAlert({
        open: true,
        message: "Login successful!",
        severity: "success",
      })
      // No need to navigate here as the AuthStateChanged listener will handle it
    } catch (error) {
      console.error("Login error:", error)
      setAlert({
        open: true,
        message: getErrorMessage(error.code),
        severity: "error",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleResetPassword = async () => {
    if (!resetEmail) {
      setAlert({
        open: true,
        message: "Please enter your email address",
        severity: "error",
      })
      return
    }

    setLoading(true)

    try {
      await sendPasswordResetEmail(auth, resetEmail)
      setAlert({
        open: true,
        message: "Password reset email sent! Check your inbox.",
        severity: "success",
      })
      setResetDialog(false)
    } catch (error) {
      console.error("Password reset error:", error)
      setAlert({
        open: true,
        message: getErrorMessage(error.code),
        severity: "error",
      })
    } finally {
      setLoading(false)
    }
  }

  const getErrorMessage = (errorCode) => {
    switch (errorCode) {
      case "auth/invalid-email":
        return "Invalid email address format"
      case "auth/user-disabled":
        return "This user account has been disabled"
      case "auth/user-not-found":
        return "No user found with this email"
      case "auth/wrong-password":
        return "Incorrect password"
      case "auth/too-many-requests":
        return "Too many failed login attempts. Please try again later"
      case "auth/network-request-failed":
        return "Network error. Please check your connection"
      default:
        return "Authentication error: " + errorCode
    }
  }

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          marginBottom: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={6}
          sx={{
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            borderRadius: "16px",
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
            boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          }}
        >
          <Box
            sx={{
              background: "linear-gradient(135deg, #3a0ca3 0%, #4361ee 100%)",
              borderRadius: "50%",
              padding: 1.5,
              mb: 3,
              boxShadow: "0 4px 10px rgba(67, 97, 238, 0.3)",
            }}
          >
            <LockOutlinedIcon sx={{ color: "white", fontSize: 28 }} />
          </Box>

          <Typography
            component="h1"
            variant="h4"
            sx={{
              mb: 3,
              fontWeight: 700,
              background: "linear-gradient(135deg, #3a0ca3 0%, #4361ee 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Admin Login
          </Typography>

          <Box component="form" onSubmit={handleLogin} sx={{ width: "100%" }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                mb: 2,
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
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon sx={{ color: "#3a0ca3" }} />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                mb: 3,
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
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlinedIcon sx={{ color: "#3a0ca3" }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleTogglePasswordVisibility}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{
                mb: 3,
                py: 1.5,
                background: "linear-gradient(135deg, #3a0ca3 0%, #4361ee 100%)",
                color: "white",
                fontWeight: 600,
                borderRadius: "8px",
                boxShadow: "0 4px 10px rgba(67, 97, 238, 0.3)",
                transition: "all 0.3s ease",
                "&:hover": {
                  opacity: 0.9,
                  transform: "translateY(-2px)",
                  boxShadow: "0 6px 15px rgba(67, 97, 238, 0.4)",
                },
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Sign In"}
            </Button>

            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Button
                variant="text"
                onClick={() => {
                  setResetEmail(email)
                  setResetDialog(true)
                }}
                disabled={loading}
                sx={{
                  color: "#3a0ca3",
                  "&:hover": {
                    backgroundColor: "rgba(67, 97, 238, 0.05)",
                  },
                }}
              >
                Forgot password?
              </Button>
            </Box>
          </Box>
        </Paper>
      </Box>

      {/* Password Reset Dialog */}
      <Dialog
        open={resetDialog}
        onClose={() => setResetDialog(false)}
        PaperProps={{
          sx: {
            borderRadius: "12px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
          },
        }}
      >
        <DialogTitle
          sx={{
            background: "linear-gradient(135deg, #3a0ca3 0%, #4361ee 100%)",
            color: "white",
            fontWeight: 600,
          }}
        >
          Reset Password
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <DialogContentText sx={{ mb: 2 }}>
            Enter your email address and we'll send you a link to reset your password.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="resetEmail"
            label="Email Address"
            type="email"
            fullWidth
            variant="outlined"
            value={resetEmail}
            onChange={(e) => setResetEmail(e.target.value)}
            sx={{
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
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button
            onClick={() => setResetDialog(false)}
            sx={{
              color: "#3a0ca3",
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleResetPassword}
            variant="contained"
            disabled={loading}
            sx={{
              background: "linear-gradient(135deg, #3a0ca3 0%, #4361ee 100%)",
              color: "white",
              "&:hover": {
                opacity: 0.9,
              },
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Send Reset Link"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Alert Snackbar */}
      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={() => setAlert({ ...alert, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setAlert({ ...alert, open: false })}
          severity={alert.severity}
          sx={{
            width: "100%",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            borderRadius: "8px",
          }}
          variant="filled"
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </Container>
  )
}

export default LoginAdmin
