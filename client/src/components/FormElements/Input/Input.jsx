import React from 'react'

import "./Input.css"

function Input(props) {

  let element = 
  props.name === "name" ? (
    <input
    type={props.type}
    value={props.value}
    name={props.name}
    onChange={(e) => props.handleChange(e)}
    placeholder={props.placeholder}
    className={props.name}
    />
  ) :
   props.name === "description" ? (
    <textarea
    value={props.value}
    name={props.name}
    onChange={(e) => props.handleChange(e)}
    rows={props.rows || 3}
    className={props.name}
    />
  ) : props.name === "date" ? (
    <input
    type={props.type}
    value={props.value}
    name={props.name}
    onChange={(e) => props.handleChange(e)}
    className={props.name}
    />
  ) : props.name === "time" ? (
    <input
    type={props.type}
    value={props.value}
    name={props.name}
    onChange={(e) => props.handleChange(e)}
    className={props.name}
    />
  ) : props.name === "duration" ? (
    <select
    value={props.value}
    name={props.name}
    onChange={(e) => props.handleChange(e)}
    className={props.name}
    >
      <option value={props.defaultOption} defaultValue={props.defaultOption}></option>
      <option value={props.option1}>{props.option1}</option>
      <option value={props.option2}>{props.option2}</option>
      <option value={props.option3}>{props.option3}</option>
    </select>
  ) : <></>


  return (
    <div>
      <label>{props.label}</label>
      {element}
    </div>
  )
}

export default Input