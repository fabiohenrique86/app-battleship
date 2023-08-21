import { Component } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { HttpClient } from '@angular/common/http';

import { GameService } from 'src/app/services/game/game.service';
import { IGame } from '../../interfaces/game';
import { IShip, ShipState } from '../../interfaces/ship';

//import { IGame, GameStatus } from '../interfaces/game';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.sass']
})

export class GameBoardComponent {

  public board: IShip[][] = [];
  public ships!: number;
  public turns!: any;
  public turnsUsed: number = 0;
  public turnsOk: number = 0;
  public turnsNOk: number = 0;
  public gameOver: boolean = false;
  public game!: IGame;
  public shotMissed: boolean = false;
  public shotLanded: boolean = false;

  public constructor(private route: ActivatedRoute, private gameService: GameService, private http: HttpClient) {

    this.board = window.history.state.board;
    this.turns = window.history.state.turns;
    this.ships = window.history.state.ships;

    // stars a game with 'pending' status and start game
    this.game = {
      startGame: new Date(),
      endGame: null,
      turnsUsed: 0,
      overallAccuracy: null,
      //status: GameStatus.Pending
      status: "Pending"
    };
  }

  public takeShot(row: number, column: number): void {

    if (this.gameOver)
      return;

    if (this.board[row][column].state == ShipState.Empty) {

      this.board[row][column].state = ShipState.Sea;
      this.turnsUsed++;
      this.turnsNOk++;
      this.shotMissed = true;
      this.shotLanded = false;
    }
    else if (this.board[row][column].state == ShipState.Ship) {

      this.turnsOk++;
      this.turnsUsed++;
      this.shotMissed = false;
      this.shotLanded = true;
      this.board[row][column].state = ShipState.Hit;

      if (this.isShipSunk(this.board[row][column].group)) {
        this.markShipAsSunk(this.board[row][column].group);
      }
      
    }

    this.isGameOver();
  }

  public isGameOver(): boolean
  {
    this.game.overallAccuracy = this.turnsOk / this.turnsUsed;
    this.game.turnsUsed = this.turnsUsed;

    if (this.turnsOk == this.ships)
    {
      this.gameOver = true;
      this.game.endGame = new Date();      
      this.game.status = "Won";      

      return true;
    }
    else if (this.turnsUsed >= this.turns)
    {
      this.gameOver = true;
      this.game.endGame = new Date();
      this.game.status = "Lost";

      return true;
    }

    return false;
  }

  public isShipSunk(group: number): boolean {

    let searchResults = [];
    for (let row = 0; row < this.board.length; row++) {
      for (let col = 0; col < this.board[row].length; col++) {
        if (this.board[row][col].group === group) {
          searchResults.push(this.board[row][col]);
        }
      }
    }

    let isSunk = true;
    for (let row = 0; row < searchResults.length; row++) {
      if (searchResults[row].state != ShipState.Hit)
      isSunk = false;
    }

    return isSunk;
  }

  public markShipAsSunk(group: number): void {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (this.board[i][j].group == group) {
          this.board[i][j].state = ShipState.Sunk;
        }
      }
    }
  }

  public saveGame(game: IGame): void {
    this.gameService.saveGame(game);
  }

}
