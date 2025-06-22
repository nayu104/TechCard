# TechCard -  技育ハッカソン 2025年6月_Vol.5 発表

## <img src="src/assets/Icon.png" width="20" height="20" /> 概要

TechCardは、技術者向けの電子名刺アプリケーションです。Firebaseを使用したリアルタイムデータベースで、ユーザーは自分の名刺を作成・管理し、他のユーザーと名刺を交換できます。
## <img src="src/assets/Icon.png" width="20" height="20" /> デモサイト

https://electronic-business-card.vercel.app

---

## <img src="src/assets/Icon.png" width="20" height="20" /> ハッカソン用発表スライド
https://docs.google.com/presentation/d/1K3HNJBwZX9qrG3NwX3loN813-R7b0ysidmESG62Zw5Y/edit?slide=id.g3676f3e521a_0_10#slide=id.g3676f3e521a_0_10

---

## <img src="src/assets/Icon.png" width="20" height="20" /> テスト用：アカウント

- **メールアドレス**: `aaaaaaaa@aaa.com`  
- **パスワード**: `123456`

---

## <img src="src/assets/Icon.png" width="20" height="20" /> テスト用：フレンド追加テスト用ユーザーID

| ユーザー名 | ID |
|------------|-----|
| kai        | `sSKgWTJuwccevq3WCGKgfzpTl3A3` |
| 初期ユーザー | `5dgNSAV6DkdLq5yJydYZyxEc6mu1` |
| hamu104    | `3YOfKatkAnYFBWa9963pNk8Jp9W2` |


## <img src="src/assets/Icon.png" width="20" height="20" /> 主な機能

### <img src="src/assets/Icon.png" width="20" height="20" /> 認証機能
- メールアドレス・パスワードによるログイン
- 新規ユーザー登録

### <img src="src/assets/Icon.png" width="20" height="20" /> 名刺管理
- **My名刺** : 自分の名刺を作成・編集
- **名刺入れ** : 友達の名刺を管理・表示
- **QRコード** : 名刺情報をQRコードで共有 (未実装)

### <img src="src/assets/Icon.png" width="20" height="20" /> 検索機能
- 名前・スキルによる名刺検索

### <img src="src/assets/Icon.png" width="20" height="20" /> 友達機能
- 友達の名刺を追加
- 名刺の削除機能
- 友達リスト管理

## <img src="src/assets/Icon.png" width="20" height="20" /> 技術スタック

### フロントエンド
- **React** - UIライブラリ
- **Vite** - ビルドツール

### バックエンド・データベース
- **Firebase Authentication** - ユーザー認証
- **Firestore** - NoSQLデータベース

4. **開発サーバーを起動**
```bash
npm run dev
```

## <img src="src/assets/Icon.png" width="20" height="20" /> プロジェクト構造

```
TechCard/
├── src/
│   ├── components/          # 再利用可能なコンポーネント
│   │   ├── BusinessCard.jsx     # 名刺表示コンポーネント
│   │   ├── BusinessCardList.jsx # 名刺リストコンポーネント
│   │   ├── QRCode.jsx           # QRコード生成コンポーネント
│   │   └── SideBarList.jsx      # サイドバーナビゲーション
│   ├── pages/              # ページコンポーネント
│   │   ├── LoginPage.jsx        # ログインページ
│   │   ├── RegisterPage.jsx     # 登録ページ
│   │   ├── MyBusinessCard.jsx   # 自分の名刺ページ
│   │   └── MyCardBox.jsx        # 名刺入れページ
│   ├── data/               # データファイル
│   ├── assets/             # 画像・アイコン
│   └── firebase.js         # Firebase設定
├── public/                 # 静的ファイル
└── package.json           # 依存関係
```


## <img src="src/assets/Icon.png" width="20" height="20" /> 主要ページ

### 1. ログインページ (`/login`)
- メールアドレス・パスワード認証
- 新規登録へのリンク
- アニメーション付きロゴ

### 2. 登録ページ (`/register`)
- 新規ユーザー登録
- 名前・メール・パスワード入力
- バリデーション機能

### 3. My名刺 (`/mybusinesscard`)
- 自分の名刺表示・編集
- QRコード生成
- プロフィール情報管理

### 4. 名刺入れ (`/mycardbox`)
- 友達の名刺一覧表示
- 検索機能
- 名刺削除機能


## <img src="src/assets/Icon.png" width="20" height="20" /> ライセンス
このプロジェクトはMITライセンスの下で公開されています。

## <img src="src/assets/Icon.png" width="20" height="20" /> 開発者

- **nayu104 : https://github.com/nayu104** 
- **makoto0518 : https://github.com/makoto0518** 発表者
- **thisismine-kai : https://github.com/thisismine-kai** 
- **ichiki78 : https://github.com/ichiki78**
