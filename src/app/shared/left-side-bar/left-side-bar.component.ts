import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-left-side-bar',
  templateUrl: './left-side-bar.component.html',
  styleUrls: ['./left-side-bar.component.scss']
})
export class LeftSideBarComponent implements OnInit {
  filterLinks: string[] = ['Drink', 'Food', 'Special'];
  @Output() filter: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  filterHandler(): void {
    this.filter.emit();
  }
}
