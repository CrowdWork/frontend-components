import React, { useState } from "react"
import "./Select.css"

import useRadioList from "../../fx/useRadioList"

export default ({ items, children }) => {

  const [active, setActive] = useState(false)
  const options = items.map((item, idx) => <Option>{item}</Option>)
  const newChildren = useRadioList(options)

  return (
    <div className="select" onClick={() => setActive(true)}>
      <div className="list" style={{opacity: active ? 1 : 0, height: active ? auto : 0}}>
        {newChildren}
      </div>
    </div>
  ) 
}

const Option = ({children, toggle, idx}) => {
  return (
    <div 
      className="option" 
      onClick={() => toggle(idx)}>{children}
    </div>
  )
}