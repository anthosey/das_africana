import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModifyMemberPage } from './modify-member.page';

describe('ModifyMemberPage', () => {
  let component: ModifyMemberPage;
  let fixture: ComponentFixture<ModifyMemberPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifyMemberPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModifyMemberPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
