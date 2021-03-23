#ifndef RedService_h
#define RedService_h

#include <WebSocketTxRx.h>
#include <FSPersistence.h>
#include <RgbDriver.h>

#define RED_LIGHT_SOCKET_PATH "/ws/redColor"

class RedState {
 public:
  RgbDriver* driver;
  String time;
  int red[49] = {0};

  // Class constructor
  RedState() {
    driver = driver->getInstance();
  }

  static void read(RedState& settings, JsonObject& root) {}

  static StateUpdateResult update(JsonObject& root, RedState& redState) {}
};

class RedService : public StatefulService<RedState> {
 public:
  RedService(AsyncWebServer* server, SecurityManager* securityManager, FS* fs);
  void begin();

 private:
  WebSocketTxRx<RedState> _webSocket;
  FSPersistence<RedState> _fsPersistence;

  void registerConfig();
  void onConfigUpdated();
};
#endif