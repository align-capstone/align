import React from 'react'
import firebase from 'APP/fire'
import { VictoryAxis, VictoryChart, VictoryLine, VictoryBrushContainer, VictoryZoomContainer } from 'victory'
const db = firebase.database()

export default class extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  handleZoom(domain) {
    this.setState({selectedDomain: domain});
  }

  handleBrush(domain) {
    this.setState({zoomDomain: domain});
  }

  render() {
    const chartStyle = { parent: {minWidth: "50%", maxWidth: "80%", marginLeft: "10%"}};
    return (
      <div>
        <VictoryChart width={600} height={400} scale={{x: "time"}} style={chartStyle}
          containerComponent={
            <VictoryZoomContainer
              dimension="x"
              zoomDomain={this.state.zoomDomain}
              onDomainChange={this.handleZoom.bind(this)}
            />
          }
        >
            <VictoryLine
              style={{
                data: {stroke: "tomato"}
              }}
              data={[
                {a: new Date(1982, 1, 1), b: 2},
                {a: new Date(1987, 1, 1), b: 2},
                {a: new Date(1993, 1, 1), b: 2},
                {a: new Date(1997, 1, 1), b: 2},
                {a: new Date(2001, 1, 1), b: 2},
                {a: new Date(2005, 1, 1), b: 2},
                {a: new Date(2011, 1, 1), b: 2},
                {a: new Date(2015, 1, 1), b: 2}
              ]}
              x="a"
              y="b"
            />

            <VictoryLine
              style={{
                data: {stroke: "tomato"}
              }}
              data={[
                {a: new Date(1982, 1, 1), b: 3},
                {a: new Date(1987, 1, 1), b: 3},
                {a: new Date(1993, 1, 1), b: 3},
                {a: new Date(1997, 1, 1), b: 3},
                {a: new Date(2001, 1, 1), b: 3},
                {a: new Date(2005, 1, 1), b: 3},
                {a: new Date(2011, 1, 1), b: 3},
                {a: new Date(2015, 1, 1), b: 3}
              ]}
              x="a"
              y="b"
            />

          </VictoryChart>
          <VictoryChart
            padding={{top: 0, left: 50, right: 50, bottom: 30}}
            width={600} height={100} scale={{x: "time"}}
            containerComponent={
              <VictoryBrushContainer
                dimension="x"
                selectedDomain={this.state.selectedDomain}
                onDomainChange={this.handleBrush.bind(this)}
              />
            }
          >
            <VictoryAxis
              tickFormat={(x) => new Date(x).getFullYear()}
            />
            <VictoryLine
              style={{
                data: {stroke: "tomato"}
              }}
              data={[
                {key: new Date(1982, 1, 1), b: 125},
                {key: new Date(1987, 1, 1), b: 257},
                {key: new Date(1993, 1, 1), b: 345},
                {key: new Date(1997, 1, 1), b: 515},
                {key: new Date(2001, 1, 1), b: 132},
                {key: new Date(2005, 1, 1), b: 305},
                {key: new Date(2011, 1, 1), b: 270},
                {key: new Date(2015, 1, 1), b: 470}
              ]}
              x="key"
              y="b"
            />
          </VictoryChart>
      </div>
    );
  }
}
