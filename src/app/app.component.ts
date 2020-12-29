import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'image-gallery';

  constructor(
    private authService: AuthService
  ) {
    this.authService.initToken();
  }

  public get isAuthorized(): boolean {
    return !!this.authService.token;
  }

}
