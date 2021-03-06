import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {SubjectListService} from "../shared/subject-list.service";
import {Subject} from "../shared/subject";
import {SubjectFactoryService} from "../shared/subject-factory.service";
import {OfferListService} from "../shared/offer-list.service";
import {Offer} from "../shared/offer";
import {AuthenticationService} from "../shared/authentication.service";
import {Location} from '@angular/common';

@Component({
  selector: 'app-subject-detail',
  templateUrl: './subject-detail.component.html',
  styleUrls: ['./subject-detail.component.css']
})
export class SubjectDetailComponent implements OnInit {

  subject : Subject = SubjectFactoryService.empty();
  offers? : Offer[];
  finished = false;

  constructor(private route : ActivatedRoute,
              private ss: SubjectListService,
              private os: OfferListService,
              private authService : AuthenticationService,
              private location : Location,
              private router : Router
              ) { }

  ngOnInit(): void {
    const params = this.route.snapshot.params;
    this.ss.getSingle(params['id']).subscribe(subject => {
      this.subject = subject;
      this.os.getAllBySubjectId(params['id']).subscribe(offers => {
        this.offers = offers;
        this.finished = true;
      });
    });
  }

  navigate(){
    this.router.navigateByUrl("/new-offer");
  }

  isLoggedIn() : boolean{
    return this.authService.isLoggedIn();
  }

  public stepBack(): void{
    this.location.back();
  }

}
