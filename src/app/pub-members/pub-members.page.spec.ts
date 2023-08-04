import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PubMembersPage } from './pub-members.page';

describe('PubMembersPage', () => {
  let component: PubMembersPage;
  let fixture: ComponentFixture<PubMembersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PubMembersPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PubMembersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
