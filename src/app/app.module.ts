import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
<<<<<<< HEAD
=======
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

>>>>>>> 85ade48e87639e88e101ef3798709f1a874eb5ca

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { InternApiService } from './shared/services/intern-api/intern-api.service';
<<<<<<< HEAD

import { FilterPipe} from './navbar/filter.pipe';
import { FormsModule }   from '@angular/forms';
import { JobsComponent } from './jobs/jobs.component';
=======
import { AddJobComponent } from './add-job/add-job.component';
import { JobListComponent } from './job-list/job-list.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { FooterComponent } from './footer/footer.component';
>>>>>>> 85ade48e87639e88e101ef3798709f1a874eb5ca



@NgModule({
  declarations: [
    FilterPipe,
    AppComponent,
    NavbarComponent,
    HomeComponent,
    PageNotFoundComponent,
<<<<<<< HEAD
    JobsComponent
=======
    AddJobComponent,
    JobListComponent,
    ContactUsComponent,
    FooterComponent,
    PageNotFoundComponent
>>>>>>> 85ade48e87639e88e101ef3798709f1a874eb5ca
  ],
  imports: [
    FormsModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    BsDropdownModule.forRoot()
  ],
  providers: [
    InternApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
