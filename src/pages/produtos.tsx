import React from 'react'
import Layout from '../components/Layout'

import { Box } from '@mui/system'
import TouchAppIcon from '@mui/icons-material/TouchApp'
import * as styles from './index.module.css'
import * as animationStyles from './produtos.module.css'

export default function Produtos() {
  return (
    <Layout>
      <div className={animationStyles.slideOutBlurredTop}
      
          style={{
            color: 'black',
            position: 'absolute',
            margin: '0 auto',
            left: '70%',
            top: '55%',
            zIndex: '10',
          }}
      >
        <div
          className={animationStyles.slideBckLeft}
        >
          <TouchAppIcon
            sx={{
              color: 'blue',
              fontSize: '50px',
              opacity: '70%',
            }}
          />
        </div>
      </div>

      <Box
        position='absolute'
        zIndex='5'
        top='70px'
        display='flex'
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
        margin='0 auto'
        gap='15px'
        width='calc(min(100%,600px))'
        boxSizing='border-box'
        sx={{
          //   background: 'white',
          background: 'linear-gradient(135deg, #2AFADF 0%, #4C83FF 100%)',
          // background: 'linear-gradient(135deg, #FFF3B0 0%, #CA26FF 100%)',

          padding: '15px',
        }}
      >
        <p className={styles.specialFont2}>
          {' '}
          Fale com a gente no{' '}
          <a
            className={styles.almostAButton}
            target='_blank'
            href='https://wa.me/5522996026139'
          >
            WhatsApp
          </a>
        </p>
      </Box>
      {/* embed from canvas */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '0',
          paddingTop: '177.7778%',
        }}
      >
        <iframe
          loading='lazy'
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            top: '50px',
            left: '0',
            border: 'none',
            padding: '0',
            margin: '0',
          }}
          src='https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAF5tjtVtB4&#x2F;view?embed'
          //   allowFullScreen='allowfullscreen'
          //   allow='fullscreen'
        ></iframe>
      </div>
    </Layout>
  )
}
