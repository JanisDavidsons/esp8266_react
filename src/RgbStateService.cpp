#include <RgbStateService.h>

RgbStateService::RgbStateService(AsyncWebServer* server, SecurityManager* securityManager, FS* fs) :
    _httpEndpoint(RgbState::read,
                  RgbState::update,
                  this,
                  server,
                  RGB_SETTINGS_ENDPOINT_PATH,
                  securityManager,
                  AuthenticationPredicates::IS_AUTHENTICATED),
    _webSocket(RgbState::read,
               RgbState::update,
               this,
               server,
               RGB_SETTINGS_SOCKET_PATH,
               securityManager,
               AuthenticationPredicates::IS_AUTHENTICATED),
    _fsPersistence(RgbState::read, 
                   RgbState::update, 
                   this, 
                   fs, 
                   "/config/RgbState.json") {
  // configure led to be output
  pinMode(LED_PIN, OUTPUT);

  // configure settings service update handler to update LED state
  addUpdateHandler([&](const String& originId) { onConfigUpdated(); }, false);
}

void RgbStateService::begin() {
  onConfigUpdated();
}

void RgbStateService::onConfigUpdated() {
  Serial.println("onConfigUpdated called ..");
  _fsPersistence.readFromFS();

}

void RgbStateService::registerConfig() {
  String configTopic;
  String subTopic;
  String pubTopic;

  DynamicJsonDocument doc(256);
  doc["cmd_t"] = "~/set";
  doc["stat_t"] = "~/state";
  doc["schema"] = "json";
  doc["brightness"] = false;

  String payload;
  serializeJson(doc, payload);
}