# account-manager

iCloud, Chrome, Firefox などでそれぞれ保存してしまっているアカウントの情報を管理するためのツールです。
それぞれのアカウント情報を CSV でエクスポートし、それらを使ってアカウントを管理します。

## 前提

- 2022/12/18 現在の CSV の形式に対応しています
  - iCloud の形式: Title, URL, Username, Password, Notes, OTPAuth
  - Chrome の形式: name, url, username, password
  - Firefox の形式: url, username, password, httpRealm, formActionOrigin, guid, timeCreated, timeLastUsed, timePasswordChanged

## 機能

- アカウントの一覧表示
- どこにどのアカウント情報が保存されている・いないかを表示
