import React from 'react';

const Filter = (props) => (

  <div>
    <input type="text" name="filterString" onChange={(e) => props.handleInputChange(e)} />
  </div>
);

export default Filter;