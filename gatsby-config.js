/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */

/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp', // Needed for dynamic images
    'gatsby-plugin-netlify',

    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `galeria-de-fotos`,
        path: `${__dirname}/src/galeria-de-fotos/`,
      },
    },

    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `documents`,
        path: `${__dirname}/src/markdown/`,
      },
    },

    {
      resolve: `gatsby-transformer-remark`,
      options: {},
    },

  ],
  siteMetadata: {
    title: 'Tomate Azul',
    description: 'Com Amor.',
    origin: 'http://tomateazul.barretolopes.com'
  },
  
  // this is for gh-pages deployment
  pathPrefix: "/ibpg-site"
}


