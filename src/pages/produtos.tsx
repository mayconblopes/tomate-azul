import React from 'react'
import Layout from '../components/Layout'

export default function Produtos() {
  return (
    <Layout>
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
            top: '0',
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
