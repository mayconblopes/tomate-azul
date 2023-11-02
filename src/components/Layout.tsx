import React, { Fragment } from 'react'
import Navbar from './Navbar'
import '../globals.css'
import { Helmet } from 'react-helmet'
import { graphql, useStaticQuery } from 'gatsby'

type LayoutProps = {
  children: React.ReactNode
}

const isBrowser = typeof window !== 'undefined'

export default function Layout({ children }: LayoutProps) {
  const data = useStaticQuery(graphql`
    query SiteInfo {
      site {
        siteMetadata {
          description
          title
        }
      }
    }
  `)

  const fixMobileViewPortHeight = isBrowser
    ? `calc(${window.innerHeight - 150}px)`
    : `calc(100vh - 150px)`

  return (
    <>
        <Helmet>
          <html lang='pt-br' />
          <title>{data.site.siteMetadata.title}</title>
          <meta
            name='description'
            content={data.site.siteMetadata.description}
          />
        </Helmet>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <Navbar />
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              backgroundColor: '#f4f4f4',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                width: 'calc(min(100%,600px))',
                boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
                // paddingBottom: '20px',
                backgroundColor: 'white',
              }}
            >
              <div
                style={{
                  height: `${fixMobileViewPortHeight}`,
                  overflow: 'scroll',
                  width: '100%',
                }}
              >
                {children}
              </div>
            </div>
          </div>

          <footer
            style={{
              height: '80px',
              background: 'linear-gradient(135deg, #2AFADF 0%, #4C83FF 100%)',
              boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25) inset',
              // boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              // marginTop: '20px',
            }}
          >
            <p
              style={{
                width: '67%',
                // color: 'white',
                fontSize: '12px',
                fontWeight: 'bold',
                textAlign: 'center',
                background: 'linear-gradient(135deg, #000 0%, #123597 100%)',
                backgroundClip: 'text',
                textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
         
              }}
            >
              Tomate Azul®
            </p>
            <p
              style={{
                width: '67%',
                // color: 'white',
                fontSize: '12px',
                textAlign: 'center',
              }}
            >
              todos os direitos reservados
            </p>
          </footer>
        </div>
    </>
  )
}
