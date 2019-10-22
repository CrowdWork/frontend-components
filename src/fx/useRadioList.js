import React, { Children, isValidElement, cloneElement, useState, useEffect, useCallback } from "react"

//EXAMPLE:  const { toggle, newChildren } = useRadioList(children, allowMultiple=false)

export default (originalChildren, allowMultiple = true) => {
//////////////////////////////////////////////////
// Initialize radioList values

  const [radioList, setRadioList] = useState(Array(originalChildren.length).fill(false))
  const [newChildren, setChildren] = useState(originalChildren);
 /////////////////////////////////////////////////

  useEffect(() => {
   
    setChildren(newChildren => Children.map(newChildren, (child, idx) => {
      if (!isValidElement(child)) {return}

      return cloneElement(child, {isSelected: radioList[idx], onClick: () => toggle(idx)})
    }));
    
  }, [radioList])

///////////////////////////////////////////////////

// Modifies the list that keeps track of what indexes are active
const toggle = useCallback((targetIndex) => {
  setRadioList(radioList => radioList.map((item, idx) => {
    if (allowMultiple) {
      return targetIndex == idx ? !item : item
    } else {
      return targetIndex == idx ? !item : false
    }
  }))
}, [allowMultiple])

  return newChildren

}
