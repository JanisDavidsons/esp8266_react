#ifndef RgbStateService_h
#define RgbStateService_h

#include <HttpEndpoint.h>
#include <WebSocketTxRx.h>
#include <FSPersistence.h>
#include <FastLED.h>

#define LED_PIN 2
#define PRINT_DELAY 5000

#define DEFAULT_LED_STATE false
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
  uint8_t RedBrightness = 255;
  uint8_t GreenBrightness = 255;
  uint8_t BlueBrightness = 255;

  static void read(RgbState& settings, JsonObject& root, FS& fileSystem) {
    root["led_on"] = settings.ledOn;
  }

  static StateUpdateResult update(JsonObject& root, RgbState& lightState, FS& fileSystem) {
    boolean newState = root["led_on"] | DEFAULT_LED_STATE;
    if (lightState.ledOn != newState) {
      lightState.ledOn = newState;
      return StateUpdateResult::CHANGED;
    }
    return StateUpdateResult::UNCHANGED;
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