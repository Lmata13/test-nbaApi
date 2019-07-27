import { Injectable } from '@angular/core';
import { Http, Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchmap';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/of';

import { environment } from '../../environments/environment';
import { Player } from '../components/models/player.model';

@Injectable()
export class ApiService {
  results: string[];

  perMode = 'Totals';
  leagueId = '00';
  season = '2016-17';
  seasonType = 'Regular Season';

  constructor(private http: Http, private jsonp: Jsonp) { }

  private statsQueryString = `PerMode=${this.perMode}&LeagueID=${this.leagueId}&Season=${this.season}&SeasonType=${this.seasonType}&callback=JSONP_CALLBACK`;

  getPlayerList(): Observable<Player[]> {
    const url = `${environment.base_url}leaguedashplayerbiostats/?${this.statsQueryString}`;
    const teams$ = this.getTeams(this.season);

    return this.jsonp.get(url)
        .retry(3)
        .withLatestFrom(teams$)
        .map(r => {
            const sets = r[0].json().resultSets[0];
            const headers: Array<any> = sets.headers;
            const playerIdIndex = headers.indexOf('PLAYER_ID');
            const playerNameIndex = headers.indexOf('PLAYER_NAME');
            const playerAgeIndex = headers.indexOf('AGE');
            const playerTeamIdIndex = headers.indexOf('TEAM_ID');
            return sets.rowSet.map(i => {
                const playerInfo = new Player();
                playerInfo.id = i[playerIdIndex];
                playerInfo.fullName = i[playerNameIndex];
                playerInfo.age = i[playerAgeIndex];
                playerInfo.teamId = i[playerTeamIdIndex];
                const teamName = r[1].find(t => t.teamId === playerInfo.teamId).teamName;
                playerInfo.teamName = teamName;
                return playerInfo;
            }
        );
    });
  }

  getPlayerById(playerId: number, season = '2016-17') {
    return this.http.get(`assets/players${season}.json`)
        .map(r => r.json().league.standard.filter(item =>
            item.personId === playerId ));
  }

  getTeams(season: any) {
    return this.http.get(`assets/teams${season}.json`).map(r => r.json());
  }

}

