import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { IBracket } from '../interfaces/IBracket';
import { IMap } from '../interfaces/IMap';

import mythicsJson from '../../assets/data/mythics.json';
import teamsJson from '../../assets/data/teams.json';
import { ITeam } from '../interfaces/ITeam';

@Component({
  selector: 'app-recap',
  templateUrl: './recap.component.html',
  styleUrls: ['./recap.component.scss']
})
export class RecapComponent implements AfterViewInit {

  @Input() brackets?: IBracket[];

  public maps: IMap[] = [];
  public teams: ITeam[] = [];
  public mapTeam = new Map();
  public teamMap = new Map();
  public mapsOrTeams = true;

  constructor() { }

  ngAfterViewInit(): void {
    for (const mythic of mythicsJson) {
      this.maps.push(mythic);
    }

    for (const team of teamsJson) {
      this.teams.push(team);
    }

    this.refreshDataBrackets();
  }

  private hash(str: string) {
    //set variable hash as 0
    var hash = 0;
    // if the length of the string is 0, return 0
    if (str.length == 0) return hash;
    for (let i = 0; i < str.length; i++) {
      const ch = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + ch;
      hash = hash & hash;
    }
    return hash;
  }

  public refreshDataBrackets() {
    this.mapTeam = new Map();
    if (this.brackets) {
      for (const bracket of this.brackets) {
        if (bracket.teamId1) {
          this.addToMapTeam({ teamName: bracket.teamId1.name, mapName: bracket.match.map1.name, mustPlay: true });
          this.addToMapTeam({ teamName: bracket.teamId1.name, mapName: bracket.match.map2.name, mustPlay: false });
          this.addToMapTeam({ teamName: bracket.teamId1.name, mapName: bracket.match.map3.name, mustPlay: false });
          this.addToMapTeam({ teamName: bracket.teamId1.name, mapName: bracket.match.map4.name, mustPlay: false });
          this.addToMapTeam({ teamName: bracket.teamId1.name, mapName: bracket.match.map5.name, mustPlay: false });
          if(bracket.match.map6 && bracket.match.map7) {
            this.addToMapTeam({ teamName: bracket.teamId1.name, mapName: bracket.match.map6.name, mustPlay: false });
            this.addToMapTeam({ teamName: bracket.teamId1.name, mapName: bracket.match.map7.name, mustPlay: false });
          }
        }
        if (bracket.teamId2) {
          this.addToMapTeam({ teamName: bracket.teamId2.name, mapName: bracket.match.map1.name, mustPlay: true });
          this.addToMapTeam({ teamName: bracket.teamId2.name, mapName: bracket.match.map2.name, mustPlay: false });
          this.addToMapTeam({ teamName: bracket.teamId2.name, mapName: bracket.match.map3.name, mustPlay: false });
          this.addToMapTeam({ teamName: bracket.teamId2.name, mapName: bracket.match.map4.name, mustPlay: false });
          this.addToMapTeam({ teamName: bracket.teamId2.name, mapName: bracket.match.map5.name, mustPlay: false });
          if(bracket.match.map6 && bracket.match.map7) {
            this.addToMapTeam({ teamName: bracket.teamId2.name, mapName: bracket.match.map6.name, mustPlay: false });
            this.addToMapTeam({ teamName: bracket.teamId2.name, mapName: bracket.match.map7.name, mustPlay: false });
          }
        }
      }
    }
  }

  private addToMapTeam(key: { teamName: string, mapName: string, mustPlay: boolean }) {
    const hash = this.hash(key.teamName + key.mapName + key.mustPlay);
    if (this.mapTeam.has(hash)) {
      this.mapTeam.set(hash, this.mapTeam.get(hash) + 1);
    } else {
      this.mapTeam.set(hash, 1);
    }
  }

  public getFromMapTeam(key: { teamName: string, mapName: string, mustPlay: boolean }) {
    const hash = this.hash(key.teamName + key.mapName + key.mustPlay);
    let ret = 0;
    if (this.mapTeam.has(hash)) {
      ret = this.mapTeam.get(hash);
    }

    return ret;
  }

}
