import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {

  

  post = {
    content: '',
    image:''
  };
loggedInUser: any;
//selectedFile: File;

selectedFile: File | null = null;
    
    //selectedFile: any;
    //File | null = null;

  

  //new
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
   // this.selectedFile = (event.target as HTMLInputElement).files?.item(0) || null;
  }
  //new

  constructor(private http: HttpClient) { }


  onUpload() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('image', this.selectedFile, this.selectedFile.name);

      this.http.post<any>('http://localhost:3005/api/v1/images/upload', formData).subscribe(
        (response) => {
          console.log(response);
          alert('Photo uploaded successfully!');
        },
        (error) => {
          console.error(error);
          alert('Post uploaded successfully!');
        }
      );
    }

  }
  


//http://localhost:9000/routes/post/post
  submitPost() {

    if (this.selectedFile) {

      const formData = new FormData();
      formData.append('content', this.post.content);

      formData.append('image', this.selectedFile, this.selectedFile.name);
      
      this.http.post<any>('http://localhost:3005/post', formData).subscribe(
        (response) => {
          console.log(response);
          this.post.content = '';
          this.selectedFile= null;
        },
        (error) => {
          console.error(error);
        }
      );

    }
    else{
      this.http.post('http://localhost:3005/post', this.post)
      .subscribe((response: any) => {
        console.log(response);
        this.post.content = '';

        // if(this.selectedFile){
        // this.onUpload();}
       // this.selectedFile='';
      });
    }




  //   const formData = new FormData();

  //  //formData.append('image', this.selectedFile, this.selectedFile.name);


  //   this.http.post('http://localhost:5001/post', this.post)
  //     .subscribe((response: any) => {
  //       console.log(response);
  //       this.post.content = '';

  //       if(this.selectedFile){
  //       this.onUpload();}
  //      // this.selectedFile='';
  //     });
  }


}
