 function tournamentScores(matchScores){
   let teamStatsMap=new Map();
   matchScores.forEach((e)=>updateMatchScore(e,teamStatsMap));
   return sortResult(teamStatsMap);
 }
 function updateTeamRecords(team,teamPoints,teamGS,teamGD,teamStatsMap){
   let stats=teamStatsMap.get(team[0]) || {"totalPoints":0,"totalGoalsScored":0,"diffGoalsScored":0}
   teamStatsMap.set(team[0],{"totalPoints":stats.totalPoints+teamPoints,"totalGoalsScored":stats.totalGoalsScored+teamGS,"diffGoalsScored":stats.diffGoalsScored+teamGD});
  }
 
 function updateMatchScore(e,teamStatsMap){
  let temp=e.split('-');
  let team1=temp[0].split(' ');
  team1.pop();
  let team2=temp[1].split(' ');
  team2=team2.reverse();
  team2.pop();
  [team1Points,team2Points]=getPoints(team1,team2);
  [team1GS,team2GS]=getGoalsScored(team1,team2);
  [team1GD,team2GD]=getGoalDifference(team1,team2);
  updateTeamRecords(team1,team1Points,team1GS,team1GD,teamStatsMap);
  updateTeamRecords(team2,team2Points,team2GS,team2GD,teamStatsMap);
}
 function sortResult(teamStatsMap){
 let result= Array.from(teamStatsMap.entries()).sort(([teamA, statsA], [teamB, statsB]) => {
    if (statsA.totalPoints !== statsB.totalPoints) {
        return statsB.totalPoints - statsA.totalPoints;
    }
    if (statsA.totalGoalsScored !== statsB.totalGoalsScored) {
        return statsB.totalGoalsScored - statsA.totalGoalsScored;
    }
    return statsB.diffGoalsScored - statsA.diffGoalsScored;
});
return result;
}
 function getPoints(team1,team2){
  if(parseInt(team1[1])>parseInt(team2[1])){
    team1Points=3;
    team2Points=0;
  }
  else if(parseInt(team1[1])<parseInt(team2[1])){
    team1Points=0;
    team2Points=3;
  }
   else if(parseInt(team1[1])===parseInt(team2[1])){
    team1Points=1;
    team2Points=1;
  }
  return [team1Points,team2Points];
}
function getGoalsScored(team1,team2){
  return [parseInt(team1[1]),parseInt(team2[1])];
}
function getGoalDifference(team1,team2){
  return [parseInt(team1[1])-parseInt(team2[1]),parseInt(team2[1])-parseInt(team1[1])];
}

  console.log(tournamentScores(["A 0 - 1 B", "C 2 - 0 D", "B 2 - 2 C", "D 3 - 1 A", "A 2 - 2 C", "B 2 - 0 D"]));
 console.log(tournamentScores(["A 2 - 1 B", "C 3 - 0 D", "B 1 - 1 C", "D 1 - 0 A", "A 3 - 0 C", "B 2 - 4 D"]));
  console.log(tournamentScores(["A 4 - 0 B", "C 2 - 1 D", "B 1 - 0 C", "D 3 - 2 A", "A 1 - 3 C", "B 2 - 1 D"]));