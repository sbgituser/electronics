---
title: "Raspberry PiでAI画像認識を始める方法【初心者向け】"
description: "Raspberry Pi 5とカメラモジュールを使い、TensorFlow Liteで画像認識を試してみました。セットアップから動作確認まで解説します。"
date: "2026-03-25"
category: "project"
tags: ["Raspberry Pi", "AI", "画像認識", "TensorFlow Lite", "Python"]
products:
  - asin: "B0CTH6FXHG"
    name: "Raspberry Pi 5（4GB）"
    price: "¥9,800前後"
  - asin: "B07G44BW9W"
    name: "Raspberry Pi カメラモジュール V2"
    price: "¥3,500前後"
---

「Raspberry Piで画像認識をやってみたい」

そう思ってはいたものの、「難しそう」と後回しにしていました。しかし実際にやってみると、意外と短時間でできてしまいました。

この記事では、[Raspberry Pi 5](/tools/parts-database/raspberry-pi-5)とカメラモジュールを使って、TensorFlow Liteで物体認識を試した手順をまとめます。

---

## 必要なもの

- Raspberry Pi 5（4GB以上推奨）
- Raspberry Pi カメラモジュール（V2 または V3）
- microSDカード（16GB以上、Class 10）
- USB電源アダプター（5V / 5A）
- Raspberry Pi OS（64bit推奨）
- インターネット接続

---

## セットアップ

### OSのインストール

Raspberry Pi Imagerを使ってmicroSDカードにOSを書き込みます。

1. Raspberry Pi公式サイトからImagerをダウンロード
2. Raspberry Pi OS（64-bit）を選択
3. microSDカードに書き込む
4. 書き込んだSDカードをRaspberry Piに挿してパワーアップ

### カメラモジュールの接続

Raspberry Pi 5のCSIポートにフレキシブルケーブルを接続します。向きに注意してください（金属の接点が見える側を特定の方向に向ける）。

接続後、以下のコマンドでカメラが認識されているか確認します：

```bash
libcamera-hello --list-cameras
```

カメラが表示されれば成功です。

---

## TensorFlow Liteのインストール

### システムを最新化

```bash
sudo apt update && sudo apt upgrade -y
```

### Python環境の準備

```bash
sudo apt install -y python3-pip python3-venv

# 仮想環境を作成
python3 -m venv ~/tflite-env
source ~/tflite-env/bin/activate
```

### TensorFlow Liteランタイムのインストール

```bash
pip install tflite-runtime
pip install numpy pillow
```

---

## 画像認識プログラム

### サンプルモデルのダウンロード

TensorFlow Liteのサンプルモデル（MobileNet v1）を使います：

```bash
mkdir ~/image-recognition && cd ~/image-recognition

# モデルのダウンロード
wget https://storage.googleapis.com/download.tensorflow.org/models/tflite/mobilenet_v1_1.0_224_quant_and_labels.zip
unzip mobilenet_v1_1.0_224_quant_and_labels.zip
```

### 認識スクリプトの作成

`recognize.py` というファイルを作成します：

```python
import numpy as np
from PIL import Image
import tflite_runtime.interpreter as tflite
import subprocess

MODEL_PATH = "mobilenet_v1_1.0_224_quant.tflite"
LABEL_PATH = "labels_mobilenet_quant_v1_224.txt"
IMAGE_PATH = "/tmp/capture.jpg"

def capture_image():
    subprocess.run([
        "libcamera-still",
        "-o", IMAGE_PATH,
        "--width", "224",
        "--height", "224",
        "-t", "1000",
        "--nopreview"
    ])

def load_labels(path):
    with open(path, "r") as f:
        return [line.strip() for line in f.readlines()]

def recognize():
    capture_image()
    image = Image.open(IMAGE_PATH).resize((224, 224))
    input_data = np.expand_dims(np.array(image, dtype=np.uint8), axis=0)
    interpreter = tflite.Interpreter(model_path=MODEL_PATH)
    interpreter.allocate_tensors()
    input_details = interpreter.get_input_details()
    output_details = interpreter.get_output_details()
    interpreter.set_tensor(input_details[0]['index'], input_data)
    interpreter.invoke()
    output_data = interpreter.get_tensor(output_details[0]['index'])
    results = np.squeeze(output_data)
    labels = load_labels(LABEL_PATH)
    top_indices = results.argsort()[-5:][::-1]
    print("=== 認識結果 ===")
    for i in top_indices:
        print(f"{labels[i]}: {results[i]/255.0*100:.1f}%")

if __name__ == "__main__":
    recognize()
```

---

## 動作確認

スクリプトを実行します：

```bash
source ~/tflite-env/bin/activate
cd ~/image-recognition
python3 recognize.py
```

カメラが写真を撮影し、数秒後に認識結果が表示されます：

```
=== 認識結果 ===
cup: 82.3%
coffee mug: 10.1%
container: 3.2%
```

コーヒーカップをカメラに向けると、ちゃんと「cup」と認識されました！感動しました。

---

## 応用アイデア

基本ができたら、以下のような応用にも挑戦できます：

**人物検知**
人が映ったときだけLEDを光らせる簡易セキュリティカメラ。

**ゴミ分別補助ツール**
ゴミをカメラにかざすと「燃えるゴミ」「プラスチック」などを判定。

**植物認識**
庭の草花をカメラで撮影して植物名を表示。

**表情認識**
笑顔を検出してライトが変わるインタラクティブオブジェ。

---

## まとめ

Raspberry Pi 5とTensorFlow Liteを使えば、思ったより簡単に画像認識を試せました。

最初のセットアップさえ済んでしまえば、あとはPythonのコードを書くだけです。AIというと難しそうに聞こえますが、このレベルなら初心者でも1日あれば動かせます。

ぜひ試してみてください！
