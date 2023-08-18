import { Component } from '@angular/core';
import { Router, NavigationExtras } from "@angular/router";
import { IShip, ShipState } from '../../interfaces/ship';

@Component({
  selector: 'app-game-setup',
  templateUrl: './game-setup.component.html',
  styleUrls: ['./game-setup.component.sass']
})

export class GameSetupComponent {

  public constructor(private router: Router) { }

  public boardSize: number = 10;
  public ships: number = 20;
  public turns: any = "Infinite";
  public levels: any[] = [{ value: "Infinite", text: "Easy" }, { value: 100, text: "Medium" }, { value: 50, text: "Hard" }];
  public board: IShip[][] = [];

  public changeLevel(event: any): void {
    this.turns = event.currentTarget.value;
  }

  public startGame(): void {

    // initialize array
    this.board = new Array(this.boardSize).fill([]).map(() => new Array(this.boardSize));

    // randomly set groups
    this.randomlySetGroups();

    // randomly set ships
    this.randomlySetShips();

    // pass parameters via NavigationExtras -> state
    let navigationExtras: NavigationExtras = { state: { board: this.board, turns: this.turns, ships: this.ships } };

    // navigate to board component
    this.router.navigate(["game-board"], navigationExtras);
  }

  public placeShip(row: number, column: number, size: number, direction: 'horizontal' | 'vertical', group: number): boolean {

    if (direction === 'horizontal' && column + size > this.boardSize) {
      return false;
    }

    if (direction === 'vertical' && row + size > this.boardSize) {
      return false;
    }

    for (let i = 0; i < size; i++) {
      if (direction === 'horizontal' && this.board[row][column + i].size !== 0) {
        return false;
      }
      if (direction === 'vertical' && this.board[row + i][column].size !== 0) {
        return false;
      }
    }

    for (let i = 0; i < size; i++) {
      if (direction === 'horizontal') {
        this.board[row][column + i] = { size: size, state: ShipState.Ship, group: group };
      }
      else {
        this.board[row + i][column] = { size: size, state: ShipState.Ship, group: group };
      }
    }

    return true;
  }

  public randomlySetShips(): void {

    const shipSizes = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];

    for (const size of shipSizes) {

      let placed = false;
      let group = Math.floor(Math.random() * 1000000);

      while (!placed) {

        const row = Math.floor(Math.random() * this.boardSize);
        const column = Math.floor(Math.random() * this.boardSize);
        const direction = Math.random() < 0.5 ? 'horizontal' : 'vertical';

        placed = this.placeShip(row, column, size, direction, group);
      }
    }
  }

  public randomlySetGroups(): void {
    for (let row = 0; row < this.boardSize; row++) {
      for (let col = 0; col < this.boardSize; col++) {
        this.board[row][col] = { size: 0, group: Math.floor(Math.random() * 1000000), state: ShipState.Empty };
      }
    }
  }

}
