import { TextField, Button, Modal } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { Box, borderRadius, display } from '@mui/system'
import { signIn } from '../utils/firebase'
import ErrorMessage from '../components/ErrorMessage'

// const secret = process.env.GATSBY_ADM_PWD

type Pedidos = {
  data: string
  id: string
  nome: string
  pedido: string
  telefone: string
}

export default function AdmPage() {
  const [loggedIn, setLoggedInd] = useState(false)
  const [pwd, setPwd] = useState('')
  const [pedidos, setPedidos] = useState<Pedidos[] | []>([])
  const [pedidoKey, setPedidoKey] = useState<any>()
  const [checkPedidos, setCheckPedidos] = useState(false)
  const [checkButtonEnabled, setCheckButtonEnabled] = useState(true)
  const [user, setUser] = useState<any>({})
  const [errorMessage, setErrorMessage] = useState('')
  const [openModal, setOpenModal] = useState(false)

  useEffect(() => {
    if (loggedIn) {
      fetch(
        `${process.env.GATSBY_API_URL}/pedidos.json?auth=${user.accessToken}`
      )
        .then(response => {
          response.json().then(data => {
            setPedidos(data)
          })
        })
        .catch(error => {
          console.log(error)
          setErrorMessage(error.message)
        })
    }
  }, [loggedIn, checkPedidos])

  useEffect(() => {
    if (!checkButtonEnabled) {
      setTimeout(() => {
        setCheckButtonEnabled(true)
      }, 3000)
    }
  }, [checkButtonEnabled])

  function handleTextEdit(event: React.ChangeEvent<HTMLInputElement>) {
    setPwd(event.target.value)
  }

  async function handleLogin() {
    // pwd === process.env.GATSBY_ADM_PWD
    //   ? setLoggedInd(true)
    //   : setLoggedInd(false)
    signIn('tomate@barretolopes.com', pwd).then((user: any) => {
      if (user) {
        setLoggedInd(true)
        setUser(user)
      }
    })
  }

  function handleModalConcluirPedido(key: any) {
    setPedidoKey(key)
    setOpenModal(true)
  }

  function handleConcluirPedido() {
    fetch(
      `${process.env.GATSBY_API_URL}/pedidos/${pedidoKey}.json?auth=${user.accessToken}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
      // .then(() => setPedidos(pedidos.filter((p: any) => p.id !== pedido.id)))
      .then(() => {
        // const tempDict = [...pedidos]
        // delete tempDict[key]
        setPedidos(() => {
          delete pedidos[pedidoKey]
          return { ...pedidos }
        })
        setOpenModal(false)
      })
      .catch(err => console.log(err))
  }

  function handleCheckPedidos() {
    setCheckPedidos(!checkPedidos)
    setCheckButtonEnabled(false)
  }

  return (
    <>
      {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
      <Modal open={openModal}>
        <Box className='tomateModal'>
          <p className='tomateModalTitle'>
            O pedido {pedidos[pedidoKey]?.id} será excluído para sempre. 
          </p>
          <p>
          Você já salvou os dados do cliente?
          </p>
          <div className='tomateModalActions'>
            <Button
              variant='contained'
              color='warning'
              onClick={handleConcluirPedido}
              size='small'
            >
              EXCLUIR
            </Button>
            <Button
              variant='contained'
              color='secondary'
              onClick={() => setOpenModal(false)}
              size='small'
            >
              CANCELAR
            </Button>
            <a

            style={{
              padding: '10px',
              borderRadius: '5px',
              background: 'green',
              color: 'white',
              fontSize: '14px'
            }}
              target='_blank'
              href={`https://wa.me/55${pedidos[pedidoKey]?.telefone.replace(
                /[^0-9]/g,
                ''
              )}?text=Olá! Aqui é do Tomate Azul. Sobre o pedido "${
                pedidos[pedidoKey]?.id
              }"`}
            >
              WHATSAPP
            </a>
          </div>
        </Box>
      </Modal>
      <Layout>
        {!loggedIn ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-around',
              alignItems: 'center',
              mt: '20px',
            }}
          >
            <TextField
              id='pwd'
              label='senha'
              variant='outlined'
              type='password'
              onChange={handleTextEdit}
            />
            <Button onClick={handleLogin}>Login</Button>
          </Box>
        ) : (
          <Box
            m='0 auto'
            mt={'20px'}
            width={'90%'}
            display='flex'
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
          >
            <Button
              onClick={handleCheckPedidos}
              variant='outlined'
              disabled={!checkButtonEnabled}
            >
              Atualizar Pedidos
            </Button>
            {pedidos && Object.keys(pedidos).length ? (
              Object.keys(pedidos).map((key: any) => (
                <Box
                  key={key}
                  mb='15px'
                  mt='15px'
                  sx={{
                    backgroundColor: 'rgb(172, 178, 238)',
                  }}
                >
                  <h2>{pedidos[key].nome}</h2>
                  <h3>
                    <a
                      target='_blank'
                      href={`https://wa.me/55${pedidos[key].telefone.replace(
                        /[^0-9]/g,
                        ''
                      )}?text=Olá! Aqui é do Tomate Azul. Sobre o pedido "${
                        pedidos[key].id
                      }"`}
                    >
                      {pedidos[key].telefone}
                    </a>
                  </h3>

                  <p>{pedidos[key].data}</p>
                  <p>{pedidos[key].pedido}</p>
                  <Button
                    onClick={() => handleModalConcluirPedido(key)}
                    variant='contained'
                  >
                    CONCLUIR
                  </Button>
                </Box>
              ))
            ) : (
              <p>Sem pedido no momento</p>
            )}
          </Box>
        )}
      </Layout>
    </>
  )
}
