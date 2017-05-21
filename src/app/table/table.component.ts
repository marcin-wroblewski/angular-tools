import { Component, Input, OnInit, QueryList, ContentChildren } from '@angular/core';
import { Column } from './column.component'
import { range } from '../shared/data'

@Component({
    selector: 'mw-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
    @ContentChildren(Column)
    cols: QueryList<Column>

    @Input()
    data: any[]

    page: number = 0

    @Input()
    rowsPerPage: number = 10

    sorted: any[]
    paged: any[]

    @Input()
    paginator: boolean = false

    setPage(page: number) {
        this.page = page
    }

    pages(): number[] {
        return range(1 + Math.floor((this.data.length - 1) / this.rowsPerPage))
    }

    toggleSort(col: Column) {
        col.toggleSort()
        const factor = col.sortOrder === 'asc' ? 1 : -1
        this.data.sort((a, b) => {
            return factor * this.compare(a[col.field], b[col.field])
        })
    }

    compare(a, b) {
        if (a > b)
            return 1
        else if (b > a)
            return -1
        return 0
    }

    dataView(): any[] {
        let start = this.page * this.rowsPerPage
        return this.data.slice(start, start + this.rowsPerPage)
    }

    /*
    filter -> sort -> paginate
    */

    constructor() { }

    ngOnInit() {
        // StringConstructor.

    }

}
