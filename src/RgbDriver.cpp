#include <RgbDriver.h>
#include <FastLED.h>
#include <TimeLib.h>
#include <TimeAlarms.h>

RgbDriver* RgbDriver::pInstance = 0;

RgbDriver* RgbDriver::getInstance() {
  if (pInstance == 0) {
    pInstance = new RgbDriver;
    FastLED.addLeds<P9813, DATA_PIN, CLOCK_PIN>(pInstance->leds, NUM_LEDS);
  }

  return pInstance;
}

void RgbDriver::updateRgb(int red, int green, int blue) {
  pInstance->leds[0].setRGB(red, green, blue);
  FastLED.show();
}

void RgbDriver::updateRgb() {
  Serial.println(timeStatus());
  FastLED.show();
}

void RgbDriver::test() {
  // Serial.println("test");
}

void RgbDriver::turnOff() {
  pInstance->leds[0].setRGB(0, 0, 0);
  FastLED.show();
}