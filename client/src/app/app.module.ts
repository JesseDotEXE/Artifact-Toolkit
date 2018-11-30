import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from "@angular/router";
import { CollectionComponent } from './components/collection/collection.component';
import { GameRecordComponent } from './components/gamerecord/game-record.component';
import { GameRecordService } from './services/gamerecord/game-record.service';
import { CardCollectionService } from './services/collection/card-collection.service';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule,
         MatButtonModule, 
         MatDividerModule,
         MatTableModule,
         MatCardModule } from "@angular/material";

const routes: Routes = [
  { path: 'collection', component: CollectionComponent },
  { path: 'tracker', component: GameRecordComponent},
  { path: '', redirectTo: '/tracker', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    CollectionComponent,
    GameRecordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatDividerModule,
    MatTableModule,
    MatCardModule
  ],
  providers: [
    GameRecordService,
    CardCollectionService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
