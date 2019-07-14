# check-line-reply-token-expire

## 概要
LINE Messaging API の replyToken が何秒で無効になるのか検証するためのLINEボット

## ボットの仕様
- 数字(n)を送信数するとn秒後にreplyMessageを送信
- replyMessageが送信できなかった場合はpushMessageでエラー内容を送信
- 数字以外は数字を送信するように促す
