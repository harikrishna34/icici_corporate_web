import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Route } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private route: Router, private activatedRoute: ActivatedRoute) { }


  token: any
  href: any
  currentURL: any;
  ngOnInit(): void {
    this.token = localStorage.getItem('x-fiftyaccess-token')
    // if (this.token == null) {
    //   this.route.navigate(["App/Login"],)
    // }
  }


}