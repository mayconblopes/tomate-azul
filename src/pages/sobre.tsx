import React from 'react'
import Layout from '../components/Layout'
import { graphql } from 'gatsby'
import { display } from '@mui/system'

export default function Sobre({ data }: any) {
  const sobre = data.allMarkdownRemark.nodes

  return (
    <Layout>
      <h1
        style={{
          fontWeight: 'bold',
          textAlign: 'center',
          fontSize: '20px',
          marginTop: '20px',
          marginBottom: '10px',
        }}
      >
        SOBRE A IBPG
      </h1>
      <div style={{ marginLeft: '20px', marginRight: '20px' }}>
        <div
          className='beautifulText'
          dangerouslySetInnerHTML={{ __html: sobre[0].html }}
        />
      </div>
    </Layout>
  )
}

export const query = graphql`
  query SobreQuery {
    allMarkdownRemark(filter: { frontmatter: { type: { eq: "sobre" } } }) {
      nodes {
        frontmatter {
          updated
          title
        }
        html
      }
    }
  }
`
