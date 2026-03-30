---
title: "AI×電子工作入門｜Raspberry PiでAIカメラを作ろう"
description: "Raspberry Pi＋カメラモジュールで画像認識AIカメラを作る入門ガイド。必要な部品と費用、プロジェクト概要、AI電子工作の応用例を解説します。"
date: "2026-03-30"
category: "ai"
tags: ["Raspberry Pi", "AI", "カメラ", "画像認識", "TensorFlow Lite", "物体検出", "初心者"]
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
faqs:
  - q: "AIカメラ製作にプログラミング経験は必要ですか？"
    a: "Python の基礎知識（変数・ループ・関数）があれば取り組めます。完全な初心者には先にArduinoとPythonの基礎を学んでからのほうがスムーズです。"
  - q: "Raspberry Pi以外でAIカメラは作れますか？"
    a: "ESP32-CAMというWiFi内蔵カメラモジュールを使えばより安価（¥1,500〜）に画像処理ができますが、Raspberry PiはPythonライブラリが充実しており、入門として適しています。"
  - q: "インターネット接続は必要ですか？"
    a: "学習済みモデルを使うオフライン推論なら不要です。クラウドAPIを使う場合はWiFi接続が必要です。Raspberry Pi 5にはWiFiが内蔵されています。"
  - q: "AIモデルを自分でトレーニングできますか？"
    a: "はい。Google TeachableMachineやEdge Impulseを使えば、プログラミング知識が少なくても独自の画像認識モデルを作成してRaspberry Piで動かすことができます。"
---

## フィジカルAIとは？

「物理的なセンサーやカメラを使ってリアル世界のデータを認識・処理するAIシステム」のことを、電子工作の世界では**フィジカルAI**（Physical AI）と呼びます。スマートフォンのカメラで顔認識する技術や、工場の品質検査ラインで不良品を自動検出するシステムも、フィジカルAIの一形態です。

Raspberry PiとカメラモジュールがあればLinux OSとPythonを使って、こうしたフィジカルAIを自宅で実験できます。必要な予算は20,000〜25,000円程度。難易度は「Raspberry PiのLinux操作に慣れている」ことが前提ですが、入門用の学習済みモデルを使えば比較的短時間で動作確認できます。

---

## 必要な部品と費用

| パーツ | 用途 | 目安価格 |
|--------|------|---------|
| Raspberry Pi 5（4GB） | メインコンピュータ | ¥9,800 |
| Raspberry Pi Camera Module 3 | 画像入力 | ¥3,500 |
| microSDカード（32GB以上） | OSとデータ保存 | ¥1,200 |
| Raspberry Pi 5用ケース | 放熱・保護 | ¥1,500 |
| USB-C電源アダプター（5V/5A） | Raspberry Pi専用電源 | ¥2,500 |
| HDMIケーブル + ディスプレイ | 初期設定用（手持ちのもので可） | 0〜¥3,000 |
| **合計** | | **¥18,500〜¥22,000** |

Raspberry Pi 5は[パーツ辞典のボードページ](/tools/parts-database/raspberry-pi-5)で詳細スペックと購入ガイドを確認できます。

### カメラモジュールの選び方

Raspberry Pi公式カメラモジュールには複数のバージョンがあります：

- **Camera Module 3**（推奨）：1200万画素、オートフォーカス対応、¥3,500前後
- **Camera Module 2**：800万画素、固定フォーカス、¥2,000前後
- **Camera Module 3 Wide**：広角レンズ付き、魚眼に近い広い視野角

AIカメラ入門としては標準のCamera Module 3が最もバランスが良く、ライブラリのサポートも充実しています。

---

## プロジェクト概要：AIカメラで何ができるか

### プロジェクト1：物体検出カメラ

**学習済みモデル**（すでにAIが学習を終えたデータファイル）を使い、カメラ映像の中に映っている物体の名前をリアルタイムで表示するシステムです。

使用するモデル：**YOLOv8 Nano**（超軽量版）またはRaspberry Pi AI Camera対応モデル

できること：
- 人・車・猫・犬など80種類の物体を検出
- 各物体をバウンディングボックス（矩形）で囲んで表示
- リアルタイムで毎秒数フレームの処理（Raspberry Pi 5なら10fps程度）

**学べること**：
- Raspberry PiのLinuxコマンド操作
- Pythonの基本構文（変数・ループ・クラス）
- OpenCVライブラリを使った画像処理
- 機械学習モデルの読み込みと推論

### プロジェクト2：独自分類器の作成

**Google TeachableeMachine**（無料Webアプリ）でオリジナルの画像分類モデルを作成し、Raspberry Piで動かすプロジェクトです。

例えば「OK/NGの品質検査カメラ」を自作するなら：
1. TeachableMachineでOK品とNG品を100枚ずつ撮影
2. ブラウザ上でAIが自動でトレーニング（10〜30分）
3. モデルをエクスポートしてRaspberry Piに転送
4. PythonスクリプトでカメラからNG品を自動判定

プログラミング知識がほぼなくても、このワークフローでオリジナルのAI分類器が作れます。

---

## 環境セットアップの流れ

実際の手順の概要を説明します（詳細な手順書は各ライブラリの公式ドキュメントを参照してください）。

### 1. Raspberry Pi OSのインストール

Raspberry Pi公式の**Raspberry Pi Imager**（無料ツール）を使い、microSDカードにOSを書き込みます。OSは「Raspberry Pi OS（64bit）」を選択。書き込み後にSDカードを本体に挿せばOSが起動します。

### 2. Python環境の構築

Raspberry Pi OSにはPython 3が初めから入っています。仮想環境を作成して必要なライブラリをインストールします：

```bash
python3 -m venv ai-camera-env
source ai-camera-env/bin/activate
pip install opencv-python picamera2 tflite-runtime
```

### 3. カメラの接続と動作確認

Camera Module 3はRaspberry Pi 5のCSIコネクタに専用フラットケーブルで接続します。接続後に以下のコマンドで動作確認できます：

```python
from picamera2 import Picamera2
picam2 = Picamera2()
picam2.start_and_capture_file("test.jpg")
```

### 4. AIモデルの実行

TensorFlow Lite形式（.tfliteファイル）の学習済みモデルを読み込んでカメラ映像に対して推論を行います。Raspberry Pi公式の「rpicam-apps」や「picamera2」ライブラリには物体検出のサンプルコードが付属しています。

---

## AI電子工作の応用例

フィジカルAIと電子工作を組み合わせると、以下のようなシステムが作れます：

### スマートホーム系
- **顔認証ドアロック**：登録した顔を検知したらサーボモーターでカギを開ける
- **侵入者検知カメラ**：知らない人が映ったらLINEやメールで通知
- **ペット見守りカメラ**：特定の行動（トイレ・ご飯皿）を検知して記録

### 環境モニタリング系
- **植物AI管理システム**：植物の健康状態をカメラで判定して自動水やり
- **ゴミ分別AI**：カメラに翳したゴミが何分別かを自動判定
- **工作物の品質チェック**：自作した部品の寸法や外観を自動検査

### 教育・実験系
- **AIじゃんけんマシン**：カメラでグーチョキパーを認識して自動で返す
- **手話認識**：ジェスチャーを認識してテキストに変換
- **表情認識ロボット**：相手の表情に合わせてLEDやサーボが反応

---

## まずArduinoから始めることをおすすめする理由

AIカメラは魅力的なプロジェクトですが、電子工作の基礎なしに挑戦すると挫折しやすいです。Raspberry Piはセットアップにいくつかのステップが必要で、問題が起きたときの原因特定にLinux・ネットワーク・Pythonの知識が求められます。

最初のステップとしておすすめのルートは次のとおりです：

1. **[電子工作入門](/articles/getting-started-electronics)**で工具と部品の基礎を学ぶ
2. **[Arduino入門ガイド](/articles/arduino-beginner-guide)**でLチカ・センサー制御を体験
3. Pythonの基礎を学習（変数・ループ・関数・クラス）
4. **Raspberry Pi** + カメラでAIカメラに挑戦

Arduinoでセンサーの扱い方やデジタル/アナログ入出力の基礎を身につけてからRaspberry Piに進むと、電子工作特有のトラブル（電源・配線・プロトコル）への対処力がつき、AIカメラプロジェクトも格段にスムーズに進みます。

---

## まとめ

Raspberry Pi＋カメラモジュールで作るAIカメラは、フィジカルAIの世界への最高の入口です：

- **必要な予算**：20,000〜25,000円程度
- **主な学習内容**：Linuxコマンドライン、Python、OpenCV、TensorFlow Lite
- **できること**：物体検出、顔認識、独自分類器の作成
- **応用先**：スマートホーム、自動化システム、教育・実験

Raspberry Piのスペック詳細は[パーツ辞典](/tools/parts-database/raspberry-pi-5)で確認できます。電子工作の基礎から始めたい方は[電子工作の始め方](/articles/getting-started-electronics)や[Arduino入門ガイド](/articles/arduino-beginner-guide)からスタートしましょう。

## よくある質問

**Q. AIカメラ製作にプログラミング経験は必要ですか？**

Pythonの基礎知識（変数・ループ・関数）があれば取り組めます。完全な初心者には先にArduinoとPythonの基礎を学んでからのほうがスムーズです。

**Q. Raspberry Pi以外でAIカメラは作れますか？**

ESP32-CAMというWiFi内蔵カメラモジュールを使えばより安価（¥1,500〜）に画像処理ができますが、Raspberry PiはPythonライブラリが充実しており、入門として適しています。

**Q. インターネット接続は必要ですか？**

学習済みモデルを使うオフライン推論なら不要です。クラウドAPIを使う場合はWiFi接続が必要です。Raspberry Pi 5にはWiFiが内蔵されています。

**Q. AIモデルを自分でトレーニングできますか？**

はい。Google TeachableMachineやEdge Impulseを使えば、プログラミング知識が少なくても独自の画像認識モデルを作成してRaspberry Piで動かすことができます。
