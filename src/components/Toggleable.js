import React from "react";

const Toggleable = ({label, state, setState, children}) => {
  const collapse = { display: !state ? "none" : "" };

  return(
    <div>
      <div className="field">
        <label className="checbox">
          <input
            type="checkbox"
            value={state}
            onChange={e => {
              setState(!state)
            }}
            />
            {label}
        </label>
      </div>
      <div style={collapse}>
        {children}
      </div>
    </div>
  )
}

export default Toggleable