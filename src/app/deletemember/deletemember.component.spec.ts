import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DeletememberComponent } from './deletemember.component';

describe('DeletememberComponent', () => {
  let component: DeletememberComponent;
  let fixture: ComponentFixture<DeletememberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletememberComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DeletememberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
