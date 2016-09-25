/**
 * Created by jeffersonvivanco on 9/21/16.
 */
var request = require('request');

request('https://foureyes.github.io/csci-ua.0480-fall2016-001/homework/02/0021500750.json', function callback(error, response, body) {
    // just print out the first 30 characters of the response body
    var gameData = JSON.parse(body);


    var gameId = "Game ID: "+gameData.id;
    console.log(gameId+"\n=====");
    var players = gameData.players; //All the players in the team
    var teamObject  = function (name) {
      return {name : name, players:[], finalscore: 0, totalFreeThrowsAttempted:0, playersWithMoreTurnOversThanAssists : []};
    };
    var teamName = [];
    var teamObjects = [];
    for(var i=0; i<players.length; i++){
        if(teamName.indexOf(players[i].team_name)<0){
            teamName.push(players[i].team_name);
        }
    }
    for(var c=0; c<teamName.length; c++){
        var team  = teamObject(teamName[c]);
        teamObjects.push(team);
    }
    for(var d=0; d<teamObjects.length; d++){
        for(var f=0; f<players.length; f++){
            if(teamObjects[d].name === players[f].team_name){
                teamObjects[d].players.push(players[f]);
            }
        }
    }

    //------------------------------------Getting total points for each team-------------------------//
    // var pacersFinalScore  = 0;
    // var hawksFinalScore = 0;
    function filterByTeam(team) {
        var FinalScore = 0;
        for(var f=0; f<team.players.length; f++){
            var twoPointFGH = (parseInt(team.players[f].field_goals_made) - parseInt(team.players[f].three_pointers_made))*2;
            FinalScore = FinalScore + parseInt(team.players[f].three_pointers_made)*3+parseInt(team.players[f].free_throws_made)+twoPointFGH;
        }
        team.finalscore = FinalScore;

        return true;



    }
    for(var y=0; y<teamObjects.length; y++){
        var teamFilter = teamObjects.filter(filterByTeam);
    }
    var finalScores = "";
    for(var a=0; a<teamObjects.length; a++){
        finalScores = finalScores+teamObjects[a].name+": "+teamObjects[a].finalscore+"\n";
    }
    console.log(finalScores);
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
    console.log("* There were "+numOfPlayersWithAtleastOneAssist +" players that had at least one assist.");
    //------------------------------------------------------------------------------------------------//

    //------------------------------------Team that attempted the most free throws-------------------------//

    function getFreeThrowsAttempted(team) {
        var totalAFreeThrows = 0;
        for(var x=0; x<team.players.length; x++){
            totalAFreeThrows = totalAFreeThrows + parseInt(team.players[x].free_throws_attempted);
        }
        team.totalFreeThrowsAttempted = totalAFreeThrows;

    }
    var addAttemptedFreeThrows = teamObjects.map(getFreeThrowsAttempted);
    var teamWithGreatestFreeThrowsAttempted = function(){
        var team = teamObjects[0];
        for(var h=0; h<teamObjects.length; h++){
            if(teamObjects[h].totalFreeThrowsAttempted>team.totalFreeThrowsAttempted){
                team = teamObjects[h];
            }
        }
        return team;
    };
    var stringMostFreeThrows = function(){
        var string = "";
        for(var i=0; i<teamObjects.length; i++){
            string  = string+teamObjects[i].name +": "+teamObjects[i].totalFreeThrowsAttempted+"  ";
        }
        return string;
    };

    console.log("* "+teamWithGreatestFreeThrowsAttempted().name+" attempted the most free throws, "+stringMostFreeThrows());

    //------------------------------------------------------------------------------------------------//

    //------------------------------------Players with more turnovers than assists-------------------------//
    function compute(team) {
        for(var i=0; i<team.players.length; i++){
            if(team.players[i].turnovers > team.players[i].assists){
                team.playersWithMoreTurnOversThanAssists.push(team.players[i]);
            }
        }
    }
    teamObjects.forEach(compute);
    var stringOfTurnovers = function () {
        var string ="";
        for(var i=0; i<teamObjects.length; i++){
            string = string + "* "+teamObjects[i].name+" players with more turnovers than assists\n";
            for(var x=0; x<teamObjects[i].playersWithMoreTurnOversThanAssists.length; x++){
                string  = string+"  * "+teamObjects[i].playersWithMoreTurnOversThanAssists[x].first_name+
                    " has an assist to turnover ratio of "+teamObjects[i].playersWithMoreTurnOversThanAssists[x].assists+
                    ":"+teamObjects[i].playersWithMoreTurnOversThanAssists[x].turnovers+"\n";
            }
        }
        return string;
    };
    console.log(stringOfTurnovers());
    if(gameData.next != ""){
        request(gameData.next,callback);

    }

    //------------------------------------------------------------------------------------------------//

});

