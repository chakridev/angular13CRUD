import { Component, OnInit , ViewChild } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { ApiService } from '../sevices/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { RouterLinkWithHref } from '@angular/router';
import { AuthService } from '../sevices/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  title = 'angularcrud';

  user ={localId:"",displayName:"someone"};

  displayedColumns: string[] = ['productName', 'productCategory', 'date', 'freshness' , 'price', 'comment','action'];
  dataSource !: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private dialog:MatDialog,private api: ApiService,private auth:AuthService){}

  ngOnInit(): void {

    this.auth.canAccess();
    if (this.auth.isauthenticated()) {
      this.auth.detail().subscribe({
        next:data=>{
            this.user.displayName = data.users[0].displayName;
        }
      })
    }

    this.auth.canAccess();
    this.getAllProduct();
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width:'40%'

    }).afterClosed().subscribe(val=>{
      if(val == 'save'){
        this.getAllProduct();
      }
    })
  }

  getAllProduct(){
      this.api.getProducts()
      .subscribe({
        next:(res)=>{
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error:()=>{
          alert("Error occur during fetching");

        }
      })
    }

    editProduct(row:any){
      this.dialog.open(DialogComponent,{
        width:'40%',
        data:row
      }).afterClosed().subscribe(val=>{
        if(val == 'update'){
          this.getAllProduct();
        }
      })
    }

    deleteProduct(id: number){
      this.api.deleteProducts(id).subscribe({
        next:(res)=>{
          alert("Product deleted successfully");
          this.getAllProduct();
        },
        error:()=>{
          alert("Error occur during deleting product");
        }
      })

    }



    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();

      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
}



