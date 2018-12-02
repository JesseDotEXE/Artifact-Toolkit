import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from "@angular/router";
import { CollectionComponent } from './components/collection/collection.component';
import { GameRecordComponent } from './components/game-record/game-record.component';
import { GameRecordService } from './services/game-record/game-record.service';
import { CardCollectionService } from './services/collection/card-collection.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule,
         MatButtonModule, 
         MatDividerModule,
         MatTableModule,
         MatCardModule,
         MatDialogModule,
         MatFormFieldModule,
         MatInputModule,
         MatGridListModule, 
         MatIconModule} from "@angular/material";
import { GameRecordEditDialogComponent } from './components/game-record-edit-dialog/game-record-edit-dialog.component';
import { GameRecordCreateDialogComponent } from './components/game-record-create-dialog/game-record-create-dialog.component';
import { CardComponent } from './components/card/card.component';

const routes: Routes = [
  { path: 'collection', component: CollectionComponent },
  { path: 'tracker', component: GameRecordComponent},
  { path: '', redirectTo: '/tracker', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    CollectionComponent,
    GameRecordComponent,
    GameRecordEditDialogComponent,
    GameRecordCreateDialogComponent,
    CardComponent
  ],
  entryComponents: [
    GameRecordEditDialogComponent,
    GameRecordCreateDialogComponent
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
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatGridListModule,
    MatIconModule
  ],
  providers: [
    GameRecordService,
    CardCollectionService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
