export interface IGame {
    //id: number,
    startGame: Date,
    endGame: Date | null,
    turnsUsed: number | null,
    overallAccuracy: number | null,
    //status: GameStatus
    status: string
}

// export enum GameStatus {
//     "Pending" = 0,
//     "Won" = 1,
//     "Lost" = 2
// }