#ifndef RgbCycleService_h
#define RgbCycleService_h

#include <HttpEndpoint.h>
#include <WebSocketTxRx.h>
#include <FSPersistence.h>
#include <FastLED.h>

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

#define RGB_CYCLE_ENDPOINT_PATH "/rest/rgbCycle"
#define RGB_CYCLE_SOCKET_PATH "/ws/rgbCycle"

class RgbCycleState {
 public:
  bool test;
  
  CRGB leds[NUM_LEDS];

  // Class constructor
  RgbCycleState() {
    FastLED.addLeds<P9813, DATA_PIN, CLOCK_PIN>(leds, NUM_LEDS);
  }

    static void read(RgbCycleState& settings, JsonObject& root) {

  }

  static StateUpdateResult update(JsonObject& root, RgbCycleState& rgbCycleState) {
    
      Serial.println("Rgb cycle update...");
      Serial.println(root);
      

    return StateUpdateResult::CHANGED;
  }
};

class RgbCycleService : public StatefulService<RgbCycleState> {
 public:
  RgbCycleService(AsyncWebServer* server, SecurityManager* securityManager, FS* fs);

  void begin();

 private:
  HttpEndpoint<RgbCycleState> _httpEndpoint;
  WebSocketTxRx<RgbCycleState> _webSocket;
  FSPersistence<RgbCycleState> _fsPersistence;

  void registerConfig();
  void onConfigUpdated();
};
#endif