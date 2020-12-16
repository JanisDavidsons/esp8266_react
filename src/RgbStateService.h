#ifndef RgbStateService_h
#define RgbStateService_h

#include <HttpEndpoint.h>
#include <WebSocketTxRx.h>
#include <FSPersistence.h>
#include <FastLED.h>

#define LED_PIN 2
#define PRINT_DELAY 5000

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

#define NUM_LEDS 1
#define CLOCK_PIN 14  // D5
#define DATA_PIN 12   // D6

#endif

#define RGB_SETTINGS_ENDPOINT_PATH "/rest/rgbState"
#define RGB_SETTINGS_SOCKET_PATH "/ws/rgbState"

class RgbState {
 public:
  bool led_on;
  uint8_t red_value;
  uint8_t green_value;
  uint8_t blue_value;
  CRGB leds[NUM_LEDS];

  // Class constructor
  RgbState() {
    FastLED.addLeds<P9813, DATA_PIN, CLOCK_PIN>(leds, NUM_LEDS);
  }

  static void read(RgbState& settings, JsonObject& root) {
    root["led_on"] = settings.led_on;
    root["red_value"] = settings.red_value;
    root["green_value"] = settings.green_value;
    root["blue_value"] = settings.blue_value;
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
    if (red != this->red_value || green != this->green_value || blue != this->blue_value) {
      Serial.println("rgb value not the same..");
      this->red_value = red;
      this->green_value = green;
      this->blue_value = blue;
      this->updateRgbDriver();
      return true;
    }
    return false;
  }

  bool checkLightOnValue(bool onValue) {
    if (this->led_on != onValue) {
      Serial.println("on state is not the same...");
      if (this->led_on) {
        this->led_on = false;
        this->updateRgbDriver(true);
        return true;
      }
      this->led_on = true;
      this->updateRgbDriver();
      return true;
    }
    return false;
  }

  void updateRgbDriver(bool turnOff = false) {
    Serial.println("rgb driver should update..");
    Serial.println(this->led_on);
    Serial.println(this->red_value);
    Serial.println(this->green_value);
    Serial.println(this->blue_value);

    if (turnOff) {
      Serial.println("driver - turn off");
      leds[0].fadeToBlackBy(255);
      FastLED.show();
      return;
    }
    Serial.println("driver - change color");
    leds[0].setRGB(this->red_value, this->green_value, this->blue_value);
    FastLED.show();
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