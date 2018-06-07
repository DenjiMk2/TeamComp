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
    if(nameDict[$(this).val()] !== undefined ){
      $.data(this,"data",datas[nameDict[$(this).val()]]);
    }else{
      $.data(this,"data",null);
    }
    dispReflesh();
  });
  $('#enemyTeam').on('input','input',function(){
    if(nameDict[$(this).val()] !== undefined ){
      $.data(this,"data",datas[nameDict[$(this).val()]]);
    }else{
      $.data(this,"data",null);
    }
    dispReflesh();
  });
});
var getFriendTeamName = function(){
  var ret = [];
  $('#friendTeam input').each(function(){
    ret.push($(this).val());
  });
  return ret;
}
var getEnemyTeamName = function(){
  var ret = [];
  $('#enemyTeam input').each(function(){
    ret.push($(this).val());
  });
  return ret;
}
var connectElement = function(from,to){
  new LeaderLine(
    from,
    to,
    {
      dash: {animation: true},
      color: 'rgba(30, 130, 250, 0.5)'
    }
  );
}
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
var dispReflesh = function(){
  var friends = $('#friendTeam input');
  var enemys = $('#enemyTeam input');
  for(i in friends){
    for(j in enemys){
      var from = friends[i];
      var to = enemys[j];
      dispRelation(from,to,false);
      dispRelation(to,from,false);
    }
  }
}
//stat=trueの場合同じチーム
var dispRelation = function(from,to,stat){
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
      connectElement(from,to);
    }
  }
}
