import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-add-edit-card',
  templateUrl: './add-edit-card.component.html',
  styleUrls: ['./add-edit-card.component.css']
})
export class AddEditCardComponent implements OnInit {

  constructor(private service: SharedService) { }

  @Input() card: any;
  CardID: string | undefined;
  CreatedDate: Date = new Date();
  UpdatedDate: Date = new Date();
  InitialLoad: number = 0;
  AdditionalLoad: number = 0;
  ExpirationDate: Date = new Date();
  CardType: number = 0;
  IDNumber: string | undefined;

  CardList: any=[];

  ngOnInit(): void {
    this.loadCardList();
  }

  loadCardList(){
    this.service.getCardList().subscribe((data:any)=>{
      this.CardList=data;

      this.CardID=this.card.CardID;
      this.CreatedDate=this.card.CreatedDate;
      this.UpdatedDate=this.card.UpdatedDate;
      this.InitialLoad=this.card.InitialLoad;
      this.ExpirationDate=this.card.ExpirationDate;
      this.CardType=this.card.CardType;
      this.IDNumber=this.card.IDNumber
    });
  }

  addCard(){
    //for ID number checking
    var cardNum : any = this.IDNumber;
    var regex = /^\(?([0-9]{4})\)?[-]?([0-9]{4})[-]?([0-9]{4})$/;
    var regex2 = /^\(?([0-9]{2})\)?[-]?([0-9]{4})[-]?([0-9]{4})$/;
    
    //initial load for regular card is 100 while 500 for SC and PWD
    var load = 500;
    if (this.CardType == 1 ) {
      load = 100
    }

    //Expiration date for Regular card is 5 years from creation date while 3 years for SC and PWD  
    var date = new Date(this.CreatedDate); 
    if (this.CardType == 1 ) {
      date.setFullYear(date.getFullYear() + 5);
    }else{
      date.setFullYear(date.getFullYear() + 3);
    }

    if(this.CardType == 2 ) {
      if((regex.test(cardNum)) || (regex2.test(cardNum))){
          var val = {CardID:this.CardID,
                CreatedDate:this.CreatedDate,
                //initial updated date is the creation date
                UpdatedDate:this.CreatedDate,
                InitialLoad:load,
                ExpirationDate:date,
                CardType:this.CardType,
                IDNumber:this.IDNumber
              };
              this.service.addCard(val).subscribe(res=>{
              alert(res.toString());
              });
      }
      else
      {
        alert("Invalid ID number format! Please use XX-XXXX-XXXX for Senior Citizen ID and XXXX-XXXX-XXXX for PWD.")
      }
    }
  
    if(this.CardType == 1 ) {
      var val2 = {CardID:this.CardID,
                CreatedDate:this.CreatedDate,
                //initial updated date is the creation date
                UpdatedDate:this.CreatedDate,
                InitialLoad:load,
                ExpirationDate: date,
                CardType:this.CardType,
                IDNumber:this.IDNumber
                };
                this.service.addCard(val2).subscribe(res=>{
                alert(res.toString());
                });  
    }
  }

  updateCard(){
    //get current date to be used for Updated Date
    var dateTime = new Date()

    //Expiration date for Regular card is 5 years from creation date while 3 years for SC and PWD  
    var dateNow = new Date() 
    if (this.CardType == 1 ) {
      dateNow.setFullYear(dateNow.getFullYear() + 5);
    }else{
      dateNow.setFullYear(dateNow.getFullYear() + 3);
    }

    var val = {CardID:this.CardID,
              CreatedDate:this.UpdatedDate,
              UpdatedDate:dateTime,
              InitialLoad:this.InitialLoad + + this.AdditionalLoad,
              ExpirationDate:dateNow,
              CardType:this.CardType,
              IDNumber:this.IDNumber};
    this.service.updateCard(val).subscribe(res=>{
      alert(res.toString());
    });
  }
}
