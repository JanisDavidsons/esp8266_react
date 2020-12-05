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
    title: {
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
        '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00',
        '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '24:00'
      ],
      tickmarkPlacement: 'on',
      title: {
        enabled: false
      }
    },
    series: [
      {
        name: "Red",
        color: "red",
        dragDrop: { draggableY: true, draggableX: false },
        data: [{ y: 1, x: 0 }, { y: 1, x: 1 }, { y: 1, x: 2 }, { y: 1, x: 3 }, { y: 1, x: 4 }, { y: 1, x: 5 }, { y: 1, x: 6 }, { y: 1, x: 7 }, { y: 1, x: 8 }, { y: 1, x: 9 }, { y: 1, x: 10 }, { y: 1, x: 11 }, { y: 1, x: 12 }, { y: 1, x: 13 }, { y: 1, x: 14 }, { y: 1, x: 15 }, { y: 1, x: 16 }, { y: 1, x: 17 }, { y: 1, x: 18 }, { y: 1, x: 19 }, { y: 1, x: 20 }, { y: 1, x: 21 }, { y: 1, x: 22 }, { y: 1, x: 23 }]
      },
      {
        name: "green",
        color: "green",
        dragDrop: { draggableY: false },
        data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200, 210, 220, 230, 240]
      },
      {
        name: "blue",
        color: "blue",
        dragDrop: { draggableY: false },
        data: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100]
      }
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
