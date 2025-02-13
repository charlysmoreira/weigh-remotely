#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include <WiFiManager.h>

// Configurações MQTT
const char* mqttServer = "test.mosquitto.org"; 
const int mqttPort = 1883;
const char* mqtt_subscribe_sensor = "sensor/value";
const char* mqtt_request_sensor = "sensor/request";
const char* mqtt_subscribe_info = "esp3266/info";
const char* mqtt_request_info = "esp3266/request";

WiFiClient espClient;
PubSubClient client(espClient);

// Conectar ao Wi-Fi
void setupWiFi() {
  // Inicializa o WiFiManager
  WiFiManager wifiManager;
  // Inicia o portal de configuração (pressione o botão de reset para configurar)
  if (!wifiManager.autoConnect("ESP32-Config", "12345678")) {
    Serial.println("Falha ao conectar ou configurar Wi-Fi.");
    ESP.restart();
  } 
  else {
    while (WiFi.status() != WL_CONNECTED) {
      delay(1000);
      Serial.println("Conectando ao Wi-Fi...");
    }
    Serial.println("Wi-Fi conectado!");
  }
}

// Conectar ao MQTT
void reconnect() {
  while (!client.connected()) {
    Serial.print("Conectando ao MQTT... ");
    String clientId = "ESP8266-" + String(WiFi.macAddress());
    if (client.connect(clientId.c_str())) {
      Serial.println("Conectado ao MQTT!");
      client.subscribe(mqtt_request_sensor);
      client.subscribe(mqtt_request_info);
    } else {
      Serial.print("Falha ao conectar. Código de erro: ");
      Serial.println(client.state());
      delay(2000);
    }
  }
}

// Callback que recebe pedidos do servidor
void callback(char* topic, byte* payload, unsigned int length) {
    String message;
    for (int i = 0; i < length; i++) {
        message += (char)payload[i];
    }
    
    if (String(topic) == mqtt_request_sensor) {
        // Lê a temperatura e responde
        float value = 28.f;
        if (!isnan(value)) {
            String valueStr = String(value);
            client.publish(mqtt_subscribe_sensor, valueStr.c_str());
            Serial.println("Leitura do Sensor: " + valueStr);
        }
    } 
    else if (String(topic) == mqtt_request_info) {
        // Coleta informações do ESP8266 e responde
        String ip = WiFi.localIP().toString();
        String mac = WiFi.macAddress();
        int rssi = WiFi.RSSI();
        int freeHeap = ESP.getFreeHeap();
        int leituraADC = analogRead(A0);  // Lê do pino onde vai ficar a bateria
        float tensao = (leituraADC / 1023.0) * 3.3;
        int uptime = millis() / 1000;

        String info = "{";
        info += "\"ip\":\"" + ip + "\",";
        info += "\"mac\":\"" + mac + "\",";
        info += "\"rssi\":" + String(rssi) + ",";
        info += "\"heap\":" + String(freeHeap) + ",";
        info += "\"voltagem\":" + String(tensao) + ",";
        info += "\"uptime\":" + String(uptime);
        info += "}";

        client.publish(mqtt_subscribe_info, info.c_str());
        Serial.println("Enviando Informações: " + info);
    }
}

void setup() {
  Serial.begin(115200);
  setupWiFi();
  client.setServer(mqttServer, mqttPort);
  client.setCallback(callback);
  reconnect();
}

void loop() {
  if (!client.connected()) {
    reconnect();
  }
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("Wi-Fi desconectado! Tentando reconectar...");
    setupWiFi();
  }
  client.loop();
}
