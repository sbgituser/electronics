---
title: "モーター制御入門：ArduinoでDCモーター・サーボモーターを動かす"
description: "ArduinoでDCモーターとサーボモーターを制御する方法を解説。モータードライバの使い方から、サーボの角度制御まで初心者向けに丁寧に説明します。"
date: "2026-03-29"
category: "basics"
tags: ["モーター", "Arduino", "サーボモーター", "DCモーター", "電子工作"]
products:
  - asin: "B07Q5FC59L"
    name: "SG90 マイクロサーボモーター"
    price: "¥400前後"
  - asin: "B09BLXQ75H"
    name: "L298N モータードライバモジュール"
    price: "¥600前後"
  - asin: "B0C8V88Z1T"
    name: "Arduino Uno R4 WiFi"
    price: "¥3,500前後"
faqs:
  - q: "Arduinoに直接モーターをつなげますか？"
    a: "DCモーターは直接つなげません。ArduinoのピンはMAX40mAしか出力できないため、モータードライバIC（L298N等）が必要です。サーボモーターはArduinoのピンから直接制御できます（ただし電流消費に注意）。"
  - q: "サーボモーターSG90で制御できる角度は何度ですか？"
    a: "SG90は0°〜180°の範囲で制御できます。Arduinoのservo.write(角度)で簡単に位置を指定できます。"
  - q: "モーターが動かないとき、最初に確認することは何ですか？"
    a: "電源電圧と極性、配線の接続、ArduinoのPWMピンを使っているか確認してください。DCモーターは電流が大きいため、Arduinoとは別に外部電源を用意するのが基本です。"
  - q: "ステッピングモーターとサーボモーターはどう違いますか？"
    a: "サーボモーターは角度で制御し、軽量・低コストです。ステッピングモーターはステップ数で精密に位置制御でき、3Dプリンターや精密機械に使われます。"
---

## モーターの種類

電子工作・ロボット製作でよく使われるモーターには主に以下の種類があります。

| モーター種類 | 制御方式 | 特徴 | 主な用途 |
|------------|---------|------|---------|
| DCモーター | 電圧・PWMで回転速度制御 | 安価、高速回転 | ロボットカー、ファン |
| サーボモーター | PWMで角度制御 | 精密な角度制御が可能 | ロボットアーム、舵取り |
| ステッピングモーター | ステップ数で位置制御 | 精密な位置決め | 3Dプリンター、CNC |
| ブラシレスモーター | ESCで制御 | 高効率、高耐久 | ドローン、電動工具 |

Arduinoで最も扱いやすいのは**サーボモーター**と**DCモーター**です。本記事ではこの2種類を中心に解説します。

## DCモーターの制御

### なぜモータードライバが必要か

DCモーターを回転させるには比較的大きな電流が必要です（小型モーターでも100mA〜1A程度）。Arduino Uno のデジタルピンが出力できる電流はMAX 40mAに過ぎないため、**モータードライバIC**を介して制御する必要があります。

また、モーターは逆起電力（回転中に発生する逆方向の電圧）を発生させるため、これがArduinoのピンを破損させる原因になることがあります。モータードライバにはこれを保護するダイオードが内蔵されています。

### L298Nモータードライバモジュール

L298Nは2つのDCモーター（または1つのステッピングモーター）を制御できるモータードライバICです。¥600前後で購入でき、入門用として最もポピュラーです。

**L298Nの主なピン：**

| ピン名 | 機能 |
|--------|------|
| IN1, IN2 | モーターAの回転方向制御 |
| IN3, IN4 | モーターBの回転方向制御 |
| ENA | モーターAの速度制御（PWM） |
| ENB | モーターBの速度制御（PWM） |
| OUT1, OUT2 | モーターA出力 |
| OUT3, OUT4 | モーターB出力 |
| VCC（12V） | モーター電源（6〜35V） |
| 5V | 制御回路電源（5V） |
| GND | グラウンド |

**Arduinoとの接続：**

```
Arduino Pin 9  → L298N ENA
Arduino Pin 8  → L298N IN1
Arduino Pin 7  → L298N IN2
Arduino GND    → L298N GND
外部電源(9V)   → L298N VCC（12V端子）
```

```cpp
const int ENA = 9;   // PWMピン（スピード制御）
const int IN1 = 8;
const int IN2 = 7;

void setup() {
  pinMode(ENA, OUTPUT);
  pinMode(IN1, OUTPUT);
  pinMode(IN2, OUTPUT);
}

// 正転
void motorForward(int speed) {
  digitalWrite(IN1, HIGH);
  digitalWrite(IN2, LOW);
  analogWrite(ENA, speed);  // 0〜255
}

// 逆転
void motorBackward(int speed) {
  digitalWrite(IN1, LOW);
  digitalWrite(IN2, HIGH);
  analogWrite(ENA, speed);
}

// 停止
void motorStop() {
  digitalWrite(IN1, LOW);
  digitalWrite(IN2, LOW);
  analogWrite(ENA, 0);
}

void loop() {
  motorForward(200);   // 速度200で正転
  delay(2000);
  motorStop();
  delay(500);
  motorBackward(150);  // 速度150で逆転
  delay(2000);
  motorStop();
  delay(500);
}
```

## サーボモーターの制御

### サーボモーターとは

サーボモーターは、内部にギア・電位差計（ポテンショメーター）・制御回路が組み込まれており、指定した角度に精密に位置決めできるモーターです。PWM（パルス幅変調）信号の幅で角度を指定します。

一般的なサーボモーター（SG90など）の制御信号：
- パルス周期：20ms（50Hz）
- パルス幅 0.5ms → 0°
- パルス幅 1.5ms → 90°（中央）
- パルス幅 2.5ms → 180°

### ArduinoのServoライブラリ

ArduinoにはServoライブラリが標準搭載されており、複雑な計算なしにサーボを制御できます。

```cpp
#include <Servo.h>

Servo myServo;

void setup() {
  myServo.attach(9);  // 9番ピンにサーボを接続
}

void loop() {
  // 0°→180°まで1°ずつゆっくり回転
  for (int angle = 0; angle <= 180; angle++) {
    myServo.write(angle);
    delay(15);
  }

  // 180°→0°まで戻る
  for (int angle = 180; angle >= 0; angle--) {
    myServo.write(angle);
    delay(15);
  }
}
```

`myServo.write(角度)` に0〜180の値を渡すだけで角度制御ができます。これがサーボモーターをArduinoで扱う最大のメリットです。

### 複数のサーボモーターを制御する

Servoライブラリは最大12個のサーボを同時に制御できます。

```cpp
#include <Servo.h>

Servo servo1;
Servo servo2;
Servo servo3;

void setup() {
  servo1.attach(9);
  servo2.attach(10);
  servo3.attach(11);
}

void loop() {
  // 3軸ロボットアームの動き（例）
  servo1.write(90);   // 腰：90°
  servo2.write(45);   // 肩：45°
  servo3.write(120);  // 肘：120°
  delay(1000);

  servo1.write(0);
  servo2.write(90);
  servo3.write(90);
  delay(1000);
}
```

ただし複数のサーボを動かすと電流消費が増えます。3〜4個以上のサーボを使う場合は、Arduinoからではなく外部電源から直接サーボに電源を供給し、GNDのみArduinoと共通にする配線が推奨されます。

## ポテンショメーターでサーボを手動制御する

ポテンショメーター（可変抵抗）をアナログ入力に繋ぐことで、つまみを回してサーボの角度を手動で制御できます。

```cpp
#include <Servo.h>

Servo myServo;
const int POT_PIN = A0;  // ポテンショメーターをA0に接続

void setup() {
  myServo.attach(9);
}

void loop() {
  int potValue  = analogRead(POT_PIN);       // 0〜1023
  int angle     = map(potValue, 0, 1023, 0, 180);  // 0〜180に変換
  myServo.write(angle);
  delay(15);
}
```

`map()` 関数は値の範囲を変換する便利な関数です。ここではanalogRead()の値（0〜1023）をサーボの角度範囲（0〜180）に変換しています。

## ステッピングモーター入門

ステッピングモーターはパルス信号1つに対して一定の角度（ステップ角）だけ回転します。フィードバックなしで精密な位置決めができるため、3Dプリンターや精密機械に多用されます。

一般的な28BYJ-48（ULN2003ドライバ付き）は入門用ステッピングモーターとして定番です。

```cpp
#include <Stepper.h>

const int STEPS_PER_REV = 2048;  // 28BYJ-48の場合
Stepper myStepper(STEPS_PER_REV, 8, 10, 9, 11);

void setup() {
  myStepper.setSpeed(10);  // 10 RPM
}

void loop() {
  myStepper.step(STEPS_PER_REV);   // 1回転（時計回り）
  delay(500);
  myStepper.step(-STEPS_PER_REV);  // 1回転（反時計回り）
  delay(500);
}
```

## モーター選びのポイント

| 用途 | 推奨モーター | 理由 |
|------|------------|------|
| ロボットカー | DCモーター＋L298N | 安価、速度制御が容易 |
| ロボットアーム | サーボモーター | 角度制御が簡単 |
| 3Dプリンター | ステッピングモーター | 精密な位置決め |
| ドローン | ブラシレスモーター | 高効率、高速回転 |
| カメラ雲台 | サーボモーター | 小型・軽量 |

## まとめ

モーター制御の要点をまとめます。

- DCモーターはモータードライバ（L298N等）が必須
- サーボモーターはServoライブラリで簡単に角度制御できる
- モーターの電源はArduinoとは別に外部電源を用意する
- 複数のサーボを使う場合は電源容量に注意する
- ステッピングモーターは精密位置制御が必要な場合に選ぶ

モーター制御を組み合わせてロボットを作ってみたい方は[IoTプロジェクト入門](/articles/iot-project-basics)も参考にしてください。

## よくある質問

**Q. Arduinoに直接モーターをつなげますか？**

DCモーターは直接つなげません。ArduinoのピンはMAX40mAしか出力できないため、モータードライバIC（L298N等）が必要です。サーボモーターはArduinoのピンから直接制御できます（ただし電流消費に注意）。

**Q. サーボモーターSG90で制御できる角度は何度ですか？**

SG90は0°〜180°の範囲で制御できます。Arduinoのservo.write(角度)で簡単に位置を指定できます。

**Q. モーターが動かないとき、最初に確認することは何ですか？**

電源電圧と極性、配線の接続、ArduinoのPWMピンを使っているか確認してください。DCモーターは電流が大きいため、Arduinoとは別に外部電源を用意するのが基本です。

**Q. ステッピングモーターとサーボモーターはどう違いますか？**

サーボモーターは角度で制御し、軽量・低コストです。ステッピングモーターはステップ数で精密に位置制御でき、3Dプリンターや精密機械に使われます。
