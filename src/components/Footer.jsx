"use client"
import { Box, Container, Grid, Typography, Link, IconButton, Divider, useMediaQuery, useTheme } from "@mui/material"
import { Link as RouterLink } from "react-router-dom"
import FacebookIcon from "@mui/icons-material/Facebook"
import TwitterIcon from "@mui/icons-material/Twitter"
import LinkedInIcon from "@mui/icons-material/LinkedIn"
import InstagramIcon from "@mui/icons-material/Instagram"
import EmailIcon from "@mui/icons-material/Email"
import PhoneIcon from "@mui/icons-material/Phone"
import LocationOnIcon from "@mui/icons-material/LocationOn"

const Footer = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const isSmallMobile = useMediaQuery("(max-width:425px)")

  const currentYear = new Date().getFullYear()

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#1a1a2e",
        color: "white",
        pt: 6,
        pb: 3,
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
      {/* Decorative elements */}
      <Box
        sx={{
          position: "absolute",
          top: "10%",
          left: "5%",
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(67, 97, 238, 0.1) 0%, rgba(67, 97, 238, 0) 70%)",
          pointerEvents: "none",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "10%",
          right: "5%",
          width: "150px",
          height: "150px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(67, 97, 238, 0.1) 0%, rgba(67, 97, 238, 0) 70%)",
          pointerEvents: "none",
        }}
      />

      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography
              variant="h6"
              component={RouterLink}
              to="/"
              sx={{
                fontWeight: 800,
                mb: 3,
                display: "inline-block",
                background: "linear-gradient(135deg, #ffffff 0%, #b8c0ff 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                textDecoration: "none",
                letterSpacing: "-0.5px",
                fontSize: isSmallMobile ? "1.1rem" : "1.25rem",
                
              }}
            >
              MALLOYA GROUP
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, color: "rgba(255,255,255,0.7)" }}>
              Custom mobile & web solutions that power your business growth. We bring your digital ideas to life.
            </Typography>
            <Box sx={{ mt: 2 }}>
              <IconButton
                aria-label="Facebook"
                size="small"
                sx={{
                  mr: 1,
                  color: "white",
                  "&:hover": {
                    background: "linear-gradient(135deg, #3a0ca3 0%, #4361ee 100%)",
                  },
                }}
              >
                <FacebookIcon />
              </IconButton>
              <IconButton
                aria-label="Twitter"
                size="small"
                sx={{
                  mr: 1,
                  color: "white",
                  "&:hover": {
                    background: "linear-gradient(135deg, #3a0ca3 0%, #4361ee 100%)",
                  },
                }}
              >
                <TwitterIcon />
              </IconButton>
              <IconButton
                aria-label="LinkedIn"
                size="small"
                sx={{
                  mr: 1,
                  color: "white",
                  "&:hover": {
                    background: "linear-gradient(135deg, #3a0ca3 0%, #4361ee 100%)",
                  },
                }}
              >
                <LinkedInIcon />
              </IconButton>
              <IconButton
                aria-label="Instagram"
                size="small"
                sx={{
                  color: "white",
                  "&:hover": {
                    background: "linear-gradient(135deg, #3a0ca3 0%, #4361ee 100%)",
                  },
                }}
              >
                <InstagramIcon />
              </IconButton>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                fontWeight: 600,
                mb: 3,
                position: "relative",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: "-8px",
                  left: 0,
                  width: "40px",
                  height: "3px",
                  background: "linear-gradient(135deg, #3a0ca3 0%, #4361ee 100%)",
                  borderRadius: "2px",
                },
              }}
            >
              Quick Links
            </Typography>
            <Box component="nav" sx={{ display: "flex", flexDirection: "column" }}>
              {["Home", "Services", "Hosting", "About", "Contact"].map((item) => (
                <Link
                  key={item}
                  component={RouterLink}
                  to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  sx={{
                    color: "rgba(255,255,255,0.7)",
                    textDecoration: "none",
                    mb: 1.5,
                    transition: "all 0.2s ease",
                    "&:hover": {
                      color: "white",
                      transform: "translateX(5px)",
                      display: "inline-block",
                    },
                  }}
                >
                  {item}
                </Link>
              ))}
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                fontWeight: 600,
                mb: 3,
                position: "relative",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: "-8px",
                  left: 0,
                  width: "40px",
                  height: "3px",
                  background: "linear-gradient(135deg, #3a0ca3 0%, #4361ee 100%)",
                  borderRadius: "2px",
                },
              }}
            >
              Services
            </Typography>
            <Box component="nav" sx={{ display: "flex", flexDirection: "column" }}>
              {["Web Development", "Mobile Apps", "Web Hosting", "UI/UX Design", "E-Commerce"].map((item) => (
                <Link
                  key={item}
                  component={RouterLink}
                  to="/services"
                  sx={{
                    color: "rgba(255,255,255,0.7)",
                    textDecoration: "none",
                    mb: 1.5,
                    transition: "all 0.2s ease",
                    "&:hover": {
                      color: "white",
                      transform: "translateX(5px)",
                      display: "inline-block",
                    },
                  }}
                >
                  {item}
                </Link>
              ))}
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                fontWeight: 600,
                mb: 3,
                position: "relative",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: "-8px",
                  left: 0,
                  width: "40px",
                  height: "3px",
                  background: "linear-gradient(135deg, #3a0ca3 0%, #4361ee 100%)",
                  borderRadius: "2px",
                },
              }}
            >
              Contact Us
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: "flex", mb: 2 }}>
                <LocationOnIcon sx={{ mr: 1, color: "#4361ee" }} />
                <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.7)" }}>
                  Diepkloof 319-Iq, Soweto,
                  <br />
                  Johannesburg, South Africa
                </Typography>
              </Box>
              <Box sx={{ display: "flex", mb: 2 }}>
                <EmailIcon sx={{ mr: 1, color: "#4361ee" }} />
                <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.7)" }}>
                  <Link
                    href="mailto:info@malloyagroup.com"
                    sx={{
                      color: "rgba(255,255,255,0.7)",
                      textDecoration: "none",
                      "&:hover": {
                        color: "white",
                      },
                    }}
                  >
                    info@malloyagroup.com
                  </Link>
                </Typography>
              </Box>
              <Box sx={{ display: "flex" }}>
                <PhoneIcon sx={{ mr: 1, color: "#4361ee" }} />
                <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.7)" }}>
                  <Link
                    href="tel:+27780296288"
                    sx={{
                      color: "rgba(255,255,255,0.7)",
                      textDecoration: "none",
                      "&:hover": {
                        color: "white",
                      },
                    }}
                  >
                    +27 78 029 6288
                  </Link>
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: "rgba(255,255,255,0.1)" }} />

        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "space-between",
            alignItems: isMobile ? "center" : "flex-start",
          }}
        >
          <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)", textAlign: isMobile ? "center" : "left" }}>
            © {currentYear} Malloya Group. All rights reserved.
          </Typography>
          <Box sx={{ display: "flex", mt: isMobile ? 2 : 0 }}>
            <Link
              component={RouterLink}
              to="/privacy"
              sx={{
                color: "rgba(255,255,255,0.5)",
                textDecoration: "none",
                mx: 1,
                "&:hover": {
                  color: "white",
                },
              }}
            >
              Privacy Policy
            </Link>
            <Link
              component={RouterLink}
              to="/terms"
              sx={{
                color: "rgba(255,255,255,0.5)",
                textDecoration: "none",
                mx: 1,
                "&:hover": {
                  color: "white",
                },
              }}
            >
              Terms of Service
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default Footer
