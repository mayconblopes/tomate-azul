import { Modal } from '@mui/material'
import React, { useEffect, useState } from 'react'
import makeHtml from '../utils/makeHtml'
import * as styles from './error.module.css'

type ErrorMessageProps = {
  errorMessage: string
}

export default function ErrorMessage({ errorMessage }: ErrorMessageProps) {
  const [error, setError] = useState('')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (errorMessage) {
      setOpen(true)
      setError(
        `Não foi possível completar esta operação (erro: ${errorMessage}).\n Por favor, converse conosco pelo WhatsApp <a target='_blank' href='https://wa.me/22996026139'>clicando aqui 22996026139</a>. \nDesculpe pelo transtorno`
      )
    }
  }, [errorMessage])

  function handleClose() {
    setOpen(false)
    setError('')
  }
  return (
    <Modal
      open={open}
      onClose={handleClose}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div className={styles.error}
        dangerouslySetInnerHTML={{ __html: makeHtml(error) }}
      />
    </Modal>
  )
}
