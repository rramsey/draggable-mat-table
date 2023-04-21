import { Component } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {MatTableDataSource} from "@angular/material/table";

export interface PeriodicElement {
  ind: number
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {ind: 0, position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {ind: 1, position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {ind: 2, position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {ind: 3, position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {ind: 4, position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {ind: 5, position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {ind: 6, position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {ind: 7, position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {ind: 8, position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {ind: 9, position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  public displayedColumns: string[] = ['ind', 'demo-position', 'demo-name', 'demo-weight', 'demo-symbol'];
  public dataSourceE = ELEMENT_DATA;
  public dataSource: MatTableDataSource<PeriodicElement> = new MatTableDataSource<PeriodicElement>(this.dataSourceE);

  constructor() {
  }

  public getImage(i: number = 1): string {
    let src = 'assets/pan.svg';
    if (i % 3 === 0) {
      src = 'assets/handle.svg';
    } else if (i % 2 === 0) {
      src = 'assets/indicator.svg';
    }
    return src;
  }

  public getLabel(i: number = 1): string {
    let src = 'pan';
    if (i % 3 === 0) {
      src = 'handle';
    } else if (i % 2 === 0) {
      src = 'indicator';
    }
    return src;
  }

  public drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.dataSourceE, event.previousIndex, event.currentIndex);
    this.dataSourceE.forEach( (elem, index) => {
      elem.ind = index;
    })
    // console.log(event);
    // console.log(this.dataSourceE)
    this.dataSource.data = this.dataSourceE;

  }

  public cancelBubble(event: any):void {
    console.log('prevent');
    event.preventDefault();
    event.stopPropagation();
  }
}
