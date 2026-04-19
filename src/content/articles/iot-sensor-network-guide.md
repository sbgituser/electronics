---
title: "IoTセンサーネットワーク構築入門｜Arduino×Raspberry Piで作るデータ収集システム"
description: "ArduinoとRaspberry Piを組み合わせたIoTセンサーネットワークの構築方法を解説。通信プロトコルの選定からデータ収集・可視化まで実践ガイド。"
date: "2026-04-20"
category: "project"
tags: ["IoT", "Arduino", "Raspberry Pi", "センサー", "ネットワーク", "MQTT", "ESP32", "LoRaWAN"]
products:
  - asin: "B0C8V88Z1T"
    name: "Arduino Uno R4 WiFi"
    price: "¥3,500前後"
  - asin: "B0CTH6FXHG"
    name: "Raspberry Pi 5（4GB）"
    price: "¥9,800前後"
  - asin: "B07WDVNFQD"
    name: "センサーキット（温湿度・光・圧力など）"
    price: "¥1,200前後"
  - asin: "B09BDZTYRZ"
    name: "スマートプラグ（消費電力モニタリング付き）"
    price: "¥1,500前後"
faqs:
  - q: "IoTセンサーネットワークの構築費用はどのくらいですか？"
    a: "最小構成（Arduino 1台 + Raspberry Pi 1台 + センサー3個）で約15,000〜20,000円です。ESP32を使えばさらに安価に構築できます。センサーの種類と台数で費用は変動します。"
  - q: "プログラミング初心者でもIoTネットワークは作れますか？"
    a: "ArduinoのスケッチとPythonの基礎知識があれば構築可能です。まずはセンサー1台とRaspberry Pi 1台の最小構成から始め、徐々に台数を増やしていく方法を推奨します。"
  - q: "屋外にセンサーを設置する場合の注意点は？"
    a: "防水ケースの使用、太陽光による温度上昇対策、電源の確保（ソーラーパネル + バッテリー）が重要です。通信方式はWi-Fiの届かない場所ではLoRaWANの利用を検討してください。"
  - q: "何台くらいのセンサーを接続できますか？"
    a: "Wi-Fi経由のMQTT接続なら、Raspberry Pi 1台で50〜100台程度のセンサーノードを管理できます。LoRaWANゲートウェイなら数百台に対応可能です。"
---

## IoTセンサーネットワークとは

IoTセンサーネットワークは、複数のセンサーノードが収集したデータを中央のゲートウェイ（Raspberry Piなど）に集約し、記録・分析・可視化するシステムです。温湿度モニタリング、農業の環境管理、スマートホーム、工場の設備監視など幅広い用途に活用されています。

電子工作の視点では、ArduinoやESP32でセンサーデータを取得し、Raspberry Piでデータを受信・保存・表示する構成が定番です。

---

## システム構成の全体像

典型的なIoTセンサーネットワークの構成を紹介します。

```
[センサーノード群]          [ゲートウェイ]        [可視化]
Arduino + 温湿度センサー --→
ESP32 + CO2センサー     --→  Raspberry Pi  --→  Webダッシュボード
Arduino + 光センサー    --→  (MQTTブローカー)    (Grafana等)
```

### 構成要素の役割

- **センサーノード**: Arduino/ESP32にセンサーを接続してデータを取得・送信
- **ゲートウェイ**: Raspberry Piでデータを受信し、データベースに保存
- **通信プロトコル**: MQTT（軽量IoT通信プロトコル）が標準
- **可視化**: Webブラウザでリアルタイムにグラフ表示

---

## 通信プロトコルの選定

IoTセンサーネットワークで使われる主な通信方式を比較します。

| プロトコル | 通信距離 | 消費電力 | データ量 | 適用シーン |
|-----------|---------|---------|---------|-----------|
| Wi-Fi + MQTT | 〜50m（屋内） | 高 | 大 | 屋内モニタリング |
| BLE（Bluetooth LE） | 〜30m | 低 | 小 | ウェアラブル・近距離 |
| ZigBee / Thread | 〜100m（メッシュ） | 低 | 小 | スマートホーム |
| LoRaWAN | 〜10km | 極低 | 極小 | 農業・屋外広域 |
| LTE-M / NB-IoT | セルラー圏内 | 中 | 中 | 遠隔地・移動体 |

**初心者におすすめ**: まずはWi-Fi + MQTTの構成から始めましょう。ESP32やArduino Uno R4 WiFiなら追加モジュール不要でWi-Fi通信が可能です。

---

## ステップ1: センサーノードの構築

### 必要な部品（1ノードあたり）

| パーツ | 用途 | 目安価格 |
|--------|------|---------|
| ESP32開発ボード | マイコン + Wi-Fi | ¥1,500 |
| DHT22温湿度センサー | 温度・湿度計測 | ¥500 |
| ブレッドボード + ジャンパーワイヤー | 配線 | ¥500 |
| USB電源 | 電源供給 | ¥500 |

### Arduino/ESP32スケッチ（MQTT送信）

```cpp
#include <WiFi.h>
#include <PubSubClient.h>
#include <DHT.h>

#define DHT_PIN 4
#define DHT_TYPE DHT22

const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";
const char* mqtt_server = "192.168.1.100"; // Raspberry PiのIP

WiFiClient espClient;
PubSubClient client(espClient);
DHT dht(DHT_PIN, DHT_TYPE);

void setup() {
  Serial.begin(115200);
  dht.begin();
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) delay(500);

  client.setServer(mqtt_server, 1883);
}

void loop() {
  if (!client.connected()) {
    client.connect("sensor_node_1");
  }
  client.loop();

  float temp = dht.readTemperature();
  float humi = dht.readHumidity();

  if (!isnan(temp) && !isnan(humi)) {
    char payload[64];
    snprintf(payload, sizeof(payload),
             "{\"temp\":%.1f,\"humi\":%.1f}", temp, humi);
    client.publish("sensors/room1", payload);
  }

  delay(60000); // 1分間隔で送信
}
```

---

## ステップ2: ゲートウェイ（Raspberry Pi）のセットアップ

### MQTTブローカーのインストール

Raspberry PiにMosquitto（MQTTブローカー）をインストールします。

```bash
sudo apt install -y mosquitto mosquitto-clients
sudo systemctl enable mosquitto
```

### データ受信・保存スクリプト（Python）

```python
import json
import sqlite3
from datetime import datetime
import paho.mqtt.client as mqtt

# SQLiteデータベース初期化
conn = sqlite3.connect("sensor_data.db")
conn.execute("""
    CREATE TABLE IF NOT EXISTS readings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        topic TEXT,
        temperature REAL,
        humidity REAL,
        timestamp TEXT
    )
""")

def on_message(client, userdata, msg):
    data = json.loads(msg.payload.decode())
    conn.execute(
        "INSERT INTO readings (topic, temperature, humidity, timestamp) VALUES (?, ?, ?, ?)",
        (msg.topic, data["temp"], data["humi"], datetime.now().isoformat())
    )
    conn.commit()
    print(f"[{msg.topic}] 温度: {data['temp']}℃, 湿度: {data['humi']}%")

client = mqtt.Client()
client.on_message = on_message
client.connect("localhost", 1883)
client.subscribe("sensors/#")  # すべてのセンサートピックを購読
client.loop_forever()
```

---

## ステップ3: データの可視化

### 簡易Webダッシュボード

Flaskを使った簡易ダッシュボードで、最新のセンサーデータをブラウザで確認できます。

```python
from flask import Flask, jsonify
import sqlite3

app = Flask(__name__)

@app.route("/api/latest")
def latest():
    conn = sqlite3.connect("sensor_data.db")
    rows = conn.execute(
        "SELECT topic, temperature, humidity, timestamp FROM readings ORDER BY id DESC LIMIT 10"
    ).fetchall()
    return jsonify([
        {"topic": r[0], "temp": r[1], "humi": r[2], "time": r[3]}
        for r in rows
    ])

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
```

本格的な可視化にはGrafana + InfluxDBの組み合わせが定番です。時系列データのグラフ表示やアラート設定が可能になります。

---

## ネットワーク拡張のヒント

### 複数ノードの管理

センサーノードが増えた場合、MQTTトピックの設計が重要です。

```
sensors/room1/temperature
sensors/room1/humidity
sensors/kitchen/co2
sensors/outdoor/temperature
```

階層構造にすることで、場所別・計測項目別にデータを整理できます。

### 通信の信頼性向上

- **MQTTのQoSレベル**: QoS 1（少なくとも1回配信）を設定し、データ欠損を防止
- **ローカルバッファ**: Wi-Fi切断時にセンサーノード側でデータを一時保存し、復旧後に再送信
- **ヘルスチェック**: 一定時間データが届かないノードをアラート通知

### セキュリティ対策

- MQTTブローカーにユーザー認証を設定（Mosquittoの`password_file`）
- IoTデバイス専用のWi-Fiネットワーク（VLAN / ゲストネットワーク）に分離
- ファームウェアの定期更新を実施

---

## 電力消費の試算

IoTセンサーネットワーク全体の消費電力は、[IoT電力計算機](/tools/iot-power-calc)で試算できます。センサーの種類・サンプリング間隔・台数を入力して、月間電気代とバッテリー持続時間の目安を把握しましょう。

ESP32をスリープモード（Deep Sleep）で運用すると、1分間隔の計測で平均消費電力を約0.5mAに抑えられ、2,000mAhのバッテリーで数ヶ月の連続稼働が可能です。

---

## まとめ

IoTセンサーネットワークは、Arduino/ESP32とRaspberry Piの組み合わせで低コストに構築できます。まずはセンサー1台 + Raspberry Pi 1台の最小構成で動作を確認し、MQTTの基本を理解してから台数を拡大していきましょう。通信プロトコルの選定とセキュリティ対策を初期段階で設計に組み込むことが、安定したシステム運用の鍵です。
