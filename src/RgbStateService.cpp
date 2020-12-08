#include <RgbStateService.h>

RgbStateService::RgbStateService(AsyncWebServer* server, SecurityManager* securityManager) :
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
               AuthenticationPredicates::IS_AUTHENTICATED) {
  // configure led to be output
  pinMode(LED_PIN, OUTPUT);

  // configure settings service update handler to update LED state
  addUpdateHandler([&](const String& originId) { onConfigUpdated(); }, false);
}

void RgbStateService::begin() {
  _state.ledOn = DEFAULT_LED_STATE;
  onConfigUpdated();
}

void RgbStateService::onConfigUpdated() {
  Serial.println("onConfigUpdated called ..");
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