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
import SEOHelmet from "../components/SEOHelmet"

// Import components
import ServiceCard from "../components/ServiceCard"
import HostingPlans from "../components/HostingPlans"

const Hero = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))

  return (
    <Box
      component="section"
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
              Affordable Custom Websites That Drive Results
            </Typography>
            <Typography
              variant="h2"
              component="h2"
              sx={{
                fontWeight: 400,
                fontSize: { xs: "1.2rem", md: "1.5rem" },
                mb: 4,
                opacity: 0.9,
                maxWidth: "90%",
              }}
            >
              Professional web development, mobile apps & hosting solutions starting from just 4 pages. Get your free
              quote online today!
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
                aria-label="Get a free quote for affordable website development"
              >
                Get Free Quote
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
                aria-label="View our affordable web development services"
              >
                Our Services
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} sx={{ display: { xs: "none", md: "block" } }}>
            <Box
              component="img"
              src={heroImage}
              alt="Affordable custom website development and digital solutions by Malloya Group"
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
      title: "Affordable Website Development",
      description:
        "Custom responsive websites built to match your brand and meet your business goals. Starting from just 4 pages with fast delivery.",
      icon: FaLaptopCode,
      link: "/services",
    },
    {
      title: "Mobile Apps",
      description: "Native and cross-platform mobile applications for iOS and Android devices at competitive prices.",
      icon: FaMobileAlt,
      link: "/services",
    },
    {
      title: "Budget-Friendly Web Hosting",
      description: "Fast, secure and reliable hosting solutions with 99.9% uptime guarantee at affordable rates.",
      icon: FaServer,
      link: "/services",
    },
    {
      title: "UI/UX Consultation",
      description: "Expert consultation to enhance user experience and interface design without breaking the budget.",
      icon: FaPaintBrush,
      link: "/services",
    },
  ]

  return (
    <Box component="section" sx={{ py: 8, backgroundColor: "#f8f9ff" }}>
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
            AFFORDABLE SOLUTIONS
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
            Our Budget-Friendly Services
          </Typography>
          <Typography
            variant="h3"
            component="h3"
            sx={{
              maxWidth: 700,
              mx: "auto",
              color: "#4a4a6a",
              mt: 3,
              fontSize: { xs: "1.2rem", md: "1.5rem" },
            }}
          >
            Professional digital solutions that won't break your budget
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
      component="section"
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
              MOST AFFORDABLE PACKAGE
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
              Budget-Friendly Website Package
            </Typography>
            <Typography
              variant="h4"
              component="h4"
              gutterBottom
              sx={{ opacity: 0.9, mb: 3, fontSize: { xs: "1.1rem", md: "1.25rem" } }}
            >
              Professional 4-page website with all essential features at an unbeatable price
            </Typography>
            <Box sx={{ my: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Box component={FaCheck} sx={{ mr: 2, color: "#4cc9f0", fontSize: 18 }} />
                    <Typography>Mobile-responsive design</Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Box component={FaCheck} sx={{ mr: 2, color: "#4cc9f0", fontSize: 18 }} />
                    <Typography>Professional UI customization</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Box component={FaCheck} sx={{ mr: 2, color: "#4cc9f0", fontSize: 18 }} />
                    <Typography>SEO-optimized structure</Typography>
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
              <strong>Fast Delivery:</strong> 3-5 business days
              <br />
              <strong>Affordable Pricing:</strong> Additional pages available upon request
              <br />
              <strong>Free Quote:</strong> Get your custom quote online today
            </Typography>
            <Button
              variant="contained"
              size="large"
              component={RouterLink}
              to="/quote"
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
              aria-label="Get free quote for affordable website package"
            >
              Get Free Quote Now
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
                  Affordable E-Commerce Add-On
                </Typography>
                <Typography variant="body1" sx={{ mb: 3 }}>
                  Transform your budget website into a cost-effective online store:
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
                      <Typography>Secure Cart & Checkout</Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <Box component="span" sx={{ mr: 1, color: "#4cc9f0", fontSize: 20 }}>
                        •
                      </Box>
                      <Typography>Category Management</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <Box component="span" sx={{ mr: 1, color: "#4cc9f0", fontSize: 20 }}>
                        •
                      </Box>
                      <Typography>User Account System</Typography>
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
                  <Typography variant="body2">
                    Budget-friendly pricing with just 5 additional days for e-commerce integration
                  </Typography>
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
      component="section"
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
                Affordable CMS Add-On
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  mb: 3,
                  color: "#4a4a6a",
                }}
              >
                Perfect for budget-conscious businesses needing an easy way to update their website content without
                coding knowledge.
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
                        <strong>User-Friendly Admin Dashboard</strong> – Easily update text, images, and pages
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
                        <strong>SEO-optimized structure</strong> – Built for search engine visibility
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
                        <strong>Signup & Login Pages</strong> – Allows users to create and manage accounts
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
                  <strong>Cost-effective CMS solution</strong> <br />{" "}
                  <strong>Only 5 additional days for integration</strong>
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
                BUDGET-FRIENDLY CONTENT MANAGEMENT
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
                Why Choose Our Affordable CMS Solution?
              </Typography>

              <Box sx={{ mb: 3 }}>
                <Typography variant="body1" paragraph sx={{ color: "#4a4a6a" }}>
                  Our budget-friendly Content Management System empowers you to take control of your website without any
                  technical knowledge or expensive ongoing costs.
                </Typography>

                <Typography variant="body1" paragraph sx={{ color: "#4a4a6a" }}>
                  With our intuitive admin dashboard, you can manage your affordable website easily:
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
                      Easy Content Updates
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#4a4a6a" }}>
                      Change text, images, and add new pages without coding knowledge or additional costs
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
                      User Management
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#4a4a6a" }}>
                      Add team members with specific permissions and access levels at no extra cost
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
                      Performance Tracking
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#4a4a6a" }}>
                      Built-in analytics to monitor visitor behavior and engagement on your affordable website
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
                      Content Scheduling
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#4a4a6a" }}>
                      Plan and schedule content updates for future publication without ongoing fees
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
      component="section"
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
          Ready to Get Your Affordable Website?
        </Typography>
        <Typography
          variant="h4"
          component="h4"
          sx={{
            maxWidth: 700,
            mx: "auto",
            mb: 5,
            color: "rgba(255,255,255,0.9)", // Semi-transparent white
            fontSize: { xs: "1.1rem", md: "1.25rem" },
          }}
        >
          Get your free quote today and start your digital journey with budget-friendly professional web development.
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
          aria-label="Contact us for affordable website development"
        >
          Get Free Quote Now
        </Button>
      </Container>
    </Box>
  )
}

const Home = () => {
  return (
    <>
      <SEOHelmet />
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
