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
int currentSecond = 0;
const int trigerTime = 15;
bool isTimeSet = false;

void turnLightsOn();
void turnLightsOff();
void onEverySecond();

void setup() {
  // start serial and filesystem
  Serial.begin(SERIAL_BAUD_RATE);

  // start the framework and project
  esp8266React.begin();

  // load the initial RGB object
  rgbStateService.begin();
  rgbCycleService.begin();

  // start the server
  server.begin();

  // Once a second call onEverySecond function
  Alarm.timerRepeat(1, onEverySecond);
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

void onEverySecond() {

    if (!isTimeSet && currentSecond > trigerTime) {
    Serial.println("Setting time...");
    time_t now = time(nullptr);
    tm* timeinfo = localtime(&now);
    int sec = timeinfo->tm_sec;
    int min = timeinfo->tm_min;
    int hour = timeinfo->tm_hour;
    int day = timeinfo->tm_mday;
    int month = timeinfo->tm_mon + 1;
    int year = timeinfo->tm_year + 1900;
    setTime(hour, min, sec, day, month, year);
    Alarm.alarmRepeat(12, 00, 0, turnLightsOn);
    Alarm.alarmRepeat(22, 00, 0, turnLightsOff);
    isTimeSet = true;
  }

  if(!isTimeSet){
    currentSecond ++;
  }

  RgbDriver::updateRgb();
}