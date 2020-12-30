#include <ESP8266React.h>
#include <RgbStateService.h>
#include <RgbCycleService.h>

#define SERIAL_BAUD_RATE 115200

AsyncWebServer server(80);
ESP8266React esp8266React(&server);

RgbStateService rgbStateService = RgbStateService(&server, esp8266React.getSecurityManager(), esp8266React.getFS());
RgbCycleService rgbCycleService = RgbCycleService(&server, esp8266React.getSecurityManager(), esp8266React.getFS());

// update_handler_id_t updateHandler = rgbStateService.addUpdateHandler([&](const String& originId) {
//   Serial.print("The light's state has been updated by: ");
//   Serial.println(originId);
// });

void setup() {
  // start serial and filesystem
  Serial.begin(SERIAL_BAUD_RATE);

  // RgbState RgbState ();

  // start the framework and demo project
  esp8266React.begin();

  // load the initial RGB object
  rgbStateService.begin();
  rgbCycleService.begin();

  // start the server
  server.begin();
}

void loop() {
  // run the framework's loop function
  esp8266React.loop();
}
