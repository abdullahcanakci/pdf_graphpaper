import React from "react";

const GridSettings = ({ state, setState }) => {
  const gridinfo = state;

  const collapse = { display: !gridinfo.secondary_subdivision ? "none" : "" };

  const updateState = newState => {
    setState({ gridinfo: newState });
  };

  return (
    <div>
      <div>
        <label>Grid Size</label>
        <div>
          <input
            value={gridinfo.primary_cell_size}
            onChange={e =>
              updateState({ ...gridinfo, primary_cell_size: e.target.value })
            }
            type="number"
          />
        </div>
      </div>

      <div>
        <label className="label">Grid Color</label>
        <div>
          <input
            value={gridinfo.primary_cell_color}
            onChange={e =>
              updateState({ ...gridinfo, primary_cell_color: e.target.value })
            }
            type="color"
          />
        </div>
      </div>

      <div>
        <input
          value={gridinfo.secondary_division}
          onChange={e =>
            updateState({ ...gridinfo, secondary_division: e.target.checked })
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
              value={gridinfo.secondary_division_amount}
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
              value={gridinfo.secondary_color}
              onChange={e =>
                updateState({ ...gridinfo, secondary_color: e.target.value })
              }
              type="color"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GridSettings;
