"use client"
import { Box, Container, Typography, Button, Grid, useMediaQuery, useTheme, Stack, Chip } from "@mui/material"
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
  FaArrowRight
} from "react-icons/fa"
import { MdSpeed, MdDashboard, MdSchedule, MdAnalytics, MdSecurity, MdSupportAgent } from "react-icons/md"
import heroImage from "../assets/hero.png"
import SEOHelmet from "../components/SEOHelmet"
import { motion } from "framer-motion"

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
        background: "#ffffff",
        color: "#1e293b",
        pt: { xs: 10, md: 5 },
        pb: { xs: 10, md: 5 },
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Animated Shapes */}
      <Box 
        component={motion.div}
        animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        sx={{
          position: "absolute",
          top: "10%",
          right: "5%",
          width: "40vw",
          height: "40vw",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(59, 130, 246, 0.05) 0%, rgba(59, 130, 246, 0) 70%)",
          filter: "blur(80px)",
          zIndex: 0
        }}
      />

      <Box 
        component={motion.div}
        animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        sx={{
          position: "absolute",
          bottom: "10%",
          left: "10%",
          width: "30vw",
          height: "30vw",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(236, 72, 153, 0.05) 0%, rgba(236, 72, 153, 0) 70%)",
          filter: "blur(80px)",
          zIndex: 0
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Chip 
                label="Available for new projects" 
                color="success" 
                variant="outlined"
                size="small"
                sx={{ 
                  mb: 2.5, 
                  color: '#0ea5e9', 
                  borderColor: 'rgba(14, 165, 233, 0.3)',
                  fontWeight: 600,
                  bgcolor: 'rgba(14, 165, 233, 0.1)',
                  backdropFilter: 'blur(10px)'
                }} 
              />
              <Typography
                variant="h1"
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: "2.2rem", md: "3.2rem" },
                  lineHeight: 1.15,
                  mb: 2,
                  letterSpacing: "-0.5px",
                  textShadow: "0 2px 20px rgba(255,255,255,0.5)"
                }}
              >
                We Build <span style={{ 
                  background: "linear-gradient(90deg, #f97316, #ec4899)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent"
                }}>Digital</span> <br/>
                <span style={{ 
                  background: "none",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "#475569"
                 }}>Experiences.</span>
              </Typography>
              
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 400,
                  color: "#475569",
                  mb: 4,
                  maxWidth: "90%",
                  lineHeight: 1.5,
                  fontSize: { xs: "1rem", md: "1.15rem" }
                }}
              >
                Professional web development, mobile apps & hosting solutions. 
                Transform ideas into powerful software starting from R2,500.
              </Typography>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <Button
                  variant="contained"
                  size="large"
                  component={RouterLink}
                  to="/quote"
                  endIcon={<FaArrowRight />}
                  sx={{
                    px: 4,
                    py: 1.6,
                    background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
                    color: "white",
                    fontSize: "0.95rem",
                    fontWeight: 700,
                    borderRadius: "50px",
                    textTransform: "none",
                    boxShadow: "0 8px 25px rgba(59, 130, 246, 0.3)",
                    "&:hover": {
                      background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
                      transform: "translateY(-2px)",
                      boxShadow: "0 12px 30px rgba(59, 130, 246, 0.4)",
                    },
                  }}
                >
                  Start Your Project
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  component={RouterLink}
                  to="/projects"
                  sx={{
                    px: 4,
                    py: 1.6,
                    borderColor: "rgba(59, 130, 246, 0.3)",
                    color: "#3b82f6",
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    borderRadius: "50px",
                    textTransform: "none",
                    backdropFilter: "blur(10px)",
                    bgcolor: "rgba(59, 130, 246, 0.05)",
                    "&:hover": {
                      borderColor: "#3b82f6",
                      bgcolor: "rgba(59, 130, 246, 0.1)",
                    },
                  }}
                >
                  View Portfolio
                </Button>
              </Stack>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={6} sx={{ display: { xs: "none", md: "block" } }}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Box
                component="img"
                src={heroImage}
                alt="Web Development Agency"
                sx={{
                  width: "100%",
                  maxWidth: "600px",
                  filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.2))",
                  transform: "perspective(1000px) rotateY(-5deg)",
                }}
              />
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

const Services = () => {
  const services = [
    {
      title: "Custom Websites",
      description: "Tailor-made responsive websites built with modern technologies like React and Next.js.",
      icon: FaLaptopCode,
      link: "/services",
    },
    {
      title: "Mobile Applications",
      description: "Native and cross-platform mobile apps for iOS and Android that deliver seamless experiences.",
      icon: FaMobileAlt,
      link: "/services",
    },
    {
      title: "Cloud Hosting",
      description: "Secure, high-speed hosting infrastructure with 99.9% uptime and 24/7 monitoring.",
      icon: FaServer,
      link: "/services",
    },
    {
      title: "UI/UX Design",
      description: "User-centered design that combines aesthetics with functionality for higher conversion.",
      icon: FaPaintBrush,
      link: "/services",
    },
  ]

  return (
    <Box component="section" sx={{ py: 10, bgcolor: "#f8f9fa" }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: 7 }}>
          <Typography variant="overline" sx={{ color: "#3b82f6", fontWeight: 700, letterSpacing: 2, fontSize: "0.75rem" }}>
            WHAT WE DO
          </Typography>
          <Typography variant="h2" sx={{ fontWeight: 800, mt: 1, mb: 1.5, color: "#0f172a", fontSize: { xs: "1.75rem", md: "2.2rem" } }}>
            Full-Cycle Development Services
          </Typography>
          <Typography variant="body1" sx={{ color: "#64748b", maxWidth: 600, mx: "auto", fontSize: "1rem" }}>
            From concept to deployment, we handle every aspect of your digital presence.
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
                buttonText="Discover"
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}

const FeatureSection = () => {
  return (
    <Box sx={{ py: 10, bgcolor: "white" }}>
      <Container maxWidth="lg">
        <Grid container spacing={8} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box sx={{ position: "relative" }}>
              <Box 
                sx={{ 
                  background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)", 
                  borderRadius: "20px", 
                  p: 4, 
                  color: "white",
                  boxShadow: "0 20px 40px rgba(59, 130, 246, 0.25)",
                  position: "relative",
                  zIndex: 2
                }}
              >
                <Typography variant="h4" fontWeight="700" sx={{ mb: 2.5, fontSize: "1.6rem" }}>
                  Starter Package
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.9, mb: 3.5, fontSize: "0.95rem" }}>
                  Everything you need to launch your professional presence online.
                </Typography>
                
                <Stack spacing={1.8}>
                  {[
                    "4 Custom Designed Pages",
                    "Mobile Responsive Layout",
                    "SEO Optimization",
                    "Contact Form Integration",
                    "Social Media Links",
                    "3-5 Days Delivery"
                  ].map((item, i) => (
                    <Box key={i} sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                      <Box sx={{ bgcolor: "rgba(255,255,255,0.2)", p: 0.5, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <FaCheck size={10} />
                      </Box>
                      <Typography variant="body2" fontWeight="500" sx={{ fontSize: "0.9rem" }}>{item}</Typography>
                    </Box>
                  ))}
                </Stack>

                <Button 
                  variant="contained" 
                  component={RouterLink}
                  to="/quote"
                  fullWidth 
                  sx={{ 
                    mt: 3.5, 
                    bgcolor: "white", 
                    color: "#3b82f6", 
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    py: 1.3,
                    "&:hover": { bgcolor: "#f1f5f9" }
                  }}
                >
                  Get Started
                </Button>
              </Box>
              {/* Decorative backing */}
              <Box 
                sx={{ 
                  position: "absolute", 
                  top: 25, 
                  left: 25, 
                  width: "100%", 
                  height: "100%", 
                  bgcolor: "#e2e8f0", 
                  borderRadius: "20px", 
                  zIndex: 1 
                }} 
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="overline" sx={{ color: "#3b82f6", fontWeight: 700, letterSpacing: 2, fontSize: "0.75rem" }}>
              BEST VALUE
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 800, mt: 1, mb: 2.5, color: "#0f172a", fontSize: { xs: "1.6rem", md: "2rem" } }}>
              Professional Website Package
            </Typography>
            <Typography variant="body1" sx={{ color: "#64748b", mb: 3.5, fontSize: "1rem", lineHeight: 1.6 }}>
              Perfect for small businesses, startups, and personal brands. We deliver a fully functional, aesthetically pleasing website that converts visitors into customers.
            </Typography>
            
            <Grid container spacing={3} sx={{ mb: 3.5 }}>
               <Grid item xs={12} sm={6}>
                  <Box sx={{ display: "flex", gap: 1.5 }}>
                    <MdSpeed size={26} color="#3b82f6" />
                    <Box>
                      <Typography variant="subtitle1" fontWeight="700" sx={{ fontSize: "0.95rem" }}>Fast Performance</Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.85rem" }}>Optimized for speed and core web vitals.</Typography>
                    </Box>
                  </Box>
               </Grid>
               <Grid item xs={12} sm={6}>
                  <Box sx={{ display: "flex", gap: 1.5 }}>
                    <MdSecurity size={26} color="#3b82f6" />
                    <Box>
                      <Typography variant="subtitle1" fontWeight="700" sx={{ fontSize: "0.95rem" }}>Secure & Safe</Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.85rem" }}>SSL certificates and secure coding practices.</Typography>
                    </Box>
                  </Box>
               </Grid>
            </Grid>
            
            <Button 
              component={RouterLink} 
              to="/services" 
              endIcon={<FaArrowRight />}
              sx={{ color: "#3b82f6", fontWeight: 600, fontSize: "0.9rem" }}
            >
              Compare all packages
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

const EcommerceSection = () => {
  return (
    <Box sx={{ py: 10, bgcolor: "#1e293b", color: "white", position: "relative", overflow: "hidden" }}>
       {/* Background Pattern */}
       <Box sx={{ 
         position: "absolute", 
         top: 0, 
         left: 0, 
         right: 0, 
         bottom: 0, 
         opacity: 0.03,
         backgroundImage: "linear-gradient(30deg, #ffffff 12%, transparent 12.5%, transparent 87%, #ffffff 87.5%, #ffffff), linear-gradient(150deg, #ffffff 12%, transparent 12.5%, transparent 87%, #ffffff 87.5%, #ffffff), linear-gradient(30deg, #ffffff 12%, transparent 12.5%, transparent 87%, #ffffff 87.5%, #ffffff), linear-gradient(150deg, #ffffff 12%, transparent 12.5%, transparent 87%, #ffffff 87.5%, #ffffff), linear-gradient(60deg, #777777 25%, transparent 25.5%, transparent 75%, #777777 75%, #777777), linear-gradient(60deg, #777777 25%, transparent 25.5%, transparent 75%, #777777 75%, #777777)",
         backgroundSize: "80px 140px",
         backgroundPosition: "0 0, 0 0, 40px 70px, 40px 70px, 0 0, 40px 70px"
       }} />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Box sx={{ textAlign: "center", mb: 7 }}>
          <Typography variant="overline" sx={{ color: "#a78bfa", fontWeight: 700, letterSpacing: 2, fontSize: "0.75rem" }}>
            E-COMMERCE & CMS
          </Typography>
          <Typography variant="h2" sx={{ fontWeight: 800, mt: 1, mb: 1.5, fontSize: { xs: "1.75rem", md: "2.2rem" } }}>
            Scale Your Business Online
          </Typography>
          <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.7)", maxWidth: 700, mx: "auto", fontSize: "1rem" }}>
            Powerful online stores and content management systems that put you in control.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <ServiceCard
              title="E-Commerce Solutions"
              description="Full-featured online stores with secure payments, inventory management, and order tracking. Start selling to the world."
              icon={FaShoppingCart}
              variant="dark"
              buttonText="View Features"
              link="/services"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <ServiceCard
              title="Content Management Systems"
              description="Easy-to-use dashboards that let you update your content, blog posts, and images without writing a line of code."
              icon={MdDashboard}
              variant="dark"
              buttonText="Explore CMS"
              link="/services"
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

const CallToAction = () => {
  return (
    <Box sx={{ 
      py: 8, 
      background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)", 
      color: "white", 
      textAlign: "center" 
    }}>
      <Container maxWidth="md">
        <Typography variant="h3" sx={{ fontWeight: 800, mb: 2.5, fontSize: { xs: "1.75rem", md: "2.2rem" } }}>
          Ready to Transform Your Digital Presence?
        </Typography>
        <Typography variant="h6" sx={{ mb: 4, opacity: 0.9, fontWeight: 400, fontSize: { xs: "1rem", md: "1.1rem" } }}>
          Join hundreds of satisfied clients who trust Malloya Group with their web development needs.
        </Typography>
        <Button
          variant="contained"
          size="large"
          component={RouterLink}
          to="/contact"
          sx={{
            bgcolor: "white",
            color: "#3b82f6",
            px: 5,
            py: 1.8,
            fontSize: "1rem",
            fontWeight: 700,
            borderRadius: "50px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
            "&:hover": {
              bgcolor: "#f8f9fa",
              transform: "scale(1.05)"
            }
          }}
        >
          Get Your Free Quote
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
      <FeatureSection />
      <HostingPlans />
      <EcommerceSection />
      <CallToAction />
    </>
  )
}

export default Home