---
title: "TensorFlow LiteでRaspberry Pi AI入門｜機械学習モデルをエッジで動かす方法"
description: "Raspberry PiでTensorFlow Liteを使って画像分類・物体検出を動かす入門ガイド。環境構築からモデル変換・量子化・推論実行まで実践的に解説します。"
date: "2026-04-20"
category: "ai"
tags: ["TensorFlow Lite", "Raspberry Pi", "機械学習", "エッジAI", "画像分類", "物体検出", "Python"]
products:
  - asin: "B0CTH6FXHG"
    name: "Raspberry Pi 5（4GB）"
    price: "¥9,800前後"
  - asin: "B07RDPF5D2"
    name: "Raspberry Pi Camera Module 3"
    price: "¥3,500前後"
  - asin: "B07BDHDYZY"
    name: "Samsung microSDカード 32GB"
    price: "¥1,200前後"
  - asin: "B0CXKPHLLX"
    name: "Google Coral USB Accelerator"
    price: "¥6,000前後"
faqs:
  - q: "TensorFlow LiteとTensorFlowの違いは何ですか？"
    a: "TensorFlowはPC/サーバー向けの機械学習フレームワークで、TensorFlow Lite（TFLite）はそのモデルをモバイル・エッジデバイス向けに軽量化したランタイムです。モデルサイズが1/4程度に圧縮され、Raspberry Piのような低スペック機器でも推論を実行できます。"
  - q: "Raspberry Pi 4でもTFLiteは動きますか？"
    a: "はい、Raspberry Pi 4でもTFLiteは動作します。ただしRaspberry Pi 5の方がCPU性能が約2倍高く、推論速度も向上します。また、Google Coral USB Acceleratorを追加するとさらに10〜20倍高速化できます。"
  - q: "自分で学習したモデルもTFLiteに変換できますか？"
    a: "はい。TensorFlow/Kerasで学習したモデルはTFLiteConverterで変換できます。PyTorchモデルの場合はONNX経由でTFLiteに変換するか、ONNX Runtimeを直接使うこともできます。"
  - q: "量子化するとどのくらい精度が落ちますか？"
    a: "INT8量子化で一般的な画像分類モデルの精度低下は0.5〜2%程度です。多くのユースケースで実用上問題ないレベルですが、精度が重要な場合は検証データでの評価を推奨します。"
---

## TensorFlow Liteとは

TensorFlow Lite（TFLite）は、Googleが開発したモバイル・エッジデバイス向けの軽量機械学習推論フレームワークです。PC上で学習した大きなAIモデルを、Raspberry Piのような小型デバイスでも動作する形式に変換して実行できます。

電子工作でAIを組み込みたい場合、TFLiteは最も手軽な選択肢のひとつです。Python数行で推論を実行でき、カメラモジュールと組み合わせればリアルタイム画像認識も実現できます。

---

## 必要な部品と費用

| パーツ | 用途 | 目安価格 |
|--------|------|---------|
| Raspberry Pi 5（4GB） | メインボード | ¥9,800 |
| microSDカード（32GB以上） | OSとモデル保存 | ¥1,200 |
| Raspberry Pi Camera Module 3 | 画像入力用 | ¥3,500 |
| USB電源アダプタ（5V/3A） | 電源 | ¥1,500 |
| Google Coral USB Accelerator（任意） | 推論高速化 | ¥6,000 |

**基本構成の合計: 約16,000円**（Coral無しの場合）

---

## 環境構築

### 1. Raspberry Pi OSのセットアップ

Raspberry Pi Imagerで最新のRaspberry Pi OS（64bit）をmicroSDに書き込みます。初回起動後、ターミナルでシステムを更新します。

```bash
sudo apt update && sudo apt upgrade -y
```

### 2. TFLite Runtimeのインストール

```bash
pip install tflite-runtime
```

`tflite-runtime`はTensorFlow全体をインストールするよりもはるかに軽量で、推論実行に必要な機能のみを含んでいます。

### 3. カメラモジュールの有効化

Raspberry Pi 5ではlibcamera経由でカメラにアクセスします。

```bash
sudo apt install -y python3-picamera2
```

---

## TFLiteモデルの基本的な推論

### 画像分類（MobileNet V2）の実行例

学習済みのMobileNet V2モデルを使って画像分類を行う基本コードです。

```python
import numpy as np
from tflite_runtime.interpreter import Interpreter
from PIL import Image

# モデルのロード
interpreter = Interpreter(model_path="mobilenet_v2.tflite")
interpreter.allocate_tensors()

# 入力テンソル情報の取得
input_details = interpreter.get_input_details()
output_details = interpreter.get_output_details()

# 画像の前処理
img = Image.open("test.jpg").resize((224, 224))
input_data = np.expand_dims(np.array(img, dtype=np.uint8), axis=0)

# 推論実行
interpreter.set_tensor(input_details[0]["index"], input_data)
interpreter.invoke()

# 結果取得
output_data = interpreter.get_tensor(output_details[0]["index"])
predicted_class = np.argmax(output_data)
print(f"予測クラス: {predicted_class}")
```

Raspberry Pi 5（CPU）での推論時間は約30〜80ms/枚です。

---

## モデルの変換と量子化

### TFLiteへの変換

TensorFlow/Kerasで学習したモデルをTFLite形式に変換します。

```python
import tensorflow as tf

converter = tf.lite.TFLiteConverter.from_saved_model("saved_model_dir")
tflite_model = converter.convert()

with open("model.tflite", "wb") as f:
    f.write(tflite_model)
```

### INT8量子化で高速化

量子化により、モデルサイズが約1/4に圧縮され、推論速度が2〜3倍向上します。

```python
converter = tf.lite.TFLiteConverter.from_saved_model("saved_model_dir")
converter.optimizations = [tf.lite.Optimize.DEFAULT]

def representative_data_gen():
    for img in calibration_images:
        yield [np.expand_dims(img, axis=0).astype(np.float32)]

converter.representative_dataset = representative_data_gen
converter.target_spec.supported_ops = [tf.lite.OpsSet.TFLITE_BUILTINS_INT8]
converter.inference_input_type = tf.uint8
converter.inference_output_type = tf.uint8

quantized_model = converter.convert()
```

### 量子化の効果（Raspberry Pi 5、MobileNet V2）

| モード | モデルサイズ | 推論時間 | 精度低下 |
|--------|------------|---------|---------|
| Float32（元モデル） | 14MB | 約80ms | — |
| INT8量子化 | 3.5MB | 約30ms | 約0.8% |
| INT8 + Coral USB | 3.5MB | 約5ms | 約0.8% |

---

## カメラと組み合わせたリアルタイム推論

Picamera2とTFLiteを組み合わせると、カメラ映像に対してリアルタイムで画像分類を実行できます。

```python
from picamera2 import Picamera2
from tflite_runtime.interpreter import Interpreter
import numpy as np

picam2 = Picamera2()
picam2.start()

interpreter = Interpreter(model_path="mobilenet_v2_quant.tflite")
interpreter.allocate_tensors()
input_details = interpreter.get_input_details()
output_details = interpreter.get_output_details()

while True:
    frame = picam2.capture_array()
    # リサイズと前処理
    img = np.array(
        Image.fromarray(frame).resize((224, 224)),
        dtype=np.uint8
    )
    input_data = np.expand_dims(img, axis=0)

    interpreter.set_tensor(input_details[0]["index"], input_data)
    interpreter.invoke()

    output = interpreter.get_tensor(output_details[0]["index"])
    print(f"クラス: {np.argmax(output)}, 確信度: {np.max(output):.2f}")
```

---

## TFLite vs ONNX Runtime：どちらを選ぶ？

| 比較項目 | TFLite | ONNX Runtime |
|---------|--------|-------------|
| 元フレームワーク | TensorFlow/Keras | PyTorch・多フレームワーク |
| Raspberry Pi対応 | ◎ | ◎ |
| Jetson GPU対応 | △ | ◎（TensorRT連携） |
| マイコン対応 | ◎（TFLite Micro） | △ |
| 量子化 | ◎ | ○ |
| コミュニティ | 大規模 | 成長中 |

**判断基準**: TensorFlow/Kerasでモデルを学習し、Raspberry PiやCoral TPUで動かすならTFLite。PyTorchモデルをJetsonで動かすならONNX Runtime + TensorRTが最適です。

---

## 応用プロジェクト例

TFLite × Raspberry Piで実現できるプロジェクトをいくつか紹介します。

- **自動ペット見守りカメラ**: ペットの行動を画像分類で検知し、LINEに通知
- **来客カウンター**: 玄関カメラで人物検出し、入退室回数を記録
- **家庭菜園AIモニター**: 植物の葉の画像から病害を検出
- **ゴミ分別判定器**: カメラで撮影した廃棄物の素材を分類

いずれも学習済みモデル（MobileNet、EfficientDet-Lite）をベースに転移学習することで、少ないデータ（数百枚）から実用レベルのモデルを構築できます。

---

## コスト試算

TFLiteでエッジAI推論を行う場合のコストは、[AI推論コスト計算機](/tools/ai-inference-cost)で試算できます。クラウドAPIとの費用比較を行い、エッジ化の費用対効果を事前に把握してから構築を進めましょう。

---

## まとめ

TensorFlow Liteは、Raspberry Piで機械学習を始めるための最もアクセスしやすいフレームワークです。Python環境のセットアップからモデルの変換・量子化・リアルタイム推論まで、電子工作の知識と組み合わせることで実用的なAIデバイスを構築できます。まずは学習済みモデルで動作確認し、慣れたら独自モデルの学習にも挑戦してみてください。
