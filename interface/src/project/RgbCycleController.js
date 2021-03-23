import React, { Component } from 'react';
import { Switch } from '@material-ui/core';
import { WEB_SOCKET_ROOT } from '../api';
import { WebSocketFormLoader, webSocketController } from '../components';
import { SectionContent } from '../components';
import RgbSettings from './components/RgbSettings';

export const RGB_SETTINGS_WEBSOCKET_URL = WEB_SOCKET_ROOT + "rgbCycle";

const RgbCycleController = (props) => {
    const test = webSocketController(WEB_SOCKET_ROOT + "green", 100, RgbCycleController);
    console.log(test.data)
    return (
        <SectionContent title='Rgb Controller' titleGutter>
            <WebSocketFormLoader
                {...props}
                render={props => (
                    <RgbCycleControllerForm {...props} />
                )}
            />
        </SectionContent>
    )
}

export default webSocketController(RGB_SETTINGS_WEBSOCKET_URL, 100, RgbCycleController);

const RgbCycleControllerForm = (props) => {

    const { data, saveData, setData } = props;

    return (
        <RgbSettings
            setDataHandler={setData}
            saveDataHandler={saveData}
            data={data}
        />
    );
}