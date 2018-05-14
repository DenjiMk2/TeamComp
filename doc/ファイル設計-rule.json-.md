# ファイル設計書 rule.json
## 概要
本ファイルは、ユーザが編集する可能性のあるファイルである。
このファイルにはスキルや関係性の詳細を記述する。
このファイルに記載のないスキルや関係性はデフォルトのスタイルで表示を行う。
json形式で記述し、ページ読み込み後ファイルがロードされ変数として展開される。
システムは、本ファイルから展開された変数を使用して、システムの表示ルールを制御する。

## ファイル内容の構成
本ファイル内容はすべてjson形式で記述され以下の構成を持つ。
```json
rule:{
  "skills":[
    {
      "skillName":"defualt",
      "style":""
    },
    {
      "skillName":"イニシエーター",
      "style":""
    },
    {
      "skillName":"ハードCC",
      "style":""
    }
  ],
  "friendRelations":[
    {
      "relationName":"defualt",
      "style":""
    },
    {
      "relationName":"シナジー",
      "style":""
    }
  ],
  "enemyRelations":[
    {
      "relationName":"defualt",
      "style":""
    },
    {
      "relationName":"カウンター",
      "style":""
    }
  ]
}
```
### ファイル内容の説明
#### rule
オブジェクト  
このファイルはruleオブジェクトを１ファイルかけて作成するようにできている。
#### rule.skills
オブジェクト配列 必須  
一つ一つのオブジェクトがスキルを表す。
#### rule.skills[0].skillName
文字列 必須  
スキルの名前を文字列で記述する。
また、予約名として、defualtが存在し、設定することで存在しないskillNameがdata.jsonで指定された際の設定が可能である。
#### rule.skills[0].style
文字列 必須  
スキルの表示スタイルを設定する。
#### rule.friendRelations
オブジェクト配列 必須  
一つ一つのオブジェクトが関係性を表す。
#### rule.friendRelations[0].relationName
文字列 必須  
関係性の名前を文字列で記述する。
また、予約名として、defualtが存在し、設定することで存在しないrelationNameがdata.jsonで指定された際の設定が可能である。
#### rule.friendRelations[0].style
文字列 必須  
関係性の表示スタイルを設定する。
#### rule.enemyRelations
オブジェクト配列 必須  
一つ一つのオブジェクトが関係性を表す。
#### rule.enemyRelations[0].relationName
文字列 必須  
関係性の名前を文字列で記述する。
また、予約名として、defualtが存在し、設定することで存在しないrelationNameがdata.jsonで指定された際の設定が可能である。
#### rule.enemyRelations[0].style
文字列 必須  
関係性の表示スタイルを設定する。
