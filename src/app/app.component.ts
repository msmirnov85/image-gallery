import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'image-gallery';
  public isAuthorized: boolean = false;

  constructor(
    private authService: AuthService
  ) {  }

  async ngOnInit() {
    await this.authService.initToken();
    this.isAuthorized = true;
  }

}
