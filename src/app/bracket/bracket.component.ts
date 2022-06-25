import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IBracket } from '../interfaces/IBracket';

@Component({
  selector: 'app-bracket',
  templateUrl: './bracket.component.html',
  styleUrls: ['./bracket.component.scss']
})
export class BracketComponent implements OnInit {

  @Input() bracket?: IBracket;
  @Input() col: number = 0;
  @Input() row: number = 0;

  @Output() evtSelectWinner: EventEmitter<{ matchId: string, teamName: string }> = new EventEmitter<{ matchId: string, teamName: string }>();

  public style: { [klass: string]: any; } | null = null;
  public team1Class = "";
  public team2Class = "";
  public hasToDisplay = false;

  constructor() { }

  ngOnInit(): void {
    this.style = { left: this.col * 340 + 'px', top: this.row * 115 + 'px' };
  }

  public select(matchId: string | undefined, teamName: string | undefined) {
    if (matchId && teamName) {
      this.team1Class = teamName === this.bracket?.teamId1?.name ? "winner" : "loser";
      this.team2Class = teamName === this.bracket?.teamId2?.name ? "winner" : "loser";
      this.evtSelectWinner.emit({ matchId, teamName });
    }
  }

  public toggleDisplayMaps() {
    this.hasToDisplay = !this.hasToDisplay;
  }
}
