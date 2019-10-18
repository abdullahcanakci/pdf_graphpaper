import React, { useState } from "react";

const PageInfo = ({ state, setState }) => {
  const pageinfo = state.pageinfo;
  const collapse = { display: !pageinfo.division ? "none" : "" };

  const updateState = newState => {
    setState({ ...state, pageinfo: newState });
  };

  return (
    <div>
      <p className="card-header-title">Page Info</p>

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
        <label>Margin</label>
        <input
          type="number"
          value={pageinfo.page_margin}
          onChange={e => {
            updateState({ ...pageinfo, page_margin: e.target.value });
          }}
        />
      </div>

      <div>
        <input
          type="checkbox"
          checked={pageinfo.division}
          onChange={e => {
            updateState({ ...pageinfo, division: e.target.checked });
          }}
        />
        <label>Multiple grids per page</label>
      </div>

      <div style={collapse}>
        <div>
          <label>Number of Grids on Page</label>
          <input
            type="number"
            value={pageinfo.division_amount}
            onChange={e => {
              updateState({ ...pageinfo, division_amount: e.target.value });
            }}
          />
        </div>

        <div>
          <label>Inter Grid Spacing</label>
          <input
            type="number"
            value={pageinfo.division_margin}
            onChange={e => {
              updateState({ ...pageinfo, division_margin: e.target.value });
            }}
          />
        </div>
      </div>
    </div>
  );
};

const GridInfo = ({ state, setState }) => {
  const gridinfo = state.gridinfo;

  const collapse = { display: !gridinfo.subdivide ? "none" : "" };

  const updateState = newState => {
    setState({ ...state, gridinfo: newState });
  };

  return (
    <div>
      <div>
        <label>Grid Size</label>
        <div>
          <input
            value={gridinfo.size}
            onChange={e => updateState({ ...gridinfo, size: e.target.value })}
            type="number"
          />
        </div>
      </div>

      <div>
        <label className="label">Grid Color</label>
        <div>
          <input
            value={gridinfo.color}
            onChange={e => updateState({ ...gridinfo, color: e.target.value })}
            type="color"
          />
        </div>
      </div>

      <div>
        <input
          value={gridinfo.subdivide}
          onChange={e =>
            updateState({ ...gridinfo, subdivide: e.target.checked })
          }
          type="checkbox"
        />
        <label>Subdivide</label>
      </div>

      <div style={collapse}>
        <div>
          <label>Number of Subdivisions</label>
          <div>
            <input
              value={gridinfo.subdivide_number}
              onChange={e =>
                updateState({ ...gridinfo, subdivide_number: e.target.value })
              }
              type="number"
            />
          </div>
        </div>

        <div>
          <label>Subdivision Color</label>
          <div>
            <input
              value={gridinfo.subdivide_color}
              onChange={e =>
                updateState({ ...gridinfo, subdivide_color: e.target.value })
              }
              type="color"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

function App() {
  const [state, setState] = useState({
    pageinfo: {
      page_size: "",
      page_margin: 0,
      division: false,
      division_amount: 0,
      division_margin: 0
    },
    gridinfo: {
      size: 1,
      color: "#54c384",
      subdivide: false,
      subdivide_number: 0,
      subdivide_color: "#a341b7"
    }
  });

  const onStateChange = update => {
    setState({ ...state, update });
    console.log(state);
  };

  return (
    <div>
      <form>
        <PageInfo state={state} setState={setState} />
        <GridInfo state={state} setState={setState} />
      </form>
      <button
        onClick={e => console.log(state)}
      >
        Generate
      </button>
    </div>
  );
}

export default App;
