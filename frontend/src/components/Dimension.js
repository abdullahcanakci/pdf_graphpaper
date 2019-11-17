import React, { useState } from "react";

const Dimension = ({ label, state, setState }) => {
  const [link, setLink] = useState(false)

  const linkButtonState = link ? "button is-info" : "button";
  const linkStyle = link ? {display: 'none'} : {display: ''}

  return(
    <div>
      <label className="label">
        {label}
      </label>
      <div className="field has-addons">
        <p className="control has-icons-left is-expanded">
          <input
            className="input"
            type="number"
            value={state.horizontal}
            onChange={e => {
              if(link){
                setState({
                  horizontal: e.target.value,
                  vertical: e.target.value
                })
              } else {
                setState({
                  ...state,
                  horizontal: e.target.value
                })
              }
            }}
            />
            <span className="icon is-small is-left">
              <i className="fas fa-arrows-alt-h"/>
            </span>
        </p>

        <p className="control">
          <button
            className={linkButtonState}
            onClick={e => {
              e.preventDefault();
              setLink(!link);
              setState({
                ...state,
                vertical: state.horizontal
              })
            }}
          >
            <span className="icon is-normal">
              <i className="fas fa-link" />
            </span>
          </button>
        </p>

        <p
          style={linkStyle}
          className="control has-icons-left"
        >
          <input
            className="input"
            type="number"
            value={state.vertical}
            onChange={e => {
              if(link){
                setState({
                  horizontal: e.target.value,
                  vertical: e.target.value
                })
              } else {
                setState({
                  ...state,
                  vertical: e.target.value
                })
              }
            }}
            />
            <span className="icon is-small is-left">
              <i className="fas fa-arrows-alt-v"/>
            </span>
        </p>

      </div>
    </div>
  )
}

export default Dimension