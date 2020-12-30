#ifndef RgbCycleService_h
#define RgbCycleService_h

#include <HttpEndpoint.h>
#include <WebSocketTxRx.h>
#include <FSPersistence.h>
#include <RgbDriver.h>

#ifdef ESP32
#define LED_ON 0x1
#define LED_OFF 0x0
#elif defined(ESP8266)
#define LED_ON 0x0
#define LED_OFF 0x1

#endif

#define RGB_CYCLE_ENDPOINT_PATH "/rest/rgbCycle"
#define RGB_CYCLE_SOCKET_PATH "/ws/rgbCycle"

class RgbCycleState {
 public:
  RgbDriver* driver;
  
  // Class constructor
  RgbCycleState() {
    driver = driver->getInstance();
  }

    static void read(RgbCycleState& settings, JsonObject& root) {
      // Serial.println("Cycle read...");
      //todo Implement read functionalty
  }

  static StateUpdateResult update(JsonObject& root, RgbCycleState& rgbCycleState) {
      const char* data = root["data"];
      Serial.println("Cycle update...");
      Serial.println(data);
      
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