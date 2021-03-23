#include <RedService.h>

RedService::RedService(AsyncWebServer* server, SecurityManager* securityManager, FS* fs) :
    _webSocket(RedState::read,
               RedState::update,
               this,
               server,
               RED_LIGHT_SOCKET_PATH,
               securityManager,
               AuthenticationPredicates::IS_AUTHENTICATED),
    _fsPersistence(RedState::read, RedState::update, this, fs, "/config/redColor.json", 4096) {
  // add event listener for rgbCycle Object
  // addUpdateHandler([&](const String& originId) { onConfigUpdated(); }, false);
}

void RedService::begin() {
  Serial.println("red begin ...");
  _fsPersistence.readFromFS();
}