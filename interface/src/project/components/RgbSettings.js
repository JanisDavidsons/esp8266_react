import React from "react";
import { render } from "react-dom";
// Import Highcharts
import Highcharts from "highcharts/highstock";
//import HighchartsReact from "./HighchartsReact.min.js";
import HighchartsReact from "highcharts-react-official";

import HC_more from "highcharts/highcharts-more"; //module
HC_more(Highcharts); //init module

require("highcharts/modules/draggable-points")(Highcharts);

class RgbSettings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        yAxis: {
          softMin: 0,
          softMax: 255
        },
        series: [
          {
            dragDrop: {
              draggableY: true
            },
            data: [10, 20, 240]
          }
        ]
      }
    };
  }

  render() {
    return (
      <HighchartsReact
        constructorType={"chart"}
        ref={this.chartComponent}
        highcharts={Highcharts}
        options={this.state.options}
      />
    );
  }
}

export default RgbSettings;

// render(<App />, document.getElementById("root"));
