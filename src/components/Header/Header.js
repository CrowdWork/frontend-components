import React from 'react'
import { Link } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import './Header.css'

const Header = (props) => {
  return (
    <div className="Header-wrapper">
      <AppBar position="static">
        <Toolbar className="toolBar">
          <Link to="/">
            <Typography variant="title" color="inherit">
              Barnor Law Engine
            </Typography>
          </Link>
          {props.isLoggedIn ? (
            <div>
              <Link to="/">
                <Button onClick={props.handleLogout} style={{ color: '#fff' }}>
                  Logout
                </Button>
              </Link>
            </div>
          ) : (
            <div>
              <Link to="/signup">
                <Button style={{ color: '#fff' }}>
                  Signup
                </Button>
                
              </Link>
            </div>
            
          )}
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Header