import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { MenuComponent } from './components/menu/menu.component';
import { GameSetupComponent } from './components/game-setup/game-setup.component';
import { GameBoardComponent } from './components/game-board/game-board.component';
import { GameListComponent } from './components/game-list/game-list.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'game-setup', component: GameSetupComponent },
  { path: 'game-board', component: GameBoardComponent },
  { path: 'game-list', component: GameListComponent },
  { path: 'page-not-found', component: PageNotFoundComponent },
  { path: '**', redirectTo: "page-not-found" }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    GameSetupComponent,
    GameBoardComponent,
    GameListComponent,    
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
