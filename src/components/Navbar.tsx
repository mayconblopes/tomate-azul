import React, { Fragment, useState } from 'react'
import CharmMenuHamburger from '../assets/CharmMenuHamburger'
import * as styles from './navbar.module.css'
import { Link } from 'gatsby'
import { IconButton } from '@mui/material'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  function handleMenuClick() {
    setMenuOpen(!menuOpen)
  }

  return (
    <Fragment>
      {/* <div
        className={styles.blur}
        style={{ display: menuOpen ? 'flex' : 'none' }}
        onClick={handleMenuClick}
      >
        <div
          className={styles.menu}
          style={{ display: menuOpen ? 'flex' : 'none' }}
        >
          <Link to='/'>Home</Link>
          <Link to='/blog'>Blog</Link>
          <Link to='/fotos'>Galeria de fotos</Link>
          <Link to='/aniversariantes'>Aniversariantes</Link>
          <Link to='/documentos'>Documentos</Link>
          <Link to='/sobre'>Sobre</Link>
          <img className={styles.logo} src={logo} alt='logo do Tomate Azul' />
        </div>
      </div> */}

      <nav className={styles.navbar}>
        {/* <IconButton onClick={handleMenuClick} disableTouchRipple>
          <CharmMenuHamburger className={styles.menuIcon} />
        </IconButton> */}
        {/* <h1 className={styles.title}>Tomate Azul</h1> */}

          <Link to='/'>
            <img className={styles.logo} src='/logo.png' alt='logo do Tomate Azul' />
          </Link>
      </nav>
    </Fragment>
  )
}
