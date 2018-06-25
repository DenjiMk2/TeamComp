var datas;
var nameDict;
$(function(){
  $.getJSON("./data.json", function(json){
    datas = convertJson2Datas(json);
    nameDict = createNameDict(datas);
  });

  for(var i=0;i<6;i++){
    $('#friendTeam').append('<input type=text id="friend'+i+'">');
  }
  for(var i=0;i<6;i++){
    $('#enemyTeam').append('<input type=text id="enemy'+i+'">');
  }

  $('#friendTeam').on('input','input',function(){
    updateData(this);
    updateRelation(this);
  });
  $('#enemyTeam').on('input','input',function(){
    updateData(this);
    updateRelation(this);
  });
});
/**
 * 対象の入力欄を読み取り、$.data(elm,"data")を更新する。
 * @param {Object} target データを更新したい要素
 */
var updateData = function(target){
  if(nameDict[$(target).val()] !== undefined ){
    $.data(target,"data",datas[nameDict[$(target).val()]]);
  }else{
    $.data(target,"data",null);
  }
}
/**
 * すべての入力欄から$.data(elm,"data")を更新する。
 */
var allUpdateData = function(){
  var friends = $('#friendTeam input');
  for(var i=0;i<friends.length;i++){
    updateData(friends[i]);
  }
  var enemys = $('#enemyTeam input');
  for(var i=0;i<enemys.length;i++){
    updateData(enemys[i]);
  }
}
/**
 * FriendTeam(左側)の値を取得する。
 * @return {Array.<String>} FriendTeamの名前配列 未入力欄には""が挿入される
 */
var getFriendTeamName = function(){
  var ret = [];
  $('#friendTeam input').each(function(){
    ret.push($(this).val());
  });
  return ret;
}
/**
 * EnemyTeam(右側)の値を取得する。
 * @return {Array.<String>} EnemyTeamの名前配列 未入力欄には""が挿入される
 */
var getEnemyTeamName = function(){
  var ret = [];
  $('#enemyTeam input').each(function(){
    ret.push($(this).val());
  });
  return ret;
}
/**
 * 要素と要素を矢印でつないで表示する。
 * @param {Object} from 矢印が出る元となる要素
 * @param {Object} to 矢印が指し示す要素
 * @return {Object} 生成した矢印のLeaderLineオブジェクト
 *
 */
var connectElement = function(from,to){
  return new LeaderLine(
    from,
    to,
    {
      dash: {animation: true},
      color: 'rgba(30, 130, 250, 0.5)'
    }
  );
}
/**
 * 配列から、配列内容のオブジェクトのIDをキーとした辞書に変換
 * @param {Array.<Object>} detas data型オブジェクトの配列
 * @return {Object.<String,Object>} 引数のObjectからIDの値をキーにしたオブジェクト
 */
var convertJson2Datas = function(detas){
  var ret = {};
  for(i in detas){
    ret[detas[i].id] = detas[i]
  }
  return ret;
}
var createNameDict = function(datas){
  var ret = {};
  for(i in datas){
      ret[i] = i;
      ret[datas[i].dispName] = i;
    for(j in datas[i].name){
      ret[datas[i].name[j]] = i;
    }
  }
  return ret;
}
/**
 * 現在のdataを使用して画面の矢印を再描画
 */
var dispReflesh = function(){
  allRemoveRelation();
  var friends = $('#friendTeam input');
  var enemys = $('#enemyTeam input');
  for(var i=0;i<friends.length;i++){
    for(var j=0;j<friends.length;j++){
      if(i == j) continue;
      dispRelation(friends[i],friends[j],true);
    }
    for(j in enemys){
      dispRelation(friends[i],enemys[j],false);
    }
  }
  for(var i=0;i<enemys.length;i++){
    for(var j=0;j<enemys.length;j++){
      if(i == j) continue;
      dispRelation(enemys[i],enemys[j],true);
    }
    for(var j=0;j<friends.length;j++){
      dispRelation(enemys[i],friends[j],false);
    }
  }
}
/**
 * 指定した一つの要素に対しての矢印を再描画する。
 * 再描画は実行時の@code{$.data(elm,"data")}の値を使用する
 * @param {Object} target 再描画する対象のinput要素
 *
 */
var updateRelation = function(target){
  //右側チームだった場合、friendとenemeyは逆
  if(/enemy.*/.test($(target).attr('id'))){
    var enemys = $('#friendTeam input');
    var friends = $('#enemyTeam input');
  }else{
    var friends = $('#friendTeam input');
    var enemys = $('#enemyTeam input');
  }
  //targetに関連するrelationをすべて削除
  var relations = $.data(target,"relation");
  $.data(target,"relation",null);
  if(relations){
    for(var i=0;i<relations.length;i++){
      relations[i]['obj'].remove();
    }
  }
  for(var i=0;i<friends.length;i++){
    var friendRelation = $.data(friends[i],"relation");
    if(friendRelation == undefined) continue;
    friendRelation = friendRelation.filter(function(a){
      if(a['to'].attr('id') != $(target).attr('id')){
        a['obj'].remove();
        return false;
      }
      return true;
    });
    $.data(friends[i],"relation",friendRelation);
  }
  for(var i=0;i<enemys.length;i++){
    var enemyRelation = $.data(enemys[i],"relation");
    if(enemyRelation == undefined) continue;
    enemyRelation = enemyRelation.filter(function(a){
      if(a['to'].attr('id') != $(target).attr('id')){
        a['obj'].remove();
        return false;
      }
      return true;
    });
    $.data(enemys[i],"relation",enemyRelation);
  }
  //targetとのrelationを構築
  for(var i=0;i<friends.length;i++){
    dispRelation(target,friends[i],true);
  }
  for(var i=0;i<enemys.length;i++){
    dispRelation(target,enemys[i],false);
  }
}
/**
 * すべての矢印を@code{$.data(elm,"relation")}から削除し、矢印の描画を消す
 */
var allRemoveRelation = function(){
  var friends = $('#friendTeam input');
  var enemys = $('#enemyTeam input');
  for(var i=0;i<friends.length;i++){
    var re = $.data(friends[i],"relation");
    if(!re) continue;
    $.data(friends[i],"relation",null);
    for(var j=0;j<re.length;j++){
      re[j]['obj'].remove();
    }
  }
  for(var i=0;i<enemys.length;i++){
    var re = $.data(enemys[i],"relation");
    if(!re) continue;
    $.data(enemys[i],"relation",null);
    for(var j=0;j<re.length;j++){
      re[j]['obj'].remove();
    }
  }
}
/**
 * 引数で指定した要素に対して、@code{$.data(elm,"data")}を参照し、適切な矢印を生成し、結果を@code{$.data(elm,"relation")}に格納する。
 * @param {Object} from 矢印の元になるinput要素
 * @param {Object} to 矢印の先になるinput要素
 * @param {boolean} stat formとtoが同じチームか
 */
var dispRelation = function(from,to,stat){
  var ret = [];
  var relation;
  if(!$.data(from,"data") || !$.data(to,"data")){
    return;
  }
  if(stat){
    relation = $.data(from,"data").friendRelation;
  }else{
    relation = $.data(from,"data").enemyRelation;
  }
  for(i in relation){
    if(relation[i].toMenber == $.data(to,"data").id){
      ret.push({'obj':connectElement(from,to),'to':to});
    }
  }
  if(!ret){
    return;
  }
  var beforRelation = $.data(from,"relation");
  if(beforRelation == null){
    $.data(from,"relation",ret);
    return;
  }
  $.data(from,"relation",beforRelation.concat(ret));
  return;
}
