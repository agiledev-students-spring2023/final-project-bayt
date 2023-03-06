import React from 'react'

import '../css/Footer.css'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'

const Footer = props => {

  const variant = "outlined"

  return (
    <footer className="footer">
      <Button variant={variant} component={Link} to="/tasks">
        Tasks
      </Button>
      <Button variant={variant} component={Link} to="/finances">
        Finances
      </Button>
      <Button variant={variant} component={Link} to="/home">
        Home
      </Button>
      <Button variant={variant} component={Link} to="/alerts">
        Alerts
      </Button>
      <Button variant={variant} component={Link} to="/settings">
        Settings
      </Button>
    </footer>
  )
}

export default Footer