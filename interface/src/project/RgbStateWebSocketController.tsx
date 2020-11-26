import React, { Component, useState } from 'react';
import { ValidatorForm } from 'react-material-ui-form-validator';

import { Typography, Box, Switch } from '@material-ui/core';
import { WEB_SOCKET_ROOT } from '../api';
import { WebSocketControllerProps, WebSocketFormLoader, WebSocketFormProps, webSocketController } from '../components';
import { SectionContent, BlockFormControlLabel } from '../components';
import RgbSlider from './components/RgbSlider';

import { RgbState } from './types';
import { random } from 'lodash';
import { randomInt } from 'crypto';

export const RGB_SETTINGS_WEBSOCKET_URL = WEB_SOCKET_ROOT + "rgbState";

type RgbStateWebSocketControllerProps = WebSocketControllerProps<RgbState>;

class RgbStateWebSocketController extends Component<RgbStateWebSocketControllerProps> {

  render() {
    return (
      <SectionContent title='Rgb Controller' titleGutter>
        <WebSocketFormLoader
          {...this.props}
          render={props => (
            <RgbStateWebSocketControllerForm {...props} />
          )}
        />
      </SectionContent>
    )
  }
}

export default webSocketController(RGB_SETTINGS_WEBSOCKET_URL, 100, RgbStateWebSocketController);

type RgbStateWebSocketControllerFormProps = WebSocketFormProps<RgbState>;

function RgbStateWebSocketControllerForm(props: RgbStateWebSocketControllerFormProps) {

  const { data, saveData, setData } = props;

  const changeLedOn = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(Math.floor(Math.random() * (255 + 1)))
    setData(
      {
        led_on: event.target.checked,
        red_value: Math.floor(Math.random() * (255 + 1)),
        green_value: Math.floor(Math.random() * (255 + 1)),
        Blue_value: Math.floor(Math.random() * (255 + 1))
      },
      saveData);
  }

  return (
    <ValidatorForm onSubmit={saveData}>
      <Box bgcolor="primary.main" color="primary.contrastText" p={2} mt={2} mb={2}>
        <Typography variant="body1">
          Toggle RGB state.
        </Typography>
      </Box>
      <BlockFormControlLabel
        control={
          <Switch
            checked={data.led_on}
            onChange={changeLedOn}
            color="primary"
          />
        }
        label="LED State?"
      />
      <RgbSlider
        setDataHandler={setData}
        saveDataHandler={saveData}
      />
    </ValidatorForm>
  );
}