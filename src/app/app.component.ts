import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Entity } from './Entity';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  //This makes us able to send requests
  constructor(private http: HttpClient)
  {}

  //Page related
  title = 'program';
  isSmallScreen = window.innerWidth < 500;
  pic:string = this.isSmallScreen ? "/images/pattern-divider-desktop.svg" : "/images/pattern-divider-mobile.svg";
  adviceNumber:number = 1;
  loading:boolean = false;

  //API related
   headers = new HttpHeaders({
    'x-api-key': '5VFi9ZGJGbqU4OzHR9V4eg==lQ5ijpCo0A8HOKQX'
  });
  quote:string = "The only way to do great work is to love what you do";
  FetchData() : void
  {
    let url = "https://api.api-ninjas.com/v1/quotes";
    this.loading = true;

    //So we get an entity (pretend the array doesnt exist)
    this.http.get<Entity[]>(url, {headers: this.headers})
      .subscribe(
        //We get the response and map it to entity itself and then we get the quote
        (resp: Entity[]) => {
          this.quote = resp[0].quote;
          this.loading = false;
          this.adviceNumber++;
        },
        (error) => {
          console.error('Error fetching data:', error);
          this.loading = false;
        }
      );
  }
}

