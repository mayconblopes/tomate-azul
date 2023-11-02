import React, { Fragment, useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { Link, graphql, navigate } from 'gatsby'
import Img, { FluidObject } from 'gatsby-image'
import { Modal } from '@mui/base'
import { Button } from '@mui/material'
import ShopComponent from '../components/ShopComponent'
import * as styles from './index.module.css'

export type IFoto = {
  relativePath: string
  childrenImageSharp: {
    fluid: any
  }[]
}

export default function Fotos({ data }: any) {
  const fotos: IFoto[] = data.allFile.nodes
  // console.log('fotos--->', fotos)

  const tempDirectories = data.allDirectory.nodes.sort((a: any, b: any) =>
    a.name.localeCompare(b.name)
  )
  const directories = [...tempDirectories, { name: 'Selecionadas por você' }]
  // console.log('directories --->', directories)

  const [open, setOpen] = useState(false)
  const [img, setImg] = useState({} as FluidObject)
  const [filter, setFilter] = useState('Amizade')
  const [filteredFotos, setFilteredFotos] = useState(
    fotos.filter((foto: any) => foto.relativePath.includes(filter))
  )
  const [selectedFotos, setSelectedFotos] = useState<IFoto[]>([])
  // console.log('firstFilteredFotos', filteredFotos)
  // console.log(fotos.filter((foto: any) => foto.relativePath.includes(filter)))

  useEffect(() => {
    // console.log('filter', filter)

    if (filter.toLocaleLowerCase() === 'selecionadas por você') {
      setFilteredFotos(selectedFotos)
    } else {
      setFilteredFotos(
        fotos.filter((foto: any) => foto.relativePath.includes(filter))
      )
    }
  }, [filter, selectedFotos])



  const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'calc(min(400px, 100vw))',
    boxShadow: '24',
    zIndex: 2,
  }

  function handleOpenModal(fluid: any) {
    setOpen(!open)
    setImg(fluid)
  }

  function handleNextImage() {
    const actual = filteredFotos.filter(
      (foto: any) => foto.childrenImageSharp[0].fluid.base64 === img.base64
    )[0]
    const next = filteredFotos[filteredFotos.indexOf(actual) + 1]
    // console.log(filteredFotos.indexOf(actual))
    // console.log(filteredFotos.indexOf(next))

    if (filteredFotos.indexOf(next) >= 0) {
      setImg(next.childrenImageSharp[0].fluid)
    }
  }

  function handlePrevImage() {
    const actual = filteredFotos.filter(
      (foto: any) => foto.childrenImageSharp[0].fluid.base64 === img.base64
    )[0]
    const prev = filteredFotos[filteredFotos.indexOf(actual) - 1]
    // console.log(filteredFotos.indexOf(actual))
    // console.log(filteredFotos.indexOf(prev))

    if (filteredFotos.indexOf(prev) >= 0) {
      setImg(prev.childrenImageSharp[0].fluid)
    }
  }

  function handleFilter(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    event.preventDefault()
    // console.log((event.target as HTMLButtonElement).name)
    setFilter((event.target as HTMLButtonElement).name)
  }

  function handleSelect() {
    // console.log('Total de fotos selecionadas---->', selectedFotos.length)

    // console.log(actualFoto().relativePath)
    if (selectedFotos.includes(actualFoto())) {
      setSelectedFotos(
        selectedFotos.filter(
          (foto: any) => foto.relativePath !== actualFoto().relativePath
        )
      )
    } else {
      setSelectedFotos([...selectedFotos, actualFoto()])
    }
    // console.log('Fotos Selecionadas', selectedFotos)
  }

  function actualFoto() {
    return filteredFotos.filter(
      (foto: any) => foto.childrenImageSharp[0].fluid.base64 === img.base64
    )[0]
  }

  return (
    <Layout>
      <Modal open={open} onClose={() => setOpen(false)}>
        <>
          <div
            style={{
              backgroundColor: '#31137652',
              position: 'absolute',
              height: '100vh',
              width: '100vw',
              top: '0',
              left: '0',
              zIndex: 1,
            }}
            onClick={() => setOpen(false)}
          ></div>
          <div style={modalStyle}>
            <div
              style={{
                backgroundColor: '#5856d3',
                border: '1px solid black',
                borderBottom: 'none',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              {actualFoto() && (
                <p
                  style={{
                    marginLeft: '10px',
                    fontWeight: 'bold',
                    fontSize: '12px',
                    color: 'white',
                  }}
                >
                  id:{' '}
                  {actualFoto().relativePath.toLocaleLowerCase().slice(0, -4)}
                </p>
              )}
              <p
                onClick={handleOpenModal}
                style={{
                  textAlign: 'right',
                  cursor: 'pointer',
                  marginRight: '10px',
                  fontWeight: 'bold',
                  fontSize: '24px',
                  color: 'white',
                }}
              >
                X
              </p>
            </div>
            <div
              onClick={handleNextImage}
              style={{
                cursor: 'pointer',
                border: '1px solid black',
                borderTop: 'none',
                borderBottom: 'none',
                background: 'white',
              }}
            >
              <Img fluid={img} />
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                backgroundColor: '#5856d3',
                padding: '10px',
                border: '1px solid black',
                borderTop: 'none',
              }}
            >
              <Button variant='contained' onClick={handlePrevImage}>
                {'<'}
              </Button>
              <Button variant='contained' onClick={handleSelect}>
                {selectedFotos.includes(actualFoto()) ? 'REMOVER' : 'QUERO!'}
              </Button>
              <Button variant='contained' onClick={handleNextImage}>
                {'>'}
              </Button>
            </div>
          </div>
        </>
      </Modal>
      <h2 className={styles.specialFont1} style={{ textAlign: 'center', marginTop: '20px' }}>Nosso Catálogo</h2>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          alignItems: 'center',
          width: '80%',
          gap: '10px',
          margin: 'auto',
          marginTop: '10px',
          marginBottom: '10px',
        }}
      >
        {directories.map((directory: any, index: number) => (
          <Button
            name={directory.name}
            key={index}
            // className={styles.specialFont2}
            style={{
              background:
                filter === directory.name ? 'linear-gradient(135deg, #FEB692 0%, #EA5455 100%)' : 'linear-gradient(135deg, #2AFADF 0%, #4C83FF 100%)',
              padding: '0 12px',
              // borderRadius: '10px',
              boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
              color: 'black',
              fontSize: '10px',
            }}
            onClick={event => handleFilter(event)}
          >
            {directory.name.replace(/-/g, ' ')}
          </Button>
        ))}
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          gap: '10px',
          background: 'linear-gradient(135deg, #FFD3A5 0%, #FD6585 100%)',
          boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25) ',
          width: '85%',
          // height: 'calc(100% - 70px)',
          margin: 'auto',
          marginBottom: '20px',
          // borderRadius: '10px',
          padding: '15px',
          overflow: 'scroll',
          boxSizing: 'border-box',
        }}
      >
        {filteredFotos.map((foto, index) => (
          <div
            key={index}
            style={{ width: '45%', cursor: 'pointer' }}
            onClick={() => handleOpenModal(foto.childrenImageSharp[0].fluid)}
          >
            <Img
              fluid={foto.childrenImageSharp[0].fluid}
              imgStyle={{ maxHeight: '200px' }}
            />
          </div>
        ))}
      </div>
      {selectedFotos.length > 0 && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '20px',
          }}
        >
          <ShopComponent selectedFotos={selectedFotos} setSelectedFotos={setSelectedFotos} setFilter={setFilter}/>
       
        </div>
      )}
    </Layout>
  )
}

export const query = graphql`
  query FotosQuery {
    allFile(filter: { dir: { regex: "/galeria-de-fotos/" } }) {
      nodes {
        relativePath
        childrenImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
    allDirectory(
      filter: {
        absolutePath: { regex: "/galeria-de-fotos/" }
        name: { ne: "galeria-de-fotos" }
      }
    ) {
      nodes {
        name
      }
    }
  }
`
