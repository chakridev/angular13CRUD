import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../sevices/api.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  productCategories = ['Mobile', 'Vegetables', 'Fruits', 'Electronics' , 'Grocery'];

  freshnessList = ['Brand New', 'First Hand', 'Second Hand', 'Fresh' , 'Sub-Fresh'];

  productForm !: FormGroup;

  actionBtn : string = 'Save';


  constructor(private formBulider: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private api: ApiService,private dialogref: MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.productForm = this.formBulider.group({
      productName : ['',Validators.required],
      productCategory : ['',Validators.required],
      freshness : ['',Validators.required],
      price : ['',Validators.required],
      comment : ['',Validators.required],
      date : ['',Validators.required]
    });
    if(this.editData){
      this.actionBtn = 'Update';
      this.productForm.controls['productName'].setValue(this.editData.productName);
      this.productForm.controls['productCategory'].setValue(this.editData.productCategory);
      this.productForm.controls['freshness'].setValue(this.editData.freshness);
      this.productForm.controls['price'].setValue(this.editData.price);
      this.productForm.controls['comment'].setValue(this.editData.comment);
      this.productForm.controls['date'].setValue(this.editData.date);
    }
  }

  addProduct(){
    if(!this.editData){
      if(this.productForm.valid){
        this.api.postProducts(this.productForm.value)
        .subscribe({
          next:(res)=>{

            this.productForm.reset();
            this.dialogref.close('save');

          },
          error:()=>{
            alert("Error while adding product")

          }
        })
      }
    }else{
      this.updateProduct();
    }
  }

  updateProduct(){
    this.api.putProducts(this.productForm.value,this.editData.id)
    .subscribe({
      next:(res)=>{
        alert("Product updated successfully");
        this.productForm.reset();
        this.dialogref.close('update');
      },
      error:()=>{
        alert("Error occur during updating");
      }
    })
  }



}
