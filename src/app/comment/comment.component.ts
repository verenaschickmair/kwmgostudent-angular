import {ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {Comment} from "../shared/comment";
import {User} from "../shared/user";
import {UserService} from "../shared/user.service";
import {AuthenticationService} from "../shared/authentication.service";
import {CommentService} from "../shared/comment.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input() comment! : Comment;
  @Output() deleteEvent = new EventEmitter();
  user? : User;
  date? : string;

  constructor(private us : UserService,
              private authService : AuthenticationService,
              private cs : CommentService,
              private router : Router) { }

  ngOnInit(): void {
    if(this.comment.created_at)
      this.date = new Date(this.comment.created_at).toLocaleDateString("de-DE");
    this.us.getSingle(this.comment.user_id).subscribe(
      (user) => this.user = user);
  }

  isCurrentUserOwner() : boolean{
    return this.authService.getCurrentUserId() === this.comment.user_id;
  }

  public deleteComment(){
    if(confirm("Willst du dieses Kommentar wirklich löschen?"))
      console.log(this.comment.id)
      this.cs.remove(this.comment.id).subscribe((del) => {
        this.deleteEvent.emit();
        new Notification("Erfolgreich gelöscht");
      })
  }

}
