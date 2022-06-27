import { AfterContentChecked, ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IUser } from '@univ-exam/common';
import { AuthService } from '../../services/auth.service';
import { HeaderService } from './header.service';

@Component({
  selector: 'univ-exam-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, AfterContentChecked {

  @Output()search = new EventEmitter();
  isLogged: boolean = false;
  user?: IUser;
  searchValue: string = '';
  constructor(
    private readonly authService: AuthService,
    private readonly headerService: HeaderService,
    private readonly changeDetector: ChangeDetectorRef,
  ) {
  }

  ngOnInit(): void {
    this.headerService.getUser();
    this.headerService.loggedUser.subscribe((value) =>{
      this.user = value;
    });
    this.authService.userIsLogged.subscribe((value) => { //recevoir l'evenement
      this.isLogged = value;
    });
    this.isLogged = this.authService.isLogged();  
  }
  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }
  logout(){
    this.authService.logout();  
  }
  setSearchValue(){
    this.headerService.setSearch(this.searchValue.trim());
    this.searchValue='';
  }
}
