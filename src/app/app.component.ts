import { Component } from '@angular/core';
import { ApiRequestsService } from './api-requests.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

export interface HandwritingStylesItem { //Data model from the list of handwriting styles items obtained from the handwriting.io API
  id: string;
  title: string;
  date_created: Date;
  date_modified: Date;
  rating_neatness: number;
  rating_cursivity: number;
  rating_embellishment: number;
  rating_character_width: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  handwritingStylesList: Array<HandwritingStylesItem>; //List of handwriting styles
  handwritingOptions: FormGroup; //Form group, used to do the validator
  imageSource: any = null;

  constructor(private request: ApiRequestsService, private formBuilder: FormBuilder) {
    this.request.getHandwritings().subscribe((data: Array<HandwritingStylesItem>) => { //API request to get handwriting styles list
      this.handwritingStylesList = data;
    });
  }

  ngOnInit() {
    this.handwritingOptions = this.formBuilder.group({ //rules for the validator to check if the data is valid or not
      handwriting: ['', [Validators.required]],
      fontSize: [20, [Validators.required, Validators.min(0), Validators.max(9000)]],
      color:['#000000', [Validators.required]],
      text:['', [Validators.required, Validators.maxLength(9000)]]
    });
  }

  generateImage() {
    if(this.handwritingOptions.status == "VALID") { // IF the validator successfully validates the data on the inputs
      this.request.renderImage(this.handwritingOptions.value).subscribe(data => { 
        let reader = new FileReader(); //once the API returns a BLOB, we have to turn it into an URL, by creating a FileReader

        reader.addEventListener("load", () => { //create an EventListener to turn it into an URL
          this.imageSource = reader.result;
        }, false);

        reader.readAsDataURL(data); //and trigger the EventListener with the image we want to turn into an URL
      });
    }
  }
}
