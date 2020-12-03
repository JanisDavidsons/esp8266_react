import React, { Component } from 'react';
import { Redirect, Switch, RouteComponentProps } from 'react-router-dom'

import { Tabs, Tab } from '@material-ui/core';

import { PROJECT_PATH } from '../api';
import { MenuAppBar } from '../components';
import { AuthenticatedRoute } from '../authentication';

import DemoInformation from './Information';
import RgbStateWebSocketController from './RgbStateWebSocketController';

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
        </Tabs>
        <Switch>
          <AuthenticatedRoute exact path={`/${PROJECT_PATH}/information`} component={DemoInformation} />
          <AuthenticatedRoute exact path={`/${PROJECT_PATH}/rgb`} component={RgbStateWebSocketController} />
          <Redirect to={`/${PROJECT_PATH}/information`} />
        </Switch>
      </MenuAppBar>
    )
  }
}

export default AquariumController;