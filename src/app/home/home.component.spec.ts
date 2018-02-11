import { JobListComponent } from './../job-list/job-list.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';

import { HomeComponent } from './home.component';
import { InternApiService } from '../shared/services/intern-api/intern-api.service';
import { RouterLinkStubDirective } from '../shared/directives/router-link-stub.directive';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  // const fakeActivatedRoute = {
  //   snapshot: { data: { } }
  // } as ActivatedRoute;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule
      ],
      declarations: [
        HomeComponent,
        JobListComponent,
        RouterLinkStubDirective
      ],
      providers: [
        InternApiService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
