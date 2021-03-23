import React, { Component } from 'react';
import { Typography, Box, List, ListItem, ListItemText } from '@material-ui/core';
import { SectionContent } from '../components';

class DemoInformation extends Component {

  render() {
    return (
      <SectionContent title='Information' titleGutter>
        <Typography variant="body1" paragraph>
          This interface allows you to control the aquarium lights.
        </Typography>
        <Typography variant="body1" paragraph>
          It is still in development process and new features are being added on regular basis.
        </Typography>      
        <List>
          <ListItem>
            <ListItemText
              primary="RGB controller"
              secondary="You can adjust intensity for red, blue and green colors."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="RGB settings"
              secondary="Here you can adjust light auto cycle settings. It simulates 24 hour day/night enviroument and 
                        change each color based on time."
            />
          </ListItem>
        </List>
        <Box mt={2}>
          <Typography variant="body1">
            See my projects <a href="https://github.com/JanisDavidsons">at github</a> .
          </Typography>
        </Box>
      </SectionContent>
    )
  }

}

export default DemoInformation;
