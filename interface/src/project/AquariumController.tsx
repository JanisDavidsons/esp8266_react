import React, { Component } from 'react';
import { Redirect, Switch, RouteComponentProps } from 'react-router-dom'

import { Tabs, Tab } from '@material-ui/core';

import { PROJECT_PATH } from '../api';
import { MenuAppBar } from '../components';
import { AuthenticatedRoute } from '../authentication';

import DemoInformation from './Information';
import RgbStateWebSocketController from './RgbStateWebSocketController';
import RgbSettingsController from './RgbSettingsController';

class AquariumController extends Component<RouteComponentProps> {

  handleTabChange = (event: React.ChangeEvent<{}>, path: string) => {
    this.props.history.push(path);
  };

  render() {
    return (
      <MenuAppBar sectionTitle="ESP8266 Project">
        <Tabs value={this.props.match.url} onChange={this.handleTabChange} variant="fullWidth">
          <Tab value={`/${PROJECT_PATH}/information`} label="Information" />
          <Tab value={`/${PROJECT_PATH}/rgb`} label="RGB Controller" />
          <Tab value={`/${PROJECT_PATH}/rgbSettings`} label="RGB Settings" />
        </Tabs>
        <Switch>
          <AuthenticatedRoute exact path={`/${PROJECT_PATH}/information`} component={DemoInformation} />
          <AuthenticatedRoute exact path={`/${PROJECT_PATH}/rgb`} component={RgbStateWebSocketController} />
          <AuthenticatedRoute exact path={`/${PROJECT_PATH}/rgbSettings`} component={RgbSettingsController} />
          <Redirect to={`/${PROJECT_PATH}/information`} />
        </Switch>
      </MenuAppBar>
    )
  }
}

export default AquariumController;