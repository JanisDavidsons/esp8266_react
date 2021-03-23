#include "GreenService.h"

GreenService::GreenService(AsyncWebServer* server, SecurityManager* securityManager, FS* fs) :
    _webSocket(GreenState::read,
               GreenState::update,
               this,
               server,
               GREEN_LIGHT_SOCKET_PATH,
               securityManager,
               AuthenticationPredicates::IS_AUTHENTICATED),
    _fsPersistence(GreenState::read, GreenState::update, this, fs, "/config/greenColor.json", 4096) {
  // add event listener for rgbCycle Object
  // addUpdateHandler([&](const String& originId) { onConfigUpdated(); }, false);
}

void GreenService::begin() {
  Serial.println("green begin ...");
  _fsPersistence.readFromFS();
}