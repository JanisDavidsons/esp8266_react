import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        width: "100%",
    },
    input: {
        width: 52,
    },
});

export default ({setDataHandler, saveDataHandler}) => {

    const classes = useStyles();
    const [red, setRed] = useState(30);
    const [green, setGreen] = useState(30);
    const [blue, setBlue] = useState(30);

    const handleSliderChange = (event, newValue) => {
        setRed(newValue)
        console.log(event.target);
        // setData(
        //     { led_on: true, redValue: 255, greenValue: 255, BlueValue: 255 },
        //     saveData);
    };

    const handleInputChange = event => {
        setRed(event.target.value === '' ? '' : Number(event.target.value));
    }

    const handleBlur = () => {
        if (red < 0) {
            setRed(0);
        } else if (red > 255) {
            setRed(255);
        }
    };

    return (
        <div className={classes.root}>
            <Typography id="red-slider" gutterBottom>
                Red value
            </Typography>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs>
                    <Slider
                        track='normal'
                        valueLabelDisplay='auto'
                        value={typeof red === 'number' ? red : 0}
                        max={255}
                        onChange={handleSliderChange}
                        aria-labelledby="red-slider"
                    />
                </Grid>
                <Grid item>
                    <Input
                        className={classes.input}
                        value={green}
                        margin="dense"
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        inputProps={{
                            step: 1,
                            min: 0,
                            max: 255,
                            type: 'number',
                            'aria-labelledby': 'red-slider',
                        }}
                    />
                </Grid>
            </Grid>

            <Typography id="blue-slider" gutterBottom>
                Blue value
            </Typography>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs>
                    <Slider
                        value={typeof green === 'number' ? green : 0}
                        max={255}
                        onChange={handleSliderChange}
                        aria-labelledby="blue-slider"
                    />
                </Grid>
                <Grid item>
                    <Input
                        className={classes.input}
                        value={red}
                        margin="dense"
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        inputProps={{
                            step: 1,
                            min: 0,
                            max: 255,
                            type: 'number',
                            'aria-labelledby': 'blue-slider',
                        }}
                    />
                </Grid>
            </Grid>

            <Typography id="input-slider" gutterBottom>
                Greem value
            </Typography>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs>
                    <Slider
                        value={typeof blue === 'number' ? blue : 0}
                        max={255}
                        onChange={handleSliderChange}
                        aria-labelledby="green-slider"
                    />
                </Grid>
                <Grid item>
                    <Input
                        className={classes.input}
                        value={blue}
                        margin="dense"
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        inputProps={{
                            step: 1,
                            min: 0,
                            max: 255,
                            type: 'number',
                            'aria-labelledby': 'green-slider',
                        }}
                    />
                </Grid>
            </Grid>
        </div>
    )
}