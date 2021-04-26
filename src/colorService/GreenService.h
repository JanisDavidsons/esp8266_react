#ifndef GreenService_h
#define GreenService_h

#include <WebSocketTxRx.h>
#include <FSPersistence.h>
#include <RgbDriver.h>

#define GREEN_LIGHT_SOCKET_PATH "/ws/greenLight"

class GreenState {
 public:
  RgbDriver* driver;
  String time;
  int green[49] = {0};

  // Class constructor
  GreenState() {
    driver = driver->getInstance();
  }

  static void read(GreenState& settings, JsonObject& root) {
    Serial.println("green test read called");
    root.createNestedObject("graph");
    root["graph"].createNestedArray("green");

    for (size_t i = 0; i < 49; i++) {
      root["graph"]["green"].add(settings.green[i]);
    }
  }

  static StateUpdateResult update(JsonObject& root, GreenState& greenState) {
    JsonArray green = root["graph"]["green"].as<JsonArray>();

    int i = 0;
    for (JsonVariant value : green) {
      greenState.green[i] = value.as<int>();
      i++;
    }

    Serial.println("Cycle update...");
    Serial.println("");
    Serial.println("green");
    for (size_t i = 0; i < 49; i++) {
      Serial.print(greenState.green[i]);
    }
    Serial.println("");

    return StateUpdateResult::CHANGED;
  }
};

class GreenService : public StatefulService<GreenState> {
 public:
  GreenService(AsyncWebServer* server, SecurityManager* securityManager, FS* fs);
  void begin();

 private:
  WebSocketTxRx<GreenState> _webSocket;
  FSPersistence<GreenState> _fsPersistence;

  void registerConfig();
  void onConfigUpdated();
};
#endif