import { Helmet } from "react-helmet-async"

const SEOHelmet = ({
  title = "Affordable Website Development | Custom Web Design | Malloya Group",
  description = "Get affordable custom websites starting from just 4 pages. Professional web development, mobile apps, and hosting solutions. Free quote available online. Fast delivery in 3-5 business days.",
  keywords = "affordable websites, cheap web design, custom website development, mobile responsive design, web hosting, free website quote, professional web development, small business websites, e-commerce development, CMS websites",
  canonical = "https://malloyagroup.com",
  ogImage = "https://malloyagroup.com/src/assets/hero.png",
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={canonical} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  )
}

export default SEOHelmet
