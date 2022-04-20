import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DataStateChangeEvent, GridDataResult } from '@progress/kendo-angular-grid';
import { State, process } from '@progress/kendo-data-query';
import { Subject } from 'rxjs';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-master-import',
  templateUrl: './master-import.component.html',
  styleUrls: ['./master-import.component.scss']
})
export class MasterImportComponent implements OnInit {
  keys: string[];
  storedKeys: string[];
  storedData: any = localStorage.getItem('master') ? JSON.parse(localStorage.getItem('master')) : [];
  dataSheet = new Subject();
  @ViewChild('inputFile') inputFile: ElementRef;
  isExcelFile: boolean;
  public state: State = {
    skip: 0,
    take: 100,
    filter: {
      logic: 'or',
      filters: [
        {
          field: 'UnitDesc',
          operator: 'contains',
          value: ''
        },
        {
          field: 'AppDesc',
          operator: 'contains',
          value: ''
        }
      ]
    }
  }
  public gridData: GridDataResult = process(this.storedData, this.state);

  ngOnInit(): void {}

   dataStateChange(state: DataStateChangeEvent) {
    this.state = state;
    this.gridData = process(this.storedData, this.state);
   }

  onChange(evt) {
    let data, header;
    const target: DataTransfer = <DataTransfer>(evt.target);
    this.isExcelFile = !!target.files[0].name.match(/(.xls|.xlsx|.csv)/);
    if (target.files.length > 1) {
      this.inputFile.nativeElement.value = '';
    }
    if (this.isExcelFile) {
      const reader: FileReader = new FileReader();
      reader.onload = (e: any) => {
        /* read workbook */
        const bstr: string = e.target.result;
        const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

        /* grab first sheet */
        const wsname: string = wb.SheetNames[0];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];

        /* save data */
        data = XLSX.utils.sheet_to_json(ws);
      };

      reader.readAsBinaryString(target.files[0]);

      reader.onloadend = (e) => {
        this.keys = Object.keys(data[0]);
        this.dataSheet.next(data)
        console.log(data);
        
        localStorage.setItem('master', JSON.stringify(data));
        localStorage.setItem('keys', JSON.stringify(this.keys));
      }
    } else {
      this.inputFile.nativeElement.value = '';
    }
  }

  removeData() {
    this.inputFile.nativeElement.value = '';
    this.dataSheet.next(null);
    this.keys = null;
    localStorage.clear();
  }

  onFilter(event) {
    this.gridData = process(this.storedData, {
      filter: {
        logic: "or",
        filters: [
          {
            field: "UnitDesc",
            operator: "contains",
            value: event.target.value,
          },
          {
            field: "AppDesc",
            operator: "contains",
            value: event.target.value,
          },
          {
            field: "Ev1title",
            operator: "contains",
            value: event.target.value,
          },
          {
            field: "Lifemos",
            operator: "contains",
            value: event.target.value,
          },
          {
            field: "ReplCost",
            operator: "contains",
            value: event.target.value,
          },
          {
            field: "OHLife",
            operator: "contains",
            value: event.target.value,
          }
        ],
      },
    })
  }

}
