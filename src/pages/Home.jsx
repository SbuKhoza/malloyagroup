"use client"
import { Box, Container, Typography, Button, Grid, useMediaQuery, useTheme } from "@mui/material"
import { Link as RouterLink } from "react-router-dom"
import {
  FaLaptopCode,
  FaMobileAlt,
  FaServer,
  FaPaintBrush,
  FaRocket,
  FaCheck,
  FaShoppingCart,
  FaUsersCog,
} from "react-icons/fa"
import { MdSpeed, MdDashboard, MdSchedule, MdAnalytics } from "react-icons/md"
import heroImage from "../assets/hero.png"

// Import components
import ServiceCard from "../components/ServiceCard"
import HostingPlans from "../components/HostingPlans"

const Hero = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))

  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #3a0ca3 0%, #4361ee 100%)", // Modern bright purple to blue gradient
        color: "white",
        py: { xs: 5, md: 6 }, // Reduced height
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography
              variant="h1"
              component="h1"
              sx={{
                fontWeight: 800,
                fontSize: { xs: "2.2rem", md: "3.2rem" },
                mb: 2,
                background: "linear-gradient(to right, #ffffff, #e0e0ff)", // Text gradient
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: "0 2px 10px rgba(0,0,0,0.1)",
              }}
            >
              Bringing Your Digital Ideas To Life
            </Typography>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 400,
                mb: 4,
                opacity: 0.9,
                maxWidth: "90%",
              }}
            >
              Custom mobile & web solutions that power your business growth
            </Typography>
            <Box sx={{ display: "flex", gap: { xs: 1, sm: 2 }, flexWrap: "wrap" }}>
              <Button
                variant="contained"
                size="large"
                component={RouterLink}
                to="/quote"
                sx={{
                  px: { xs: 2, sm: 4 },
                  py: { xs: 1, sm: 1.5 },
                  backgroundColor: "#ffffff",
                  color: "#3a0ca3",
                  fontWeight: "bold",
                  fontSize: { xs: "0.8rem", sm: "inherit" },
                  boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
                  borderRadius: "8px",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "#f0f0ff",
                    transform: "translateY(-2px)",
                    boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
                  },
                }}
                startIcon={<FaRocket />}
              >
                Get Started
              </Button>
              <Button
                variant="outlined"
                color="inherit"
                size="large"
                component={RouterLink}
                to="/services"
                sx={{
                  px: { xs: 2, sm: 4 },
                  py: { xs: 1, sm: 1.5 },
                  borderColor: "rgba(255,255,255,0.7)",
                  fontSize: { xs: "0.8rem", sm: "inherit" },
                  borderRadius: "8px",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    borderColor: "#ffffff",
                    backgroundColor: "rgba(255,255,255,0.1)",
                  },
                }}
              >
                Our Services
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} sx={{ display: { xs: "none", md: "block" } }}>
            <Box
              component="img"
              src={heroImage}
              alt="Digital solutions"
              sx={{
                width: "100%",
                transform: "perspective(1000px) rotateY(-5deg)",
                transition: "transform 0.5s ease",
                "&:hover": {
                  transform: "perspective(1000px) rotateY(0deg)",
                },
              }}
            />
          </Grid>
        </Grid>
      </Container>
      {/* Add subtle animated pattern overlay */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: "radial-gradient(rgba(255,255,255,0.08) 2px, transparent 2px)",
          backgroundSize: "30px 30px",
          pointerEvents: "none",
          animation: "pulse 4s infinite alternate",
          "@keyframes pulse": {
            "0%": { opacity: 0.5 },
            "100%": { opacity: 0.8 },
          },
        }}
      />
      {/* Add decorative shape */}
      <Box
        sx={{
          position: "absolute",
          top: "-20%",
          right: "-10%",
          width: "40%",
          height: "70%",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)",
          pointerEvents: "none",
        }}
      />
    </Box>
  )
}

const Services = () => {
  const services = [
    {
      title: "Website Development",
      description: "Custom responsive websites built to match your brand and meet your business goals.",
      icon: FaLaptopCode,
      link: "/services",
    },
    {
      title: "Mobile Apps",
      description: "Native and cross-platform mobile applications for iOS and Android devices.",
      icon: FaMobileAlt,
      link: "/services",
    },
    {
      title: "Web Hosting",
      description: "Fast, secure and reliable hosting solutions with 99.9% uptime guarantee.",
      icon: FaServer,
      link: "/services",
    },
    {
      title: "UI/UX Consultation",
      description: "Expert consultation to enhance user experience and interface design.",
      icon: FaPaintBrush,
      link: "/services",
    },
  ]

  return (
    <Box sx={{ py: 8, backgroundColor: "#f8f9ff" }}>
      {" "}
      {/* Light background */}
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            variant="overline"
            component="div"
            sx={{
              color: "#3a0ca3",
              fontWeight: 600,
              letterSpacing: 3,
              mb: 1,
            }}
          >
            WHAT WE OFFER
          </Typography>
          <Typography
            variant="h2"
            component="h2"
            gutterBottom
            sx={{
              fontWeight: 700,
              mb: 2,
              color: "#1a1a2e",
              position: "relative",
              display: "inline-block",
              "&::after": {
                content: '""',
                position: "absolute",
                bottom: "-10px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "80px",
                height: "4px",
                backgroundColor: "#4361ee",
                borderRadius: "2px",
              },
            }}
          >
            Our Services
          </Typography>
          <Typography
            variant="h5"
            sx={{
              maxWidth: 700,
              mx: "auto",
              color: "#4a4a6a",
              mt: 3,
            }}
          >
            End-to-end digital solutions for your business
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {services.map((service, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <ServiceCard
                title={service.title}
                description={service.description}
                icon={service.icon}
                link={service.link}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}

const WebsitePackage = () => {
  return (
    <Box
      sx={{
        py: 8,
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)", // Deep blue gradient
        color: "white",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography
              variant="overline"
              component="div"
              sx={{
                color: "#4cc9f0",
                letterSpacing: 2,
                fontWeight: 600,
                mb: 1,
              }}
            >
              STANDARD PACKAGE
            </Typography>
            <Typography
              variant="h3"
              component="h2"
              gutterBottom
              fontWeight="bold"
              sx={{
                background: "linear-gradient(to right, #ffffff, #b8c0ff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Standard Website Package
            </Typography>
            <Typography variant="h6" gutterBottom sx={{ opacity: 0.9, mb: 3 }}>
              For a 4-page website with essential features
            </Typography>
            <Box sx={{ my: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Box component={FaCheck} sx={{ mr: 2, color: "#4cc9f0", fontSize: 18 }} />
                    <Typography>Mobile-friendly design</Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Box component={FaCheck} sx={{ mr: 2, color: "#4cc9f0", fontSize: 18 }} />
                    <Typography>Basic UI customization</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Box component={FaCheck} sx={{ mr: 2, color: "#4cc9f0", fontSize: 18 }} />
                    <Typography>Basic SEO setup</Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Box component={FaCheck} sx={{ mr: 2, color: "#4cc9f0", fontSize: 18 }} />
                    <Typography>Contact form integration</Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Typography
              variant="body1"
              sx={{
                mb: 3,
                opacity: 0.9,
                p: 2,
                borderLeft: "3px solid #4cc9f0",
                backgroundColor: "rgba(76, 201, 240, 0.1)",
                borderRadius: "0 4px 4px 0",
              }}
            >
              Timeline: 3-5 business days
              <br />
              Additional pages available upon request
            </Typography>
            <Button
              variant="contained"
              size="large"
              component={RouterLink}
              to="/contact"
              startIcon={<FaRocket />}
              sx={{
                px: 4,
                py: 1.5,
                backgroundColor: "#4cc9f0",
                color: "#16213e",
                fontWeight: "bold",
                borderRadius: "8px",
                boxShadow: "0 4px 14px rgba(0,0,0,0.3)",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "#7bdff2",
                  transform: "translateY(-2px)",
                },
              }}
            >
              Get Started
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                backgroundColor: "rgba(255,255,255,0.05)",
                p: 4,
                borderRadius: 2,
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
                backdropFilter: "blur(10px)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: "150px",
                  height: "150px",
                  background: "radial-gradient(circle, rgba(76,201,240,0.2) 0%, rgba(76,201,240,0) 70%)",
                  borderRadius: "0 0 0 100%",
                  zIndex: 0,
                }}
              />
              <Box sx={{ position: "relative", zIndex: 1 }}>
                <Box
                  component={FaShoppingCart}
                  sx={{
                    fontSize: 28,
                    color: "#4cc9f0",
                    mb: 2,
                  }}
                />
                <Typography variant="h4" component="h3" gutterBottom fontWeight="bold">
                  E-Commerce Add-On
                </Typography>
                <Typography variant="body1" sx={{ mb: 3 }}>
                  Transform your website into a fully-functional online store:
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <Box component="span" sx={{ mr: 1, color: "#4cc9f0", fontSize: 20 }}>
                        •
                      </Box>
                      <Typography>Shop & Product Pages</Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <Box component="span" sx={{ mr: 1, color: "#4cc9f0", fontSize: 20 }}>
                        •
                      </Box>
                      <Typography>Cart & Checkout</Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <Box component="span" sx={{ mr: 1, color: "#4cc9f0", fontSize: 20 }}>
                        •
                      </Box>
                      <Typography>Category Pages</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <Box component="span" sx={{ mr: 1, color: "#4cc9f0", fontSize: 20 }}>
                        •
                      </Box>
                      <Typography>User Accounts</Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <Box component="span" sx={{ mr: 1, color: "#4cc9f0", fontSize: 20 }}>
                        •
                      </Box>
                      <Typography>Wishlist Feature</Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <Box component="span" sx={{ mr: 1, color: "#4cc9f0", fontSize: 20 }}>
                        •
                      </Box>
                      <Typography>Order Management</Typography>
                    </Box>
                  </Grid>
                </Grid>
                <Box
                  sx={{
                    mt: 3,
                    p: 2,
                    borderRadius: 1,
                    backgroundColor: "rgba(76,201,240,0.1)",
                    display: "flex",
                    alignItems: "center",
                    border: "1px solid rgba(76,201,240,0.3)",
                  }}
                >
                  <MdSpeed style={{ marginRight: "8px", color: "#4cc9f0", fontSize: 22 }} />
                  <Typography variant="body2">Additional 5 days for e-commerce integration</Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

const CMSAddOn = () => {
  return (
    <Box
      sx={{
        py: 8,
        backgroundColor: "#f8f9ff", // Light background
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                borderRadius: "12px",
                p: 4,
                backgroundColor: "white",
                boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                height: "100%",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "6px",
                  background: "linear-gradient(to right, #3a0ca3, #4361ee)",
                }}
              />
              <MdDashboard style={{ fontSize: 32, color: "#3a0ca3", marginBottom: "16px" }} />
              <Typography
                variant="h3"
                component="h2"
                gutterBottom
                sx={{
                  fontWeight: 700,
                  color: "#1a1a2e", // Deep blue text
                }}
              >
                CMS Add-On
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  mb: 3,
                  color: "#4a4a6a",
                }}
              >
                For businesses needing an easy way to update their website content without coding.
              </Typography>

              <Box sx={{ my: 3 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                      <Box
                        component={FaCheck}
                        sx={{
                          mr: 2,
                          color: "#3a0ca3",
                          fontSize: 16,
                          p: 0.5,
                          backgroundColor: "rgba(58,12,163,0.1)",
                          borderRadius: "50%",
                        }}
                      />
                      <Typography>
                        <strong>Admin Dashboard</strong> – Easily update text, images, and pages
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                      <Box
                        component={FaCheck}
                        sx={{
                          mr: 2,
                          color: "#3a0ca3",
                          fontSize: 16,
                          p: 0.5,
                          backgroundColor: "rgba(58,12,163,0.1)",
                          borderRadius: "50%",
                        }}
                      />
                      <Typography>
                        <strong>SEO-friendly structure</strong> – Optimized for search engines
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                      <Box
                        component={FaCheck}
                        sx={{
                          mr: 2,
                          color: "#3a0ca3",
                          fontSize: 16,
                          p: 0.5,
                          backgroundColor: "rgba(58,12,163,0.1)",
                          borderRadius: "50%",
                        }}
                      />
                      <Typography>
                        <strong>User roles & permissions</strong> – Control who can edit or manage content
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                      <Box
                        component={FaCheck}
                        sx={{
                          mr: 2,
                          color: "#3a0ca3",
                          fontSize: 16,
                          p: 0.5,
                          backgroundColor: "rgba(58,12,163,0.1)",
                          borderRadius: "50%",
                        }}
                      />
                      <Typography>
                        <strong>Signup & Login Page</strong> – Allows users to create and manage accounts
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>

              <Box
                sx={{
                  backgroundColor: "rgba(58,12,163,0.05)",
                  p: 2,
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  border: "1px dashed rgba(58,12,163,0.2)",
                }}
              >
                <MdSchedule style={{ marginRight: "12px", color: "#3a0ca3", fontSize: 24 }} />
                <Typography variant="body2" sx={{ color: "#4a4a6a" }}>
                  <strong>Additional CMS-powered pages available</strong> <br />{" "}
                  <strong>Up to 5 days for integration</strong>
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box>
              <Typography
                variant="overline"
                component="div"
                sx={{
                  color: "#3a0ca3",
                  fontWeight: 600,
                  letterSpacing: 2,
                  mb: 1,
                }}
              >
                CONTENT MANAGEMENT
              </Typography>
              <Typography
                variant="h4"
                component="h3"
                gutterBottom
                sx={{
                  fontWeight: 700,
                  color: "#1a1a2e", // Deep blue text
                  mb: 3,
                }}
              >
                Why Choose Our CMS Solution?
              </Typography>

              <Box sx={{ mb: 3 }}>
                <Typography variant="body1" paragraph sx={{ color: "#4a4a6a" }}>
                  Our Content Management System empowers you to take control of your website without any technical
                  knowledge.
                </Typography>

                <Typography variant="body1" paragraph sx={{ color: "#4a4a6a" }}>
                  With an intuitive admin dashboard, you can:
                </Typography>
              </Box>

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Box
                    sx={{
                      mb: 3,
                      p: 3,
                      borderRadius: "12px",
                      boxShadow: "0 6px 20px rgba(0,0,0,0.06)",
                      backgroundColor: "white",
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: "0 12px 28px rgba(0,0,0,0.1)",
                      },
                    }}
                  >
                    <Box sx={{ mb: 2, color: "#3a0ca3" }}>
                      <FaUsersCog style={{ fontSize: 24 }} />
                    </Box>
                    <Typography variant="h6" sx={{ color: "#1a1a2e", mb: 1 }}>
                      Update Content Easily
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#4a4a6a" }}>
                      Change text, images, and add new pages without coding knowledge
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Box
                    sx={{
                      mb: 3,
                      p: 3,
                      borderRadius: "12px",
                      boxShadow: "0 6px 20px rgba(0,0,0,0.06)",
                      backgroundColor: "white",
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: "0 12px 28px rgba(0,0,0,0.1)",
                      },
                    }}
                  >
                    <Box sx={{ mb: 2, color: "#3a0ca3" }}>
                      <FaUsersCog style={{ fontSize: 24 }} />
                    </Box>
                    <Typography variant="h6" sx={{ color: "#1a1a2e", mb: 1 }}>
                      Manage Users
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#4a4a6a" }}>
                      Add team members with specific permissions and access levels
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Box
                    sx={{
                      mb: 3,
                      p: 3,
                      borderRadius: "12px",
                      boxShadow: "0 6px 20px rgba(0,0,0,0.06)",
                      backgroundColor: "white",
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: "0 12px 28px rgba(0,0,0,0.1)",
                      },
                    }}
                  >
                    <Box sx={{ mb: 2, color: "#3a0ca3" }}>
                      <MdAnalytics style={{ fontSize: 24 }} />
                    </Box>
                    <Typography variant="h6" sx={{ color: "#1a1a2e", mb: 1 }}>
                      Track Performance
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#4a4a6a" }}>
                      Built-in analytics to monitor visitor behavior and engagement
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Box
                    sx={{
                      mb: 3,
                      p: 3,
                      borderRadius: "12px",
                      boxShadow: "0 6px 20px rgba(0,0,0,0.06)",
                      backgroundColor: "white",
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: "0 12px 28px rgba(0,0,0,0.1)",
                      },
                    }}
                  >
                    <Box sx={{ mb: 2, color: "#3a0ca3" }}>
                      <MdSchedule style={{ fontSize: 24 }} />
                    </Box>
                    <Typography variant="h6" sx={{ color: "#1a1a2e", mb: 1 }}>
                      Schedule Content
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#4a4a6a" }}>
                      Plan and schedule content updates for future publication
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

const CallToAction = () => {
  return (
    <Box
      sx={{
        py: 10,
        textAlign: "center",
        background: "linear-gradient(135deg, #3a0ca3 0%, #4361ee 100%)", // Matching hero gradient
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Add decorative elements for visual interest */}
      <Box
        sx={{
          position: "absolute",
          top: "10%",
          left: "5%",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)",
          pointerEvents: "none",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "10%",
          right: "5%",
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)",
          pointerEvents: "none",
        }}
      />

      <Container maxWidth="md">
        <Typography
          variant="h3"
          component="h2"
          gutterBottom
          sx={{
            fontWeight: 700,
            mb: 3,
            color: "#ffffff", // White text
            textShadow: "0 2px 10px rgba(0,0,0,0.2)",
          }}
        >
          Ready to Start Your Digital Journey?
        </Typography>
        <Typography
          variant="h6"
          sx={{
            maxWidth: 700,
            mx: "auto",
            mb: 5,
            color: "rgba(255,255,255,0.9)", // Semi-transparent white
          }}
        >
          Let's discuss your project and find the perfect solution for your business needs.
        </Typography>
        <Button
          variant="contained"
          size="large"
          component={RouterLink}
          to="/contact"
          startIcon={<FaRocket />}
          sx={{
            px: 5,
            py: 1.5,
            backgroundColor: "#ffffff",
            color: "#3a0ca3",
            fontWeight: "bold",
            borderRadius: "8px",
            boxShadow: "0 4px 14px rgba(0,0,0,0.2)",
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: "#f0f0ff",
              transform: "translateY(-3px)",
              boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
            },
          }}
        >
          Contact Us
        </Button>
      </Container>
    </Box>
  )
}

const Home = () => {
  return (
    <>
      <Hero />
      <Services />
      <HostingPlans />
      <WebsitePackage />
      <CMSAddOn />
      <CallToAction />
    </>
  )
}

export default Home
