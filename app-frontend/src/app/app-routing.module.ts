import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { ThreadComponent } from './thread/thread.component';
import { ReplyComponent } from './reply/reply.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewpostsComponent } from './newposts/newposts.component';
import { MarketplaceComponent } from './marketplace/marketplace.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PostComponent } from './post/post.component';
import { SubforumComponent } from './subforum/subforum.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginGuard } from './auth/login.guard';
import { ThreadlistComponent } from './threadlist/threadlist.component';
import { SearchComponent } from './search/search.component';
import { AdminComponent } from './admin/admin.component';


const routes: Routes = [
  {path:'forums',component:HomeComponent},
  {path:'newposts',component:NewpostsComponent},
  {path:'marketplace',component:MarketplaceComponent},
  {path:'login',component:LoginComponent,canActivate: [LoginGuard]},
  {path:'register',component:RegisterComponent,canActivate: [LoginGuard]},
  {path:'post',component:PostComponent},
  {path:'subforum',component:SubforumComponent},
  {path:'reply',component:ReplyComponent},
  {path:'thread',component:ThreadComponent},
  {path:'search',component:SearchComponent},
  {path:'admin',component:AdminComponent},


  {path:'profile',component:ProfileComponent,canActivate: [AuthGuard]},
  { path: '',   redirectTo: '/forums', pathMatch: 'full' }, // redirect to `first-component`
  { path: '**', component: HomeComponent },









];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
