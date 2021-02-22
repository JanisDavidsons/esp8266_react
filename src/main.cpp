#include <ESP8266React.h>
#include <RgbStateService.h>
#include <RgbCycleService.h>
#include <TimeAlarms.h>

#define SERIAL_BAUD_RATE 115200

AsyncWebServer server(80);
ESP8266React esp8266React(&server);

RgbStateService rgbStateService = RgbStateService(&server, esp8266React.getSecurityManager(), esp8266React.getFS());
RgbCycleService rgbCycleService = RgbCycleService(&server, esp8266React.getSecurityManager(), esp8266React.getFS());

// update_handler_id_t updateHandler = rgbCycleService.addUpdateHandler([&](const String& originId) {
//   Serial.print("The RgbCycle's state has been updated by: ");
//   Serial.println(originId);
// });

unsigned long previousMillis = 0;
const long interval = 1000;
void turnLightsOn();
void turnLightsOff();

void setup() {
  // start serial and filesystem
  Serial.begin(SERIAL_BAUD_RATE);

  setTime(time(nullptr));

  // start the framework and project
  esp8266React.begin();

  // load the initial RGB object
  rgbStateService.begin();
  rgbCycleService.begin();

  // start the server
  server.begin();

  time_t now = time(nullptr);

  struct tm* time;
  time = localtime(&now);

  setTime(time->tm_hour, time->tm_min, time->tm_sec, time->tm_mday, time->tm_mon + 1, time->tm_year + 1900);

  Alarm.alarmRepeat(20, 54, 0, turnLightsOn);
  Alarm.alarmRepeat(20, 55, 0, turnLightsOff);

  // update driver every second
  Alarm.timerRepeat(1, RgbDriver::updateRgb);
  // Alarm.timerRepeat(5, turnLightsOn);
  // Alarm.timerRepeat(8, turnLightsOff);
}

void loop() {
  // run the framework's loop function
  esp8266React.loop();
  Alarm.delay(1000);

  // rgbCycleService.update(
  //     [&](RgbCycleState& state) {
  //       Serial.println(state.red[22]);
  //       return StateUpdateResult::CHANGED;  // notify StatefulService by returning CHANGED
  //     },
  //     "timer");
  // }
}

void turnLightsOff() {
  Serial.print("Led off called... ");

  rgbStateService.update(
      [&](RgbState& state) {
        if (state.ledOn) {
          RgbDriver::updateRgb(0, 0, 0);
          state.ledOn = false;
          return StateUpdateResult::CHANGED;
        }
        return StateUpdateResult::UNCHANGED;
      },
      "rgbState");
}

void turnLightsOn() {
  Serial.println("Led on called..");

  rgbStateService.update(
      [&](RgbState& state) {
        if (!state.ledOn) {
          RgbDriver::updateRgb(state.redValue, state.greenValue, state.blueValue);
          state.ledOn = true;
          return StateUpdateResult::CHANGED;
        }
        return StateUpdateResult::UNCHANGED;
      },
      "rgbState");
}