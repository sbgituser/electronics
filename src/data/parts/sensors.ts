import type { Part } from "@/types/parts";

export const sensors: Part[] = [
  // ============================================================
  // 1. DHT22 温湿度センサー (既存)
  // ============================================================
  {
    id: "dht22",
    name: "DHT22 温湿度センサー",
    nameEn: "DHT22 Temperature & Humidity Sensor",
    category: "sensor",
    subcategory: "温湿度",
    difficulty: 1,
    priceRange: "¥300〜600",
    amazonAsin: "B078S374ZQ",
    specs: {
      "温度計測範囲": "-40〜80℃",
      "温度精度": "±0.5℃",
      "湿度計測範囲": "0〜100%RH",
      "湿度精度": "±2-5%RH",
      "電源電圧": "3.3〜6V",
      "出力方式": "デジタル（シングルワイヤ）",
      "サンプリング間隔": "最小2秒",
      "ピン数": "3ピン（GND/VCC/DATA）",
    },
    compatibleBoards: ["arduino-uno-r4-wifi", "raspberry-pi-5", "esp32-devkitc"],
    beginnerNote:
      "DHT11より精度が高い温湿度センサー。ライブラリが充実しており、数行のコードで使える。サンプリング間隔が2秒以上必要な点に注意。",
    relatedRecipes: ["dht22-monitor"],
    dataSource: "Aosong DHT22データシート",
    tags: ["3.3V", "5V", "デジタル", "シングルワイヤ", "初心者向け"],
    seoKeywords: [
      "DHT22 Arduino 使い方",
      "DHT22 温湿度センサー",
      "DHT22 ESP32",
      "温度 湿度 センサー 電子工作",
    ],
  },
  // ============================================================
  // 2. HC-SR04 超音波距離センサー (既存)
  // ============================================================
  {
    id: "hc-sr04",
    name: "HC-SR04 超音波距離センサー",
    nameEn: "HC-SR04 Ultrasonic Distance Sensor",
    category: "sensor",
    subcategory: "距離",
    difficulty: 1,
    priceRange: "¥200〜400",
    specs: {
      "計測範囲": "2〜400cm",
      "精度": "±3mm",
      "電源電圧": "5V",
      "出力方式": "パルス幅（TRIG/ECHO）",
      "測定角度": "15°以内",
      "周波数": "40kHz",
      "ピン数": "4ピン（GND/VCC/TRIG/ECHO）",
    },
    compatibleBoards: ["arduino-uno-r4-wifi", "raspberry-pi-5", "esp32-devkitc"],
    beginnerNote:
      "コウモリのように超音波で距離を測るセンサー。5Vで動作するため、3.3VボードではECHOピンに分圧回路が必要な場合がある。",
    relatedRecipes: ["ultrasonic-distance"],
    dataSource: "HC-SR04データシート",
    tags: ["5V", "デジタル", "パルス幅", "初心者向け"],
    seoKeywords: [
      "HC-SR04 Arduino 使い方",
      "超音波センサー 距離測定",
      "HC-SR04 Raspberry Pi",
      "超音波距離センサー 電子工作",
    ],
  },
  // ============================================================
  // 3. BH1750 光センサー (既存)
  // ============================================================
  {
    id: "bh1750",
    name: "GY-30 BH1750 光センサー",
    nameEn: "BH1750 Light Sensor Module",
    category: "sensor",
    subcategory: "光・照度",
    difficulty: 1,
    priceRange: "¥200〜400",
    specs: {
      "計測範囲": "0〜65535 lux",
      "電源電圧": "3〜5V",
      "出力方式": "I2C",
      "I2Cアドレス": "0x23 / 0x5C（切替可）",
      "分解能": "1 lux",
    },
    compatibleBoards: ["arduino-uno-r4-wifi", "raspberry-pi-5", "esp32-devkitc"],
    beginnerNote:
      "I2C通信でデジタル値を取得できる光センサー。CdSセルより扱いやすく、lux単位で正確な照度を計測できる。",
    dataSource: "ROHM BH1750FVI データシート",
    tags: ["3.3V", "5V", "I2C", "初心者向け"],
    seoKeywords: [
      "BH1750 Arduino 使い方",
      "照度センサー I2C",
      "BH1750 ルクス 計測",
      "光センサー 電子工作",
    ],
  },
  // ============================================================
  // 4. MPU6050 加速度・ジャイロセンサー (既存)
  // ============================================================
  {
    id: "mpu6050",
    name: "MPU6050 加速度・ジャイロセンサー",
    nameEn: "MPU-6050 6-Axis Motion Sensor",
    category: "sensor",
    subcategory: "モーション",
    difficulty: 2,
    priceRange: "¥300〜600",
    specs: {
      "計測軸": "6軸（加速度3軸 + ジャイロ3軸）",
      "電源電圧": "3〜5V",
      "出力方式": "I2C",
      "I2Cアドレス": "0x68 / 0x69",
      "加速度レンジ": "±2/4/8/16g",
      "ジャイロレンジ": "±250/500/1000/2000°/s",
    },
    compatibleBoards: ["arduino-uno-r4-wifi", "raspberry-pi-5", "esp32-devkitc"],
    beginnerNote:
      "スマートフォンの傾きセンサーと同じ仕組み。ジェスチャー認識やバランスロボットに使われる。DMP内蔵で姿勢角も計算できる。",
    dataSource: "TDK InvenSense MPU-6050データシート",
    tags: ["3.3V", "I2C", "6軸", "DMP内蔵"],
    seoKeywords: [
      "MPU6050 Arduino 使い方",
      "加速度センサー ジャイロ",
      "MPU6050 I2C",
      "6軸センサー 電子工作",
    ],
  },
  // ============================================================
  // 5. BMP280 気圧センサー (既存)
  // ============================================================
  {
    id: "bmp280",
    name: "BMP280 気圧センサー",
    nameEn: "BMP280 Pressure & Temperature Sensor",
    category: "sensor",
    subcategory: "気圧・高度",
    difficulty: 1,
    priceRange: "¥200〜500",
    specs: {
      "気圧計測範囲": "300〜1100 hPa",
      "気圧精度": "±1 hPa",
      "温度計測範囲": "-40〜85℃",
      "電源電圧": "1.8〜3.6V",
      "出力方式": "I2C / SPI",
      "消費電流": "2.7μA（標準）",
    },
    compatibleBoards: ["arduino-uno-r4-wifi", "raspberry-pi-5", "esp32-devkitc"],
    beginnerNote:
      "気圧から高度も推算できるセンサー。I2CとSPIの両方に対応。3.3V動作のため、5VボードではI2Cプルアップに注意。",
    dataSource: "Bosch BMP280データシート",
    tags: ["3.3V", "I2C", "SPI", "低消費電力", "初心者向け"],
    seoKeywords: [
      "BMP280 Arduino 使い方",
      "気圧センサー 高度計",
      "BMP280 I2C SPI",
      "気圧 温度 センサー 電子工作",
    ],
  },
  // ============================================================
  // 6. DS18B20 温度センサー (既存)
  // ============================================================
  {
    id: "ds18b20",
    name: "DS18B20 温度センサー",
    nameEn: "DS18B20 1-Wire Digital Temperature Sensor",
    category: "sensor",
    subcategory: "温度",
    difficulty: 2,
    priceRange: "¥200〜400",
    specs: {
      "計測範囲": "-55〜+125℃",
      "精度": "±0.5℃（-10〜+85℃）",
      "電源電圧": "3〜5.5V",
      "出力方式": "1-Wire",
      "分解能": "9〜12bit（設定可能）",
      "形状": "TO-92 / 防水プローブ型",
    },
    compatibleBoards: ["arduino-uno-r4-wifi", "raspberry-pi-5", "esp32-devkitc"],
    beginnerNote:
      "1-Wireで複数センサーをデイジーチェーン接続できる。防水プローブ型もあり、水温計測に最適。4.7kΩのプルアップ抵抗が必要。",
    dataSource: "Maxim DS18B20データシート",
    tags: ["3.3V", "5V", "1-Wire", "防水対応", "デイジーチェーン"],
    seoKeywords: [
      "DS18B20 Arduino 使い方",
      "1-Wire 温度センサー",
      "DS18B20 防水",
      "デジタル温度センサー 電子工作",
    ],
  },
  // ============================================================
  // 7. KY-038 サウンドセンサー (既存)
  // ============================================================
  {
    id: "ky-038",
    name: "KY-038 サウンドセンサー",
    nameEn: "KY-038 Sound Detection Sensor",
    category: "sensor",
    subcategory: "音・音量",
    difficulty: 1,
    priceRange: "¥200〜400",
    specs: {
      "電源電圧": "3.3〜5V",
      "出力方式": "アナログ + デジタル",
      "感度調整": "可変抵抗で調整可能",
      "マイク": "コンデンサーマイク",
    },
    compatibleBoards: ["arduino-uno-r4-wifi", "esp32-devkitc"],
    beginnerNote:
      "手拍子や音に反応するシンプルなセンサー。デジタル出力の閾値は可変抵抗で調整できる。精密な音量計測には向かない。",
    dataSource: "KY-038製品仕様",
    tags: ["3.3V", "5V", "アナログ", "デジタル", "初心者向け"],
    seoKeywords: [
      "KY-038 Arduino 使い方",
      "サウンドセンサー 音検知",
      "音センサー 電子工作",
    ],
  },
  // ============================================================
  // 8. HC-SR501 人感センサー (既存)
  // ============================================================
  {
    id: "hc-sr501",
    name: "HC-SR501 人感センサー（PIR）",
    nameEn: "HC-SR501 PIR Motion Sensor",
    category: "sensor",
    subcategory: "動体検知",
    difficulty: 1,
    priceRange: "¥200〜400",
    specs: {
      "検出距離": "最大7m",
      "検出角度": "約120°",
      "電源電圧": "5〜20V",
      "出力方式": "デジタル（HIGH/LOW）",
      "遅延時間": "5秒〜5分（可変）",
      "感度": "3〜7m（可変）",
      "ブロッキング時間": "2.5秒",
    },
    compatibleBoards: ["arduino-uno-r4-wifi", "raspberry-pi-5", "esp32-devkitc"],
    beginnerNote:
      "人や動物の体温（赤外線）を検知するセンサー。自動ライトや防犯センサーに使われる仕組みと同じ。電源5〜20Vで動作するが、出力は3.3V互換。",
    dataSource: "HC-SR501データシート",
    tags: ["5V", "デジタル", "PIR", "初心者向け", "3.3V出力"],
    seoKeywords: [
      "HC-SR501 Arduino 使い方",
      "PIRセンサー 人感",
      "人感センサー 電子工作",
      "HC-SR501 Raspberry Pi",
    ],
  },
  // ============================================================
  // 9. CdSセル (既存)
  // ============================================================
  {
    id: "cds-cell",
    name: "CdSセル（光抵抗）",
    nameEn: "CdS Photoresistor",
    category: "sensor",
    subcategory: "光・照度",
    difficulty: 1,
    priceRange: "¥100〜200",
    specs: {
      "動作電圧": "3〜5V",
      "出力方式": "アナログ（分圧回路で読み取り）",
      "明時抵抗": "数kΩ〜数十kΩ",
      "暗時抵抗": "約1MΩ",
      "ピーク感度波長": "約540nm（緑色光）",
    },
    compatibleBoards: ["arduino-uno-r4-wifi", "esp32-devkitc"],
    beginnerNote:
      "最も安価に光を測れる部品。10kΩの抵抗と組み合わせた分圧回路で使う。精度は低いが、明暗の判定には十分。",
    relatedRecipes: ["light-sensor"],
    dataSource: "一般的なCdSフォトレジスタ仕様",
    tags: ["アナログ", "分圧回路", "初心者向け", "安価"],
    seoKeywords: [
      "CdSセル Arduino 使い方",
      "光センサー アナログ",
      "フォトレジスタ 電子工作",
      "CdS 分圧回路",
    ],
  },
  // ============================================================
  // 10. MQ-2 ガスセンサー (既存)
  // ============================================================
  {
    id: "mq-2",
    name: "MQ-2 ガスセンサー",
    nameEn: "MQ-2 Gas Sensor",
    category: "sensor",
    subcategory: "ガス",
    difficulty: 2,
    priceRange: "¥300〜600",
    amazonAsin: "",
    specs: {
      "検知ガス": "LPG、プロパン、メタン、煙",
      "電源電圧": "5V",
      "出力": "アナログ + デジタル（閾値調整可）",
      "予熱時間": "約20秒",
      "動作温度": "-20〜50℃",
    },
    compatibleBoards: ["arduino-uno-r4-wifi", "esp32-devkitc"],
    beginnerNote:
      "LPG・メタン・煙を検知できるガスセンサー。使用前に20秒ほど通電して安定させる必要がある。初回使用時は予熱が長め（数分）。",
    dataSource: "https://www.hanwei.rs/Uploads/product/MQ-2.pdf",
    tags: ["5V", "アナログ", "要予熱", "ガス検知"],
    seoKeywords: [
      "MQ-2 Arduino 使い方",
      "ガスセンサー 煙検知",
      "MQ-2 ガス検出",
      "ガスセンサー 電子工作",
    ],
  },
  // ============================================================
  // 11. SW-420 振動センサー (既存)
  // ============================================================
  {
    id: "sw-420",
    name: "SW-420 振動センサー",
    nameEn: "SW-420 Vibration Sensor",
    category: "sensor",
    subcategory: "振動",
    difficulty: 1,
    priceRange: "¥100〜300",
    amazonAsin: "",
    specs: {
      "検知方式": "接触式（スプリング内蔵）",
      "電源電圧": "3.3〜5V",
      "出力": "デジタル（HIGH/LOW）",
      "感度調整": "可変抵抗で調整可能",
    },
    compatibleBoards: ["arduino-uno-r4-wifi", "esp32-devkitc", "raspberry-pi-5"],
    beginnerNote:
      "振動を検知するとデジタル出力が切り替わるシンプルなセンサー。防犯システムや地震検知の入門プロジェクトに使いやすい。",
    dataSource: "SW-420モジュール製品仕様",
    tags: ["3.3V", "5V", "デジタル", "初心者向け"],
    seoKeywords: [
      "SW-420 Arduino 使い方",
      "振動センサー 電子工作",
      "振動検知 Arduino",
    ],
  },
  // ============================================================
  // 12. HX711 ロードセルアンプ (既存)
  // ============================================================
  {
    id: "hx711",
    name: "HX711 ロードセル アンプ",
    nameEn: "HX711 Load Cell Amplifier",
    category: "sensor",
    subcategory: "重量",
    difficulty: 2,
    priceRange: "¥200〜500（ロードセル別売）",
    amazonAsin: "",
    specs: {
      "分解能": "24bit A/D コンバーター",
      "入力チャンネル": "2ch（A: 差動 / B: 差動）",
      "ゲイン": "チャンネルA: 64/128 / チャンネルB: 32",
      "電源電圧": "2.6〜5.5V",
      "出力": "デジタル（SPI類似）",
      "サンプリングレート": "10/80 SPS",
    },
    compatibleBoards: ["arduino-uno-r4-wifi", "esp32-devkitc", "raspberry-pi-5"],
    beginnerNote:
      "ロードセル（歪みゲージ）と組み合わせて重量を測定するアンプIC。自作キッチンスケールなどに使える。専用ライブラリで数行のコードで使える。",
    dataSource:
      "https://cdn.sparkfun.com/datasheets/Sensors/ForceFlex/hx711_english.pdf",
    tags: ["3.3V", "5V", "24bit", "ロードセル", "ADC"],
    seoKeywords: [
      "HX711 Arduino 使い方",
      "ロードセル 重量計測",
      "HX711 キッチンスケール",
      "重量センサー 電子工作",
    ],
  },
  // ============================================================
  // 13. MAX30102 心拍・SpO2センサー (既存)
  // ============================================================
  {
    id: "max30102",
    name: "MAX30102 心拍・SpO2センサー",
    nameEn: "MAX30102 Pulse Oximeter and Heart-Rate Sensor",
    category: "sensor",
    subcategory: "生体",
    difficulty: 2,
    priceRange: "¥300〜800",
    amazonAsin: "",
    specs: {
      "計測項目": "心拍数（BPM）、血中酸素濃度（SpO2）",
      "通信方式": "I2C",
      "電源電圧": "1.8V（LED: 5V）",
      "LEDピーク波長": "赤色 660nm / 赤外線 880nm",
      "動作温度": "-40〜85℃",
    },
    compatibleBoards: ["arduino-uno-r4-wifi", "esp32-devkitc", "raspberry-pi-5"],
    beginnerNote:
      "指先に当てると赤色LEDと赤外線LEDで心拍と血中酸素を測定。ヘルスケアデバイス入門に最適。I2Cで接続しSparkFunライブラリで簡単に使える。",
    dataSource:
      "https://www.analog.com/media/en/technical-documentation/data-sheets/MAX30102.pdf",
    tags: ["I2C", "1.8V", "生体センサー", "SpO2", "心拍"],
    seoKeywords: [
      "MAX30102 Arduino 使い方",
      "心拍センサー SpO2",
      "パルスオキシメーター 自作",
      "心拍センサー 電子工作",
    ],
  },
  // ============================================================
  // 14. TCS34725 カラーセンサー (既存)
  // ============================================================
  {
    id: "tcs34725",
    name: "TCS34725 カラーセンサー",
    nameEn: "TCS34725 RGB Color Sensor",
    category: "sensor",
    subcategory: "光・色",
    difficulty: 2,
    priceRange: "¥500〜1,000",
    amazonAsin: "",
    specs: {
      "計測": "RGB + クリアチャンネル（16bit）",
      "通信方式": "I2C",
      "I2Cアドレス": "0x29（固定）",
      "電源電圧": "3.3V",
      "IR遮断フィルター": "内蔵",
    },
    compatibleBoards: ["arduino-uno-r4-wifi", "esp32-devkitc", "raspberry-pi-5"],
    beginnerNote:
      "対象物に照射したLEDの反射光からRGB値を読み取るセンサー。Adafruitライブラリで使いやすい。色の仕分けロボットなどに活用できる。",
    dataSource: "https://cdn-shop.adafruit.com/datasheets/TCS34725.pdf",
    tags: ["3.3V", "I2C", "RGB", "IRフィルター内蔵"],
    seoKeywords: [
      "TCS34725 Arduino 使い方",
      "カラーセンサー RGB",
      "色認識 センサー 電子工作",
      "TCS34725 I2C",
    ],
  },
  // ============================================================
  // 15. INA219 電流・電圧センサー (既存)
  // ============================================================
  {
    id: "ina219",
    name: "INA219 電流・電圧センサー",
    nameEn: "INA219 Current/Voltage Sensor",
    category: "sensor",
    subcategory: "電気計測",
    difficulty: 2,
    priceRange: "¥200〜500",
    amazonAsin: "",
    specs: {
      "計測": "電流（最大3.2A）、電圧（最大26V）、電力",
      "分解能": "12bit",
      "通信方式": "I2C",
      "シャント抵抗": "0.1Ω（基板実装済み）",
      "電源電圧": "3〜5.5V",
    },
    compatibleBoards: ["arduino-uno-r4-wifi", "esp32-devkitc", "raspberry-pi-5"],
    beginnerNote:
      "回路の消費電流と電圧をリアルタイムで計測できるモジュール。バッテリー残量の計算やソーラーパネルの出力監視などに使う。",
    dataSource: "https://www.ti.com/lit/ds/symlink/ina219.pdf",
    tags: ["3.3V", "5V", "I2C", "電流計測", "電圧計測"],
    seoKeywords: [
      "INA219 Arduino 使い方",
      "電流センサー I2C",
      "消費電流 計測 Arduino",
      "INA219 電力計測",
    ],
  },
  // ============================================================
  // 16. VL53L0X ToFレーザー距離センサー (既存)
  // ============================================================
  {
    id: "vl53l0x",
    name: "VL53L0X ToFレーザー距離センサー",
    nameEn: "VL53L0X Time-of-Flight Distance Sensor",
    category: "sensor",
    subcategory: "距離",
    difficulty: 2,
    priceRange: "¥400〜800",
    amazonAsin: "",
    specs: {
      "計測範囲": "最大2m（条件により異なる）",
      "精度": "±5%（通常条件）",
      "計測方式": "ToF（飛行時間）レーザー",
      "レーザー": "940nm Class 1（人体安全）",
      "通信方式": "I2C",
      "電源電圧": "2.6〜3.5V",
    },
    compatibleBoards: ["arduino-uno-r4-wifi", "esp32-devkitc", "raspberry-pi-5"],
    beginnerNote:
      "レーザー光の飛行時間で距離を測るセンサー。超音波センサーより小型で高精度。Adafruitのライブラリで簡単に使える。",
    dataSource: "https://www.st.com/resource/en/datasheet/vl53l0x.pdf",
    tags: ["3.3V", "I2C", "ToF", "レーザー", "Class 1"],
    seoKeywords: [
      "VL53L0X Arduino 使い方",
      "ToFセンサー レーザー距離",
      "VL53L0X I2C",
      "レーザー距離センサー 電子工作",
    ],
  },
  // ============================================================
  // 17. 土壌水分センサー (既存)
  // ============================================================
  {
    id: "soil-moisture",
    name: "土壌水分センサー",
    nameEn: "Soil Moisture Sensor",
    category: "sensor",
    subcategory: "環境",
    difficulty: 1,
    priceRange: "¥100〜300",
    amazonAsin: "",
    specs: {
      "出力": "アナログ + デジタル",
      "電源電圧": "3.3〜5V",
      "検知方式": "電気抵抗式（2本の電極間の抵抗変化）",
      "感度調整": "可変抵抗で閾値調整可能",
    },
    compatibleBoards: ["arduino-uno-r4-wifi", "esp32-devkitc"],
    beginnerNote:
      "土に2本の電極を差し込み、電気抵抗で土の湿り具合を測定。自動水やりシステムの必須センサー。電極の腐食があるため長期使用には容量式センサーが向いている。",
    dataSource: "一般的な容量/抵抗式土壌水分センサー仕様",
    tags: ["3.3V", "5V", "アナログ", "デジタル", "初心者向け"],
    seoKeywords: [
      "土壌水分センサー Arduino 使い方",
      "自動水やり 電子工作",
      "土壌湿度 計測 Arduino",
    ],
  },
  // ============================================================
  // 18. 赤外線受信モジュール (既存)
  // ============================================================
  {
    id: "ir-receiver",
    name: "赤外線受信モジュール (VS1838B)",
    nameEn: "IR Receiver Module VS1838B",
    category: "sensor",
    subcategory: "赤外線",
    difficulty: 1,
    priceRange: "¥100〜200",
    amazonAsin: "",
    specs: {
      "受信周波数": "38kHz",
      "受信可能距離": "最大18m（無障害物）",
      "電源電圧": "2.7〜5.5V",
      "出力": "デジタル（アクティブLOW）",
      "ピン数": "3ピン（GND/VCC/OUT）",
    },
    compatibleBoards: ["arduino-uno-r4-wifi", "esp32-devkitc", "raspberry-pi-5"],
    beginnerNote:
      "テレビやエアコンのリモコン信号を受信できるモジュール。IRremoteライブラリと組み合わせて、リモコンで家電を操作するプロジェクトが作れる。",
    dataSource: "VS1838Bデータシート",
    tags: ["3.3V", "5V", "デジタル", "38kHz", "初心者向け"],
    seoKeywords: [
      "赤外線受信 Arduino 使い方",
      "IRリモコン 電子工作",
      "VS1838B Arduino",
      "赤外線 リモコン受信",
    ],
  },

  // ============================================================
  // NEW SENSORS (19-50)
  // ============================================================

  // ============================================================
  // 19. DHT11 温湿度センサー (NEW)
  // ============================================================
  {
    id: "dht11",
    name: "DHT11 温湿度センサー（安価版）",
    nameEn: "DHT11 Temperature & Humidity Sensor",
    category: "sensor",
    subcategory: "温湿度",
    difficulty: 1,
    priceRange: "¥100〜300",
    specs: {
      "温度計測範囲": "0〜50℃",
      "温度精度": "±2℃",
      "湿度計測範囲": "20〜80%RH",
      "湿度精度": "±5%RH",
      "電源電圧": "3.3〜5.5V",
      "出力方式": "デジタル（シングルワイヤ）",
      "サンプリング間隔": "最小1秒",
      "ピン数": "3ピン（GND/VCC/DATA）",
    },
    compatibleBoards: ["arduino-uno-r4-wifi", "esp32-devkitc", "raspberry-pi-pico-w"],
    beginnerNote:
      "最も安価な温湿度センサー。DHT22より精度は落ちるが、電子工作入門には十分。Arduino IDEのDHTライブラリで数行のコードで使える。",
    dataSource: "Aosong DHT11データシート",
    tags: ["3.3V", "5V", "デジタル", "シングルワイヤ", "初心者向け", "安価"],
    seoKeywords: [
      "DHT11 Arduino 使い方",
      "DHT11 温度 湿度",
      "DHT11 ESP32",
      "温湿度センサー 安い 電子工作",
    ],
  },
  // ============================================================
  // 20. BME280 温湿度気圧センサー (NEW)
  // ============================================================
  {
    id: "bme280",
    name: "BME280 温湿度気圧センサー",
    nameEn: "BME280 Temperature, Humidity & Pressure Sensor",
    category: "sensor",
    subcategory: "環境",
    difficulty: 1,
    priceRange: "¥400〜800",
    specs: {
      "温度計測範囲": "-40〜85℃",
      "温度精度": "±1℃",
      "湿度計測範囲": "0〜100%RH",
      "湿度精度": "±3%RH",
      "気圧計測範囲": "300〜1100 hPa",
      "気圧精度": "±1 hPa",
      "電源電圧": "1.71〜3.6V",
      "通信方式": "I2C / SPI",
      "I2Cアドレス": "0x76 / 0x77",
      "消費電流": "3.6μA（1Hz計測時）",
    },
    compatibleBoards: ["arduino-uno-r4-wifi", "raspberry-pi-5", "esp32-devkitc"],
    beginnerNote:
      "温度・湿度・気圧を1チップで計測できる万能環境センサー。BMP280に湿度計測を追加した上位版。気象ステーションに最適。",
    dataSource: "https://www.bosch-sensortec.com/products/environmental-sensors/humidity-sensors-bme280/",
    tags: ["3.3V", "I2C", "SPI", "低消費電力", "初心者向け", "3-in-1"],
    seoKeywords: [
      "BME280 Arduino 使い方",
      "BME280 温湿度 気圧",
      "環境センサー I2C",
      "気象ステーション 自作",
    ],
  },
  // ============================================================
  // 21. BME680 環境センサー (NEW)
  // ============================================================
  {
    id: "bme680",
    name: "BME680 環境センサー（VOC対応）",
    nameEn: "BME680 Environmental Sensor with VOC",
    category: "sensor",
    subcategory: "環境",
    difficulty: 2,
    priceRange: "¥1,000〜2,000",
    specs: {
      "温度計測範囲": "-40〜85℃",
      "温度精度": "±1℃",
      "湿度計測範囲": "0〜100%RH",
      "湿度精度": "±3%RH",
      "気圧計測範囲": "300〜1100 hPa",
      "ガスセンサー": "VOC（揮発性有機化合物）検出",
      "電源電圧": "1.71〜3.6V",
      "通信方式": "I2C / SPI",
      "I2Cアドレス": "0x76 / 0x77",
    },
    compatibleBoards: ["arduino-uno-r4-wifi", "raspberry-pi-5", "esp32-devkitc"],
    beginnerNote:
      "BME280に空気質（VOC）センサーを追加した4-in-1環境センサー。室内空気質（IAQ）の算出にはBoschのBSECライブラリを使う。",
    dataSource: "https://www.bosch-sensortec.com/products/environmental-sensors/gas-sensors/bme680/",
    tags: ["3.3V", "I2C", "SPI", "VOC", "4-in-1", "空気質"],
    seoKeywords: [
      "BME680 Arduino 使い方",
      "BME680 VOC 空気質",
      "環境センサー VOC",
      "BME680 BSEC ライブラリ",
    ],
  },
  // ============================================================
  // 22. SHT31 高精度温湿度センサー (NEW)
  // ============================================================
  {
    id: "sht31",
    name: "SHT31 高精度温湿度センサー",
    nameEn: "SHT31 High-Accuracy Temperature & Humidity Sensor",
    category: "sensor",
    subcategory: "温湿度",
    difficulty: 2,
    priceRange: "¥500〜1,000",
    specs: {
      "温度計測範囲": "-40〜125℃",
      "温度精度": "±0.3℃（標準）",
      "湿度計測範囲": "0〜100%RH",
      "湿度精度": "±2%RH（標準）",
      "電源電圧": "2.4〜5.5V",
      "通信方式": "I2C",
      "I2Cアドレス": "0x44 / 0x45",
      "分解能": "16bit",
    },
    compatibleBoards: ["arduino-uno-r4-wifi", "raspberry-pi-5", "esp32-devkitc"],
    beginnerNote:
      "Sensirion社製の高精度温湿度センサー。DHT22より格段に高精度でI2C対応。研究用途にも使える品質。Adafruitライブラリで簡単に使える。",
    dataSource: "https://sensirion.com/products/catalog/SHT31-DIS-B/",
    tags: ["3.3V", "5V", "I2C", "高精度", "16bit"],
    seoKeywords: [
      "SHT31 Arduino 使い方",
      "高精度 温湿度センサー",
      "SHT31 I2C",
      "Sensirion 温度 湿度",
    ],
  },
  // ============================================================
  // 23. MLX90614 非接触温度センサー (NEW)
  // ============================================================
  {
    id: "mlx90614",
    name: "MLX90614 非接触温度センサー",
    nameEn: "MLX90614 Non-Contact IR Temperature Sensor",
    category: "sensor",
    subcategory: "温度",
    difficulty: 2,
    priceRange: "¥800〜1,500",
    specs: {
      "物体温度計測範囲": "-70〜380℃",
      "周囲温度計測範囲": "-40〜125℃",
      "精度": "±0.5℃（0〜50℃範囲）",
      "分解能": "0.02℃",
      "電源電圧": "3.3V（5Vトレラント）",
      "通信方式": "I2C（SMBus互換）",
      "I2Cアドレス": "0x5A（デフォルト）",
      "視野角": "90°（BAA型）/ 5°（BCI型）",
    },
    compatibleBoards: ["arduino-uno-r4-wifi", "esp32-devkitc", "raspberry-pi-5"],
    beginnerNote:
      "赤外線で非接触に温度を測定できるセンサー。体温計や食材温度の計測に使える。Adafruit_MLX90614ライブラリで簡単にI2C通信できる。",
    dataSource: "https://www.melexis.com/en/product/MLX90614/",
    tags: ["3.3V", "I2C", "非接触", "赤外線", "高精度"],
    seoKeywords: [
      "MLX90614 Arduino 使い方",
      "非接触温度センサー",
      "赤外線 温度計 自作",
      "MLX90614 I2C",
    ],
  },
  // ============================================================
  // 24. MAX6675 熱電対アンプ (NEW)
  // ============================================================
  {
    id: "max6675",
    name: "MAX6675 熱電対アンプ",
    nameEn: "MAX6675 K-Type Thermocouple Amplifier",
    category: "sensor",
    subcategory: "温度",
    difficulty: 2,
    priceRange: "¥300〜600",
    specs: {
      "計測範囲": "0〜1024℃",
      "分解能": "0.25℃（12bit）",
      "熱電対タイプ": "K型",
      "電源電圧": "3〜5.5V",
      "通信方式": "SPI",
      "変換時間": "最大220ms",
    },
    compatibleBoards: ["arduino-uno-r4-wifi", "esp32-devkitc", "raspberry-pi-5"],
    beginnerNote:
      "K型熱電対を使って最大1024℃まで測定可能。3Dプリンターのヒートベッドやリフロー炉の温度管理に。SPI通信でArduinoから簡単に読み取れる。",
    dataSource: "https://www.analog.com/media/en/technical-documentation/data-sheets/MAX6675.pdf",
    tags: ["3.3V", "5V", "SPI", "熱電対", "高温測定"],
    seoKeywords: [
      "MAX6675 Arduino 使い方",
      "熱電対 K型 温度計測",
      "MAX6675 SPI",
      "高温 温度センサー 電子工作",
    ],
  },
  // ============================================================
  // 25. JSN-SR04T 防水超音波センサー (NEW)
  // ============================================================
  {
    id: "hcsr04-waterproof",
    name: "JSN-SR04T 防水超音波距離センサー",
    nameEn: "JSN-SR04T Waterproof Ultrasonic Distance Sensor",
    category: "sensor",
    subcategory: "距離",
    difficulty: 2,
    priceRange: "¥500〜1,000",
    specs: {
      "計測範囲": "20〜600cm",
      "精度": "±1cm",
      "電源電圧": "5V",
      "出力方式": "パルス幅（TRIG/ECHO）",
      "防水等級": "IP67（プローブ部）",
      "周波数": "40kHz",
      "ケーブル長": "約2.5m",
    },
    compatibleBoards: ["arduino-uno-r4-wifi", "esp32-devkitc", "raspberry-pi-5"],
    beginnerNote:
      "HC-SR04の防水版。プローブ部がIP67防水で水位計測や屋外設置に対応。接続方法はHC-SR04と同じTRIG/ECHO方式で移行が簡単。",
    dataSource: "JSN-SR04T製品データシート",
    tags: ["5V", "デジタル", "パルス幅", "防水", "IP67"],
    seoKeywords: [
      "JSN-SR04T Arduino 使い方",
      "防水 超音波センサー",
      "水位計測 Arduino",
      "JSN-SR04T 距離センサー",
    ],
  },
  // ============================================================
  // 26. GP2Y0A21YK0F 赤外線距離センサー (NEW)
  // ============================================================
  {
    id: "sharp-gp2y0a21",
    name: "GP2Y0A21YK0F 赤外線距離センサー",
    nameEn: "Sharp GP2Y0A21YK0F IR Distance Sensor",
    category: "sensor",
    subcategory: "距離",
    difficulty: 1,
    priceRange: "¥300〜600",
    specs: {
      "計測範囲": "10〜80cm",
      "出力方式": "アナログ電圧（距離に応じた非線形）",
      "電源電圧": "4.5〜5.5V",
      "消費電流": "約30mA",
      "応答時間": "約39ms",
      "ピン数": "3ピン（GND/VCC/OUT）",
    },
    compatibleBoards: ["arduino-uno-r4-wifi", "esp32-devkitc", "raspberry-pi-pico-w"],
    beginnerNote:
      "シャープ製の赤外線距離センサー。アナログ出力で配線が簡単。出力電圧と距離が非線形のため、変換テーブルやライブラリを使うと便利。",
    dataSource: "https://global.sharp/products/device/lineup/data/pdf/datasheet/gp2y0a21yk_e.pdf",
    tags: ["5V", "アナログ", "赤外線", "初心者向け"],
    seoKeywords: [
      "GP2Y0A21 Arduino 使い方",
      "赤外線 距離センサー Sharp",
      "GP2Y0A21 アナログ",
      "赤外線距離センサー 電子工作",
    ],
  },
  // ============================================================
  // 27. VL53L1X ToF距離センサー（長距離） (NEW)
  // ============================================================
  {
    id: "tof-vl53l1x",
    name: "VL53L1X ToF距離センサー（長距離）",
    nameEn: "VL53L1X Long-Range Time-of-Flight Distance Sensor",
    category: "sensor",
    subcategory: "距離",
    difficulty: 2,
    priceRange: "¥600〜1,200",
    specs: {
      "計測範囲": "最大4m（条件により異なる）",
      "精度": "±5mm（短距離モード）",
      "計測方式": "ToF（飛行時間）レーザー",
      "レーザー": "940nm VCSEL Class 1（人体安全）",
      "通信方式": "I2C",
      "I2Cアドレス": "0x29（デフォルト）",
      "電源電圧": "2.6〜3.5V",
      "視野角": "27°（プログラム可能ROI）",
    },
    compatibleBoards: ["arduino-uno-r4-wifi", "esp32-devkitc", "raspberry-pi-5"],
    beginnerNote:
      "VL53L0Xの後継機で最大4mまで計測可能。プログラマブルROI（関心領域）機能で検出エリアを絞れる。Pololuライブラリで簡単に使える。",
    dataSource: "https://www.st.com/resource/en/datasheet/vl53l1x.pdf",
    tags: ["3.3V", "I2C", "ToF", "レーザー", "長距離", "Class 1"],
    seoKeywords: [
      "VL53L1X Arduino 使い方",
      "ToFセンサー 長距離",
      "VL53L1X I2C",
      "レーザー距離センサー 4m",
    ],
  },
  // ============================================================
  // 28. ADXL345 3軸加速度センサー (NEW)
  // ============================================================
  {
    id: "adxl345",
    name: "ADXL345 3軸加速度センサー",
    nameEn: "ADXL345 3-Axis Digital Accelerometer",
    category: "sensor",
    subcategory: "モーション",
    difficulty: 2,
    priceRange: "¥300〜600",
    specs: {
      "計測軸": "3軸（加速度）",
      "加速度レンジ": "±2/4/8/16g（設定可能）",
      "分解能": "最大13bit（±16g時）",
      "電源電圧": "2〜3.6V",
      "通信方式": "I2C / SPI",
      "I2Cアドレス": "0x53 / 0x1D",
      "出力データレート": "0.1〜3200Hz",
      "消費電流": "40μA（計測時）",
    },
    compatibleBoards: ["arduino-uno-r4-wifi", "esp32-devkitc", "raspberry-pi-5"],
    beginnerNote:
      "Analog Devices製の低消費電力3軸加速度センサー。タップ検出やフリーフォール検出機能を内蔵。万歩計や傾き検出に最適。",
    dataSource: "https://www.analog.com/media/en/technical-documentation/data-sheets/ADXL345.pdf",
    tags: ["3.3V", "I2C", "SPI", "低消費電力", "3軸"],
    seoKeywords: [
      "ADXL345 Arduino 使い方",
      "3軸加速度センサー",
      "ADXL345 I2C SPI",
      "加速度センサー 電子工作",
    ],
  },
  // ============================================================
  // 29. MPU9250 9軸IMU (NEW)
  // ============================================================
  {
    id: "mpu9250",
    name: "MPU9250 9軸IMUセンサー",
    nameEn: "MPU-9250 9-Axis IMU Sensor",
    category: "sensor",
    subcategory: "モーション",
    difficulty: 3,
    priceRange: "¥500〜1,000",
    specs: {
      "計測軸": "9軸（加速度3軸 + ジャイロ3軸 + 地磁気3軸）",
      "加速度レンジ": "±2/4/8/16g",
      "ジャイロレンジ": "±250/500/1000/2000°/s",
      "地磁気レンジ": "±4800μT",
      "電源電圧": "2.4〜3.6V",
      "通信方式": "I2C / SPI",
      "I2Cアドレス": "0x68 / 0x69",
      "内蔵地磁気": "AK8963（14/16bit）",
    },
    compatibleBoards: ["esp32-devkitc", "raspberry-pi-5", "arduino-uno-r4-wifi"],
    beginnerNote:
      "MPU6050に地磁気センサー（AK8963）を追加した9軸IMU。ドローンの姿勢制御や電子コンパスに使える。キャリブレーションが重要。",
    dataSource: "TDK InvenSense MPU-9250データシート",
    tags: ["3.3V", "I2C", "SPI", "9軸", "IMU", "DMP内蔵"],
    seoKeywords: [
      "MPU9250 Arduino 使い方",
      "9軸IMU センサー",
      "MPU9250 ドローン",
      "9軸 姿勢制御 電子工作",
    ],
  },
  // ============================================================
  // 30. HMC5883L 地磁気センサー (NEW)
  // ============================================================
  {
    id: "hmc5883l",
    name: "HMC5883L 地磁気センサー",
    nameEn: "HMC5883L 3-Axis Digital Compass",
    category: "sensor",
    subcategory: "モーション",
    difficulty: 2,
    priceRange: "¥300〜600",
    specs: {
      "計測軸": "3軸（地磁気）",
      "計測範囲": "±1.3〜8.1 ガウス",
      "分解能": "5 mガウス（2 mガウスレンジ時）",
      "電源電圧": "2.16〜3.6V",
      "通信方式": "I2C",
      "I2Cアドレス": "0x1E",
      "出力データレート": "最大75Hz",
    },
    compatibleBoards: ["arduino-uno-r4-wifi", "esp32-devkitc", "raspberry-pi-5"],
    beginnerNote:
      "Honeywell製の3軸デジタルコンパスIC。方位磁石の代わりにマイコンで方角を取得できる。電子コンパスやロボットのナビゲーションに使う。",
    dataSource: "Honeywell HMC5883Lデータシート",
    tags: ["3.3V", "I2C", "3軸", "コンパス", "地磁気"],
    seoKeywords: [
      "HMC5883L Arduino 使い方",
      "地磁気センサー コンパス",
      "デジタルコンパス 電子工作",
      "HMC5883L I2C",
    ],
  },
  // ============================================================
  // 31. BNO055 絶対方位センサー (NEW)
  // ============================================================
  {
    id: "bno055",
    name: "BNO055 絶対方位センサー",
    nameEn: "BNO055 Absolute Orientation Sensor",
    category: "sensor",
    subcategory: "モーション",
    difficulty: 2,
    priceRange: "¥2,000〜4,000",
    specs: {
      "計測軸": "9軸（加速度3軸 + ジャイロ3軸 + 地磁気3軸）",
      "内蔵プロセッサ": "ARM Cortex-M0（センサーフュージョン演算）",
      "出力データ": "オイラー角、クォータニオン、線形加速度、重力ベクトル",
      "電源電圧": "2.4〜3.6V",
      "通信方式": "I2C / UART",
      "I2Cアドレス": "0x28 / 0x29",
      "出力データレート": "最大100Hz",
    },
    compatibleBoards: ["arduino-uno-r4-wifi", "esp32-devkitc", "raspberry-pi-5"],
    beginnerNote:
      "Bosch製のセンサーフュージョン内蔵9軸IMU。内蔵のCortex-M0がオイラー角やクォータニオンを自動算出するため、自分でフィルタ演算をする必要がない。",
    dataSource: "https://www.bosch-sensortec.com/products/smart-sensor-systems/bno055/",
    tags: ["3.3V", "I2C", "UART", "9軸", "センサーフュージョン", "クォータニオン"],
    seoKeywords: [
      "BNO055 Arduino 使い方",
      "絶対方位センサー",
      "BNO055 クォータニオン",
      "9軸 センサーフュージョン",
    ],
  },
  // ============================================================
  // 32. VEML7700 高精度照度センサー (NEW)
  // ============================================================
  {
    id: "veml7700",
    name: "VEML7700 高精度照度センサー",
    nameEn: "VEML7700 High-Accuracy Ambient Light Sensor",
    category: "sensor",
    subcategory: "光・照度",
    difficulty: 1,
    priceRange: "¥300〜600",
    specs: {
      "計測範囲": "0〜120,000 lux",
      "分解能": "0.0036 lux/count",
      "電源電圧": "2.5〜3.6V",
      "通信方式": "I2C",
      "I2Cアドレス": "0x10",
      "スペクトル応答": "人間の視感度に近い",
      "消費電流": "2μA（標準）",
    },
    compatibleBoards: ["arduino-uno-r4-wifi", "esp32-devkitc", "raspberry-pi-5"],
    beginnerNote:
      "Vishay製の高精度照度センサー。人間の目の感度特性に近い応答特性を持ち、BH1750よりも広い計測範囲に対応。太陽光下でも計測できる。",
    dataSource: "https://www.vishay.com/docs/84286/veml7700.pdf",
    tags: ["3.3V", "I2C", "低消費電力", "高精度", "初心者向け"],
    seoKeywords: [
      "VEML7700 Arduino 使い方",
      "高精度 照度センサー",
      "VEML7700 I2C",
      "照度計 自作 電子工作",
    ],
  },
  // ============================================================
  // 33. TSL2561 光センサー (NEW)
  // ============================================================
  {
    id: "tsl2561",
    name: "TSL2561 光センサー",
    nameEn: "TSL2561 Light Sensor",
    category: "sensor",
    subcategory: "光・照度",
    difficulty: 1,
    priceRange: "¥300〜600",
    specs: {
      "計測範囲": "0.1〜40,000 lux",
      "スペクトル範囲": "300〜1100nm（可視光 + 赤外線）",
      "電源電圧": "2.7〜3.6V",
      "通信方式": "I2C",
      "I2Cアドレス": "0x29 / 0x39 / 0x49（アドレスピンで選択）",
      "分解能": "16bit",
      "消費電流": "0.24mA（アクティブ時）",
    },
    compatibleBoards: ["arduino-uno-r4-wifi", "esp32-devkitc", "raspberry-pi-5"],
    beginnerNote:
      "AMS製の光センサー。可視光と赤外線の2チャンネルを持ち、赤外線成分を差し引いた正確なlux値を計算できる。Adafruitライブラリで簡単に使える。",
    dataSource: "https://ams.com/documents/20143/36005/TSL2561_DS000110_3-00.pdf",
    tags: ["3.3V", "I2C", "16bit", "2チャンネル", "初心者向け"],
    seoKeywords: [
      "TSL2561 Arduino 使い方",
      "光センサー I2C",
      "TSL2561 照度",
      "光センサー モジュール 電子工作",
    ],
  },
  // ============================================================
  // 34. APDS-9960 ジェスチャーセンサー (NEW)
  // ============================================================
  {
    id: "apds9960",
    name: "APDS-9960 ジェスチャー・近接・照度センサー",
    nameEn: "APDS-9960 Gesture, Proximity & Light Sensor",
    category: "sensor",
    subcategory: "光・近接",
    difficulty: 2,
    priceRange: "¥400〜800",
    specs: {
      "機能": "ジェスチャー検出、近接検出、照度計測、色計測（RGBC）",
      "ジェスチャー検出方向": "上下左右（4方向）",
      "近接検出距離": "最大約20cm",
      "電源電圧": "2.4〜3.6V",
      "通信方式": "I2C",
      "I2Cアドレス": "0x39",
      "IR LED": "内蔵",
    },
    compatibleBoards: ["arduino-uno-r4-wifi", "esp32-devkitc", "raspberry-pi-5"],
    beginnerNote:
      "Broadcom製のマルチセンサー。手のスワイプ方向を検出するジェスチャー機能が特徴。近接センサーとカラーセンサーも内蔵。SparkFunライブラリが使いやすい。",
    dataSource: "https://docs.broadcom.com/doc/AV02-4191EN",
    tags: ["3.3V", "I2C", "ジェスチャー", "近接", "RGB", "マルチセンサー"],
    seoKeywords: [
      "APDS-9960 Arduino 使い方",
      "ジェスチャーセンサー",
      "APDS9960 近接センサー",
      "ジェスチャー検出 電子工作",
    ],
  },
  // ============================================================
  // 35. MQ-135 空気品質センサー (NEW)
  // ============================================================
  {
    id: "mq-135",
    name: "MQ-135 空気品質センサー",
    nameEn: "MQ-135 Air Quality Sensor",
    category: "sensor",
    subcategory: "ガス",
    difficulty: 2,
    priceRange: "¥300〜600",
    specs: {
      "検知ガス": "NH3、NOx、アルコール、ベンゼン、煙、CO2",
      "電源電圧": "5V",
      "出力": "アナログ + デジタル（閾値調整可）",
      "ヒーター消費電力": "約800mW",
      "予熱時間": "24時間以上（初回）",
      "動作温度": "-10〜50℃",
    },
    compatibleBoards: ["arduino-uno-r4-wifi", "esp32-devkitc", "raspberry-pi-pico-w"],
    beginnerNote:
      "室内空気質モニタリングに使える汎用ガスセンサー。ヒーター内蔵で消費電力が大きいため外部電源推奨。初回は24時間以上のエージングが必要。",
    dataSource: "https://www.olimex.com/Products/Components/Sensors/SNS-MQ135/resources/SNS-MQ135.pdf",
    tags: ["5V", "アナログ", "要予熱", "ガス検知", "空気質"],
    seoKeywords: [
      "MQ-135 Arduino 使い方",
      "空気品質センサー",
      "MQ-135 CO2",
      "空気質 モニタリング 電子工作",
    ],
  },
  // ============================================================
  // 36. MQ-7 一酸化炭素センサー (NEW)
  // ============================================================
  {
    id: "mq-7",
    name: "MQ-7 一酸化炭素センサー",
    nameEn: "MQ-7 Carbon Monoxide Gas Sensor",
    category: "sensor",
    subcategory: "ガス",
    difficulty: 2,
    priceRange: "¥300〜600",
    specs: {
      "検知ガス": "一酸化炭素（CO）",
      "検知範囲": "20〜2000ppm",
      "電源電圧": "5V",
      "出力": "アナログ + デジタル（閾値調整可）",
      "ヒーター電圧": "5V（高温相）/ 1.4V（低温相）",
      "ヒーターサイクル": "高温60秒 / 低温90秒",
      "動作温度": "-10〜50℃",
    },
    compatibleBoards: ["arduino-uno-r4-wifi", "esp32-devkitc", "raspberry-pi-pico-w"],
    beginnerNote:
      "一酸化炭素に特化したMQシリーズセンサー。ヒーターの高温/低温サイクル制御が必要な点が他のMQセンサーと異なる。ガス漏れ検知器の自作に。",
    dataSource: "https://www.sparkfun.com/datasheets/Sensors/Biometric/MQ-7.pdf",
    tags: ["5V", "アナログ", "要予熱", "CO検知", "サイクル制御"],
    seoKeywords: [
      "MQ-7 Arduino 使い方",
      "一酸化炭素 センサー",
      "MQ-7 CO検知",
      "一酸化炭素 検出 電子工作",
    ],
  },
  // ============================================================
  // 37. CCS811 CO2/TVOCセンサー (NEW)
  // ============================================================
  {
    id: "ccs811",
    name: "CCS811 CO2/TVOCセンサー",
    nameEn: "CCS811 Digital Gas Sensor (eCO2 & TVOC)",
    category: "sensor",
    subcategory: "ガス",
    difficulty: 2,
    priceRange: "¥800〜1,500",
    specs: {
      "eCO2計測範囲": "400〜8192ppm",
      "TVOC計測範囲": "0〜1187ppb",
      "電源電圧": "1.8〜3.6V",
      "通信方式": "I2C",
      "I2Cアドレス": "0x5A / 0x5B",
      "内蔵MCU": "あり（信号処理済み出力）",
      "バーンイン時間": "48時間推奨",
    },
    compatibleBoards: ["arduino-uno-r4-wifi", "esp32-devkitc", "raspberry-pi-5"],
    beginnerNote:
      "ScioSense製のデジタル空気質センサー。等価CO2（eCO2）とTVOCをI2Cで直接読み取れる。MQセンサーと違いデジタル出力でマイコン側の処理が楽。",
    dataSource: "https://www.sciosense.com/products/environmental-sensors/ccs811-gas-sensor/",
    tags: ["3.3V", "I2C", "デジタル", "CO2", "TVOC", "空気質"],
    seoKeywords: [
      "CCS811 Arduino 使い方",
      "CO2センサー I2C",
      "CCS811 TVOC",
      "室内空気質 センサー 電子工作",
    ],
  },
  // ============================================================
  // 38. SCD40 CO2センサー（NDIR） (NEW)
  // ============================================================
  {
    id: "scd40",
    name: "SCD40 CO2センサー（NDIR方式）",
    nameEn: "SCD40 NDIR CO2 Sensor",
    category: "sensor",
    subcategory: "ガス",
    difficulty: 2,
    priceRange: "¥2,000〜4,000",
    specs: {
      "CO2計測範囲": "400〜2000ppm",
      "CO2精度": "±50ppm + 5%",
      "温度精度": "±0.8℃",
      "湿度精度": "±6%RH",
      "電源電圧": "2.4〜5.5V",
      "通信方式": "I2C",
      "I2Cアドレス": "0x62",
      "計測方式": "NDIR（非分散赤外線）光音響方式",
      "サイズ": "10.1 x 10.1 x 6.5mm",
    },
    compatibleBoards: ["arduino-uno-r4-wifi", "esp32-devkitc", "raspberry-pi-5"],
    beginnerNote:
      "Sensirion製の本格的なCO2センサー。NDIR方式で正確なCO2濃度を計測できる。CCS811のeCO2と違い実際のCO2を光学的に測定。温湿度も同時計測可能。",
    dataSource: "https://sensirion.com/products/catalog/SCD40/",
    tags: ["3.3V", "I2C", "NDIR", "CO2", "高精度", "温湿度"],
    seoKeywords: [
      "SCD40 Arduino 使い方",
      "CO2センサー NDIR",
      "SCD40 Sensirion",
      "CO2濃度 計測 電子工作",
    ],
  },
  // ============================================================
  // 39. 雨滴センサー (NEW)
  // ============================================================
  {
    id: "rain-sensor",
    name: "雨滴センサー",
    nameEn: "Rain Sensor Module",
    category: "sensor",
    subcategory: "環境",
    difficulty: 1,
    priceRange: "¥100〜300",
    specs: {
      "検知方式": "電気抵抗式（雨滴で基板上の抵抗が変化）",
      "電源電圧": "3.3〜5V",
      "出力": "アナログ + デジタル（閾値調整可）",
      "感度調整": "可変抵抗で調整可能",
      "基板サイズ": "約54 x 40mm",
    },
    compatibleBoards: ["arduino-uno-r4-wifi", "esp32-devkitc", "raspberry-pi-pico-w"],
    beginnerNote:
      "基板上のパターンに雨滴が付くと電気抵抗が変化する仕組み。自動窓閉めシステムやIoT気象ステーションに使える。長期屋外使用では基板の腐食に注意。",
    dataSource: "一般的な雨滴センサーモジュール仕様",
    tags: ["3.3V", "5V", "アナログ", "デジタル", "初心者向け", "安価"],
    seoKeywords: [
      "雨滴センサー Arduino 使い方",
      "雨センサー 電子工作",
      "Rain Sensor Arduino",
      "雨検知 IoT",
    ],
  },
  // ============================================================
  // 40. 水位センサー (NEW)
  // ============================================================
  {
    id: "water-level",
    name: "水位センサー",
    nameEn: "Water Level Sensor",
    category: "sensor",
    subcategory: "環境",
    difficulty: 1,
    priceRange: "¥100〜200",
    specs: {
      "検知方式": "電気抵抗式（水面の高さで抵抗が変化）",
      "電源電圧": "3.3〜5V",
      "出力": "アナログ",
      "計測深さ": "約40mm",
      "基板サイズ": "約62 x 20mm",
      "消費電力": "約20mW未満",
    },
    compatibleBoards: ["arduino-uno-r4-wifi", "esp32-devkitc", "raspberry-pi-pico-w"],
    beginnerNote:
      "基板を水に浸した深さに応じてアナログ値が変化するシンプルなセンサー。水槽や植木鉢の水位管理に。常時通電すると電食で劣化するため、計測時のみ通電するのがコツ。",
    dataSource: "一般的な水位センサーモジュール仕様",
    tags: ["3.3V", "5V", "アナログ", "初心者向け", "安価"],
    seoKeywords: [
      "水位センサー Arduino 使い方",
      "Water Level Sensor Arduino",
      "水位計測 電子工作",
      "水槽 水位 自動管理",
    ],
  },
  // ============================================================
  // 41. 静電容量式土壌水分センサー (NEW)
  // ============================================================
  {
    id: "capacitive-soil",
    name: "静電容量式土壌水分センサー",
    nameEn: "Capacitive Soil Moisture Sensor v1.2",
    category: "sensor",
    subcategory: "環境",
    difficulty: 1,
    priceRange: "¥200〜400",
    specs: {
      "検知方式": "静電容量式（電極腐食なし）",
      "電源電圧": "3.3〜5.5V",
      "出力": "アナログ",
      "動作電流": "約5mA",
      "基板コーティング": "防水加工済み（電極部）",
    },
    compatibleBoards: ["arduino-uno-r4-wifi", "esp32-devkitc", "raspberry-pi-pico-w"],
    beginnerNote:
      "抵抗式と違い電極が水に直接触れないため腐食しにくい。長期間の土壌モニタリングに向いている。アナログ値は環境でばらつくため、乾燥時と湿潤時のキャリブレーションが必要。",
    dataSource: "Capacitive Soil Moisture Sensor v1.2製品仕様",
    tags: ["3.3V", "5V", "アナログ", "初心者向け", "腐食耐性"],
    seoKeywords: [
      "静電容量式 土壌水分センサー Arduino",
      "Capacitive Soil Moisture Sensor",
      "土壌水分 長期モニタリング",
      "自動水やり センサー",
    ],
  },
  // ============================================================
  // 42. AM312 小型PIRセンサー (NEW)
  // ============================================================
  {
    id: "pir-am312",
    name: "AM312 小型PIRセンサー",
    nameEn: "AM312 Mini PIR Motion Sensor",
    category: "sensor",
    subcategory: "動体検知",
    difficulty: 1,
    priceRange: "¥100〜300",
    specs: {
      "検出距離": "最大3〜5m",
      "検出角度": "約100°",
      "電源電圧": "2.7〜12V",
      "出力方式": "デジタル（HIGH/LOW）",
      "出力遅延": "約2秒（固定）",
      "サイズ": "約10 x 23mm（超小型）",
      "消費電流": "約20μA（待機時）",
    },
    compatibleBoards: ["arduino-uno-r4-wifi", "esp32-devkitc", "raspberry-pi-pico-w"],
    beginnerNote:
      "HC-SR501より格段に小さいPIRセンサー。感度と遅延時間は固定だが、省スペースでバッテリー駆動プロジェクトに最適。3.3V/5Vどちらでも動作する。",
    dataSource: "AM312製品データシート",
    tags: ["3.3V", "5V", "デジタル", "PIR", "超小型", "低消費電力", "初心者向け"],
    seoKeywords: [
      "AM312 Arduino 使い方",
      "小型 人感センサー",
      "AM312 PIR",
      "小型PIRセンサー 電子工作",
    ],
  },
  // ============================================================
  // 43. RCWL-0516 マイクロ波人感センサー (NEW)
  // ============================================================
  {
    id: "rcwl-0516",
    name: "RCWL-0516 マイクロ波人感センサー",
    nameEn: "RCWL-0516 Microwave Radar Motion Sensor",
    category: "sensor",
    subcategory: "動体検知",
    difficulty: 1,
    priceRange: "¥200〜400",
    specs: {
      "検出距離": "最大5〜9m",
      "検出方式": "ドップラーレーダー（3.18GHz）",
      "電源電圧": "4〜28V",
      "出力方式": "デジタル（HIGH 3秒 → LOW）",
      "出力電圧": "3.3V",
      "動作温度": "-20〜80℃",
      "貫通検知": "薄い壁やガラス越しに検知可能",
    },
    compatibleBoards: ["arduino-uno-r4-wifi", "esp32-devkitc", "raspberry-pi-5"],
    beginnerNote:
      "マイクロ波で動きを検知するセンサー。PIRセンサーと違い壁越しにも検知できる。外装ケース内に隠して使えるので見た目がスッキリする。",
    dataSource: "RCWL-0516製品データシート",
    tags: ["5V", "デジタル", "マイクロ波", "ドップラー", "初心者向け", "貫通検知"],
    seoKeywords: [
      "RCWL-0516 Arduino 使い方",
      "マイクロ波 人感センサー",
      "RCWL-0516 レーダー",
      "壁越し 動体検知 電子工作",
    ],
  },
  // ============================================================
  // 44. INMP441 I2Sマイク (NEW)
  // ============================================================
  {
    id: "inmp441",
    name: "INMP441 I2Sデジタルマイク",
    nameEn: "INMP441 MEMS I2S Microphone",
    category: "sensor",
    subcategory: "音声",
    difficulty: 2,
    priceRange: "¥300〜600",
    specs: {
      "インターフェース": "I2S（デジタル音声）",
      "SNR": "61dB",
      "感度": "-26dBFS",
      "電源電圧": "1.8〜3.3V",
      "サンプリングレート": "最大48kHz",
      "ビット深度": "24bit",
      "消費電流": "1.4mA",
    },
    compatibleBoards: ["esp32-devkitc", "raspberry-pi-5", "raspberry-pi-pico-w"],
    beginnerNote:
      "I2Sデジタル出力のMEMSマイク。ESP32のI2Sペリフェラルと組み合わせて高品質な音声録音ができる。音声認識やFFT音声可視化プロジェクトに最適。",
    dataSource: "https://invensense.tdk.com/products/digital/inmp441/",
    tags: ["3.3V", "I2S", "デジタル", "MEMS", "24bit", "音声"],
    seoKeywords: [
      "INMP441 ESP32 使い方",
      "I2Sマイク Arduino",
      "INMP441 音声録音",
      "デジタルマイク 電子工作",
    ],
  },
  // ============================================================
  // 45. MAX4466 エレクトレットマイク (NEW)
  // ============================================================
  {
    id: "max4466",
    name: "MAX4466 エレクトレットマイクアンプ",
    nameEn: "MAX4466 Electret Microphone Amplifier",
    category: "sensor",
    subcategory: "音声",
    difficulty: 1,
    priceRange: "¥200〜500",
    specs: {
      "マイク": "エレクトレットコンデンサーマイク",
      "アンプIC": "MAX4466（低ノイズオペアンプ）",
      "ゲイン": "25x〜125x（可変抵抗で調整）",
      "電源電圧": "2.4〜5.5V",
      "出力": "アナログ（ピークtoピーク）",
      "周波数応答": "20Hz〜20kHz",
    },
    compatibleBoards: ["arduino-uno-r4-wifi", "esp32-devkitc", "raspberry-pi-pico-w"],
    beginnerNote:
      "Adafruit製のマイクアンプモジュール。アナログ出力なのでADCで読み取るだけで音量レベルを取得できる。VUメーターや拍手検知に使いやすい。",
    dataSource: "https://www.analog.com/media/en/technical-documentation/data-sheets/MAX4465-MAX4469.pdf",
    tags: ["3.3V", "5V", "アナログ", "初心者向け", "可変ゲイン"],
    seoKeywords: [
      "MAX4466 Arduino 使い方",
      "マイクアンプ 電子工作",
      "エレクトレットマイク Arduino",
      "音量レベル 計測",
    ],
  },
  // ============================================================
  // 46. ACS712 ホール電流センサー (NEW)
  // ============================================================
  {
    id: "current-acs712",
    name: "ACS712 ホール電流センサー",
    nameEn: "ACS712 Hall-Effect Current Sensor",
    category: "sensor",
    subcategory: "電気計測",
    difficulty: 2,
    priceRange: "¥200〜500",
    specs: {
      "計測範囲": "±5A / ±20A / ±30A（型番による）",
      "感度": "185mV/A（5A版）/ 100mV/A（20A版）/ 66mV/A（30A版）",
      "電源電圧": "5V",
      "出力": "アナログ（VCC/2を中心とした電圧）",
      "帯域幅": "80kHz",
      "絶縁耐圧": "2.1kVrms",
      "動作温度": "-40〜85℃",
    },
    compatibleBoards: ["arduino-uno-r4-wifi", "esp32-devkitc", "m5stack-basic"],
    beginnerNote:
      "ホール素子で非接触に電流を計測するセンサー。AC/DC両方に対応し、配線を切断せずに計測できる。出力はVCC/2（2.5V）を基準に電流に比例した電圧が出る。",
    dataSource: "https://www.allegromicro.com/en/products/sense/current-sensor-ics/zero-to-fifty-amp-integrated-conductor-sensor-ics/acs712",
    tags: ["5V", "アナログ", "ホール素子", "絶縁", "AC/DC"],
    seoKeywords: [
      "ACS712 Arduino 使い方",
      "電流センサー ホール素子",
      "ACS712 電流計測",
      "電流センサー 電子工作",
    ],
  },
  // ============================================================
  // 47. ZMPT101B AC電圧センサー (NEW)
  // ============================================================
  {
    id: "zmpt101b",
    name: "ZMPT101B AC電圧センサー",
    nameEn: "ZMPT101B AC Voltage Sensor Module",
    category: "sensor",
    subcategory: "電気計測",
    difficulty: 3,
    priceRange: "¥300〜600",
    specs: {
      "計測": "AC電圧（最大250V）",
      "変換比": "1000:1000（1:1変圧器）",
      "電源電圧": "5V",
      "出力": "アナログ（AC波形をスケールダウン）",
      "精度": "計測値の約±2%",
      "絶縁方式": "変圧器絶縁",
    },
    compatibleBoards: ["arduino-uno-r4-wifi", "esp32-devkitc", "m5stack-basic"],
    beginnerNote:
      "AC100V/200Vをマイコンで計測するためのモジュール。変圧器で絶縁されているため安全だが、AC高電圧を扱うので配線には十分注意が必要。電力モニタリングに。",
    dataSource: "ZMPT101B製品データシート",
    tags: ["5V", "アナログ", "AC電圧", "絶縁", "上級者向け"],
    seoKeywords: [
      "ZMPT101B Arduino 使い方",
      "AC電圧 センサー",
      "ZMPT101B 電圧計測",
      "家庭用電源 モニタリング 電子工作",
    ],
  },
  // ============================================================
  // 48. フレックスセンサー (NEW)
  // ============================================================
  {
    id: "flex-sensor",
    name: "フレックスセンサー",
    nameEn: "Flex Sensor 2.2\"",
    category: "sensor",
    subcategory: "その他",
    difficulty: 2,
    priceRange: "¥500〜1,000",
    specs: {
      "検知方式": "曲げによる抵抗変化",
      "フラット時抵抗": "約25kΩ",
      "90°曲げ時抵抗": "約50〜125kΩ",
      "長さ": "約56mm（2.2インチ）",
      "出力": "アナログ（分圧回路で読み取り）",
      "動作温度": "-35〜80℃",
      "寿命": "100万回以上（曲げ）",
    },
    compatibleBoards: ["arduino-uno-r4-wifi", "esp32-devkitc", "raspberry-pi-pico-w"],
    beginnerNote:
      "曲げると抵抗値が変化するセンサー。Spectrasymbol社が有名。グローブ型コントローラーやロボットの関節角度検出に使われる。分圧回路で使う。",
    dataSource: "Spectrasymbol Flex Sensor データシート",
    tags: ["アナログ", "分圧回路", "曲げ検出", "ウェアラブル"],
    seoKeywords: [
      "フレックスセンサー Arduino 使い方",
      "曲げセンサー 電子工作",
      "Flex Sensor Arduino",
      "グローブ コントローラー 自作",
    ],
  },
  // ============================================================
  // 49. FSR402 感圧センサー (NEW)
  // ============================================================
  {
    id: "fsr-402",
    name: "FSR402 感圧センサー",
    nameEn: "FSR402 Force Sensitive Resistor",
    category: "sensor",
    subcategory: "その他",
    difficulty: 1,
    priceRange: "¥300〜600",
    specs: {
      "検知方式": "圧力による抵抗変化",
      "検知範囲": "約0.1N〜10N",
      "無負荷時抵抗": ">10MΩ",
      "最大負荷時抵抗": "約200Ω",
      "感圧面積": "直径約12.7mm",
      "出力": "アナログ（分圧回路で読み取り）",
      "厚さ": "約0.3mm",
    },
    compatibleBoards: ["arduino-uno-r4-wifi", "esp32-devkitc", "raspberry-pi-pico-w"],
    beginnerNote:
      "押す力に応じて抵抗値が変化する薄いセンサー。圧力マットやタッチパネルの自作に使える。10kΩ程度の抵抗と分圧回路を組んで使う。",
    dataSource: "Interlink Electronics FSR 400シリーズ データシート",
    tags: ["アナログ", "分圧回路", "感圧", "初心者向け", "薄型"],
    seoKeywords: [
      "FSR402 Arduino 使い方",
      "感圧センサー 電子工作",
      "Force Sensitive Resistor Arduino",
      "圧力センサー 自作",
    ],
  },
  // ============================================================
  // 50. ロータリーエンコーダー (NEW)
  // ============================================================
  {
    id: "encoder-rotary",
    name: "ロータリーエンコーダー",
    nameEn: "Rotary Encoder Module (KY-040)",
    category: "sensor",
    subcategory: "その他",
    difficulty: 1,
    priceRange: "¥100〜300",
    specs: {
      "パルス数": "20パルス/回転",
      "出力": "デジタル（A相 + B相 + スイッチ）",
      "電源電圧": "3.3〜5V",
      "回転方向検出": "A/B相の位相差で判定",
      "プッシュスイッチ": "内蔵",
      "回転角度": "360°（無限回転）",
    },
    compatibleBoards: [
      "arduino-uno-r4-wifi",
      "esp32-devkitc",
      "raspberry-pi-pico-w",
      "raspberry-pi-5",
    ],
    beginnerNote:
      "回すと回転方向と量をデジタルで出力するダイヤル部品。メニュー操作や音量調整UIの作成に最適。A/B相の割り込み処理を学ぶ教材としても優秀。",
    dataSource: "KY-040ロータリーエンコーダーモジュール製品仕様",
    tags: ["3.3V", "5V", "デジタル", "A/B相", "プッシュスイッチ", "初心者向け"],
    seoKeywords: [
      "ロータリーエンコーダー Arduino 使い方",
      "KY-040 Arduino",
      "ロータリーエンコーダー 割り込み",
      "ダイヤル操作 電子工作",
    ],
  },
];
