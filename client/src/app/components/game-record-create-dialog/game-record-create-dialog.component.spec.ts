import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameRecordCreateDialogComponent } from './game-record-create-dialog.component';

describe('GameRecordCreateDialogComponent', () => {
  let component: GameRecordCreateDialogComponent;
  let fixture: ComponentFixture<GameRecordCreateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameRecordCreateDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameRecordCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
