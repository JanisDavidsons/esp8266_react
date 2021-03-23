#include "BlueService.h"

BlueService::BlueService(AsyncWebServer* server, SecurityManager* securityManager, FS* fs) :
    _webSocket(BlueState::read,
               BlueState::update,
               this,
               server,
               BLUE_LIGHT_SOCKET_PATH,
               securityManager,
               AuthenticationPredicates::IS_AUTHENTICATED),
    _fsPersistence(BlueState::read, BlueState::update, this, fs, "/config/blueColor.json", 4096) {
  // add event listener for rgbCycle Object
  // addUpdateHandler([&](const String& originId) { onConfigUpdated(); }, false);
}

void BlueService::begin() {
  Serial.println("blue begin ...");
  _fsPersistence.readFromFS();
}