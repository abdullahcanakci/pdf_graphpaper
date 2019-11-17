import React from "react";

const Color = ({ label, state, setState }) => {
  return (
    <div  className="field">
      <label className="label">{label}</label>
      <input
        type="color"
        className="input"
        value={state}
        onChange={e => {
          e.preventDefault()
          setState(e.target.value)
        }}
      />
    </div>
  )
}

export default Color
