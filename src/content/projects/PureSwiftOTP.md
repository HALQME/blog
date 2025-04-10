---
title: "PureSwift OTP"
description: "Swiftのみで書かれたOTPライブラリ"
repository: "https://github.com/halqme/PureSwiftOTP"
version: { value: "0.1.0", pubDate: "Sep 26, 2024" }
language: "Swift"
---

# PureSwift OTP

Swift のみで書かれた OTP ライブラリであり、
<a href="https://github.com/lachlanbell/SwiftOTP" target="_blank" rel="noopener noreferrer">[lachlanbell/SwiftOTP]</a> のフォークバージョンです。

OTP を生成するロジックはほとんど変更されていませんが、パッケージの依存関係と使用法を少し変更したことで、より少ないコードかつ Swift Only で OTP を生成できるようになりました。

## 特徴

-   **Swift 100%**: このパッケージは Swift のみを使用して実装されています。

## インストール

```swift
// Swift Package Manager
dependencies: [
    .package(url: "https://github.com/HALQME/PureSwiftOTP.git", branch: "main")
]
```

## 使用法

```swift
import PureSwiftOTP

// TOTP
// https://tools.ietf.org/html/rfc4226#page-32
let data = Data(hex: "3132333435363738393031323334353637383930")!
let totp = TOTP() // digits: Int = 6, algorithm: OTPAlgorithm = .sha1, timeInterval: TimeInterval = 30
totp.generate(data: data, time: Date(timeIntervalSince1970: 0)) // "755224"

// Base32エンコードされた文字列からTOTPコードを生成
let secret = "BASE32ENCODEDVALUE"
totp.generate(secret: secret) // 現在時刻に基づいたTOTPコードを返します

// HOTP
// https://tools.ietf.org/html/rfc4226#page-32
let data = Data(hex: "3132333435363738393031323334353637383930")!
let hotp = HOTP() // デフォルトでは6桁のコードとSHA1アルゴリズムを使用
hotp.generate(secret: data, counter: 0) // カウンター値0に基づいたHOTPコードを生成
```
