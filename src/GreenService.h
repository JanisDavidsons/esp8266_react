#ifndef GreenService_h
#define GreenService_h

#include <WebSocketTxRx.h>
#include <FSPersistence.h>
#include <RgbDriver.h>

#define GREEN_LIGHT_SOCKET_PATH "/ws/greenColor"

class GreenState {
 public:
  RgbDriver* driver;
  String time;
  int green[49] = {0};

  // Class constructor
  GreenState() {
    driver = driver->getInstance();
  }

  static void read(GreenState& settings, JsonObject& root) {}

  static StateUpdateResult update(JsonObject& root, GreenState& blueState) {}
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