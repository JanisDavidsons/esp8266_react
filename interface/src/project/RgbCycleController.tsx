import React, { Component } from 'react';

import {Switch } from '@material-ui/core';
import { WEB_SOCKET_ROOT } from '../api';
import { WebSocketControllerProps, WebSocketFormLoader, WebSocketFormProps, webSocketController } from '../components';
import { SectionContent} from '../components';
import RgbSettings from './components/RgbSettings';

import { RgbOptions } from './types';

export const RGB_SETTINGS_WEBSOCKET_URL = WEB_SOCKET_ROOT + "rgbCycle";

type RgbCycleControllerProps = WebSocketControllerProps<RgbOptions>;

class RgbCycleController extends Component<RgbCycleControllerProps> {

    render() {
        return (
            <SectionContent title='Rgb Controller' titleGutter>
                <WebSocketFormLoader
                    {...this.props}
                    render={props => (
                        <RgbCycleControllerForm {...props} />
                    )}
                />
            </SectionContent>
        )
    }
}

export default webSocketController(RGB_SETTINGS_WEBSOCKET_URL, 100, RgbCycleController);

type RgbCycleControllerFormProps = WebSocketFormProps<RgbOptions>;

function RgbCycleControllerForm(props: RgbCycleControllerFormProps) {

    const { data, saveData, setData } = props;

    return (
        <RgbSettings
            setDataHandler={setData}
            saveDataHandler={saveData}
            data={data}
        />
    );
}