export interface IShip {
    size: number;
    group: number;
    state: ShipState;
}

export enum ShipState {
    "Empty" = 0,
    "Ship" = 1,
    "Hit" = 2,
    "Sea" = 3,
    "Sunk" = 4
}