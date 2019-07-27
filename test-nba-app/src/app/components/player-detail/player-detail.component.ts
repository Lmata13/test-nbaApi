import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ApiService } from '../../services/api.service';
import { Player } from '../models/player.model';

@Component({
  selector: 'app-player-detail',
  templateUrl: './player-detail.component.html',
  styleUrls: ['./player-detail.component.css']
})
export class PlayerDetailComponent implements OnInit {
  player: Player;
  playerNotFound: boolean;

  constructor(private route: ActivatedRoute, private apiService: ApiService) {
    route.params.subscribe(p =>  {
      apiService.getPlayerById(p['id']).subscribe(player => {
        if (player.length > 0) {
          this.player = player[0];
        } else {
          this.playerNotFound = true ;
        }
      }
      );
    });
  }

  ngOnInit() {
  }

}
