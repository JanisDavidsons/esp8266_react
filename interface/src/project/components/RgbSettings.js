import React, { useState, useEffect } from "react";
// Import Highcharts
import Highcharts from "highcharts/highstock";
//import HighchartsReact from "./HighchartsReact.min.js";
import HighchartsReact from "highcharts-react-official";

import HC_more from "highcharts/highcharts-more"; //module
HC_more(Highcharts); //init module

require("highcharts/modules/draggable-points")(Highcharts);

export default (props) => {

  const [options, setOptions] = useState({
    title:{
      text: "RGB day/night cycle"
    },
    chart: {
      type: "spline"
      // type: "area"
    },
    yAxis: {
      softMin: 0,
      softMax: 255
    },
    xAxis: {
      categories: [
        '01:00','02:00','03:00','04:00','05:00','06:00','07:00','08:00','09:00','10:00','11:00','12:00',
        '13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00','24:00'
      ],
      tickmarkPlacement: 'on',
      title: {
        enabled: false
      }
    },
    series: [
      {
        name:"Red",
        color:"red",
        dragDrop: {draggableY: true},
        data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]
      },
      {
        name:"green",
        color:"green",
        dragDrop: {draggableY: true},
        data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200, 210, 220, 230, 240]
      },
      {
        name:"blue",
        color:"blue",
        dragDrop: {draggableY: true},
        data: [100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100]
      }
    ]
  })

  return (
    <>
      <HighchartsReact
        constructorType={"chart"}
        ref={props.chartComponent}
        // constructorType={"stockChart"}
        highcharts={Highcharts}
        options={options}
      />
    </>
  );
}
// export default RgbSettings;

// render(<App />, document.getElementById("root"));
