import React, { Component } from 'react';
import { ValidatorForm } from 'react-material-ui-form-validator';

import { Typography, Box, Switch } from '@material-ui/core';
import { WEB_SOCKET_ROOT } from '../api';
import { WebSocketControllerProps, WebSocketFormLoader, WebSocketFormProps, webSocketController } from '../components';
import { SectionContent, BlockFormControlLabel } from '../components';
import RgbSettings from './components/RgbSettings';

import { RgbOptions } from './types';

export const RGB_SETTINGS_WEBSOCKET_URL = WEB_SOCKET_ROOT + "rgbOptions";

type RgbStateWebSocketControllerProps = WebSocketControllerProps<RgbOptions>;

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

type RgbStateWebSocketControllerFormProps = WebSocketFormProps<RgbOptions>;

function RgbStateWebSocketControllerForm(props: RgbStateWebSocketControllerFormProps) {

    const { data, saveData, setData } = props;

    return (
        <RgbSettings
            setDataHandler={setData}
            saveDataHandler={saveData}
            data={data}
        />
    );
}