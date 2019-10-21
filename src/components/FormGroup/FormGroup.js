import React, { useState, useEffect } from "react"

import "./FormGroup.css"

export default ({}) => {

    const [info, setInfo] = useState({ 
                                        name: "", 
                                        email: "", 
                                        phone: "", 
                                        profession: "",
                                        chambers: "",
                                        chamberAddress: "",
                                        payment: ""
                                    })

    useEffect(() => {
    
    }, [])
    return  <> 
                <div className="form-group"> 
                    <div className="cell">
                        <input id="name" type="text" value={info.name} onChange={e => setInfo({...info, name: e.target.value})} />
                        <label>Name</label> 
                    </div>
                    <div className="cell">
                        <input id="email" type="text" value={info.email} onChange={e => setInfo({...info, email: e.target.value})} />
                        <label>Email Address</label> 
                    </div>
                    <div className="cell">
                        <input id="phone" type="text" value={info.phone} onChange={e => setInfo({...info, phone: e.target.value})} />
                        <label>Phone Number</label> 
                    </div>
                </div>
            </>


}
