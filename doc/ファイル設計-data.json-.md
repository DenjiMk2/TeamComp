# ファイル設計書 data.json
## 概要
本ファイルは、ユーザが編集する可能性のあるファイルである。
data.jsonファイルでは、本システムで使用するメンバー自身の情報と、そのメンバーが持つ関係性の情報を記述する。
このファイルには使用される全てのメンバーの情報が記述される。
json形式で記述し、ページ読み込み後ファイルがロードされ変数として展開される。
システムは、本ファイルから展開された変数を使用して、システムの表示ルールを制御する。
## ファイル内容の構成
本ファイルの内容は全てjson形式で記述され、以下の構成を持つ。
``` json
data:[
	{
		"id":"Annie",
		"dispName":"アニー",
		"name":["Anie","釘宮"],
		"skill":["イニシエーター","ハードCC"],
		"friendRelation":[
			{
				"relationName":"シナジー",
				"toMenber":"Zaq",
				"discription":"zaqUltでまとめて回収したところをpassiv+Ultでまとめてスタン"
			}
		],
		"enemyRelation":[
			{
				"relationName":"カウンター",
				"toMenber":"Xrath",
				"discription":"アニーより長いレンジからハラスされる"
			}
		]
	}
]
```
### ファイル内容の説明
#### data
オブジェクト配列  
このファイルはdata配列を１ファイルかけて作成するようにできている。
配列の中身はそれぞれ一つのメンバーを表す
#### data[0].id
文字列 必須  
メンバーのIDを表す。  
全メンバーの中で一意の文字列である必要があり、システム内でメンバーを指し示す場合は、このIDの値を使用する。
表示には使用されない。
#### data[0].dispName
文字列 必須  
メンバーの表示名。
システム上で表示する場合は、この文字列を使用する。
#### data[0].name
文字配列  
メンバーの別の表記。  
ユーザーが検索を行った際にdispNameとnameの値を使用する。
#### data[0].skill
文字配列  
そのメンバーが持つスキルを記述する。
チーム構成の下に一覧で表示される。
この文字列はrule.jsonで記述したskillNameと一致させる事が望ましい、一致するskillNameが存在しない場合は、デフォルトのスタイルを適用し、スキルを表示する。
#### data[0].friendRelation
オブジェクト配列  
配列の中身は同じチームにいる際の関係性を記述する。
一つのオブジェクトに対して一つの関係性を記述する。
#### data[0].friendRelation.relationName
文字列 必須  
関係性の名前を記述する。
この文字列はrule.jsonで記述したfriendRelations.relationNameと一致させる事が望ましい、一致するrelationNameが存在しない場合は、デフォルトのスタイルを適用し、関係性を表示する。
#### data[0].friendRelation.toMenber
文字列 必須
この関係性の相手idの値で記述する。
#### data[0].friendRelation.discription
文字列  
この関係性の説明を記述する。
#### data[0].enemyRelation
オブジェクト配列  
配列の中身は違うチームにいる際の関係性を記述する。
一つのオブジェクトに対して一つの関係性を記述する。
#### data[0].enemyRelation.relationName
文字列 必須  
関係性の名前を記述する。
この文字列はrule.jsonで記述したenemyRelations.relationNameと一致させる事が望ましい、一致するrelationNameが存在しない場合は、デフォルトのスタイルを適用し、関係性を表示する。
#### data[0].enemyRelation.toMenber
文字列 必須
この関係性の相手idの値で記述する。
#### data[0].enemyRelation.discription
文字列  
この関係性の説明を記述する。
