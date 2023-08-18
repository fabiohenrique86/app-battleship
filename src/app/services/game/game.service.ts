import { Injectable } from '@angular/core';
import { IGame } from '../../interfaces/game';

@Injectable({
  providedIn: 'root'
})

export class GameService {

  constructor() {

  }

  public getGames(): IGame[] {
    let games = localStorage.getItem('games');
    return games == null ? [] : JSON.parse(games);
  }

  // to make it simple, saved in a localStorage, however in real world this would be saved in server side database
  public saveGame(game: IGame): void {
    
    let games: IGame[] = [];

    let lsGames = localStorage.getItem('games');

    if (lsGames == null) {
      games.push(game);
      localStorage.setItem('games', JSON.stringify(games));
    }
    else {
      games = JSON.parse(lsGames);      
      games.push(game);
      localStorage.setItem('games', JSON.stringify(games));
    }
  }

}
