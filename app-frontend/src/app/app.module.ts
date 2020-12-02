import { ModalComponent } from './home/modal/modal.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NavigationbarComponent } from './navigationbar/navigationbar.component';
import { NewpostsComponent } from './newposts/newposts.component';
import { MarketplaceComponent } from './marketplace/marketplace.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { PostComponent } from './post/post.component';
import { SubforumComponent } from './subforum/subforum.component';
import { ReplyComponent } from './reply/reply.component';
import { ThreadComponent } from './thread/thread.component';
import { HomeComponent } from './home/home.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalconfirmComponent } from './home/modal/modalconfirm.component';
import { ModalconfirmComponentSubForum } from './subforum/modal/modalconfirm.component';
import { ModalComponentSubForum } from './subforum/modal/modal.component';
import { ModalconfirmComponentThread } from './thread/modal/modalconfirm.component';
import { ModalComponentThread } from './thread/modal/modal.component';
import { ModalComponentEdit } from './profile/modal/modal.component';
import { ModalconfirmComponentEdit } from './profile/modal/modalconfirm.component';


import { AuthGuard } from './auth/auth.guard';
import { LoginGuard } from './auth/login.guard';
import { ThreadlistComponent } from './threadlist/threadlist.component';
import { SearchComponent } from './search/search.component';
import { SubforumlistComponent } from './subforumlist/subforumlist.component';
import { AdminComponent } from './admin/admin.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavigationbarComponent,
    NewpostsComponent,
    MarketplaceComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    PostComponent,
    SubforumComponent,
    ReplyComponent,
    ThreadComponent,
    HomeComponent,
    ModalComponent,
    ModalconfirmComponent,
    ModalconfirmComponentSubForum,
    ModalComponentSubForum,
    ModalconfirmComponentThread,
    ModalComponentThread,
    ThreadlistComponent,
    SearchComponent,
    SubforumlistComponent,
    AdminComponent,
    ModalComponentEdit,
    ModalconfirmComponentEdit
  
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    NgbModule
  ],
  providers: [AuthGuard,LoginGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
