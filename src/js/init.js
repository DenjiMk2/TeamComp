$(function(){
  for(var i=0;i<6;i++){
    $('#friendTeam').append('<input type=text id="friend'+i+'">');
  }
  for(var i=0;i<6;i++){
    $('#enemyTeam').append('<input type=text id="enemy'+i+'">');
  }
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
