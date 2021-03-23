#ifndef BlueService_h
#define BlueService_h

#include <WebSocketTxRx.h>
#include <FSPersistence.h>
#include <RgbDriver.h>

#define BLUE_LIGHT_SOCKET_PATH "/ws/blueColor"

class BlueState {
 public:
  RgbDriver* driver;
  String time;
  int blue[49] = {0};

  // Class constructor
  BlueState() {
    driver = driver->getInstance();
  }

  static void read(BlueState& settings, JsonObject& root) {}

  static StateUpdateResult update(JsonObject& root, BlueState& redState) {}
};

class BlueService : public StatefulService<BlueState> {
 public:
  BlueService(AsyncWebServer* server, SecurityManager* securityManager, FS* fs);
  void begin();

 private:
  WebSocketTxRx<BlueState> _webSocket;
  FSPersistence<BlueState> _fsPersistence;

  void registerConfig();
  void onConfigUpdated();
};
#endif