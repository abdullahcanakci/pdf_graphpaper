import React from "react";

const PageSettings = ({ state, setState }) => {
  const pageinfo = state;

  const collapse = { display: !pageinfo.multi_grid ? "none" : "" };

  const updateState = newState => {
    setState({ pageinfo: newState });
  };

  const style_portrait = pageinfo.portrait
    ? "button is-info is-selected is-"
    : "button";
  const style_landscape = !pageinfo.portrait
    ? "button is-info is-selected"
    : "button";

  return (
    <div>
      <h2 className="title">Page Info</h2>
      <div className="columns">
        <div className="column is-10 is-offset-1">
          <div className="columns">
            <div className="column is-half">
              <div className="field">
                <label className="label">Page Size</label>
                <div className="control is-expanded">
                  <div className="select is-fullwidth">
                    <select
                      value={pageinfo.page_size}
                      onChange={e => {
                        updateState({ ...pageinfo, page_size: e.target.value });
                      }}
                    >
                      <option value="A4">A4</option>
                      <option value="A5">A5</option>
                      <option value="Letter">Letter</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="column is-half">
              <div className="field is-full-width">
                <label className="label">Orientation</label>
                <div className="buttons has-addons is-grouped is-centered">
                  <button
                    className={style_portrait}
                    onClick={e => {
                      e.preventDefault();
                      updateState({ ...pageinfo, portrait: true });
                    }}
                  >
                    Portrait
                  </button>
                  <button
                    className={style_landscape}
                    onClick={e => {
                      e.preventDefault();
                      updateState({ ...pageinfo, portrait: false });
                    }}
                  >
                    Landscape
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="columns">
            <div className="column is-half">
              <div className="field">
                <label className="label">Vertical Margin</label>
                <input
                  className="input"
                  type="number"
                  value={pageinfo.page_margin_vertical}
                  onChange={e => {
                    updateState({
                      ...pageinfo,
                      page_margin_vertical: e.target.value
                    });
                  }}
                />
              </div>
            </div>
            <div className="column is-half">
              <div className="field">
                <label className="label">Horizontal Margin</label>
                <input
                  className="input"
                  type="number"
                  value={pageinfo.page_margin_horizontal}
                  onChange={e => {
                    updateState({
                      ...pageinfo,
                      page_margin_horizontal: e.target.value
                    });
                  }}
                />
              </div>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <label className="checkbox">
                <input
                  type="checkbox"
                  checked={pageinfo.multi_grid}
                  onChange={e => {
                    updateState({ ...pageinfo, multi_grid: e.target.checked });
                  }}
                />
                Multiple grids per page
              </label>
            </div>
          </div>

          <div style={collapse}>
            <div className="field">
              <label className="label">Number of Grids on Page</label>
              <input
                className="input"
                type="number"
                value={pageinfo.multi_grid_number}
                onChange={e => {
                  updateState({
                    ...pageinfo,
                    multi_grid_number: e.target.value
                  });
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageSettings;
