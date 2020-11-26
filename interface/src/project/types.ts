export interface LightState {
  led_on: boolean;
}

export interface LightMqttSettings { 
  unique_id : string;
  name: string;
  mqtt_path : string;
}

export interface RgbState {
  led_on : boolean;
  red_value : number;
  green_value : number;
  Blue_value : number;
}