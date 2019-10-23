import React from "react";

const GridSettings = ({ state, setState }) => {
  const gridinfo = state;

  const collapse = { display: !gridinfo.secondary_division ? "none" : "" };

  const updateState = newState => {
    setState({ gridinfo: newState });
  };

  return (
    <div>
      <h2 className="title">Grid Info</h2>
      <div className="columns">
        <div className="column is-10 is-offset-1">
          <div className="columns">
            <div className="field column is-half">
              <label className="label">Grid Size</label>
              <input
                className="input"
                value={gridinfo.primary_cell_size}
                onChange={e =>
                  updateState({
                    ...gridinfo,
                    primary_cell_size: e.target.value
                  })
                }
                type="number"
              />
            </div>

            <div className="field column is-half">
              <label className="label">Grid Color</label>
              <input
                className="input"
                value={gridinfo.primary_cell_color}
                onChange={e =>
                  updateState({
                    ...gridinfo,
                    primary_cell_color: e.target.value
                  })
                }
                type="color"
              />
            </div>
          </div>

          <div className="field">
            <label className="checkbox">
              <input
                type="checkbox"
                value={gridinfo.secondary_division}
                onChange={e =>
                  updateState({
                    ...gridinfo,
                    secondary_division: e.target.checked
                  })
                }
              />
              Subdivide
            </label>
          </div>

          <div style={collapse}>
            <div className="columns">
              <div className="column is-half">
                <div className="field">
                  <label className="label">Number of Subdivisions</label>
                  <input
                    className="input"
                    type="number"
                    value={gridinfo.secondary_division_amount}
                    onChange={e =>
                      updateState({
                        ...gridinfo,
                        subdivide_number: e.target.value
                      })
                    }
                  />
                </div>
              </div>

              <div className="field column is-half">
                <label className="label">Subdivision Color</label>
                <input
                  className="input"
                  type="color"
                  value={gridinfo.secondary_color}
                  onChange={e =>
                    updateState({
                      ...gridinfo,
                      secondary_color: e.target.value
                    })
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GridSettings;
