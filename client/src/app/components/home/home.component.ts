import { Component, OnInit } from '@angular/core';
import { AuthTokenManager } from 'src/app/services/auth-token-manager.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  list = []

  constructor(private authTokenManager: AuthTokenManager,
    private router: Router) {
      authTokenManager.get('/interviews').subscribe(data => {
        if (!data.success) {
          alert('bpoo');
        }
        else {
          console.log(data);
          this.list = data.list;
        }
      });
  }

  ngOnInit() {
  }

}
