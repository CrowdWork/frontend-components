import React, { useState, useEffect } from 'react'
import Select from "react-select"
import './Signup.css'

export default ({history, onSubmit }) => {

 const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    otherProfession: "",
    selectedOption: "",
    error: undefined
  })

  const [error, setError] = useState(null)

  const patterns = {
    email: /^[\w.+\-]+@gmail\.com$/,
    name: /^[a-zA-Z0-9_]{5,}[a-zA-Z]+[0-9]*$/,
    password: /^/
  }
  
  /// Will write useValidate hook
  useEffect(() => {
    if (data.email.trim() === "" || 
        data.firstName.trim() === "" || 
        data.lastName.trim() === "" || 
        data.password.trim() === "" || 
        !data.selectedOption
      ) {
        setError("Required* fields must be filled in")
      } 

      // Regex to test user input:

     /* else if (!patterns.email.test(data.email)) {
        setError("Please enter the right data")
      } */

      else {
        return setError("")
      }
  }, [data])
///////////////////////////////////////
  const options = [
    {value: 'practicing lawyer', label: "Practicing Lawyer"},
    {value: 'non-practing lawyer', label: "Non-Practicing Lawyer"},
    {value: "student", label: "Student"},
    {value: "teacher", label: "Teacher"},
    {value: "academic", label: "Academic"},
    {value: "other", label: "Other"}
  ]

  const whatsappOptions = [
    {value: 'yes', label: "Yes"},
    {value: 'no', label: "No"}
  ]

////////////////////////////
  const customStyles = {
    zIndex: "999"
  }
////////////////
  const onFormSubmit = e => {
    e.preventDefault()
    onSubmit(data)
    history.push("/")
  }
  const handleSelect = (selectedOption) => {
   setData({...data, selectedOption})

  };

  const handleChange = e => {

  }
/////////////////////
    return (
      <div className="container ">
        <h1>Register</h1>
        <form className="col s12 sign-up" onSubmit={onFormSubmit}>

          <div className="row">
            <div className="input-field col s6">
              <input id="firstName" type="text" className="validate" value={data.firstName} onChange={(e) => setData({...data, firstName: e.target.value})} />
              <label htmlFor="firstName" >First Name <span className="required"/></label>
            </div>
            <div className="input-field col s6">
              <input id="lastName" type="text" className="validate" value={data.lastName} onChange={(e) => setData({...data, lastName: e.target.value})} />
              <label htmlFor="lastName">Last Name <span className="required"/></label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s8">
              <input id="phone" type="number" className="validate" value={data.phone} onChange={(e) => setData({...data, phone: e.target.value})} />
              <label htmlFor="phone">Phone Number</label>
            </div>
            <div className="input-field col s4"> 
              <Select value={data.hasWhatsapp || ""}
                      onChange={selected => setData({...data, hasWhatsapp: selected.value})}
                      options={whatsappOptions} 
                      className="select"
              />
              Is this your WhatsApp number?
            </div>
          </div>

          <div className="row">
            <div className="input-field col s12">
              <input id="email" type="email" className="validate" value={data.email} onChange={(e) => setData({...data, email: e.target.value})}/>
              <label htmlFor="email">Email <span className="required"/></label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input id="password" type="password" className="validate" value={data.password} onChange={(e) => setData({...data, password: e.target.value})}/>
              <label htmlFor="password">Password<span className="required"/></label>
            </div>
            <div className="input-field col s12">
              <span>Profession:<span className="required"/></span>
              <Select
                value={data.selectedValue}
                onChange={handleSelect}
                options={options}
                className="select"
              />
            </div>
            {data.selectedOption.value === "other" && 
              <>
                <input id="other-profession" type="text" className="validate" value={data.otherProfession} onChange={(e) => setData({...data, otherProfession: e.target.value})}/>
                <label htmlFor="other-profession">Enter Profession</label>
              </> 
            }
            { // Private values in "Customer" interface
            data.selectedOption.value === "practicing lawyer" &&
                 <>
                  <input id="chamber-name" type="text" className="validate" value={data.chamberName || ""} onChange={(e) => setData({...data, chamberName: e.target.value})}/>
                  <label htmlFor="chamber-name">Name of Chambers</label>

                  <input id="chamber-address" type="text" className="validate" value={data.chamberAddress || ""} onChange={(e) => setData({...data, chamberAddress: e.target.value})}/>
                  <label htmlFor="chamber-address">Address of Chambers</label>
                   
                  <input id="card-num" type="text" className="validate" value={data.cardNum || ""} onChange={(e) => setData({...data, cardNum: e.target.value})}/>
                  <label htmlFor="chamber-address">Card Number</label>
                  
                  <input id="cvv" type="text" className="validate" value={data.cardCvv || ""} onChange={(e) => setData({...data, cardCvv: e.target.value})}/>
                  <label htmlFor="cvv">Card CVV</label>
                 </>
            }
          </div>
          <button className="waves-effect waves-light btn right submit" type="submit" name="action">Submit</button>
          {error && <div className="error"> {error} </div>}
        </form>
      </div>
        
    )
  }

  const Error = () => {
    const errStyle = ``
    
    return <>

           </> 
  }