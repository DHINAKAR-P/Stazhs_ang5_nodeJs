import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from './login.component';
import { NgModule } from '@angular/core';
import { LoginService } from './login.service';
import { FormsModule } from '@angular/forms';
import { BrowserModule, By } from '@angular/platform-browser';
import { AuthGuard } from './auth.guard';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../config/api.service';
import { ConfigService } from '../config/config.service';
import { Constants } from '../config/Constant';
import { SharedService } from '../shared/shared.service';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod } from '@angular/http';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let subject: LoginService = null;
  let backend: MockBackend = null;

  TestBed.overrideComponent(LoginComponent, {
    set: {
      providers: [
        {
          provide: Router,
          useClass: class { navigate = jasmine.createSpy('navigate'); }
        }
      ],
    }
  });

  beforeEach(inject([LoginService, MockBackend], (loginService: LoginService, mockBackend: MockBackend) => {
  subject = loginService;
  backend = mockBackend;
  }));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      // declarations: [ LoginComponent ],
      // imports: [
      //   RouterTestingModule
      // ]
      imports: [
        RouterModule.forRoot([{
          path: '',
          component: LoginComponent
        }]),
        FormsModule,
        BrowserModule,
        RouterTestingModule,
        HttpClientModule
      ],
      declarations: [
        LoginComponent
      ],
      // providers: [ AuthGuard, LoginService, { provide: APP_BASE_HREF, useValue: '/' }]
      providers: [
        LoginService,
        ApiService,
        AuthGuard,
        ConfigService,
        SharedService,
        Constants,
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
//   it('should enter username and password', () => {
// fixture.debugElement.query(By.css('input.'))
//   });

it('#login should call endpoint and return it\'s result', (done) => {
  backend.connections.subscribe((connection: MockConnection) => {
    let options = new ResponseOptions({
      body: JSON.stringify({ success: true })
    });
    connection.mockRespond(new Response(options));
  });

  subject.login({ username: 'admin', password: 'secret' })
    .subscribe((response) => {
      expect(response.json()).toEqual({ success: true });
      done();
    });
});

});
