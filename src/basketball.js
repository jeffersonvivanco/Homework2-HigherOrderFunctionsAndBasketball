/**
 * Created by jeffersonvivanco on 9/21/16.
 */
var gameData = require('../data.json');
var stringV = gameData.arena;

var gameId = "Game ID: "+gameData.id;

var players = gameData.players; //All the players in the team

//------------------------------------Getting total points for each team-------------------------//
var pacersFinalScore  = 0;
var hawksFinalScore = 0;
function filterByTeam(player) {
    if(player.team_name === "Hawks"){
        var twoPointFGH = (parseInt(player.field_goals_made) - parseInt(player.three_pointers_made))*2;
        hawksFinalScore = hawksFinalScore + parseInt(player.three_pointers_made)*3+parseInt(player.free_throws_made)+twoPointFGH;
        return true;
    }
    else if(player.team_name === "Pacers"){
        var twoPointFGP = (parseInt(player.field_goals_made) - parseInt(player.three_pointers_made))*2;
        pacersFinalScore = pacersFinalScore + parseInt(player.three_pointers_made)*3+parseInt(player.free_throws_made)+twoPointFGP;
        return true;
    }
    else
        return false;
}
var teamFilter = players.filter(filterByTeam);
console.log("Pacers: "+pacersFinalScore+"\nHawks: "+hawksFinalScore+"\n");//Printing final score of Pacers and Hawks
//------------------------------------------------------------------------------------------------//

//------------------------------------Player with the most rebounds-------------------------//

function getMostRebounds(prev, curr){
    var totalReboundsPrev = parseInt(prev.rebounds_offensive)+parseInt(prev.rebounds_defensive);
    var totalReboundsCurr = parseInt(curr.rebounds_offensive)+parseInt(curr.rebounds_defensive);
    var maxRebounds = Math.max(totalReboundsCurr, totalReboundsPrev);
    if(maxRebounds === totalReboundsPrev){
        return prev;
    }
    else{
        return curr;
    }

}
var teamReduce  = players.reduce(getMostRebounds);
var totalRebounds = parseInt(teamReduce.rebounds_offensive)+parseInt(teamReduce.rebounds_defensive);
console.log("* Most rebounds: "+teamReduce.first_name+" "+teamReduce.last_name+" with "+totalRebounds);
//------------------------------------------------------------------------------------------------//

//------------------------------------Guard(G) with highest three pointer percentage-------------------------//
function filterIfGuard(player) {
    if(player.position_short === 'G'){
        return true;
    }
    else
        return false;
}
function getGuardHighestThreePer(prev, curr) {
    var threePerPrev = parseInt(prev.three_pointers_made)/parseInt(prev.three_pointers_attempted);
    var threePerCurr = parseInt(curr.three_pointers_made)/parseInt(curr.three_pointers_attempted);
    var highestPer = Math.max(threePerCurr,threePerPrev);
    if(highestPer === threePerPrev)
        return prev;
    else
        return curr;
}
var guardFilter = players.filter(filterIfGuard);
var highestThreePer = guardFilter.reduce(getGuardHighestThreePer);
var threePointerGuardName = highestThreePer.first_name+" "+highestThreePer.last_name;
var threePointerGuardPercent = (highestThreePer.three_pointers_made/highestThreePer.three_pointers_attempted)*100;
console.log("* Guard (G) with highest 3 point percentage: "+threePointerGuardName+" at "+ threePointerGuardPercent+"%.");
//------------------------------------------------------------------------------------------------//

//------------------------------------Total number of players with at least one assist-------------------------//
var numOfPlayersWithAtleastOneAssist = 0;
function getPlayersWithAtleastOneAssist(player) {
    if(player.assists > 0)
        numOfPlayersWithAtleastOneAssist++;
}
var playersWithAtLeastOneAssist = players.forEach(getPlayersWithAtleastOneAssist);
console.log("There were "+numOfPlayersWithAtleastOneAssist +" players that had at least one assist")
//------------------------------------------------------------------------------------------------//


// console.log(players);