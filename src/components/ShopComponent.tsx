import { Button, Modal, TextField } from '@mui/material'
import { Box } from '@mui/system'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { IFoto } from '../pages'
import { logOut, signIn, signInAnon } from '../utils/firebase'
import ErrorMessage from './ErrorMessage'
import ReCAPTCHA from "react-google-recaptcha";

type ShopComponentProps = {
  selectedFotos: Array<IFoto>
  setFilter: (filter: string) => void
  setCartZIndex: (index: '2' | '-2') => void
  setSelectedFotos: Dispatch<SetStateAction<IFoto[]>>
}

export default function ShopComponent({
  selectedFotos,
  setFilter,
  setSelectedFotos,
  setCartZIndex,
}: ShopComponentProps) {
  const [nome, setNome] = useState('')
  const [telefone, setTelefone] = useState('')
  const [shopButtonText, setShopButtonText] = useState('')
  const [pedidos, setPedidos] = useState<Array<any>>([])
  const [shopConfirmation, setShopConfirmation] = useState(false)
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [captcha, setCaptcha] = useState('')

  const apiURL = process.env.GATSBY_API_URL


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
            .then((response) => {
              if (response.ok){

                setShopConfirmation(true)
                logOut()
              } else {
                throw new Error("falha na escrita -> " + response.status)
              }
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
              onFocus={() => setCartZIndex('-2')}
              onBlur={() => setCartZIndex('2')}
            />
            <TextField
              id='telefone'
              label='Telefone/WhatsApp'
              placeholder='(xx) xxxxx-xxxx'
              value={telefone}
              onChange={handleTextEdit}
              onFocus={() => setCartZIndex('-2')}
              onBlur={() => setCartZIndex('2')}
            />
            {shopButtonText === 'CONFIRMAR' && (
              <p style={{ width: '80%' }}>
                Revise as imagens selecionadas e seus dados, depois clique em
                confirmar
              </p>
            )}

        {captcha ? (

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
        ) : (
           
<ReCAPTCHA
    sitekey={process.env.GATSBY_APP_SITE_KEY || 'não leu a variavel de ambiente'}
    onChange={(token: string | null) => setCaptcha(token || '')}

/>
        )}

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
                    href={`https://wa.me/5522996026139?text=Sobre o pedido de ${nome}`}
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
