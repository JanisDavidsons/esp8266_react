import React, { useState, useEffect } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import HC_more from "highcharts/highcharts-more";
import { FormActions, FormButton } from '../../components';
import { Radio, RadioGroup, FormControl, FormLabel, FormControlLabel, } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';


HC_more(Highcharts);
require("highcharts/modules/draggable-points")(Highcharts);

export default ({ setDataHandler, saveDataHandler, data }) => {

  const [selectedColor, setSelectedColor] = useState('red');

  const [options, setOptions] = useState({

    chart: {
      type: 'spline',
      zoomType: 'x',
      panning: true,
      panKey: 'shift',

      events: {
        load: function () {
          this.xAxis[0].setExtremes(Date.UTC(2010, 0, 1, 9, 0, 0), Date.UTC(2010, 0, 1, 16, 0, 0));
        }
      }
    },

    yAxis: {

    },
    xAxis: {
      min: Date.UTC(2010, 0, 1, 0, 0, 0),
      max: Date.UTC(2010, 0, 2, 0, 0, 0),
      type: 'datetime',
      tickPositioner: function () {
        var info = this.tickPositions.info;
        var positions = [];
        for (let i = Date.UTC(2010, 0, 1, 0, 0, 0); i <= Date.UTC(2010, 0, 2, 0, 0, 0); i += 3600 * 1000) {
          positions.push(i);
        }
        positions.info = info;
        return positions;
      },
      lineWidth: 1,
      dateTimeLabelFormats: {
        day: '%H:%M'
      },
      title: {
        enabled: false
      }
      /* categories: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] */
    },


    series: [
      {
        name: "Red",
        color: "red",
        dragDrop: { draggableY: true },
        data: [
          {
            y: 0,
            x: Date.UTC(2010, 0, 1, 9, 0, 0),
            color: 'red'
          },
          {
            y: 1,
            x: Date.UTC(2010, 0, 1, 10, 0, 0),
            color: 'red'
          },
          {
            y: 3,
            x: Date.UTC(2010, 0, 1, 11, 0, 0),
            color: 'red'
          },

        ]
      },
      {
        name: "Blue",
        color: "blue",
        dragDrop: { draggableY: false },
        data: [
          {
            y: 46,
            x: Date.UTC(2010, 0, 1, 9, 0, 0),
          },
          {
            y: 23,
            x: Date.UTC(2010, 0, 1, 10, 0, 0),
          },
          {
            y: 3,
            x: Date.UTC(2010, 0, 1, 11, 0, 0),
          },

        ]
      },
      {
        name: "Green",
        color: "green",
        dragDrop: { draggableY: false },
        data: [
          {
            y: 5,
            x: Date.UTC(2010, 0, 1, 9, 0, 0),
          },
          {
            y: 156,
            x: Date.UTC(2010, 0, 1, 10, 0, 0),
          },
          {
            y: 33,
            x: Date.UTC(2010, 0, 1, 11, 0, 0),
          },

        ]
      }
    ]


    //   chart: {
    //     zoomType: 'x'
    // },
    // xAxis: {
    //     type: 'datetime',
    //     tickInterval: 3600 * 1000,
    //     min: Date.UTC(2013,4,22),
    //     max: Date.UTC(2013,4,23),
    // },
    // series: [{
    //     data: [
    //         [1369206795000, 1],
    //         [1369225421000, 3],
    //         [1369230934000, 2]
    //     ],
    //     pointStart: Date.UTC(2012, 5, 22),
    //     pointInterval: 24 * 3600 * 1000 // one day
    // }]

    // rangeSelector: {
    //   selected: 4
    // },
    // title: {
    //   text: "RGB day/night cycle"
    // },
    // chart: {
    //   type: "spline",
    //   zoomType: 'x',
    //   panning: true,
    //   panKey: "ctrl",
    //   pinchType: 'x',
    //   events: {
    //     load() {
    //       this.xAxis[0].setExtremes(6, 16);
    //     }
    //   }
    // },
    // tooltip: {
    //   followTouchMove: false
    // },
    // credits: {
    //   text: '© Janis Davidsons',
    //   href: ''
    // },
    // yAxis: {
    //   // softMin: 0,
    //   // softMax: 255,
    //   categories: [1, 2, 3, 4, 5, 6, 7, 8, 9]
    // },
    // xAxis: {
    //   min: Date.UTC(2020, 0, 1, 0, 0, 0),
    //   max: Date.UTC(2020, 0, 2, 0, 0, 0),
    //   type: 'datetime',
    //   tickPositioner: function () {
    //     var info = this.tickPositions.info;
    //     var positions = [];
    //     for (let i = Date.UTC(2020, 0, 1, 0, 0, 0); i <= Date.UTC(2020, 0, 2, 0, 0, 0); i += 3600 * 1000) {
    //       positions.push(i);
    //     }
    //     positions.info = info;
    //     console.log(positions)
    //     return positions;
    //   },
    //   lineWidth: 1,
    //   dateTimeLabelFormats: {
    //     day: '%H:%M'
    //   },
    //   // title: {
    //   //   enabled: false
    //   // }
    //   // type: 'datetime',
    //   // tickInterval: 3600 * 1000,
    //   // min: Date.UTC(2013,4,22),
    //   // max: Date.UTC(2013,4,23),
    //   // // tickInterval: 2,
    //   // // categories: [1537639969000, 1537640271000, 1537640573000, 1537640874000, 1537641176000, 1537641478000, 1537641780000, 1537642081000, 1537642383000, 1537642685000, 1537642987000, 1537643289000, 1537643590000, 1537643892000, 1537644194000, 1537644496000, 1537644797000, 1537645099000, 1537645401000, 1537645703000, 1537646004000, 1537646306000, 1537646608000, 1537646910000, 1537647212000],
    //   // // categories: [
    //   // //   '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00',
    //   // //   '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '24:00'
    //   // // ],
    //   // // startOnTick: false,
    //   // tickmarkPlacement: 'on',
    //   // title: {
    //   //   enabled: false
    //   // }
    // },
    // series: [
    //   {
    //     name: "Red",
    //     color: "red",
    //     dragDrop: { draggableY: true, draggableX: false },
    //     showInNavigator: true,
    //     data: [
    //       { y: 1, x: Date.UTC(2020, 0, 1, 0, 0, 0) },
    //       { y: 1, x: Date.UTC(2020, 0, 1, 1, 0, 0) },
    //       { y: 1, x: Date.UTC(2020, 0, 1, 2, 0, 0) },
    //       { y: 1, x: Date.UTC(2020, 0, 1, 3, 0, 0) },
    //       { y: 1, x: Date.UTC(2020, 0, 1, 4, 0, 0) },
    //       { y: 1, x: Date.UTC(2020, 0, 1, 5, 0, 0) },
    //       { y: 1, x: Date.UTC(2020, 0, 1, 6, 0, 0) },
    //       { y: 1, x: Date.UTC(2020, 0, 1, 7, 0, 0) },
    //       { y: 1, x: Date.UTC(2020, 0, 1, 8, 0, 0) },
    //       { y: 1, x: Date.UTC(2020, 0, 1, 9, 0, 0) },
    //       // { y: 1, x: 10 }, { y: 1, x: 11 }, { y: 1, x: 12 }, { y: 1, x: 13 }, { y: 1, x: 14 }, { y: 1, x: 15 }, { y: 1, x: 16 }, { y: 1, x: 17 }, { y: 1, x: 18 }, { y: 1, x: 19 }, { y: 1, x: 20 }, { y: 1, x: 21 }, { y: 1, x: 22 }, { y: 1, x: 23 }
    //     ],
    //     // pointStart: Date.UTC(2012, 05, 22),
    //     // pointInterval: 24 * 3600 * 1000 // one day
    //   },
    // {
    //   name: "green",
    //   color: "green",
    //   dragDrop: { draggableY: false },
    //   showInNavigator: true,
    //   data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200, 210, 220, 230, 240],
    //   // pointStart: Date.UTC(2012, 05, 22),
    //   // pointInterval: 24 * 3600 * 1000 // one day
    // },
    // {
    //   name: "blue",
    //   color: "blue",
    //   dragDrop: { draggableY: false },
    //   showInNavigator: true,
    //   data: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
    //   // pointStart: Date.UTC(2012, 05, 22),
    //   // pointInterval: 24 * 3600 * 1000 // one day
    // }
    // ]
  })

  var time = [1537639969000, 1537640271000, 1537640573000, 1537640874000, 1537641176000, 1537641478000, 1537641780000, 1537642081000, 1537642383000, 1537642685000, 1537642987000, 1537643289000, 1537643590000, 1537643892000, 1537644194000, 1537644496000, 1537644797000, 1537645099000, 1537645401000, 1537645703000, 1537646004000, 1537646306000, 1537646608000, 1537646910000, 1537647212000];

  const handleSubmit = () => {
    console.log('rgb setting: ', options.series[0].data)
  }

  const handleRadioChange = (event) => {
    let newValue = event.target.value;
    setSelectedColor(newValue);
    setOptions({ ...options }, options.series[0].dragDrop.draggableY = false);
    setOptions({ ...options }, options.series[1].dragDrop.draggableY = false);
    setOptions({ ...options }, options.series[2].dragDrop.draggableY = false);

    console.log({ ...options })
    switch (newValue) {
      case "red":
        const redDraggable = options.series[0].dragDrop.draggableY;
        setOptions({ ...options }, options.series[0].dragDrop.draggableY = redDraggable ? false : true)
        break;
      case "green":
        const greenDraggable = options.series[1].dragDrop.draggableY;
        setOptions({ ...options }, options.series[1].dragDrop.draggableY = greenDraggable ? false : true)
        break;
      case "blue":
        const blueDraggable = options.series[2].dragDrop.draggableY;
        setOptions({ ...options }, options.series[2].dragDrop.draggableY = blueDraggable ? false : true)
        break;
      default:
        break;
    }
  }

  return (
    <>
      <HighchartsReact
        constructorType={"chart"}
        // constructorType={"stockChart"}
        highcharts={Highcharts}
        options={options}
      />

      <FormControl component="fieldset" >
        <FormLabel component="legend">Select to enagble draggable line chart</FormLabel>
        <RadioGroup aria-label="rgb" name="rgb" value={selectedColor} onChange={handleRadioChange}>
          <FormControlLabel value="red" control={<Radio />} label="Red" />
          <FormControlLabel value="green" control={<Radio />} label="Green" />
          <FormControlLabel value="blue" control={<Radio />} label="Blue" />
        </RadioGroup>
      </FormControl>

      <FormActions>
        <FormButton startIcon={<SaveIcon />} variant="contained" color="primary" type="submit" onClick={handleSubmit}>
          Save
            </FormButton>
      </FormActions>
    </>
  );
}
// export default RgbSettings;

// render(<App />, document.getElementById("root"));
