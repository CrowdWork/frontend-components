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

    const handleSubmit = (e) => {
        
        e.preventDefault()
    }

    return  <> 
                <form className="form-group" onSubmit={handleSubmit}> 
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
                    <div className="cell">
                        <textarea   id="textarea1" 
                                    class="materialize-textarea"
                                    value={info.message || ""}
                                    onChange={e => setInfo({...info, message: e.target.value})}
                        />
                        <label for="textarea1">Enter Message</label>
                    </div>
                </form>
            </>


}
