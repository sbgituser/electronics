---
title: "IoTプロジェクト入門：ArduinoとESP32でスマートホームデバイスを作る"
description: "IoT自作の基礎から解説。ESP32とArduinoを使ってセンサーデータをWi-Fi送信する方法、MQTTプロトコル、スマートホームDIYの具体的な作り方を紹介します。"
date: "2026-03-29"
category: "project"
tags: ["IoT", "ESP32", "Arduino", "スマートホーム", "Wi-Fi"]
products:
  - asin: "B09GK74F7N"
    name: "ESP32-DevKitC（Wi-Fi/BLE内蔵）"
    price: "¥1,500前後"
  - asin: "B00LSG5MD6"
    name: "DHT11 温湿度センサーモジュール"
    price: "¥300前後"
  - asin: "B0C8V88Z1T"
    name: "Arduino Uno R4 WiFi"
    price: "¥3,500前後"
faqs:
  - q: "IoTデバイスを作るのに必要なプログラミングの知識はどのくらいですか？"
    a: "ArduinoのC言語の基礎（変数、関数、ループ）が分かればIoTデバイスを作れます。センサー読み取り→Wi-Fi送信のコードはサンプルが豊富にあり、コピー&カスタマイズから始めると学習しやすいです。"
  - q: "MQTTとHTTPはIoTでどちらを使えばいいですか？"
    a: "センサーデータの定期送信にはMQTTが適しています。軽量で双方向通信ができます。ウェブAPIと連携する場合はHTTP（REST API）が簡単です。入門段階ではHTTPから始めるのがおすすめです。"
  - q: "IoTデバイスのセキュリティで最低限すべきことは何ですか？"
    a: "①Wi-FiパスワードをコードにハードコードせずNVS等に保存する、②HTTPS通信を使う、③デバイスをインターネット直接公開しない（VPNやクラウド経由）の3点が基本です。"
  - q: "自宅Wi-FiのSSIDとパスワードはどこに書けばいいですか？"
    a: "ソースコードに直接書くのは避けましょう。ArduinoのEEPROMやESP32のNVS（Not Volatile Storage）に保存するか、Wi-Fi設定専用のAP（アクセスポイント）モードで設定するプロビジョニング方式が安全です。"
---

## IoTとは？

IoT（Internet of Things、モノのインターネット）とは、センサーやマイコンを搭載したデバイスがインターネットを通じてデータを送受信する仕組みです。スマートスピーカー、スマートロック、室温モニターなどが身近な例として挙げられます。

自作IoTデバイスの基本的な構成は以下の通りです。

```
[センサー] → [マイコン（ESP32）] → [Wi-Fi] → [クラウド/サーバー] → [スマホ・PC]
```

市販のスマートホーム製品との違いは、**自分でカスタマイズできる自由度**にあります。既製品では対応していないセンサーを追加したり、データを自分のサーバーに保存したりと、DIYならではの柔軟な構成が可能です。

## ESP32：IoTに最適なマイコン

ESP32はEspressif Systems製のマイコンモジュールで、Wi-FiとBluetooth（BLE）を内蔵しながら価格が¥1,000〜1,500程度と非常にコスパに優れています。

ArduinoとESP32の比較は[Arduino vs Raspberry Pi vs ESP32の比較記事](/articles/arduino-vs-raspberrypi-vs-esp32)に詳しくまとめています。

**ESP32の主な特徴：**

| 項目 | ESP32 | Arduino Uno R4 WiFi |
|------|-------|---------------------|
| CPU | 240MHz デュアルコア | 48MHz |
| RAM | 520KB | 32KB |
| Wi-Fi | 802.11b/g/n | 802.11b/g/n |
| Bluetooth | BLE 4.2 | BLE 5.1 |
| GPIO | 34本 | 14本 |
| アナログ入力 | 18ch（12bit） | 6ch（14bit） |
| 価格 | ¥1,000〜1,500 | ¥3,500前後 |

ESP32はArduino IDEで開発できます。「ボードマネージャー」でESP32のサポートパッケージを追加するだけで使えます。

## ESP32のArduino IDE設定

1. Arduino IDEを起動し、「ファイル」→「環境設定」を開く
2. 「追加のボードマネージャURL」に以下を追加：
   `https://raw.githubusercontent.com/espressif/arduino-esp32/gh-pages/package_esp32_index.json`
3. 「ツール」→「ボードマネージャー」で「esp32」を検索してインストール
4. 「ツール」→「ボード」→「ESP32 Arduino」→「ESP32 Dev Module」を選択

## 温湿度センサーのデータをWi-Fiで送信する

最もシンプルなIoTプロジェクトとして、DHT11で計測した温湿度データをWi-Fi経由でウェブサーバーに表示する例を示します。

### 必要な部品

- ESP32-DevKitC
- DHT11温湿度センサー
- 10kΩ抵抗（プルアップ用）
- ブレッドボード・ジャンパーワイヤー

### Wi-Fi接続とHTTPサーバーの実装

```cpp
#include <WiFi.h>
#include <WebServer.h>
#include <DHT.h>

// Wi-Fi設定（実際はNVS等に保存推奨）
const char* SSID     = "YOUR_WIFI_SSID";
const char* PASSWORD = "YOUR_WIFI_PASSWORD";

#define DHT_PIN  4
#define DHT_TYPE DHT11

DHT dht(DHT_PIN, DHT_TYPE);
WebServer server(80);

void handleRoot() {
  float temperature = dht.readTemperature();
  float humidity    = dht.readHumidity();

  String html = "<html><body>";
  html += "<h1>室内環境モニター</h1>";
  html += "<p>温度: " + String(temperature) + " ℃</p>";
  html += "<p>湿度: " + String(humidity) + " %</p>";
  html += "</body></html>";

  server.send(200, "text/html; charset=utf-8", html);
}

void setup() {
  Serial.begin(115200);
  dht.begin();

  WiFi.begin(SSID, PASSWORD);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nWi-Fi接続完了!");
  Serial.print("IPアドレス: ");
  Serial.println(WiFi.localIP());

  server.on("/", handleRoot);
  server.begin();
}

void loop() {
  server.handleClient();
  delay(10);
}
```

このコードを書き込んでシリアルモニタでIPアドレスを確認し、同一Wi-Fiに接続したスマホのブラウザからそのIPアドレスにアクセスすると、現在の温湿度がWebページで確認できます。

## MQTTを使ったデータ送信

MQTTはIoT向けに設計された軽量なメッセージプロトコルです。センサーデバイス（パブリッシャー）がブローカー（サーバー）にデータを送信し、複数のクライアント（サブスクライバー）がそのデータを受け取る仕組みです。

**MQTTの主なメリット：**
- 非常に軽量で低消費電力（バッテリー駆動デバイスに最適）
- 双方向通信が容易（デバイスへのコマンド送信も可能）
- Home Assistantなどと簡単に連携できる

```cpp
#include <WiFi.h>
#include <PubSubClient.h>
#include <DHT.h>

const char* SSID       = "YOUR_WIFI_SSID";
const char* PASSWORD   = "YOUR_WIFI_PASSWORD";
const char* MQTT_SERVER = "192.168.1.100";  // MQTTブローカーのIP

WiFiClient   wifiClient;
PubSubClient mqttClient(wifiClient);
DHT dht(4, DHT11);

void reconnect() {
  while (!mqttClient.connected()) {
    if (mqttClient.connect("ESP32_Sensor")) {
      Serial.println("MQTTブローカーに接続しました");
    } else {
      delay(5000);
    }
  }
}

void setup() {
  Serial.begin(115200);
  dht.begin();
  WiFi.begin(SSID, PASSWORD);
  while (WiFi.status() != WL_CONNECTED) delay(500);
  mqttClient.setServer(MQTT_SERVER, 1883);
}

void loop() {
  if (!mqttClient.connected()) reconnect();
  mqttClient.loop();

  float temp = dht.readTemperature();
  float hum  = dht.readHumidity();

  mqttClient.publish("home/room/temperature", String(temp).c_str());
  mqttClient.publish("home/room/humidity",    String(hum).c_str());

  delay(60000);  // 60秒ごとに送信
}
```

## クラウドサービスとの連携

### Arduino Cloud

Arduino公式のクラウドサービスで、Arduino Uno R4 WiFiやESP32と直接連携できます。ダッシュボードでリアルタイムデータを可視化でき、スマホアプリ（Arduino IoT Cloud Remote）でどこからでもモニタリングできます。無料プランでも2デバイス・5変数まで使えます。

### Home Assistant

自宅サーバー（Raspberry Pi等）で動かすオープンソースのスマートホームプラットフォームです。MQTTでESP32から送信したデータを受信してダッシュボード表示できます。自分でサーバーを管理するため、クラウドへのデータ送信が不要でプライバシー面でも安心です。

### Ambient（日本製IoTクラウド）

日本のM5Stack公式が提供するIoTデータ可視化サービスです。Arduino/ESP32からHTTPでデータを送信するだけで、グラフ表示・履歴保存が無料（一定件数まで）で使えます。コードのサンプルが充実しており、入門段階での導入に最適です。

## スマートホームDIYプロジェクト例

### プロジェクト1：多部屋温湿度モニタリング

各部屋にESP32＋DHT22を設置し、MQTTでデータをRaspberry Pi上のHome Assistantに送信します。家全体の温湿度をダッシュボードで一覧表示でき、冬の結露対策や夏の熱中症対策に役立てられます。

### プロジェクト2：帰宅通知デバイス

玄関ドアにマグネット式の開閉センサーを取り付け、ESP32に接続します。ドアが開いたらLINE Notify APIに通知を送ることで、子どもの帰宅や不在時の侵入を検知できます。

### プロジェクト3：自動植物水やりシステム

土壌湿度センサーとリレーモジュールを組み合わせ、土が乾燥したら自動的に水中ポンプを動かします。データをクラウドに送信することで、外出先からスマホで状態確認や手動水やりもできます。

## セキュリティの基本

IoTデバイスをネットワークに接続する際は以下のセキュリティ対策を守りましょう。

1. **認証情報のハードコードを避ける**：SSIDやパスワードをソースコードに直接書かず、ESP32のNVSに保存する
2. **ファームウェアの定期更新**：既知の脆弱性に対応するためArduino/ESP-IDFを最新に保つ
3. **HTTPS通信を使う**：データをHTTPSで暗号化する（ESP32はmbedTLS対応）
4. **デバイスを直接公開しない**：自宅NAS等をインターネット直接公開せず、VPNやリバースプロキシを経由させる
5. **デフォルトパスワードを変更する**：MQTTブローカーや管理画面のパスワードは必ず変更する

## まとめ

IoT入門の要点をまとめます。

- ESP32はWi-Fi/BLE内蔵でコスパ最強のIoTマイコン
- Arduino IDEでESP32の開発ができる（ボードマネージャーで追加）
- 入門プロジェクトにはHTTP WebサーバーまたはAmbientへのデータ送信がシンプル
- スマートホーム本格活用にはMQTT＋Home Assistantが強力な組み合わせ
- セキュリティの基本（認証情報の管理、HTTPS、直接公開を避ける）は必ず守る

センサーについては[センサーの種類と選び方](/articles/sensor-selection-guide)、Raspberry PiのIoT活用は[Raspberry Piプロジェクトガイド](/articles/raspberrypi-projects-guide)も参照してください。

## よくある質問

**Q. IoTデバイスを作るのに必要なプログラミングの知識はどのくらいですか？**

ArduinoのC言語の基礎（変数、関数、ループ）が分かればIoTデバイスを作れます。センサー読み取り→Wi-Fi送信のコードはサンプルが豊富にあり、コピー&カスタマイズから始めると学習しやすいです。

**Q. MQTTとHTTPはIoTでどちらを使えばいいですか？**

センサーデータの定期送信にはMQTTが適しています。軽量で双方向通信ができます。ウェブAPIと連携する場合はHTTP（REST API）が簡単です。入門段階ではHTTPから始めるのがおすすめです。

**Q. IoTデバイスのセキュリティで最低限すべきことは何ですか？**

①Wi-FiパスワードをコードにハードコードせずNVS等に保存する、②HTTPS通信を使う、③デバイスをインターネット直接公開しない（VPNやクラウド経由）の3点が基本です。

**Q. 自宅Wi-FiのSSIDとパスワードはどこに書けばいいですか？**

ソースコードに直接書くのは避けましょう。ArduinoのEEPROMやESP32のNVS（Not Volatile Storage）に保存するか、Wi-Fi設定専用のAP（アクセスポイント）モードで設定するプロビジョニング方式が安全です。
