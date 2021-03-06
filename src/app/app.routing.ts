import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {OfferListComponent} from "./offer-list/offer-list.component";
import {LoginComponent} from "./login/login.component";
import {ProfileComponent} from "./profile/profile.component";
import {SubjectListComponent} from "./subject-list/subject-list.component";
import {SubjectDetailComponent} from "./subject-detail/subject-detail.component";
import {OfferDetailComponent} from "./offer-detail/offer-detail.component";
import {OfferFormComponent} from "./offer-form/offer-form.component";
import {CanNavigateToAdminGuard} from "./can-navigate-to-admin.guard";

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'subjects', component: SubjectListComponent },
  { path: 'offers', component: OfferListComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile/:id', component: ProfileComponent, canActivate:[CanNavigateToAdminGuard] },
  { path: 'subjects/:id', component: SubjectDetailComponent },
  { path: 'offers/:id', component: OfferDetailComponent },
  { path: 'new-offer', component: OfferFormComponent, canActivate:[CanNavigateToAdminGuard] },
  { path: 'edit-offer/:id', component: OfferFormComponent, canActivate:[CanNavigateToAdminGuard] },
];

@NgModule ({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [CanNavigateToAdminGuard]

})

export class AppRoutingModule { }
