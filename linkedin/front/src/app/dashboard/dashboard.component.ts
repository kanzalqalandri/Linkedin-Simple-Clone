import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  posts: any[] = [];

  //images: string[] = [];
  

  constructor(private router: Router,private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchPosts();
    
  }


 



  fetchPosts(): void {
    this.http.get<any>('http://localhost:5001')
      .subscribe(
        (response) => {
          this.posts = response.otherPosts as [];

          //this.fetchImages();
        },
        (error) => {
          console.error('Error retrieving posts:', error);
        }
      );
  }


  fetchImages(): void {


    // this.http.get<any[]>('http://localhost:3000/images').subscribe(
    //   (response) => {
    //     // Assuming the server returns an array of image URLs
    //     this.images = response;
    //   },
    //   (error) => {
    //     console.error(error);
    //     alert('Failed to load images.');
    //   }
    // );

    this.posts.forEach((post) => {
      this.http.get('http://localhost:5001/api/v1/images/' + post.image, { responseType: 'blob' }).subscribe(
        (data: Blob) => {
          post.imageSrc = URL.createObjectURL(data);
        },
        (error) => {
          console.error('Error fetching image:', error);
        }
      );
    });

  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(["login"]);
  }

}
