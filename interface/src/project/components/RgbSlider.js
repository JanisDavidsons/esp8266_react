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
    thumb: {
        height: 24,
        width: 24,
        backgroundColor: "#fff",
        border: "2px solid currentColor",
        marginTop: -8,
        marginLeft: -12,
        "&:focus, &:hover, &$active": {
            boxShadow: "inherit"
        }
    },
    active: {},
    valueLabel: {
        left: "calc(-50% + 4px)"
    },
    track: {
        height: 8,
        borderRadius: 4
    },
    rail: {
        height: 8,
        borderRadius: 4
    }
});

export default ({ setDataHandler, saveDataHandler }) => {

    const classes = useStyles();
    const [red, setRed] = useState(30);
    const [green, setGreen] = useState(30);
    const [blue, setBlue] = useState(30);

    const handleRedSlider = (event, newValue) => {
        setRed(newValue)
        sendToApi();
    };

    const handleGreenSlider = (event, newValue) => {
        setGreen(newValue)
        sendToApi();
    };

    const handleBlueSlider = (event, newValue) => {
        setBlue(newValue)
        sendToApi();
    };

    const handleRedInputChange = event => {
        setRed(event.target.value === '' ? '' : Number(event.target.value));
        sendToApi();
    }

    const handleGreenInputChange = event => {
        setGreen(event.target.value === '' ? '' : Number(event.target.value));
        sendToApi();
    }

    const handleBlueInputChange = event => {
        setBlue(event.target.value === '' ? '' : Number(event.target.value));
        sendToApi();
    }

    const sendToApi = () => {
        console.log("red: ", red, "green: ", green, "blue: ", blue)
        setDataHandler(
            { led_on: true, red_value: red, green_value: green, blue_value: blue },
            saveDataHandler);
    }

    const handleBlur = (color) => {
        switch (color) {
            case "red":
                if (red < 0) {
                    setRed(0);
                } else if (red > 255) setRed(255);
                break;
            case "green":
                if (green < 0) {
                    setGreen(0);
                } else if (green > 255) setGreen(255);
                break;
            case "blue":
                if (blue < 0) {
                    setBlue(0);
                } else if (blue > 255) setBlue(255);
                break;
            default:
                break;
        }
        if (red < 0) {
            setRed(0);
        } else if (red > 255) {
            setRed(255);
        }
    };

    return (
        <div className={classes.root}>

            {/* Red slider */}
            <Typography id="red-slider" gutterBottom>
                Red value
            </Typography>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs>
                    <Slider
                        className={classes.track}
                        track='normal'
                        valueLabelDisplay='auto'
                        value={typeof red === 'number' ? red : 0}
                        max={255}
                        onChange={handleRedSlider}
                        aria-labelledby="red-slider"
                    />
                </Grid>
                <Grid item>
                    <Input
                        className={classes.input}
                        value={red}
                        margin="dense"
                        onChange={handleRedInputChange}
                        onBlur={handleBlur("red")}
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

            {/* Green slider */}
            <Typography id="green-slider" gutterBottom>
                Green value
            </Typography>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs>
                    <Slider
                        className={classes.track}
                        track='normal'
                        valueLabelDisplay='auto'
                        value={typeof green === 'number' ? green : 0}
                        max={255}
                        onChange={handleGreenSlider}
                        aria-labelledby="green-slider"
                    />
                </Grid>
                <Grid item>
                    <Input
                        className={classes.input}
                        value={green}
                        margin="dense"
                        onChange={handleGreenInputChange}
                        onBlur={handleBlur("green")}
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

            {/* blue sider */}
            <Typography id="input-slider" gutterBottom>
                Blue value
            </Typography>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs>
                    <Slider
                        className={classes.track}
                        track='normal'
                        valueLabelDisplay='auto'
                        value={typeof blue === 'number' ? blue : 0}
                        max={255}
                        onChange={handleBlueSlider}
                        aria-labelledby="blue-slider"
                    />
                </Grid>
                <Grid item>
                    <Input
                        className={classes.input}
                        value={blue}
                        margin="dense"
                        onChange={handleBlueInputChange}
                        onBlur={handleBlur("blue")}
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
        </div>
    )
}