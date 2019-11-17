import React from "react";

const ButtonGroup = ({ label, buttons, state, setState }) => {
  const classSelected = "button column is-info is-selected is-fullwidth";
  const classUnselected = "button column is-fullwidth";

  const buttonViews = buttons.map(button => {
    return (
      <button
        key={button}
        className={button === state ? classSelected : classUnselected}
        onClick={e => {
          e.preventDefault();
          setState(button);
        }}
      >
        {button}
      </button>
    );
  });

  return (
    <div className="field">
      <label className="label">
        {label}
      </label>
      <div 
        className="buttons has-addons is-grouped"
      >
        {buttonViews}
      </div>
    </div>
  );
};

export default ButtonGroup;