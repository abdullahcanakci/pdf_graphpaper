import React from "react";

const PageSettings = ({ state, setState }) => {
  const pageinfo = state;

  const collapse = { display: !pageinfo.multi_grid ? "none" : "" };

  const updateState = newState => {
    setState({ pageinfo: newState });
  };

  return (
    <div>
      <p>Page Info</p>
      <div>
        <div>
          <label>Size</label>
          <input
            type="text"
            value={pageinfo.page_size}
            onChange={e => {
              updateState({ ...pageinfo, page_size: e.target.value });
            }}
          />
        </div>

        <div>
          <label>Vertical Margin</label>
          <input
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

        <div>
          <label>Horizontal Margin</label>
          <input
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

        <div>
          <input
            type="checkbox"
            checked={pageinfo.multi_grid}
            onChange={e => {
              updateState({ ...pageinfo, multi_grid: e.target.checked });
            }}
          />
          <label>Multiple grids per page</label>
        </div>

        <div style={collapse}>
          <div>
            <label>Number of Grids on Page</label>
            <input
              type="number"
              value={pageinfo.multi_grid_number}
              onChange={e => {
                updateState({ ...pageinfo, multi_grid_number: e.target.value });
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageSettings