import React from 'react'
import Paper from '@material-ui/core/Paper'

const FormContainer = (props) => {
  return (
    <div className="Form-container">
      <Paper
      style={{
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center', 
          alignItems: 'center',
          marginTop: '16px',
          height: '100%',
          flexGrow: '1'
        }}
      >
        {props.children}
      </Paper>
      
    </div>
  )
}

export default FormContainer