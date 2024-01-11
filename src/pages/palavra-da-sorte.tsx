import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { graphql } from 'gatsby'
import { Box } from '@mui/system';
import * as styles from './palavra-da-sorte.module.css'

export default function PalavraDaSorte({data}: any) {

    let proverbios: string[] = [];
    const [proverbio, setProverbio] = useState('')
    
    useEffect(() => {
        data.allMarkdownRemark.nodes[0].htmlAst.children
            .map((child: any) => {
            if (child.children) {
                proverbios.push(child.children[0].value)
                return child.children[0].value
            }
        });
        
        setProverbio(proverbios[Math.floor(Math.random() * proverbios.length)])
    }, [])

    
    return (
        <Layout>
            <Box className={styles.box}>
                <p >{proverbio}</p>

                <a href="/">Continuar navegando</a>
            </Box>


        </Layout>
    )
}

export const query = graphql`
query MyQuery {
    allMarkdownRemark(filter: {frontmatter: {type: {eq: "palavra-da-sorte"}}}) {
      nodes {
        frontmatter {
          type
        }
        htmlAst
      }
    }
  }    

`
