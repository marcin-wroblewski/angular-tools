import { Component, OnInit, Input } from '@angular/core'
import { Column } from './column.component'

@Component({
    selector: '[mwRow]',
    templateUrl: './row.component.html'
})
export class RowComponent implements OnInit {
    @Input()
    cols: Column[]


    @Input()
    row: any

    ngOnInit(): void {
    }

    constructor() {}

}