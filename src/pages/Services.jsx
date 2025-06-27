import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material"
import { Link as RouterLink } from "react-router-dom"
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline"
import ComputerIcon from "@mui/icons-material/Computer"
import DevicesIcon from "@mui/icons-material/Devices"
import StorageIcon from "@mui/icons-material/Storage"
import BrushIcon from "@mui/icons-material/Brush"
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid"
import DesignServicesIcon from "@mui/icons-material/DesignServices"
import BugReportIcon from "@mui/icons-material/BugReport"
import devImage from "../assets/dev.jpg"
import appImage from "../assets/app.jpg"
import uiImage from "../assets/ui.jpg"
import testImage from "../assets/test.jpg" // Placeholder for testing services image
import ServiceCard from "../components/ServiceCard"
import SEOHelmet from "../components/SEOHelmet"
const ServicesHero = () => {
  return (
    <Box
      component="section"
      sx={{
        background: "linear-gradient(135deg, #002244 0%, #001a33 100%)",
        color: "white",
        py: 8,
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant="h1"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 700,
            mb: 3,
            fontSize: { xs: "2.2rem", md: "3.2rem" },
          }}
        >
          Affordable Digital Services
        </Typography>
        <Typography
          variant="h2"
          component="h2"
          sx={{
            maxWidth: 700,
            mx: "auto",
            mb: 4,
            opacity: 0.9,
            fontSize: { xs: "1.2rem", md: "1.5rem" },
          }}
        >
          Budget-friendly web development, mobile apps, and digital solutions for businesses of all sizes
        </Typography>
      </Container>
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: "radial-gradient(rgba(240,248,255,0.05) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
          pointerEvents: "none",
        }}
      />
    </Box>
  )
}

const ServicesList = () => {
  const services = [
    {
      title: "Affordable Website Development",
      description:
        "Custom responsive websites built to match your brand and meet your business goals at competitive prices.",
      icon: ComputerIcon,
      link: "/services",
    },
    {
      title: "Budget Mobile Apps",
      description:
        "Native and cross-platform mobile applications for iOS and Android devices without breaking the bank.",
      icon: DevicesIcon,
      link: "/services",
    },
    {
      title: "Cheap Web Hosting",
      description: "Fast, secure and reliable hosting solutions with 99.9% uptime guarantee at affordable rates.",
      icon: StorageIcon,
      link: "/services",
    },
    {
      title: "Cost-Effective UI/UX",
      description: "Expert consultation to enhance user experience and interface design within your budget.",
      icon: BrushIcon,
      link: "/services",
    },
  ]

  return (
    <Box component="section" sx={{ py: 8, backgroundColor: "#F0F8FF" }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            variant="h2"
            component="h2"
            gutterBottom
            sx={{
              fontWeight: 700,
              mb: 2,
              color: "#002244",
            }}
          >
            Our Affordable Services
          </Typography>
          <Typography
            variant="h3"
            component="h3"
            sx={{
              maxWidth: 800,
              mx: "auto",
              color: "rgba(0,34,68,0.8)",
              fontSize: { xs: "1.2rem", md: "1.5rem" },
            }}
          >
            Professional digital solutions that fit your budget
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

const WebDevelopment = () => {
  return (
    <Box component="section" sx={{ py: 8, backgroundColor: "white" }}>
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box //dev image
              component="img"
              src={devImage}
              alt="Affordable custom website development services by Malloya Group"
              sx={{
                width: "100%",
                borderRadius: 2,
                boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <ComputerIcon sx={{ fontSize: 32, mr: 2, color: "#002244" }} />
              <Typography variant="h3" component="h2" fontWeight="bold" color="#002244">
                Affordable Website Development
              </Typography>
            </Box>
            <Typography
              variant="h4"
              component="h4"
              sx={{
                mb: 3,
                fontWeight: "medium",
                color: "rgba(0,34,68,0.8)",
                fontSize: { xs: "1.1rem", md: "1.25rem" },
              }}
            >
              Custom websites that drive results without breaking your budget
            </Typography>
            <Typography variant="body1" paragraph color="rgba(0,34,68,0.8)">
              We create stunning, responsive websites tailored to your business needs at competitive prices. Our
              development process focuses on creating user-friendly, high-performing sites that help you achieve your
              goals affordably.
            </Typography>

            <List disablePadding>
              {[
                "Budget-friendly 4-page websites to full e-commerce stores",
                "Custom CMS development at affordable rates",
                "Booking systems & payment gateways integration",
                "Appointment scheduling & user management",
                "Mobile-responsive design included",
                "SEO optimization for better search rankings",
              ].map((item, index) => (
                <ListItem key={index} disableGutters sx={{ py: 1 }}>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <CheckCircleOutlineIcon sx={{ color: "#002244" }} />
                  </ListItemIcon>
                  <ListItemText primary={item} sx={{ color: "rgba(0,34,68,0.8)" }} />
                </ListItem>
              ))}
            </List>

            <Button
              variant="contained"
              size="large"
              component={RouterLink}
              to="/contact"
              sx={{
                mt: 3,
                backgroundColor: "#002244",
                color: "white",
                "&:hover": {
                  backgroundColor: "#001a33",
                },
              }}
              aria-label="Start your affordable website project"
            >
              Get Free Quote
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

const MobileAppDevelopment = () => {
  return (
    <Box component="section" sx={{ py: 8, backgroundColor: "#F0F8FF" }}>
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center" direction={{ xs: "column-reverse", md: "row" }}>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <PhoneAndroidIcon sx={{ fontSize: 32, mr: 2, color: "#002244" }} />
              <Typography variant="h3" component="h2" fontWeight="bold" color="#002244">
                Budget Mobile App Development
              </Typography>
            </Box>
            <Typography
              variant="h4"
              component="h4"
              sx={{
                mb: 3,
                fontWeight: "medium",
                color: "rgba(0,34,68,0.8)",
                fontSize: { xs: "1.1rem", md: "1.25rem" },
              }}
            >
              Affordable native and cross-platform apps for iOS and Android
            </Typography>
            <Typography variant="body1" paragraph color="rgba(0,34,68,0.8)">
              We design and develop cost-effective mobile applications that deliver exceptional user experiences across
              all devices. Our affordable mobile solutions help businesses engage customers without overspending.
            </Typography>

            <List disablePadding>
              {[
                "Budget-friendly native iOS and Android development",
                "Affordable cross-platform solutions (React Native, Flutter)",
                "UI/UX design optimized for mobile at competitive rates",
                "Integration with existing systems",
                "Ongoing maintenance and support packages",
              ].map((item, index) => (
                <ListItem key={index} disableGutters sx={{ py: 1 }}>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <CheckCircleOutlineIcon sx={{ color: "#002244" }} />
                  </ListItemIcon>
                  <ListItemText primary={item} sx={{ color: "rgba(0,34,68,0.8)" }} />
                </ListItem>
              ))}
            </List>

            <Button
              variant="contained"
              size="large"
              component={RouterLink}
              to="/contact"
              sx={{
                mt: 3,
                backgroundColor: "#002244",
                color: "white",
                "&:hover": {
                  backgroundColor: "#001a33",
                },
              }}
              aria-label="Discuss your affordable mobile app project"
            >
              Get App Quote
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src={appImage}
              alt="Affordable mobile app development for iOS and Android"
              sx={{
                width: "100%",
                borderRadius: 2,
                boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

const UXConsultation = () => {
  return (
    <Box component="section" sx={{ py: 8, backgroundColor: "white" }}>
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src={uiImage}
              alt="Affordable UI/UX consultation and design services"
              sx={{
                width: "100%",
                borderRadius: 2,
                boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <DesignServicesIcon sx={{ fontSize: 32, mr: 2, color: "#002244" }} />
              <Typography variant="h3" component="h2" fontWeight="bold" color="#002244">
                Affordable UI/UX Consultation
              </Typography>
            </Box>
            <Typography
              variant="h4"
              component="h4"
              sx={{
                mb: 3,
                fontWeight: "medium",
                color: "rgba(0,34,68,0.8)",
                fontSize: { xs: "1.1rem", md: "1.25rem" },
              }}
            >
              Create intuitive, user-centered designs within your budget
            </Typography>
            <Typography variant="body1" paragraph color="rgba(0,34,68,0.8)">
              Our cost-effective UI/UX consultations help you create digital products that users love without expensive
              overhead. We focus on user research, intuitive interfaces, and seamless experiences to increase engagement
              and conversion.
            </Typography>

            <List disablePadding>
              {[
                "Budget-friendly user research and persona development",
                "Affordable wireframing and prototyping",
                "Cost-effective usability testing and analysis",
                "Visual design and branding at competitive rates",
                "Accessibility compliance within budget",
              ].map((item, index) => (
                <ListItem key={index} disableGutters sx={{ py: 1 }}>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <CheckCircleOutlineIcon sx={{ color: "#002244" }} />
                  </ListItemIcon>
                  <ListItemText primary={item} sx={{ color: "rgba(0,34,68,0.8)" }} />
                </ListItem>
              ))}
            </List>

            <Button
              variant="contained"
              size="large"
              component={RouterLink}
              to="/contact"
              sx={{
                mt: 3,
                backgroundColor: "#002244",
                color: "white",
                "&:hover": {
                  backgroundColor: "#001a33",
                },
              }}
              aria-label="Book affordable UI/UX consultation"
            >
              Book Consultation
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

const TestingServices = () => {
  return (
    <Box component="section" sx={{ py: 8, backgroundColor: "#F0F8FF" }}>
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center" direction={{ xs: "column-reverse", md: "row" }}>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <BugReportIcon sx={{ fontSize: 32, mr: 2, color: "#002244" }} />
              <Typography variant="h3" component="h2" fontWeight="bold" color="#002244">
                Affordable Testing Services
              </Typography>
            </Box>
            <Typography
              variant="h4"
              component="h4"
              sx={{
                mb: 3,
                fontWeight: "medium",
                color: "rgba(0,34,68,0.8)",
                fontSize: { xs: "1.1rem", md: "1.25rem" },
              }}
            >
              Ensure quality and performance without high costs
            </Typography>
            <Typography variant="body1" paragraph color="rgba(0,34,68,0.8)">
              Our comprehensive yet affordable testing services ensure your digital products work flawlessly across all
              devices and scenarios. We identify and fix issues before they impact your users, all within your budget.
            </Typography>

            <List disablePadding>
              {[
                "Budget-friendly functional and regression testing",
                "Affordable performance and load testing",
                "Cross-browser and cross-device testing",
                "Cost-effective security and penetration testing",
                "Automated testing solutions at competitive rates",
              ].map((item, index) => (
                <ListItem key={index} disableGutters sx={{ py: 1 }}>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <CheckCircleOutlineIcon sx={{ color: "#002244" }} />
                  </ListItemIcon>
                  <ListItemText primary={item} sx={{ color: "rgba(0,34,68,0.8)" }} />
                </ListItem>
              ))}
            </List>

            <Button
              variant="contained"
              size="large"
              component={RouterLink}
              to="/contact"
              sx={{
                mt: 3,
                backgroundColor: "#002244",
                color: "white",
                "&:hover": {
                  backgroundColor: "#001a33",
                },
              }}
              aria-label="Get affordable testing services quote"
            >
              Get Testing Quote
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src={testImage}
              alt="Affordable website and app testing services"
              sx={{
                width: "100%",
                borderRadius: 2,
                boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

const ProcessSection = () => {
  const steps = [
    {
      title: "Discovery",
      description:
        "We start by understanding your business needs, goals and budget to create a tailored affordable strategy.",
    },
    {
      title: "Planning & Design",
      description:
        "Our team develops cost-effective wireframes, mockups and prototypes to visualize the solution before development begins.",
    },
    {
      title: "Development",
      description:
        "We build your digital product using the latest technologies and best practices for optimal performance within budget.",
    },
    {
      title: "Testing",
      description:
        "Rigorous yet affordable testing ensures your product works flawlessly across all devices and scenarios.",
    },
    {
      title: "Deployment",
      description:
        "We launch your product efficiently and provide training to ensure a smooth, cost-effective transition.",
    },
    {
      title: "Support",
      description:
        "Our team offers ongoing maintenance and support packages to keep your digital products running smoothly.",
    },
  ]

  return (
    <Box component="section" sx={{ py: 8, backgroundColor: "white" }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            variant="h2"
            component="h2"
            gutterBottom
            sx={{
              fontWeight: 700,
              mb: 2,
              color: "#002244",
            }}
          >
            Our Affordable Development Process
          </Typography>
          <Typography
            variant="h3"
            component="h3"
            sx={{
              maxWidth: 800,
              mx: "auto",
              color: "rgba(0,34,68,0.8)",
              fontSize: { xs: "1.2rem", md: "1.5rem" },
            }}
          >
            A structured, budget-friendly approach to deliver quality digital solutions
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {steps.map((step, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                elevation={0}
                sx={{
                  height: "100%",
                  borderRadius: 2,
                  border: "1px solid rgba(0,34,68,0.1)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 10px 30px rgba(0,34,68,0.1)",
                  },
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 48,
                      height: 48,
                      borderRadius: "50%",
                      backgroundColor: "#002244",
                      color: "white",
                      fontWeight: "bold",
                      fontSize: 20,
                      mb: 2,
                    }}
                  >
                    {index + 1}
                  </Box>
                  <Typography variant="h5" component="h3" gutterBottom fontWeight="bold" color="#002244">
                    {step.title}
                  </Typography>
                  <Typography color="rgba(0,34,68,0.8)">{step.description}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}

const ServicesCTA = () => {
  return (
    <Box
      component="section"
      sx={{
        background: "linear-gradient(135deg, #002244 0%, #001a33 100%)",
        color: "white",
        py: 8,
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant="h3"
          component="h2"
          gutterBottom
          sx={{
            fontWeight: 700,
            mb: 3,
          }}
        >
          Let's Build Your Next Affordable Digital Project
        </Typography>
        <Typography
          variant="h4"
          component="h4"
          sx={{
            maxWidth: 700,
            mx: "auto",
            mb: 4,
            opacity: 0.9,
            fontSize: { xs: "1.1rem", md: "1.25rem" },
          }}
        >
          Contact us today to discuss your requirements and get a free consultation for budget-friendly solutions
        </Typography>
        <Button
          variant="contained"
          size="large"
          component={RouterLink}
          to="/contact"
          sx={{
            px: 5,
            py: 1.5,
            backgroundColor: "#F0F8FF",
            color: "#002244",
            "&:hover": {
              backgroundColor: "#d7e9fa",
            },
          }}
          aria-label="Contact us for affordable digital services"
        >
          Get Free Quote
        </Button>
      </Container>
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: "radial-gradient(rgba(240,248,255,0.05) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
          pointerEvents: "none",
        }}
      />
    </Box>
  )
}

const Services = () => {
  return (
    <>
      <SEOHelmet
        title="Affordable Web Development Services | Budget Website Design | Malloya Group"
        description="Professional web development, mobile apps, and digital services at affordable prices. Custom websites starting from 4 pages. Get your free quote online today!"
        keywords="affordable web development, cheap website design, budget mobile apps, cost-effective digital services, professional web development, affordable hosting, cheap UI/UX design"
        canonical="https://malloyagroup.com/services"
      />
      <ServicesHero />
      <ServicesList />
      <WebDevelopment />
      <MobileAppDevelopment />
      <UXConsultation />
      <TestingServices />
      <ProcessSection />
      <ServicesCTA />
    </>
  )
}

export default Services
