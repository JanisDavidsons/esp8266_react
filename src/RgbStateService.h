#ifndef RgbStateService_h
#define RgbStateService_h

#include <HttpEndpoint.h>
#include <WebSocketTxRx.h>
#include <FSPersistence.h>
#include <RgbDriver.h>

#define DEFAULT_LED_STATE false
#define DEFAULT_RED_VALUE 255
#define DEFAULT_GREEN_VALUE 210
#define DEFAULT_BLUE_VALUE 45
#define OFF_STATE "OFF"
#define ON_STATE "ON"

// Note that the built-in LED is on when the pin is low on most NodeMCU boards.
// This is because the anode is tied to VCC and the cathode to the GPIO 4 (Arduino pin 2).
#ifdef ESP32
#define LED_ON 0x1
#define LED_OFF 0x0
#elif defined(ESP8266)
#define LED_ON 0x0
#define LED_OFF 0x1

#endif

#define RGB_SETTINGS_ENDPOINT_PATH "/rest/rgbState"
#define RGB_SETTINGS_SOCKET_PATH "/ws/rgbState"

class RgbState {
 public:
  bool ledOn;
  uint8_t redValue;
  uint8_t greenValue;
  uint8_t blueValue;
  RgbDriver* driver;

  // Class constructor
  RgbState() {
    driver = driver->getInstance();
  }

  static void read(RgbState& settings, JsonObject& root) {
    root["led_on"] = settings.ledOn;
    root["red_value"] = settings.redValue;
    root["green_value"] = settings.greenValue;
    root["blue_value"] = settings.blueValue;
  }

  static StateUpdateResult update(JsonObject& root, RgbState& lightState) {
    boolean newState = root["led_on"] | DEFAULT_LED_STATE;
    int red = root["red_value"] | DEFAULT_RED_VALUE;
    int green = root["green_value"] | DEFAULT_GREEN_VALUE;
    int blue = root["blue_value"] | DEFAULT_BLUE_VALUE;

    bool onValueChanged = lightState.checkLightOnValue(newState);
    bool rgbValueChanged = lightState.checkRgbValues(red, green, blue);

    if (onValueChanged || rgbValueChanged) {
      return StateUpdateResult::CHANGED;
    }
    return StateUpdateResult::UNCHANGED;
  }

  bool checkRgbValues(int red, int green, int blue) {
    if (red != this->redValue || green != this->greenValue || blue != this->blueValue) {
      this->redValue = red;
      this->greenValue = green;
      this->blueValue = blue;
      driver->updateRgb(red, green, blue);
      return true;
    }
    return false;
  }

  bool checkLightOnValue(bool onValue) {
    if (this->ledOn != onValue) {
      if (this->ledOn) {
        this->ledOn = false;
        driver->turnOff();
        return true;
      }
      this->ledOn = true;
      driver->updateRgb(redValue, greenValue, blueValue);
      return true;
    }
    return false;
  }
};

class RgbStateService : public StatefulService<RgbState> {
 public:
  RgbStateService(AsyncWebServer* server, SecurityManager* securityManager, FS* fs);

  void begin();

 private:
  HttpEndpoint<RgbState> _httpEndpoint;
  WebSocketTxRx<RgbState> _webSocket;
  FSPersistence<RgbState> _fsPersistence;

  void registerConfig();
  void onConfigUpdated();
};

#endif