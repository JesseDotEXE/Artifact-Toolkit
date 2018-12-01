import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameRecordEditDialogComponent } from './game-record-edit-dialog.component';

describe('GameRecordEditDialogComponent', () => {
  let component: GameRecordEditDialogComponent;
  let fixture: ComponentFixture<GameRecordEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameRecordEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameRecordEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
