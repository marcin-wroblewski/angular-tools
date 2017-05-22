import { AfterViewInit, Component, Input, OnInit, Renderer, QueryList, ContentChildren } from '@angular/core';
import { Column } from './column.component'
import { Filters } from './filters'
import { range } from '../shared/data'

@Component({
    selector: 'mw-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, AfterViewInit {
    @ContentChildren(Column)
    cols: QueryList<Column>

    @Input()
    data: any[]
    filtered: any[]

    selectedRow:any

    page: number = 0

    @Input()
    rowsPerPage: number = 1000

    @Input()
    paginator: boolean = false

    filters: Filters = new Filters()

    @Input()
    globalFilter: any

    setPage(page: number) {
        this.page = page
    }

    private currentData() {
        return this.filtered || this.data
    }

    isSelected(row:any) {
        return row === this.selectedRow
    }

    pages(): number[] {
        return range(1 + Math.floor((this.currentData().length - 1) / this.rowsPerPage))
    }

    toggleSort(col: Column) {
        this.cols.forEach(column => {
            if (column !== col) {
                column.unsort()
            }
        })
        col.toggleSort()
        this.doSort()
    }

    selectRow(row:any) {
        this.selectedRow = row
    }

    filter(value, field, condition) {
        this.filters.setFilter(value, field, condition)
        this.doFilter()
        this.doSort()
    }

    doFilter() {
        this.filtered = this.data.filter(row => this.filters.match(row))
    }
    doSort() {
        let sortColumn: Column = this.cols.find(col => col.sortOrder != null)
        if (sortColumn) {
            const factor = sortColumn.sortOrder === 'asc' ? 1 : -1

            if (this.filtered) {
                this.filtered.sort((a, b) => {
                    return factor * this.compare(a[sortColumn.field], b[sortColumn.field])
                })
            } else {
                this.data.sort((a, b) => {
                    return factor * this.compare(a[sortColumn.field], b[sortColumn.field])
                })
            }
        }
    }

    compare(a, b) {
        if (a > b)
            return 1
        else if (b > a)
            return -1
        return 0
    }

    dataView(): any[] {
        let data = this.currentData()
        if (this.paginator) {
            let start = this.page * this.rowsPerPage
            return data.slice(start, start + this.rowsPerPage)
        }
        return data
    }

    /*
    filter -> sort -> paginate
    */

    constructor(public renderer: Renderer) { }

    ngOnInit() {
        // this.filter("a", "sval", "startsWith")
        // this.filter("9", "nval", "startsWith")
        // setTimeout(() => {
        //     this.filter("", "sval", "startsWith")
        //     this.filter("", "nval", "startsWith")
        // }, 2000)
    }

    ngAfterViewInit(): void {
        if (this.globalFilter) {
            this.renderer.listen(this.globalFilter, 'keyup', () => {
                setTimeout(() => {
                    this.filters.setGlobalFilter(this.globalFilter.value)
                    this.doFilter()
                }, 300)
            })
        }
    }

}
