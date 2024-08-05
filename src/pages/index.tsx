import React, { FormEvent, Fragment, useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { Link, graphql, navigate } from 'gatsby'
import Img, { FluidObject } from 'gatsby-image'
import { Modal } from '@mui/base'
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material'
import ShopComponent from '../components/ShopComponent'
import * as styles from './index.module.css'
import { Box } from '@mui/system'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'

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
  const [filter, setFilter] = useState('Dia dos Pais')
  const [filteredFotos, setFilteredFotos] = useState(
    fotos.filter((foto: any) => foto.relativePath.includes(filter))
  )
  const [selectedFotos, setSelectedFotos] = useState<IFoto[]>([])
  // console.log('firstFilteredFotos', filteredFotos)
  // console.log(fotos.filter((foto: any) => foto.relativePath.includes(filter)))
  const [knowMore, setKnowMore] = useState(false)
  const [cartZIndex, setCartZIndex] = useState<'2' | '-2'>('2')

  useEffect(() => {
    // console.log('filter', filte)

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
    width: 'calc(min(600px, 95vw))',
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

  function handleFilter(event: SelectChangeEvent) {
    setFilter(event.target.value as string)
  }

  function handleSelect() {
    // remove actual photo if it is already in selectedFotos
    if (selectedFotos.includes(actualFoto())) {
      setSelectedFotos(
        selectedFotos.filter(
          (foto: any) => foto.relativePath !== actualFoto().relativePath
        )
      )
      // close the Modal if it is open in 'Selecionadas por você' filter
      if (filter === 'Selecionadas por você') setOpen(false)

      // add actual photo to selectedFotos
    } else {
      setSelectedFotos([...selectedFotos, actualFoto()])
    }
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
              backgroundColor: '#ffffff',
              position: 'absolute',
              height: '100vh',
              width: '100vw',
              top: '0',
              left: '0',
              zIndex: 2,
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
              <div
                style={{
                  position: 'relative',
                }}
              >
                <img
                  src="/marca d'agua - simple.png"
                  alt=''
                  style={{
                    width: '100%',
                    position: 'absolute',
                    zIndex: '20',
                  }}
                />
                <Img fluid={img} />
              </div>
              {/* <Img fluid={img} /> */}
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: '#5856d3',
                padding: '10px',
                border: '1px solid black',
                borderTop: 'none',
                gap: '10px',
              }}
            >
              <Typography color='white' textAlign='center'>
                O produto final não contém as marcas d'água que você vê acima.{' '}
                <a
                  className={styles.almostAButton}
                  onClick={() => setKnowMore(!knowMore)}
                >
                  {' '}
                  {knowMore ? 'Menos' : 'Saiba mais'}
                </a>
              </Typography>

              {knowMore && (
                <Typography textAlign='center' color='#e9f000'>
                  Inserimos marcas d'água nas artes do catálogo para impedir
                  cópia não autorizada, mas os produtos finais são em alta
                  resolução e sem as marcas d'água!
                </Typography>
              )}

              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  gap: '20px',
                }}
              >
                <Button variant='contained' onClick={handlePrevImage}>
                  {'<'}
                </Button>
                <Button
                  variant='contained'
                  color={
                    selectedFotos.includes(actualFoto()) ? 'error' : 'success'
                  }
                  onClick={handleSelect}
                >
                  {selectedFotos.includes(actualFoto()) ? 'REMOVER' : 'QUERO!'}
                </Button>
                <Button variant='contained' onClick={handleNextImage}>
                  {'>'}
                </Button>
              </Box>
            </div>
          </div>
        </>
      </Modal>

      <Box
        display='flex'
        flexDirection='row'
        justifyContent='space-between'
        alignItems='center'
        width='calc(min(600px, 100vw))'
        position='fixed'
        left='50%'
        top='93px'
        zIndex={cartZIndex}
        padding='0 15px'
        boxSizing='border-box'
        sx={{
          // background: 'linear-gradient(135deg, #2AFADF 0%, #4C83FF 100%)',
          background: 'linear-gradient(135deg, #FFF3B0 0%, #CA26FF 100%)',
          boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25) inset',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <i style={{ visibility: 'hidden' }}></i>
        <h2
          className={styles.specialFont1}
          style={{ textAlign: 'center', marginTop: '8px' }}
        >
          Catálogo de Artes
        </h2>

        <Box display='flex'>
          <ShoppingCartIcon
            cursor='pointer'
            onClick={() => setFilter('Selecionadas por você')}
          />
          <h4>{selectedFotos.length}</h4>
        </Box>
      </Box>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          flexWrap: 'wrap',
          alignItems: 'center',
          width: '80%',
          gap: '10px',
          margin: 'auto',
          marginTop: '47px',
        }}
      ></div>

      <Box
        display='flex'
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
        margin='0 auto'
        gap='15px'
        sx={{
          // background: 'blue'
          // background: 'linear-gradient(135deg, #2AFADF 0%, #4C83FF 100%)'
          // background: 'linear-gradient(135deg, #FFF3B0 0%, #CA26FF 100%)'

          padding: '15px',
        }}
      >
        <h3 className={styles.specialFont2} style={{ textAlign: 'center' }}>
          Oi! Este é nosso catálogo de artes.
        </h3>
        <p className={styles.specialFont2 + ' ' + styles.heartbeat}>
          Veja também o catálogo de{' '}
          <a className={styles.almostAButton} target='_blank' href='/produtos'>
            Produtos
          </a>
        </p>
      </Box>

      <Box sx={{ width: '90%', margin: '15px auto' }}>
        <p className={styles.specialFont2} style={{ textAlign: 'right' }}>
          Navegue utilizando o filtro:
        </p>
        <FormControl fullWidth>
          <InputLabel id='filter-select-label'>Filtro</InputLabel>

          <Select
            labelId='filter-select-label'
            id='filer-select'
            value={filter}
            label='Filtro'
            onChange={handleFilter}
          >
            {directories.map((directory: any, index: number) => (
              <MenuItem value={directory.name} key={index}>
                <p
                  className={styles.specialFont1}
                  style={{ fontWeight: 'bold' }}
                >
                  {directory.name.replace(/-/g, ' ')}
                </p>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

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
          margin: 'auto',
          marginBottom: '20px',
          padding: '15px',
          overflow: 'scroll',
          boxSizing: 'border-box',
        }}
      >
        {filteredFotos.map((foto, index) => (
          <div
            key={index}
            style={{ width: '90%', cursor: 'pointer' }}
            onClick={() => handleOpenModal(foto.childrenImageSharp[0].fluid)}
          >
            <div
              style={{
                position: 'relative',
                backgroundColor: 'white'
              }}
            >
              <img
                src="/marca d'agua - simple.png"
                alt=''
                style={{
                  width: '100%',
                  position: 'absolute',
                  zIndex: '1',
                  // visibility: open ? 'hidden' : 'visible'
                }}
              />
              <Img
                fluid={foto.childrenImageSharp[0].fluid}
                imgStyle={{ maxHeight: '200px' }}
              />
            </div>
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
          <ShopComponent
            selectedFotos={selectedFotos}
            setSelectedFotos={setSelectedFotos}
            setFilter={setFilter}
            setCartZIndex={setCartZIndex}
          />
        </div>
      )}

      <Box
        display='flex'
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
        margin='0 auto'
        gap='15px'
        sx={{
          // background: 'blue'
          // background: 'linear-gradient(135deg, #2AFADF 0%, #4C83FF 100%)'
          // background: 'linear-gradient(135deg, #FFF3B0 0%, #CA26FF 100%)'

          padding: '15px',
        }}
      >
        <p className={styles.specialFont2}>
          {' '}
          Siga a gente no{' '}
          <a
            className={styles.almostAButton}
            target='_blank'
            href='https://instagram.com/querotomateazul'
          >
            Instagram
          </a>
        </p>

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
          <div style={{ position: 'relative' }}>
            <img
              src='avatar_piscadela.png'
              alt='Avatar do Tomate Azul piscando simpaticamente'
              style={{
                width: '45px',
                position: 'absolute',
                bottom: '50%',
                right: '-50px',
              }}
            />
          </div>
        </p>
      </Box>
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
