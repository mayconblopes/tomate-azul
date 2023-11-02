import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'

export default function Banner() {
  const data = useStaticQuery(graphql`
    query SiteInf {
      site {
        siteMetadata {
          description
        }
      }
    }
  `)
  const { description } = data.site.siteMetadata

  return (
    <div style={{ backgroundImage: "url('./back-banner.jpg')", backgroundPosition: 'bottom', height: '110px', display: 'flex', alignItems: 'center' }}>
      <div
        style={{
          backgroundColor: '#0299D4',
          opacity: '0.92',
          width: '55%',
          height: '40px',
          // marginBottom: '25px',
          marginLeft: 'auto',
          padding: '10px',
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
        }}
      >
        <p
          style={{
            color: 'white',
            fontSize: '15px',
            fontWeight: 'bold',
            fontStyle: 'italic',
          }}
        >
          "{description}"
        </p>
      </div>
    </div>
  )
}
