import React, { Component } from 'react';
import { ValidatorForm } from 'react-material-ui-form-validator';

import { Typography, Box, Switch } from '@material-ui/core';
import { WEB_SOCKET_ROOT } from '../api';
import { WebSocketControllerProps, WebSocketFormLoader, WebSocketFormProps, webSocketController } from '../components';
import { SectionContent, BlockFormControlLabel } from '../components';

import { RgbState } from './types';

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
    setData({ led_on: event.target.checked }, saveData);
  }

  return (
    <ValidatorForm onSubmit={saveData}>
      <Box bgcolor="primary.main" color="primary.contrastText" p={2} mt={2} mb={2}>
        <Typography variant="body1">
          The switch below controls the LED via the WebSocket. It will automatically update whenever the LED state changes.
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
    </ValidatorForm>
  );
}