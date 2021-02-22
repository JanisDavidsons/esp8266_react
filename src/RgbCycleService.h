#ifndef RgbCycleService_h
#define RgbCycleService_h

#include <HttpEndpoint.h>
#include <WebSocketTxRx.h>
#include <FSPersistence.h>
#include <RgbDriver.h>


#define RGB_CYCLE_ENDPOINT_PATH "/rest/rgbCycle"
#define RGB_CYCLE_SOCKET_PATH "/ws/rgbCycle"

class RgbCycleState {
 public:
  RgbDriver* driver;
  String time;
  String color;
  int red[49] = {0};
  int green[49] = {0};
  int blue[49] = {0};

  // Class constructor
  RgbCycleState() {
    driver = driver->getInstance();
  }

  static void read(RgbCycleState& settings, JsonObject& root) {
    root.createNestedObject("graph");
    root["graph"].createNestedArray("red");
    root["graph"].createNestedArray("green");
    root["graph"].createNestedArray("blue");

    for (size_t i = 0; i < 49; i++) {
      root["graph"]["red"].add(settings.red[i]);

      // root["graph"]["green"].add(settings.green[i]);
      // root["graph"]["blue"].add(settings.blue[i]);

      // Serial.println(settings.red[i]);
    }

    Serial.println("api read called...");

    // for (const int& value : settings.red) {
    //   root["graph"]["red"].add(value);
    //   Serial.println(value);
    //   i++;
    // }
  }

  static StateUpdateResult update(JsonObject& root, RgbCycleState& rgbCycleState) {
    JsonArray red = root["graph"]["red"].as<JsonArray>();
    JsonArray green = root["graph"]["green"].as<JsonArray>();
    JsonArray blue = root["graph"]["blue"].as<JsonArray>();

    if (red) {
      // Serial.println("red");
      int i = 0;
      for (JsonVariant value : red) {
        rgbCycleState.red[i] = value.as<int>();
        // Serial.println(value.as<int>());
        // Serial.println(rgbCycleState.red[i]);
        i++;
      }
    }
    if (green) {
      // Serial.println("green");
      int i = 0;
      for (JsonVariant value : green) {
        rgbCycleState.green[i] = value.as<int>();
        i++;
      }
    }
    if (blue) {
      // Serial.println("blue");
      int i = 0;
      for (JsonVariant value : blue) {
        rgbCycleState.blue[i] = value.as<int>();
        i++;
      }
    }

    Serial.println("Cycle update...");
    Serial.println("red");
    for (size_t i = 0; i < 49; i++) {
      Serial.print(rgbCycleState.red[i]);
    }
    Serial.println("");
    Serial.println("green");
    for (size_t i = 0; i < 49; i++) {
      Serial.print(rgbCycleState.green[i]);
    }
    Serial.println("");
    Serial.println("blue");
    for (size_t i = 0; i < 49; i++) {
      Serial.print(rgbCycleState.blue[i]);
    }
    Serial.println("");

    // serializeJsonPretty(root, Serial);
    // Serial.println(time);

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