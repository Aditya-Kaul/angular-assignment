import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as data from '../items.json';
import { Item } from '../items.model';
import * as XLSX from 'xlsx';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
@ViewChild('TABLE', { static: false }) TABLE?: ElementRef;
items: any;
submitted: boolean = false;
selectedRowIndex?: number;
selectedItem?: any;
itemsForm?: FormGroup;
format?: string;
itemImage?: any;
url: any[] = [];

validation_messages = {
  'name': [
    { type: 'required', message: 'Name is required'}
  ],
  'cost': [
    { type: 'required', message: 'cost is required' },
    { type: 'maxlength', message: `cost must not be greater than 7 character's`},
    { type: 'pattern', message: `cost must be an integer`}
  ],
  'salePrice': [
    { type: 'required', message: 'Sale price is required' },
    { type: 'maxlength', message: `sale price must not be greater than 7 character's`},
    { type: 'pattern', message: `sale price must be an integer`}
  ],
  'retailPrice': [
    { type: 'required', message: 'Retail price is required' },
    { type: 'maxlength', message: `Retail price must not be greater than 7 character's`},
    { type: 'pattern', message: `Retail price must be an integer`}
  ],
  'inventory': [
    { type: 'required', message: 'Inventory is required' },
    { type: 'maxlength', message: `Inventory must not be greater than 7 character's`},
    { type: 'pattern', message: `Inventory must be an integer`}
  ],
  'manufacturing': [
    { type: 'required', message: 'Manufacturing is required' },
    { type: 'maxlength', message: `Manufacturing must not be greater than 7 character's`},
    { type: 'pattern', message: `Manufacturing must be an integer`}
  ],
  'backOrder': [
    { type: 'required', message: 'Back order is required' },
    { type: 'maxlength', message: `Back order must not be greater than 7 character's`},
    { type: 'pattern', message: `Back order must be an integer`}
  ]
};

barChartOptions: ChartOptions = {
  responsive: true,
};
barChartLabels: Label[] = ['2009', '2011', '2012', '2014'];
barChartType: ChartType = 'bar';
barChartLegend = true;
barChartPlugins = [];

barChartData: ChartDataSets[] = [
  { data: [2000, 5000, 10000], label: 'Sales' },
  { data: [0, 0, 0, 1000], label: 'Operational' }
];

  constructor(private formBuilder: FormBuilder) { }
  

  ngOnInit(): void {
     this.itemsForm = this.formBuilder.group({
       name: ['', [Validators.required]],
       cost: ['', [Validators.required, Validators.maxLength(7), Validators.pattern("^[0-9]*$")] ],
       salePrice: ['', [Validators.required, Validators.maxLength(7), Validators.pattern("^[0-9]*$")] ],
       retailPrice: ['', [Validators.required, Validators.maxLength(7), Validators.pattern("^[0-9]*$")] ],
       inventory: ['', [Validators.required, Validators.maxLength(7), Validators.pattern("^[0-9]*$")] ],
       manufacturing: ['', [Validators.required, Validators.maxLength(7), Validators.pattern("^[0-9]*$")] ],
       backOrder: ['', [Validators.required, Validators.maxLength(7), Validators.pattern("^[0-9]*$")] ]
     });
    
     this.getItems();
  }

  get itemsFormControls() {
    return this.itemsForm?.controls;
  }

  getItems() {
    this.items = (data as any).default;
    this.items.filter((item: any) => {
      item['toggle'] = false;
    });
  }

  onSelectRow(index: number, item: any) {
    console.log(this.items[index]['toggle']);
    this.items[index]['toggle'] = !this.items[index]['toggle'];
    this.items.filter((item: any, i: number) => {
      if(index !== i) {
        item['toggle'] = false;
      }
    });
    this.selectedRowIndex = index;
    this.selectedItem = item;
    console.log(item);
  }

  // onSelectImage(event: any) {
  //   this.itemImage = event.target.files;
  //   const file = event.target.files && event.target.files[0];
  //   if (file) {
  //     var reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     if (file.type.indexOf('image') > -1) {
  //       this.format = 'image';
  //     }
  //     reader.onload = (e) => {
  //       const urlString = (<FileReader>e.target).result;
  //       this.url.push({ imgUrl: urlString });
  //     };
  //   }
  // }

  addNewItem() {
    this.submitted = true;
    if(this.itemsForm?.invalid) {
      return;
    }

    const values: Item[] = this.itemsForm?.value;
    this.items.push(values);
  }

  deleteItem() {
    if(this.selectedItem['toggle'] === true) {
      this.items.splice(this.selectedRowIndex, 1);
    }
  }

  filteredItems(column: string) {
    this.items = (data as any).default;
    if(column === 'cost') {
      for(let i = 0; i < this.items.length; i++) {
        if(this.items[i]['cost'] < 200) {
          this.items.splice(i, 1);
        }
      }
    }
    
    if(column === 'sale price') {
      for(let i = 0; i < this.items.length; i++) {
        if(this.items[i]['salePrice'] < 200) {
          this.items.splice(i, 1);
        }
      }
    }
  }

  removeImg() {
    this.url.pop();
  }

  getExelReport() {  
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE?.nativeElement);  
    const wb: XLSX.WorkBook = XLSX.utils.book_new();  
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');  
    XLSX.writeFile(wb, 'items.xlsx');  
  } 

}
