$(function(){
  for(var i=0;i<6;i++){
    $('#friendTeam').append('<input type=text id="friend'+i+'">');
  }
  for(var i=0;i<6;i++){
    $('#enemyTeam').append('<input type=text id="enemy'+i+'">');
  }

  $('#friendTeam').on('input','input',function(){
    if(/(friend|enemy)[1-6]/.test($(this).val())){
      connectElement($(this).get(0),$('#'+$(this).val()).get(0));
    }
    console.log($(this).val());
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
