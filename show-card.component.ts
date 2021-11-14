import { isNgTemplate } from '@angular/compiler';
import { Component, IterableDiffers, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-show-card',
  templateUrl: './show-card.component.html',
  styleUrls: ['./show-card.component.css']
})
export class ShowCardComponent implements OnInit {

  constructor(private service:SharedService) { }

CardList:any=[];

  ModalTitle!: string;
  ActivateAddEditCardComp: boolean=false;
  card: any;

  CardIdFilter:string="";
  CardListWithoutFilter:any=[];

  ngOnInit(): void {
    this.refreshCardList();
  }

  addClick(){
    this.card={
      CardID:0,
      CreatedDate:"",
      UpdatedDate:"",
      InitialLoad:0,
      ExpirationDate:"",
      CardType:1,
      IDNumber:""
    }
    this.ModalTitle="Add Card";
    this.ActivateAddEditCardComp=true;

  }

  addClick2(){
    this.card={
      CardID:0,
      CreatedDate:"",
      UpdatedDate:"",
      InitialLoad:0,
      ExpirationDate:"",
      CardType:2,
      IDNumber:""
    }
    this.ModalTitle="Add Card";
    this.ActivateAddEditCardComp=true;

  }

  editClick(item: any){
    this.card=item;
    this.ModalTitle="Edit Card";
    this.ActivateAddEditCardComp=true;
  }

  scanClick(item: any){

    //get current date to be used for Updated Date
    var dateTime = new Date();
    
    //Expiration date for Regular card is 5 years from creation date while 3 years for SC and PWD  
    var dateNow = new Date(); 
    if (item.CardType == 1 ) {
      dateNow.setFullYear(dateNow.getFullYear() + 5);
    }else{
      dateNow.setFullYear(dateNow.getFullYear() + 3);
    }

    //Deduction for Regular card is 15 pesos while 10 pesos for SC and PWD
    var deduction = 0; 
    if (item.CardType == 1 ) {
      deduction = 15;
    }else{
      deduction = 10;
    }

    if(confirm( deduction + " pesos will be deducted. Proceed???")){
    var val = {CardID:item.CardID,
              CreatedDate:item.CreatedDate,
              UpdatedDate:dateTime,
              InitialLoad:item.InitialLoad - deduction,
              ExpirationDate:dateNow,
              CardType:item.CardType,
              IDNumber:item.IDNumber};
    this.service.updateCard(val).subscribe(res=>{
      alert(res.toString());
      this.refreshCardList();
    });
  }
  }

  deleteClick(item: any){
    if(confirm("Are you sure???")){
      this.service.deleteCard(item.CardID).subscribe(data=>{
        alert(data.toString());
        this.refreshCardList();
      })
    }
  }

  closeClick(){
    this.ActivateAddEditCardComp=false;
    this.refreshCardList();
  }

  refreshCardList(){
    this.service.getCardList().subscribe(data=>{
      this.CardList=data;
      this.CardListWithoutFilter=data;
    });
  }

  FilterFn(){
    var CardIdFilter = this.CardIdFilter;

    this.CardList = this.CardListWithoutFilter.filter(function (el:any) {
      return el.CardID.toString().toLowerCase().includes(
        CardIdFilter.toString().trim().toLowerCase()
      )
    });
  }

  sortResult(prop:any,asc:any){
    this.CardList = this.CardListWithoutFilter.sort(function(a:any,b:any){
      if(asc){
        return (a[prop]>b[prop])?1 : ((a[prop]<b[prop]) ?-1 :0);
      }else{
        return (b[prop]>a[prop])?1 : ((b[prop]<a[prop]) ?-1 :0);
      }
    })

  }

}
