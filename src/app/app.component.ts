import { Component, OnInit } from '@angular/core';
import { IBracket } from './interfaces/IBracket';
import { IMap } from './interfaces/IMap';
import { IMatch } from './interfaces/IMatch';
import { ITeam } from './interfaces/ITeam';

import matchesJson from '../assets/data/matches.json';
import mythicsJson from '../assets/data/mythics.json';
import teamsJson from '../assets/data/teams.json';
import tableJson from '../assets/data/table.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'sloth-mdi';

  brackets: IBracket[] = [];
  lstTeams: ITeam[] = [];

  ngOnInit(): void {
    this.buildInfo();
  }

  private buildInfo() {
    const lstMatches: IMatch[] = [];
    const lstMythics: IMap[] = [];

    for (const mythic of mythicsJson) {
      lstMythics.push(mythic);
    }

    for (const match of matchesJson) {
      const map1 = this.findMapByName(match.map1, lstMythics);
      const map2 = this.findMapByName(match.map2, lstMythics);
      const map3 = this.findMapByName(match.map3, lstMythics);
      const map4 = this.findMapByName(match.map4, lstMythics);
      const map5 = this.findMapByName(match.map5, lstMythics);
      const map6 = this.findMapByName(match.map6, lstMythics);
      const map7 = this.findMapByName(match.map7, lstMythics);

      if (map1 && map2 && map3 && map4 && map5) {
        lstMatches.push({
          matchId: match.matchId,
          map1,
          map2,
          map3,
          map4,
          map5,
          map6,
          map7
        });
      }
    }

    for (const team of teamsJson) {
      this.lstTeams.push(team);
    }

    const bracketTmp: IBracket[] = [];

    for (const bracket of tableJson) {
      const match = this.findMatchByMatchId(bracket.matchId, lstMatches);
      if (match) {
        bracketTmp.push({
          matchId: bracket.matchId,
          match
        });
      }
    }


    for (const bracket of tableJson) {
      const match = this.findMatchByMatchId(bracket.matchId, lstMatches);
      const nextBracketWinner = this.findBracketByMatchId(bracket.nextMatchIdWinner, bracketTmp);
      const nextBracketLoser = this.findBracketByMatchId(bracket.nextMatchIdLoser, bracketTmp);
      const teamId1 = this.findTeamByName(bracket.teamId1);
      const teamId2 = this.findTeamByName(bracket.teamId2);
      if (match) {
        this.brackets.push({
          matchId: bracket.matchId,
          match,
          teamId1,
          teamId2,
          nextBracketWinner,
          nextBracketLoser
        });
      }
    }
  }

  private findMapByName(name: string, arr: IMap[]): IMap | undefined {
    for (const el of arr) {
      if (el && el.name === name) return el;
    }
    return;
  }

  private findMatchByMatchId(matchId: string, arr: IMatch[]): IMatch | undefined {
    for (const el of arr) {
      if (el && el.matchId === matchId) return el;
    }
    return;
  }

  private findTeamByName(name: string): ITeam | undefined {
    for (const el of this.lstTeams) {
      if (el && el.name === name) return el;
    }
    return;
  }

  private findBracketByMatchId(matchId: string, arr: IBracket[]): IBracket | undefined {
    for (const el of arr) {
      if (el && el.matchId === matchId) return el;
    }
    return;
  }

  public getBracketByMatchId(matchId: string): IBracket | undefined {
    return this.findBracketByMatchId(matchId, this.brackets);
  }

  public winnerSelected(event: {matchId: string, teamName: string}) {
    let nextWinnerMatchId = "";
    let nextLoserMatchId = "";
    let loserTeamName = "";
    this.brackets.forEach(v => {
      if(v.matchId === event.matchId && v.nextBracketWinner) {
        nextWinnerMatchId = v.nextBracketWinner?.matchId || "";
        nextLoserMatchId = v.nextBracketLoser?.matchId || "";
        loserTeamName = (v.teamId1?.name === event.teamName ? v.teamId2?.name : v.teamId1?.name) || "";
      }
    })

    this.brackets.forEach(v => {
      if(v.matchId === nextWinnerMatchId) {
        console.log(v.teamId1?.name + ' === ' + event.teamName);
        if((v.teamId1?.name === event.teamName || v.teamId2?.name === event.teamName || !v.teamId1
            || v.teamId1?.name === loserTeamName || v.teamId2?.name === loserTeamName)) {
          v.teamId1 = this.findTeamByName(event.teamName);
        } else {
          v.teamId2 = this.findTeamByName(event.teamName);
        };
      }

      if(v.matchId === nextLoserMatchId) {
        if(v.teamId1?.name === event.teamName || v.teamId2?.name === event.teamName ||
          v.teamId1?.name === loserTeamName || v.teamId2?.name === loserTeamName || !v.teamId1) {
          v.teamId1 = this.findTeamByName(loserTeamName);
        } else {
          v.teamId2 = this.findTeamByName(loserTeamName);
        };
      }
    })
  }
}
