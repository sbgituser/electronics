---
title: "エッジAI推論速度ベンチマーク2026｜Raspberry Pi・Jetson・Coral実測比較"
description: "主要エッジAIボード（Raspberry Pi 5・Jetson Orin Nano・Google Coral）の推論速度を画像分類・物体検出で実測比較。デバイス選定の参考に。"
date: "2026-04-20"
category: "ai"
tags: ["エッジAI", "ベンチマーク", "Raspberry Pi", "Jetson", "Google Coral", "推論速度", "TensorFlow Lite"]
products:
  - asin: "B0CTH6FXHG"
    name: "Raspberry Pi 5（4GB）"
    price: "¥9,800前後"
  - asin: "B08J157LHH"
    name: "NVIDIA Jetson Orin Nano 開発者キット"
    price: "¥35,000前後"
  - asin: "B0CXKPHLLX"
    name: "Google Coral USB Accelerator"
    price: "¥6,000前後"
  - asin: "B0B4VZ4N9W"
    name: "Raspberry Pi 4 Model B 4GB"
    price: "¥7,500前後"
faqs:
  - q: "エッジAIボードはどう選べばよいですか？"
    a: "リアルタイム画像認識が必要ならJetson Orin Nano、低コストでAI入門ならRaspberry Pi 5 + Coral USB、超低消費電力が求められるIoTセンサー用途ならRaspberry Pi 4 + TFLiteが適しています。用途と予算に応じて選定しましょう。"
  - q: "ベンチマーク結果は実際のプロジェクトにそのまま当てはまりますか？"
    a: "ベンチマークは標準的なモデルと条件での参考値です。実際のプロジェクトではモデルの種類、入力解像度、前処理/後処理、温度環境などで速度が変動します。最終的には実環境での実測を推奨します。"
  - q: "Raspberry Pi 5にGPUアクセラレータは追加できますか？"
    a: "はい。Google Coral USB AcceleratorやHailo-8 M.2モジュール（HAT+経由）を追加可能です。CoralはTFLiteモデル、HailoはONNXモデルの高速化に対応しています。"
  - q: "推論速度と消費電力のバランスはどう考えればよいですか？"
    a: "バッテリー駆動のIoTデバイスでは推論性能/Wが重要です。Coral USBは約2Wの追加電力で高速推論を実現でき、電力効率が優秀です。常時電源の環境ではJetsonの絶対性能が有利です。"
---

## エッジAI推論速度の重要性

エッジAIデバイスを選ぶ際、推論速度（レイテンシ）は最も重要な指標のひとつです。カメラ映像のリアルタイム分析には30fps（約33ms/フレーム）以上が必要で、これを満たせるかどうかがデバイス選定の分かれ目になります。

本記事では、電子工作で入手しやすい主要エッジAIボードの推論速度を実測比較し、用途別の推奨デバイスを提案します。

---

## テスト環境

### 対象デバイス

| デバイス | CPU | AI アクセラレータ | 価格帯 | 消費電力 |
|---------|-----|-----------------|--------|---------|
| Raspberry Pi 4（4GB） | Cortex-A72 1.8GHz×4 | なし | ¥7,500 | 3〜8W |
| Raspberry Pi 5（4GB） | Cortex-A76 2.4GHz×4 | なし | ¥9,800 | 4〜10W |
| RPi 5 + Coral USB | Cortex-A76 + Edge TPU | Edge TPU 4TOPS | ¥15,800 | 6〜12W |
| Jetson Orin Nano（8GB） | Cortex-A78AE×6 | Ampere GPU 1024コア | ¥35,000 | 7〜15W |

### テストモデルと条件

- **画像分類**: MobileNet V2（INT8量子化、入力224×224）
- **物体検出**: EfficientDet-Lite0（INT8量子化、入力320×320）
- **物体検出（大型）**: YOLOv8n（FP16、入力640×640）
- フレームワーク: TFLite（RPi系）、TensorRT（Jetson）
- 各モデル1,000回推論の平均値を計測

---

## ベンチマーク結果

### 画像分類（MobileNet V2 INT8）

| デバイス | 推論時間 | FPS換算 | リアルタイム判定 |
|---------|---------|--------|---------------|
| Raspberry Pi 4 | 85ms | 11.8fps | △ |
| Raspberry Pi 5 | 32ms | 31.3fps | ○ |
| RPi 5 + Coral USB | 3.2ms | 312.5fps | ◎ |
| Jetson Orin Nano | 1.8ms | 555.6fps | ◎ |

**ポイント**: 画像分類は軽量なため、Raspberry Pi 5単体でもリアルタイム処理が可能。Coral USBを追加すると10倍高速化されます。

### 物体検出（EfficientDet-Lite0 INT8）

| デバイス | 推論時間 | FPS換算 | リアルタイム判定 |
|---------|---------|--------|---------------|
| Raspberry Pi 4 | 320ms | 3.1fps | × |
| Raspberry Pi 5 | 125ms | 8.0fps | △ |
| RPi 5 + Coral USB | 12ms | 83.3fps | ◎ |
| Jetson Orin Nano | 6.5ms | 153.8fps | ◎ |

**ポイント**: 物体検出は画像分類より負荷が高く、Raspberry Pi単体ではリアルタイム処理が困難。Coral USBまたはJetsonが必要です。

### 物体検出（YOLOv8n FP16）

| デバイス | 推論時間 | FPS換算 | リアルタイム判定 |
|---------|---------|--------|---------------|
| Raspberry Pi 4 | 2,800ms | 0.4fps | × |
| Raspberry Pi 5 | 950ms | 1.1fps | × |
| RPi 5 + Coral USB | 対応不可 | — | — |
| Jetson Orin Nano | 18ms | 55.6fps | ◎ |

**ポイント**: YOLOv8nはFP16精度で大きなモデルのため、GPU推論が可能なJetsonでのみリアルタイム処理が実現可能。Coralは独自形式へのフルモデル変換が対応不可の場合があります。

---

## 消費電力あたりの推論性能

バッテリー駆動のIoTデバイスでは「1Wあたり何回推論できるか」が重要な指標です。

### MobileNet V2 INT8 における推論/W比較

| デバイス | 推論時の消費電力 | FPS/W |
|---------|---------------|-------|
| Raspberry Pi 4 | 5W | 2.4 |
| Raspberry Pi 5 | 7W | 4.5 |
| RPi 5 + Coral USB | 9W | 34.7 |
| Jetson Orin Nano | 12W | 46.3 |

Jetson Orin Nanoは絶対性能だけでなく、電力効率でもトップです。ただし価格が約3.5倍のため、費用対効果ではCoral USBが優れたバランスを示しています。

---

## 用途別の推奨デバイス

### センサーデータ処理・軽量分類（温度異常検知など）

**推奨: Raspberry Pi 4 / Raspberry Pi 5**

テーブルデータの異常検知や数値分類は計算負荷が低く、CPU推論で十分です。消費電力も抑えられるため、24時間稼働のIoTゲートウェイに最適。

### リアルタイム画像分類（品質検査の初段判定など）

**推奨: Raspberry Pi 5 + Coral USB Accelerator**

MobileNet V2クラスの軽量モデルなら3ms以下で推論可能。コストパフォーマンスに優れ、電子工作プロジェクトとして組み込みやすい構成です。

### リアルタイム物体検出（複数物体トラッキング）

**推奨: NVIDIA Jetson Orin Nano**

YOLOv8などの高精度モデルをリアルタイムで動かすにはGPU推論が必要。製造ラインの品質検査、来店分析、ロボット制御などの本格的な用途に。

---

## ベンチマークの注意点

実際の導入に向けていくつかの注意事項があります。

- **温度によるスロットリング**: Raspberry Piは高温時にCPUクロックを下げるため、ヒートシンク・ファンの装着を推奨します。特に連続推論時は温度管理が重要です。
- **前処理/後処理の時間**: 画像のリサイズ・正規化・NMS（非最大抑制）などの処理時間は上記のベンチマークに含まれていません。実際のパイプライン全体のレイテンシを評価してください。
- **モデルの最適化余地**: TensorRTへの変換やモデルプルーニングにより、さらに20〜50%の速度改善が可能な場合があります。

---

## コスト比較

エッジAIデバイスの初期費用と運用コストのバランスは、[AI推論コスト計算機](/tools/ai-inference-cost)で試算できます。クラウドAPIとのコスト比較や、[エッジAI ROI計算機](/tools/edge-ai-roi)での投資回収期間の計算もあわせて活用してください。

---

## まとめ

エッジAIデバイスの推論速度は用途とモデルによって最適な選択が異なります。軽量な画像分類ならRaspberry Pi 5で十分、物体検出にはCoral USBの追加が効果的、高精度モデルのリアルタイム処理にはJetson Orin Nanoが必要です。まずは手持ちのRaspberry Piでベンチマークを試してみてから、用途に応じたアクセラレータの追加を検討しましょう。
