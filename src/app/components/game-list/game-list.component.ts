import { Component } from '@angular/core';
import { GameService } from 'src/app/services/game/game.service';
import { IGame } from '../../interfaces/game';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.sass']
})

export class GameListComponent {

  public games: IGame[] = [];

  constructor(private gameService: GameService) {
    this.games = gameService.getGames();
  }

}
