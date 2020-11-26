#ifndef RgbStateService_h
#define RgbStateService_h

#include <HttpEndpoint.h>
#include <WebSocketTxRx.h>

#define LED_PIN 2
#define PRINT_DELAY 5000

#define DEFAULT_LED_STATE false
#define DEFAULT_RED_VALUE 255
#define DEFAULT_GREEN_VALUE 255
#define DEFAULT_BLUE_VALUE 255
#define OFF_STATE "OFF"
#define ON_STATE "ON"

// Note that the built-in LED is on when the pin is low on most NodeMCU boards.
// This is because the anode is tied to VCC and the cathode to the GPIO 4 (Arduino pin 2).
#ifdef ESP32
#define LED_ON 0x1
#define LED_OFF 0x0
#elif defined(ESP8266)
#define LED_ON 0x0
#define LED_OFF 0x1
#endif

#define RGB_SETTINGS_ENDPOINT_PATH "/rest/rgbState"
#define RGB_SETTINGS_SOCKET_PATH "/ws/rgbState"

class RgbState {
 public:
  bool ledOn;
  uint8_t redValue = 255;
  uint8_t greenValue = 255;
  uint8_t blueValue = 255;

  static void read(RgbState& settings, JsonObject& root) {
    Serial.println("read function called");
    root["led_on"] = settings.ledOn;
    root["red_value"] = settings.redValue;
    root["green_value"] = settings.greenValue;
    root["blue_value"] = settings.blueValue;
  }

  static StateUpdateResult update(JsonObject& root, RgbState& lightState) {
    int redLigth = root["red_value"];
    int greenLigth = root["green_value"];
    int blueLigth = root["blue_value"];

    Serial.println("set function called");
    Serial.print("red: ");
    Serial.println(redLigth);
    Serial.print("green: ");
    Serial.println(greenLigth);
    Serial.print("blue: ");
    Serial.println(blueLigth);

    boolean newState = root["led_on"] | DEFAULT_LED_STATE;
    int red = root["red_value"] | DEFAULT_RED_VALUE;
    int blue = root["green_value"] | DEFAULT_GREEN_VALUE;
    int green = root["green_value"] | DEFAULT_GREEN_VALUE;

    if (lightState.ledOn != newState) {
      lightState.ledOn = newState;
      return StateUpdateResult::CHANGED;
    }else if (lightState.redValue != red)
    {
      Serial.print("red changed : ");
      Serial.println(red);
      lightState.redValue = red;
      return StateUpdateResult::CHANGED;
    }else if (lightState.greenValue!=green)
    {
      Serial.print("blue changed : ");
      Serial.println(blue);
      lightState.greenValue = green;
      return StateUpdateResult::CHANGED;
    }else if (lightState.blueValue != blue)
    {
      Serial.print("green changed : ");
      Serial.println(green);
      lightState.blueValue = blue;
      return StateUpdateResult::CHANGED;
    }
    
    return StateUpdateResult::UNCHANGED;
  }

  static void haRead(RgbState& settings, JsonObject& root) {
    root["state"] = settings.ledOn ? ON_STATE : OFF_STATE;
  }

  static StateUpdateResult haUpdate(JsonObject& root, RgbState& lightState) {
    String state = root["state"];
    // parse new led state
    boolean newState = false;
    if (state.equals(ON_STATE)) {
      newState = true;
    } else if (!state.equals(OFF_STATE)) {
      return StateUpdateResult::ERROR;
    }
    // change the new state, if required
    if (lightState.ledOn != newState) {
      lightState.ledOn = newState;
      return StateUpdateResult::CHANGED;
    }
    return StateUpdateResult::UNCHANGED;
  }
};

class RgbStateService : public StatefulService<RgbState> {
 public:
  RgbStateService(AsyncWebServer* server, SecurityManager* securityManager);
  void begin();

 private:
  HttpEndpoint<RgbState> _httpEndpoint;
  WebSocketTxRx<RgbState> _webSocket;

  void registerConfig();
  void onConfigUpdated();
};

#endif