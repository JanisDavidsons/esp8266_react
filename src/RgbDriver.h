#ifndef RgbDriver_h
#define RgbDriver_h

#include <FastLED.h>

#define NUM_LEDS 1
#define CLOCK_PIN 14  // D5
#define DATA_PIN 12   // D6

class RgbDriver {
 public:
  CRGB leds[NUM_LEDS];
  static void updateRgb(int red, int blue, int green);
  static void updateRgb();
  static void turnOn();
  static void turnOff();
  static RgbDriver* getInstance();

 private:
  static RgbDriver* pInstance;
};

#endif