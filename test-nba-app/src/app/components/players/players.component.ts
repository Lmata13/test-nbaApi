import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Services
import { ApiService } from '../../services/api.service';

// Models
import { Player } from '../models/player.model';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {
  _players: Player[];

  constructor(private router: Router, private apiService: ApiService) { }

  ngOnInit() {
    this.getPlayerList();
  }

  getPlayerList() {
    this.apiService.getPlayerList().subscribe((players: Player[]) => {
      this._players = players;
    });
  }

}
