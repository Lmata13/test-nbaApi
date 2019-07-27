import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PlayersComponent } from './components/players/players.component';
import { PlayerDetailComponent } from './components/player-detail/player-detail.component';

const routes: Routes = [
    // { path: '', component: AppComponent },
    { path: 'players', component: PlayersComponent },
    { path: 'player/:id', component: PlayerDetailComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
