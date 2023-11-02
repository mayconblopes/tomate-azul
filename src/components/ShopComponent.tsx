import { Button, Modal, TextField } from '@mui/material'
import { Box } from '@mui/system'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { IFoto } from '../pages'
import { logOut, signIn, signInAnon } from '../utils/firebase'
import ErrorMessage from './ErrorMessage'

type ShopComponentProps = {
  selectedFotos: Array<IFoto>
  setFilter: (filter: string) => void
  setSelectedFotos: Dispatch<SetStateAction<IFoto[]>>
}

export default function ShopComponent({
  selectedFotos,
  setFilter,
  setSelectedFotos,
}: ShopComponentProps) {
  const [nome, setNome] = useState('')
  const [telefone, setTelefone] = useState('')
  const [shopButtonText, setShopButtonText] = useState('')
  const [pedidos, setPedidos] = useState<Array<any>>([])
  const [shopConfirmation, setShopConfirmation] = useState(false)
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [user, setUser] = useState()

  const apiURL = process.env.GATSBY_API_URL

  // useEffect(() => {
  //   fetch(`${apiURL}/pedidos.json`).then(response => {
  //     response
  //       .json()
  //       .then(data => {
  //         // console.log('DATA AA-->', data)
  //         setPedidos(data)
  //       })
  //       .then(() => console.log('PEDIDOS -> ', pedidos))
  //   })
  // }, [])

  useEffect(() => {
    setShopButtonText(
      selectedFotos.length === 1
        ? 'Encomendar 1 caneca!'
        : `Encomendar ${selectedFotos.length} canecas`
    )
  }, [selectedFotos])

  function handleTextEdit(event: React.ChangeEvent<HTMLInputElement>) {
    let value = event.target.value

    if (event.target.id === 'nome') {
      const onlyLetters = value.replace(/[^a-zA-Z\s]/g, '')
      setNome(onlyLetters)
    } else if (event.target.id === 'telefone') {
      value = value.slice(0, 13)
      const onlyNumbers = value
        .replace(/[^0-9]/g, '')
        .replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3')
      setTelefone(onlyNumbers)
    }

    // console.log(event.target.id)
  }

  function handleShop() {
    setErrorMessage('')
    setFilter('Selecionadas por você')
    if (shopButtonText !== 'CONFIRMAR' && shopButtonText !== 'AGUARDE') {
      setShopButtonText('CONFIRMAR')
    } else {
      let text =
        `${selectedFotos.length} arte(s) selecionada(s): ` +
        selectedFotos.map((foto: any) => {
          return `${foto.relativePath}`
        })
      // console.log(text)

      const pedido = {
        id:
          nome.replace(' ', '').toLocaleLowerCase() + new Date().toISOString(),
        nome,
        telefone,
        pedido: text,
        data: new Date().toISOString(),
      }

      //login to fetch with write permission
      const pwd = process.env.GATSBY_ADM_PWD

      // salvar pedido no firebase

      setLoading(true)
      signInAnon()
        .then((user: any) => {
          fetch(`${apiURL}/pedidos.json?auth=${user.accessToken}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(pedido),
          })
            .then(() => {
              setShopConfirmation(true)
              logOut()
            })
            .then(() => setLoading(false))
            .catch((error: any) => {
              console.log(error)
              setErrorMessage(error.message)
              setLoading(false)
            })
        })
        .catch((error: any) => {
          console.log(error)
          setErrorMessage(error.message)
          setLoading(false)
        })

      // if (pwd) {
      //   setLoading(true)
      //   signIn('tomate@barretolopes.com', pwd)
      //     .then((user: any) => {
      //       fetch(`${apiURL}/pedidos.json?auth=${user.accessToken}`, {
      //         method: 'POST',
      //         headers: {
      //           'Content-Type': 'application/json',
      //         },
      //         body: JSON.stringify(pedido),
      //       })
      //         .then(() => {
      //           setShopConfirmation(true)
      //           logOut()
      //         })
      //         .then(() => setLoading(false))
      //         .catch((error: any) => {
      //           console.log(error)
      //           setErrorMessage(error.message)
      //           setLoading(false)
      //         })
      //     })
      //     .catch((error: any) => {
      //       console.log(error)
      //       setErrorMessage(error.message)
      //       setLoading(false)
      //     })
      // } else {
      //   console.log('Não foi possível obter a senha de administrador do .env')
      // }
    }
  }

  function handleShopAgain() {
    setShopConfirmation(false)
    setSelectedFotos([])
    setFilter('Amizade')
  }

  return (
    <>
      {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px',
        }}
      >
        {!shopConfirmation ? (
          <>
            <TextField
              id='nome'
              label='Nome completo'
              placeholder='Nome Completo'
              value={nome}
              onChange={handleTextEdit}
            />
            <TextField
              id='telefone'
              label='Telefone/WhatsApp'
              placeholder='(xx) xxxxx-xxxx'
              value={telefone}
              onChange={handleTextEdit}
            />
            {shopButtonText === 'CONFIRMAR' && (
              <p style={{ width: '80%' }}>
                Revise as imagens selecionadas e seus dados, depois clique em
                confirmar
              </p>
            )}
            <Button
              variant='contained'
              disabled={
                nome && telefone.length === 15 ? (loading ? true : false) : true
              }
              onClick={handleShop}
              color={shopButtonText === 'CONFIRMAR' ? 'success' : 'primary'}
            >
              {loading ? 'AGUARDE' : shopButtonText}
            </Button>
          </>
        ) : (
          <Modal open={shopConfirmation}>
            <Box className='tomateModal'>
              <div
                style={{
                  textAlign: 'center',
                  color: 'white',
                }}
              >
                <p className='tomateModalTitle'>Seu pedido foi registrado.</p>
                <p className='tomateModalTitle'>
                  Aguarde, entraremos em contato pelo telefone informado.
                </p>
                <p className='tomateModalTitle'>
                  Ou entre em contato conosco pelo{' '}
                  <a
                    target='_blank'
                    href={`https://wa.me/5522990626139?text=Sobre o pedido de ${nome}`}
                  >
                    WhatsApp 22 99602-6139
                  </a>{' '}
                  e daremos prioridade!
                </p>
                <p className='tomateModalTitle'>
                  Nosso muito obrigado! &#128157;
                </p>
              </div>
              <Button
                onClick={handleShopAgain}
                variant='contained'
                color='success'
                size='small'
              >
                FECHAR
              </Button>
            </Box>
          </Modal>
        )}
      </Box>
    </>
  )
}
