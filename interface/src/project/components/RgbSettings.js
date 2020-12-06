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
          this.xAxis[0].setExtremes(Date.UTC(2020, 0, 1, 9, 0, 0), Date.UTC(2020, 0, 1, 22, 0, 0));
        }
      }
    },

    tooltip: {
      followTouchMove: false
    },
    credits: {
      text: '© Janis Davidsons',
      href: ''
    },
    yAxis: {
      dragMaxY: 255,

      min: 0,
      max: 255
    },
    xAxis: {
      min: Date.UTC(2020, 0, 1, 0, 0, 0),
      max: Date.UTC(2020, 0, 2, 0, 0, 0),
      type: 'datetime',
      tickPositioner: function () {
        var info = this.tickPositions.info;
        var positions = [];
        for (let i = Date.UTC(2020, 0, 1, 0, 0, 0); i <= Date.UTC(2020, 0, 2, 0, 0, 0); i += 3600 * 500) {
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
      },
      labels: {
        rotation: -45,
        style: {
          fontSize: '13px',
          fontFamily: 'Verdana, sans-serif'
        }
      }
    },


    series: [
      {
        name: "Red",
        color: "red",
        dragDrop: {
          draggableY: true,
          dragMaxY: 255,
          dragMinY:0
        },
        data: [
          {
            y: 0,
            x: Date.UTC(2020, 0, 1, 9, 0, 0),
          },
          {
            y: 1,
            x: Date.UTC(2020, 0, 1, 10, 0, 0),
          },
          {
            y: 3,
            x: Date.UTC(2020, 0, 1, 11, 0, 0),
          },

        ]
      },
      {
        name: "Green",
        color: "green",
        dragDrop: {
          draggableY: false,
          dragMaxY: 255,
          dragMinY:0
        },
        data: [
          {
            y: 5,
            x: Date.UTC(2020, 0, 1, 9, 0, 0),
          },
          {
            y: 156,
            x: Date.UTC(2020, 0, 1, 10, 0, 0),
          },
          {
            y: 33,
            x: Date.UTC(2020, 0, 1, 11, 0, 0),
          },

        ]
      },
      {
        name: "Blue",
        color: "blue",
        dragDrop: {
          draggableY: false,
          dragMaxY: 255,
          dragMinY:0
        },
        data: [
          {
            y: 46,
            x: Date.UTC(2020, 0, 1, 9, 0, 0),
          },
          {
            y: 23,
            x: Date.UTC(2020, 0, 1, 10, 0, 0),
          },
          {
            y: 3,
            x: Date.UTC(2020, 0, 1, 11, 0, 0),
          },

        ]
      },
    ]
  })

  const handleSubmit = () => {
    console.log('rgb setting: ', options.series[0].data)
  }

  const handleRadioChange = (event) => {
    let newValue = event.target.value;
    setSelectedColor(newValue);
    setOptions({ ...options }, options.series[0].dragDrop.draggableY = false);
    setOptions({ ...options }, options.series[1].dragDrop.draggableY = false);
    setOptions({ ...options }, options.series[2].dragDrop.draggableY = false);

    switch (newValue) {
      case "red":
        const redDraggable = options.series[0].dragDrop.draggableY;
        setOptions({ ...options }, options.series[0].dragDrop.draggableY = redDraggable ? false : true)
        console.log('red: ', { ...options.series })

        break;
      case "green":
        const greenDraggable = options.series[1].dragDrop.draggableY;
        setOptions({ ...options }, options.series[1].dragDrop.draggableY = greenDraggable ? false : true)
        console.log('green: ', { ...options.series })

        break;
      case "blue":
        const blueDraggable = options.series[2].dragDrop.draggableY;
        setOptions({ ...options }, options.series[2].dragDrop.draggableY = blueDraggable ? false : true)
        console.log('blue: ', { ...options.series })

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
