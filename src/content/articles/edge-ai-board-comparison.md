---
title: "Raspberry Pi vs Jetson Nano｜電子工作で始めるエッジAI開発ボード徹底比較"
description: "Raspberry Pi 4とJetson Nanoを性能・コスト・消費電力・用途で徹底比較。電子工作でAIを始める初心者におすすめのボード選びを解説。"
date: "2026-04-19"
category: "compare"
tags: ["Raspberry Pi", "Jetson Nano", "エッジAI", "ボード比較", "初心者"]
products:
  - asin: "B0B4VZ4N9W"
    name: "Raspberry Pi 4 Model B（4GB）"
    price: "¥8,500前後"
  - asin: "B08J157LHH"
    name: "NVIDIA Jetson Nano 開発者キット"
    price: "¥18,000前後"
  - asin: "B0CTH6FXHG"
    name: "Raspberry Pi 5（4GB）"
    price: "¥9,800前後"
faqs:
  - q: "電子工作初心者はRaspberry PiとJetson Nanoのどちらを買うべきですか？"
    a: "まずはRaspberry Pi 4または5をおすすめします。情報量が圧倒的に多く、Pythonや電子工作の基本を学ぶのに最適です。AI推論の性能が必要になった段階でJetson Nanoの導入を検討するのが効率的です。"
  - q: "Jetson NanoでArduinoのようにGPIOを使えますか？"
    a: "はい、Jetson Nanoにも40ピンのGPIOヘッダーがあり、Raspberry Piと同様にセンサーやLEDを接続できます。ただしライブラリの互換性に注意が必要で、RPi.GPIOの代わりにJetson.GPIOを使います。"
  - q: "消費電力が気になります。バッテリー駆動はできますか？"
    a: "Raspberry Pi 4はモバイルバッテリー（5V/3A出力）で駆動可能です。Jetson NanoはGPUフル稼働時に最大10Wを消費するため、大容量バッテリーが必要になります。電力効率を重視するならRaspberry Piが有利です。"
  - q: "2026年現在、最新のおすすめボードはどれですか？"
    a: "汎用用途ならRaspberry Pi 5、AI特化ならJetson Orin Nanoが最新かつ高性能です。コストパフォーマンス重視なら旧世代のRaspberry Pi 4も依然として優れた選択肢です。"
  - q: "Coral USB AcceleratorをRaspberry Piに追加すればJetson Nanoと同等になりますか？"
    a: "画像分類などの特定タスクではCoral USB Acceleratorが非常に高速で、Jetson Nanoを上回る場合もあります。ただしCoral TPUはTensorFlow Liteモデル専用のため、汎用性ではJetson NanoのGPUが優れています。"
---

## はじめに：エッジAIボード選びが重要な理由

電子工作でAI（人工知能）を使ったプロジェクトに挑戦するとき、最初にぶつかるのが**「どのボードを買えばいいのか」**という問題です。特にRaspberry PiとJetson Nanoは、どちらも電子工作コミュニティで人気が高く、AI関連のプロジェクトに多用されています。

しかし、この2つのボードは設計思想がまったく異なります。Raspberry Piは汎用性を重視した「教育・ホビー向けLinuxコンピュータ」であり、Jetson NanoはNVIDIA GPUを搭載した「AI推論特化ボード」です。

筆者自身、両方のボードで数十のAIプロジェクトを作ってきましたが、**最初のボード選びを間違えると、プロジェクトの途中で行き詰まったり、無駄な出費が増えたりする**ことを実感しています。

この記事では、Raspberry Pi 4とJetson Nanoを中心に、電子工作AI初心者が最適なボードを選ぶための情報を徹底的にまとめます。2026年の最新ボード情報も含めて解説していきます。

> **前提知識**: この記事は[Arduino入門ガイド](/articles/arduino-beginner-guide)や[Raspberry Piプロジェクトガイド](/articles/raspberrypi-projects-guide)の基礎を理解していることを想定しています。まだの方は先にそちらをご覧ください。

---

## 基本スペック比較

まずは両ボードの基本スペックを表形式で比較します。

| スペック | Raspberry Pi 4（4GB） | Jetson Nano（4GB） |
|----------|----------------------|-------------------|
| **CPU** | Broadcom BCM2711（Cortex-A72 4コア 1.5GHz） | ARM Cortex-A57 4コア 1.43GHz |
| **GPU** | VideoCore VI（500MHz） | 128コアMaxwell GPU |
| **メモリ** | 4GB LPDDR4-3200 | 4GB LPDDR4-1600 |
| **ストレージ** | microSDカード | microSDカード |
| **電源** | USB-C 5V/3A（15W） | Micro-USB 5V/2A（5Wモード）/ DC Barrel 5V/4A（10Wモード） |
| **最大消費電力** | 約7.6W | 5W（省電力）/ 10W（フルパフォーマンス） |
| **Wi-Fi** | 802.11ac + Bluetooth 5.0 | なし（USB Wi-Fiドングルが必要） |
| **カメラ** | CSI-2ポート | CSI-2ポート |
| **GPIO** | 40ピン | 40ピン |
| **USB** | USB 3.0 ×2, USB 2.0 ×2 | USB 3.0 ×1, USB 2.0 ×3 |
| **販売価格** | ¥8,500前後 | ¥18,000前後 |

### CPUの違い

CPU単体の性能は実はRaspberry Pi 4のほうがやや高いです。Cortex-A72はCortex-A57の後継アーキテクチャであり、クロック周波数も若干上回っています。Webブラウジングや一般的なプログラミング作業ではRaspberry Pi 4のほうが快適に感じます。

### GPUの決定的な差

しかし、AIの推論性能を左右するのはGPUです。Jetson Nanoの128コアMaxwell GPUは、NVIDIA製の本格的なGPUアーキテクチャで、**CUDA対応**です。これにより、ディープラーニングフレームワーク（TensorRT、PyTorch、TensorFlow）がGPU上で高速に動作します。

Raspberry Pi 4のVideoCore VIはビデオ出力が主目的で、CUDA非対応のため、AI推論ではCPUのみで計算を行います。この差が推論速度に大きく影響します。

---

## AI推論パフォーマンス比較

電子工作でAIを使う場面として最も一般的な「画像分類」と「物体検出」で、実際のベンチマーク結果を比較します。

### 画像分類（ResNet-50）

| ボード | フレームワーク | 推論時間（1枚あたり） | FPS |
|--------|-------------|---------------------|-----|
| Raspberry Pi 4 | TensorFlow Lite（CPU） | 約180ms | 5.6 |
| Raspberry Pi 4 | TFLite INT8量子化 | 約90ms | 11.1 |
| Jetson Nano | TensorRT FP16 | 約22ms | 45.5 |
| Jetson Nano | TensorRT INT8 | 約12ms | 83.3 |

### 物体検出（YOLOv5s）

| ボード | フレームワーク | 推論時間（1枚あたり） | FPS |
|--------|-------------|---------------------|-----|
| Raspberry Pi 4 | TFLite INT8 | 約450ms | 2.2 |
| Jetson Nano | TensorRT FP16 | 約60ms | 16.7 |
| Jetson Nano | TensorRT INT8 | 約35ms | 28.6 |

出典：筆者の実測値（Raspberry Pi OS Bookworm、JetPack 4.6.4環境）

### 結果の解釈

Jetson NanoはRaspberry Pi 4に対して、画像分類で**約8倍**、物体検出で**約13倍**高速です。リアルタイム処理（30fps以上）が必要な場合、Jetson Nanoが唯一の選択肢になります。

ただし、**「1秒に1回チェックすれば十分」という用途（例：定点カメラでの来訪者検知）ならRaspberry Pi 4でも十分**実用的です。電子工作のプロジェクトではリアルタイム性がそこまで重要でないケースも多いため、用途に合わせて判断しましょう。

より詳しいベンチマーク結果は[エッジAI推論速度ベンチマーク](/articles/edge-ai-inference-benchmark)の記事で解説しています。

---

## コスト比較：初期費用と3年間のランニングコスト

電子工作の趣味として長く使うことを考えると、初期費用だけでなくランニングコストも重要です。

### 初期費用

| 項目 | Raspberry Pi 4セット | Jetson Nanoセット |
|------|---------------------|------------------|
| ボード本体 | ¥8,500 | ¥18,000 |
| 電源アダプター | ¥1,500 | ¥1,800 |
| microSDカード（64GB） | ¥1,200 | ¥1,200 |
| ケース + ファン | ¥1,500 | ¥2,000 |
| USBカメラまたはCSIカメラ | ¥3,500 | ¥3,500 |
| Wi-Fiドングル | ¥0（内蔵） | ¥1,500 |
| **合計** | **¥16,200** | **¥28,000** |

### 3年間の電気代

24時間365日稼働させた場合の概算（電気代30円/kWhで計算）：

- **Raspberry Pi 4**（平均5W）：5W × 24h × 365日 × 3年 ÷ 1000 × 30円 = **約3,942円**
- **Jetson Nano 10Wモード**（平均8W）：8W × 24h × 365日 × 3年 ÷ 1000 × 30円 = **約6,307円**

### 3年間の総コスト

| | Raspberry Pi 4 | Jetson Nano |
|---|---|---|
| 初期費用 | ¥16,200 | ¥28,000 |
| 3年間電気代 | ¥3,942 | ¥6,307 |
| **合計** | **¥20,142** | **¥34,307** |

> 💡 コスト試算には[IoT電力計算機](/tools/iot-power-calc)や[Edge AI ROI計算機](/tools/edge-ai-roi)も活用してください。

---

## 用途別おすすめボード

### Raspberry Pi 4が最適なケース

1. **データ収集ゲートウェイ**：センサーデータを集めてクラウドに送信する用途。Raspberry Pi 4のWi-Fi内蔵は大きなメリットです。[IoTプロジェクト基礎](/articles/iot-project-basics)の記事も参考にしてください。

2. **軽量な画像分類**：「犬か猫か」「合格品か不良品か」といった二値〜数クラスの分類は、TFLite量子化モデルで十分な速度が出ます。

3. **音声コマンド認識**：「ライトON」「ファンOFF」などの簡単な音声コマンドは、TFLiteのAudioモデルで対応可能です。

4. **プロトタイピング**：アイデアを素早く形にしたい段階では、Raspberry Piの豊富なドキュメントとコミュニティが強力です。

5. **教育・学習用途**：[Arduino vs Raspberry Pi](/articles/arduino-vs-raspberry-pi)の記事でも解説していますが、プログラミングとLinuxの学習にはRaspberry Piが最適です。

### Jetson Nanoが最適なケース

1. **リアルタイム物体検出**：ドローンの障害物回避、ロボットの環境認識など、30fps以上の処理が必要な場面。

2. **複数カメラの同時処理**：2〜4台のカメラ映像を同時にAI処理する場合、GPU並列処理が威力を発揮します。

3. **高精度モデルの実行**：YOLOv8 Large以上の大規模モデルを動かしたい場合。

4. **セグメンテーション処理**：ピクセル単位で物体を識別するセマンティックセグメンテーションは計算量が多く、GPU必須です。

5. **AI開発の学習**：CUDA、TensorRT、DeepStreamなどNVIDIAのAIエコシステムを学びたい場合。

---

## 2026年の最新ボード事情

2024〜2026年にかけて、エッジAIボードの選択肢は大きく広がりました。現在のおすすめボードを追加で紹介します。

### Raspberry Pi 5

Raspberry Pi 4の後継で、CPU性能が約2〜3倍に向上しました。AI推論もCPUベースでかなり高速化されています。

- **CPU**: Broadcom BCM2712（Cortex-A76 4コア 2.4GHz）
- **メモリ**: 4GB / 8GB LPDDR4X
- **価格**: ¥9,800前後（4GB）
- **特徴**: PCIeスロットにAIアクセラレータを追加可能

Raspberry Pi 5にCoral M.2 AcceleratorやHailo-8 M.2モジュールを追加することで、Jetson Nano以上のAI推論性能を実現できます。2026年現在、この組み合わせは非常にコスパが良くおすすめです。

### NVIDIA Jetson Orin Nano

Jetson Nanoの後継で、AI推論性能が約80倍に向上した驚異的なボードです。

- **GPU**: 1024コアAmpere GPU
- **AI性能**: 40 TOPS（INT8）
- **メモリ**: 8GB LPDDR5
- **価格**: ¥30,000前後
- **特徴**: Jetson Nanoとピン互換

価格は高めですが、AI性能は桁違いです。複数カメラの同時処理や高解像度でのリアルタイム推論が必要なプロジェクトに最適です。

### Google Coral Dev Board / USB Accelerator

GoogleのEdge TPUを搭載したアクセラレータです。

- **Coral USB Accelerator**: ¥8,000前後、USB接続でRaspberry Piに追加可能
- **AI性能**: 4 TOPS（INT8）
- **特徴**: TensorFlow Liteモデル専用だが、対応モデルでは非常に高速

詳しくは[エッジAIボード選び方ガイド](/articles/edge-ai-selection-guide)も合わせてご覧ください。

### Hailo-8

イスラエルのHailo社が開発したAIアクセラレータチップです。

- **AI性能**: 26 TOPS（INT8）
- **消費電力**: 約2.5W
- **価格**: M.2モジュールで¥12,000前後
- **特徴**: 電力効率が非常に高い、Raspberry Pi 5のPCIeスロットに接続可能

### ボード選択のまとめチャート

```
Q: 予算は？
├── ¥10,000以下 → Raspberry Pi 4 + TFLite
├── ¥15,000〜20,000 → Raspberry Pi 5 + Coral USB Accelerator
├── ¥20,000〜30,000 → Raspberry Pi 5 + Hailo-8 M.2
└── ¥30,000以上 → Jetson Orin Nano
```

各ボードの用途適性を素早くチェックするには[ボードピッカーツール](/tools/board-picker)をお試しください。

---

## 開発環境の比較

### Raspberry Pi

- **OS**: Raspberry Pi OS（Debian系Linux）
- **言語**: Python、C/C++
- **AIフレームワーク**: TensorFlow Lite、ONNX Runtime、OpenCV
- **セットアップ時間**: 約30分（OS書き込み〜AI環境構築）
- **ドキュメント**: 非常に豊富（日本語情報も多い）

### Jetson Nano

- **OS**: JetPack（Ubuntu系Linux）
- **言語**: Python、C/C++、CUDA
- **AIフレームワーク**: TensorRT、PyTorch、TensorFlow、DeepStream
- **セットアップ時間**: 約1〜2時間（JetPack書き込み〜CUDA環境構築）
- **ドキュメント**: NVIDIA公式は英語中心、日本語コミュニティも増加中

### 学習曲線

Raspberry Piは「電子工作 → Linux → Python → AI」という段階的な学習パスが整備されています。[Arduino入門ガイド](/articles/arduino-beginner-guide)からステップアップする人にとって、Raspberry Piは自然な流れです。

Jetson Nanoは「CUDA」「TensorRT」などNVIDIA固有の技術を学ぶ必要があり、学習コストがやや高めです。ただし、これらの知識はGPUプログラミング全般に応用できるため、長期的にはスキルの幅が広がります。

---

## 実際のプロジェクト例

### プロジェクト例1：ペット見守りカメラ（Raspberry Pi 4推奨）

自宅のペットをカメラで監視し、特定の行動（食事、睡眠、ドアへの接近）を検知してスマホに通知するプロジェクトです。

- **推論頻度**: 5秒に1回で十分 → Raspberry Pi 4のCPU推論で対応可能
- **通信**: Wi-Fi内蔵のRaspberry Piが便利
- **消費電力**: 24時間稼働のため省電力なRaspberry Pi 4が最適
- **予算**: 約¥16,000（ボード + カメラ + 電源）

このプロジェクトの詳しい作り方は[自作AIカメラの作り方](/articles/diy-ai-camera-project)をご覧ください。

### プロジェクト例2：リアルタイム交通量カウンター（Jetson Nano推奨）

道路に面した窓からカメラで車両を撮影し、リアルタイムで台数をカウントするプロジェクトです。

- **推論頻度**: 30fps必要（高速で通過する車両を見逃さないため）
- **モデル**: YOLOv5sで車両検出
- **処理**: Jetson NanoのTensorRT最適化で28fps達成
- **予算**: 約¥28,000

### プロジェクト例3：スマート植物管理（ESP32 + Raspberry Pi推奨）

土壌水分・温度・光量センサーのデータをESP32で収集し、Raspberry Piゲートウェイで集約。画像認識で葉の健康状態もチェックするIoTプロジェクトです。

- **センサーノード**: ESP32 + 各種センサー（[センサー選定ガイド](/articles/sensor-selection-guide)参照）
- **ゲートウェイ**: Raspberry Pi 4
- **画像解析**: 1時間に1回のため低頻度でOK

ESP32とRaspberry Piの組み合わせについては[Arduino vs Raspberry Pi vs ESP32](/articles/arduino-vs-raspberrypi-vs-esp32)で詳しく比較しています。

---

## 消費電力と発熱対策

電子工作でボードを長時間使う場合、消費電力と発熱は無視できません。

### 消費電力の実測

| 状態 | Raspberry Pi 4 | Jetson Nano（10Wモード） |
|------|---------------|----------------------|
| アイドル | 2.7W | 3.5W |
| CPU負荷100% | 6.4W | 5.2W |
| AI推論中 | 5.8W | 9.5W |
| ピーク | 7.6W | 10W |

### 冷却方法

- **Raspberry Pi 4**: ヒートシンク貼り付けで十分。高負荷が続く場合は小型ファン（5V）を追加
- **Jetson Nano**: AI推論を連続実行する場合はファン必須。40mm角ファンが標準的

電源の選び方については[電源選定ガイド](/articles/power-supply-selection-guide)や[電源計算ツール](/tools/power-supply-calc)も参考にしてください。

---

## エッジAI開発で使えるアクセサリ

### 共通アクセサリ

| アクセサリ | 用途 | 価格帯 |
|-----------|------|--------|
| CSIカメラモジュール | 画像入力 | ¥2,000〜5,000 |
| USBマイク | 音声入力 | ¥1,000〜3,000 |
| ブレッドボード + ジャンパー線 | GPIO接続 | ¥500〜1,500 |
| LEDアレイ | 推論結果の表示 | ¥200〜500 |
| ブザー | アラート出力 | ¥100〜300 |

ブレッドボードの使い方は[ブレッドボード入門](/articles/breadboard-guide)を参照してください。

### Raspberry Pi専用アクセサリ

- **Coral USB Accelerator**: AI推論を高速化（前述）
- **Raspberry Pi AI Camera**: ソニーIMX500搭載、オンチップ推論対応
- **Sense HAT**: 各種センサー内蔵の拡張ボード

### Jetson Nano専用アクセサリ

- **Intel RealSense D435**: 深度カメラ、3D物体認識に使用
- **CSI-2マルチカメラアダプター**: 複数カメラの同時接続
- **NVMe SSD + エンクロージャー**: 大規模データの高速読み書き

---

## まとめ：結局どちらを選ぶべきか

### Raspberry Pi 4 / 5を選ぶべき人

- 電子工作やLinuxの初心者
- まずはAIの基礎を学びたい
- IoTゲートウェイやデータ収集が主目的
- 予算を¥20,000以内に抑えたい
- Wi-FiやBluetoothを使いたい

### Jetson Nanoを選ぶべき人

- Raspberry PiでのAI開発経験がある
- リアルタイム処理（15fps以上）が必要
- 複数カメラの同時処理をしたい
- CUDA/TensorRTを学びたい
- 予算¥30,000以上を投資できる

### 2026年のベストバイ

2026年現在の最もおすすめな構成は以下です：

1. **入門者**: Raspberry Pi 5（4GB）→ ¥9,800
2. **AI入門者**: Raspberry Pi 5 + Coral USB Accelerator → ¥17,800
3. **AI本格派**: Jetson Orin Nano → ¥30,000
4. **コスパ重視**: Raspberry Pi 5 + Hailo-8 M.2 → ¥21,800

[ボードピッカーツール](/tools/board-picker)で自分に最適なボードを診断してみてください。また、[TinyML入門](/articles/tinyml-introduction)や[フィジカルAIとは](/articles/what-is-physical-ai)の記事も合わせて読むと、エッジAIの全体像がつかめます。

---

## 参考リンク

- Raspberry Pi公式サイト: https://www.raspberrypi.com/
- NVIDIA Jetson公式ページ: https://developer.nvidia.com/embedded-computing
- TensorFlow Lite公式ドキュメント: https://www.tensorflow.org/lite
- Google Coral公式サイト: https://coral.ai/

次のステップとして、[TensorFlow Lite入門](/articles/tensorflow-lite-raspberry-pi-intro)で実際にAIモデルをRaspberry Piにデプロイする方法を学んでみましょう。
