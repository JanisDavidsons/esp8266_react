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
      // panning: true,
      events: {
        load: function () {
        }
      }
    },
    navigator: {
      series: {
        color: '#FF00FF',
        lineWidth: 1
      }
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
      title: {
        text: 'Hours'
      },



      dateTimeLabelFormats: { hour: '%H:%M' },
      lineWidth: 1,
      dateTimeLabelFormats: {
        day: '%H:%M'
      },
      title: {
        enabled: false
      }
    },

    time: {
      useUTC: false
    },

    plotOptions: {
      series: {
        showInNavigator: true
      }
    },

    rangeSelector: {
      buttons: [{
        count: 1,
        type: 'hour',
        text: '1H'
      }, {
        count: 5,
        type: 'hour',
        text: '5H'
      }, {
        type: 'all',
        text: 'All'
      }],
      inputEnabled: false,
      selected: 2
    },

    title: {
      text: "RGB day/night cycle"
    },

    exporting: {
      enabled: false
    },

    tooltip: {
      split: true,
      xDateFormat: '%H:%M',
      valueDecimals: 0,
      followTouchMove: false,
      pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b><br/>',
    },

    series: [
      {
        name: "Red",
        color: "red",
        type: 'spline',
        dragDrop: {
          draggableY: true,
          dragMaxY: 255,
          dragMinY: 0,
        },
        visible: true,

        data: (function () {
          var data = []
          for (let i = Date.UTC(2020, 0, 1, -2, 0, 0); i <= Date.UTC(2020, 0, 2, -2, 0, 0); i += 3600 * 500) {
            data.push([i, Math.round(Math.random() * 255)]);
          }

          return data;
        }())
      },
      {
        name: "Green",
        color: "green",
        type: 'spline',
        dragDrop: {
          draggableY: true,
          dragMaxY: 255,
          dragMinY: 0,
        },

        data: (function () {
          var data = []

          for (let i = Date.UTC(2020, 0, 1, -2, 0, 0); i <= Date.UTC(2020, 0, 2, -2, 0, 0); i += 3600 * 500) {
            data.push([i, Math.round(Math.random() * 255)]);
          }

          return data;
        }())
      },
      {
        name: "Blue",
        color: "blue",
        type: 'spline',
        dragDrop: {
          draggableY: true,
          dragMaxY: 255,
          dragMinY: 0,
        },

        data: (function () {
          var data = []
          for (let i = Date.UTC(2020, 0, 1, -2, 0, 0); i <= Date.UTC(2020, 0, 2, -2, 0, 0); i += 3600 * 500) {
            data.push([i, Math.round(Math.random() * 255)]);
          }

          return data;
        }())
      }
    ]
  })

  const handleSubmit = () => {
    let result = { red: [], green: [], blue: [] };

    let conv = arr => arr.map(v => Array.isArray(v) ? conv(v) : String(v) || 0);

    options.series.map(color => {
      color.data.map(value => {
        result[color.color].push(value[1].toString())
      })
    });
    // options.series[0].data.forEach(element => {
    //   result["red"].push(element[1].toString())
    //   result["blue"].push(element[1].toString())

    // })
    console.log(result)
    console.log("data from api before: ", data);


    setDataHandler({
      graph: { red: result.red }
    }, saveDataHandler);

    setTimeout(() => {
      setDataHandler({
        graph: { green: result.green }
      }, saveDataHandler);
    }, 500)

    setTimeout(() => {
      setDataHandler({
        graph: { blue: result.blue }
      }, saveDataHandler);
    }, 500)

    // console.log('rgb setting: ', options.series)
    // console.log("stringified array : ", result)
    console.log("data from api after: ", data);
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
        // constructorType={"chart"}
        constructorType={"stockChart"}
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