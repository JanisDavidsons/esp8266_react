#include <RgbCycleService.h>

RgbCycleService::RgbCycleService(AsyncWebServer* server, SecurityManager* securityManager, FS* fs) :
    _httpEndpoint(RgbCycleState::read,
                  RgbCycleState::update,
                  this,
                  server,
                  RGB_CYCLE_ENDPOINT_PATH,
                  securityManager,
                  AuthenticationPredicates::IS_AUTHENTICATED),
    _webSocket(RgbCycleState::read,
               RgbCycleState::update,
               this,
               server,
               RGB_CYCLE_SOCKET_PATH,
               securityManager,
               AuthenticationPredicates::IS_AUTHENTICATED),
    _fsPersistence(RgbCycleState::read, 
                   RgbCycleState::update, 
                   this, 
                   fs, 
                   "/config/RgbState.json") {

  // add event listener for rgbCycle Object
  //addUpdateHandler([&](const String& originId) { onConfigUpdated(); }, false);
}

void RgbCycleService::begin(){
    _fsPersistence.readFromFS();
}