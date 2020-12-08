#include <ESP8266React.h>
#include <RgbStateService.h>

#define SERIAL_BAUD_RATE 115200

AsyncWebServer server(80);
ESP8266React esp8266React(&server);

RgbStateService rgbStateService = RgbStateService(&server, esp8266React.getSecurityManager(), esp8266React.getFS());

// update_handler_id_t updateHandler = rgbStateService.addUpdateHandler([&](const String& originId) {
//   Serial.print("The light's state has been updated by: ");
//   Serial.println(originId);


void setup() {
  // start serial and filesystem
  Serial.begin(SERIAL_BAUD_RATE);

  // start the framework and demo project
  esp8266React.begin();

  // load the initial light settings
  // lightStateService.begin();
  rgbStateService.begin();

  // start the light service
  // lightMqttSettingsService.begin();

  // start the server
  server.begin();
}

void loop() {
  // run the framework's loop function
  esp8266React.loop();
}


// class RgbState {
//  public:
//   bool on = false;
//   uint8_t RedBrightness = 255;
//   uint8_t GreenBrightness = 255;
//   uint8_t BlueBrightness = 255;
// };

// class RgbStateService : public StatefulService<RgbState> {
// };
