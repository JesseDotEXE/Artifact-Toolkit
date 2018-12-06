import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from "@angular/router";
import { CollectionComponent } from './components/collection/collection.component';
import { MatchTrackerComponent } from './components/match-tracker/match-tracker.component';
import { MatchTrackerService } from './services/match-tracker/match-tracker.service';
import { EditMatchComponent } from './components/edit-match/edit-match.component';
import { CreateMatchComponent } from './components/create-match/create-match.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CollectionService } from './services/collection/collection.service';
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
         MatIconModule,
         MatSelectModule } from "@angular/material";

const routes: Routes = [
  { path: 'collection', component: CollectionComponent },
  { path: 'tracker', component: MatchTrackerComponent},
  { path: '', redirectTo: '/tracker', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    CollectionComponent,
    MatchTrackerComponent,
    EditMatchComponent,
    CreateMatchComponent
  ],
  entryComponents: [
    EditMatchComponent,
    CreateMatchComponent
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
    MatIconModule,
    FlexLayoutModule,
    MatSelectModule
  ],
  providers: [
    MatchTrackerService,
    CollectionService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
