import { AfterViewInit, Component, EventEmitter, Input, Output, OnInit, OnChanges, Renderer, QueryList, SimpleChanges, SimpleChange, ContentChildren } from '@angular/core';
import { Column } from './column.component'
import { Filters } from './filters'
import { range } from '../shared/data'

@Component({
    selector: 'mw-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, OnChanges, AfterViewInit {
    ALL_ROWS: number = -1

    @ContentChildren(Column)
    cols: QueryList<Column>

    @Input()
    emptyMessage = "No records found"

    @Input()
    scrollable: boolean = false

    @Input()
    scrollHeight: string

    @Input()
    data: any[]

    @Output()
    afterDataChange: EventEmitter<any> = new EventEmitter()

    @Input()
    rowsPerPageOptions: number[]

    @Input()
    rowsPerPage: number = 10

    @Input()
    scrollableRowsPerPageThreshold = 30

    dataView: any[]

    filtered: any[]

    @Input()
    selection: any

    @Output()
    selectionChange: EventEmitter<any> = new EventEmitter()

    page: number = 0
    @Input()
    pageLinks: number = 5


    @Input()
    paginator: boolean = false

    filters: Filters = new Filters()

    currentRowCount: number = 0

    @Input()
    globalFilter: any

    setPage(page: number) {
        if (page >= 0 && page < this.pages().length) {
            this.page = page
            this.dataViewChange()
        }
    }

    private currentData() {
        return this.filtered || this.data
    }

    isSelected(row: any) {
        return row === this.selection
    }

    pages(): number[] {
        let lastPage = this.lastPage()
        return range(1 + lastPage)
    }


    lastPage(): number {
        return this.rowsPerPage == this.ALL_ROWS ? 0 : Math.floor((Math.max(0, this.currentData().length - 1)) / this.rowsPerPage)
    }

    shownPages(): number[] {
        let pages = this.pages()
        let pageLinks = Math.min(this.pageLinks, pages.length)

        let start = Math.max(0, Math.ceil(this.page - (pageLinks / 2)))
        let end = Math.min(pages.length, start + pageLinks);

        var delta = pageLinks - (end - start);
        start = Math.max(0, start - delta);

        return pages.slice(start, end)
    }

    toggleSort(col: Column) {
        if (!col.sortable) {
            return
        }
        this.cols.forEach(column => {
            if (column !== col) {
                column.unsort()
            }
        })
        col.toggleSort()
        this.doSort()
    }

    selectRow(row: any) {
        this.selection = row
        this.selectionChange.emit(this.selection)
    }

    filter(value, field, condition) {
        this.filters.setFilter(value, field, condition)
        this.doFilter()
    }

    doFilter() {
        this.filtered = this.filters.filter(this.data)
        // this.page = 0
        this.doSort()
    }

    dataViewChange() {
        this.dataView = null
        this.setDataView()
        this.unselectIfNeeded()
    }

    findAndSelect(row: any, key: string = null) {
        let array = this.currentData()
        let index = key ? array.findIndex(value => value[key] === row[key]) : array.findIndex((value) => value === row)

        if (index >= 0) {
            this.changeSelection(row)
            if (this.rowsPerPage != this.ALL_ROWS) {
                let page = Math.floor(index / this.rowsPerPage)
                this.setPage(page)
            }
        }
    }

    changeSelection(row: any) {
        this.selection = row
        setTimeout(() => {
            this.selectionChange.emit(row)
        });
    }

    doSort() {
        let sortColumn: Column = this.cols.find(col => col.sortOrder != null)
        if (sortColumn) {
            const factor = sortColumn.sortOrder === 'asc' ? 1 : -1
            let data = this.filtered ? this.filtered : this.data
            data.sort((a, b) => {
                return factor * this.compare(a[sortColumn.field], b[sortColumn.field])
            })
        }
        this.dataViewChange()
    }

    unselectIfNeeded() {
        if (this.selection) {
            let currentView = this.dataView
            if (!currentView.find(row => row === this.selection)) {
                this.changeSelection(null)
            }
        }
    }

    rowsFound(): boolean {
        let currentData = this.currentData()
        return currentData && currentData.length > 0
    }

    compare(a, b) {
        if (a > b)
            return 1
        else if (b > a)
            return -1
        return 0
    }

    isScrollable() {
        return this.scrollable || (this.rowsPerPage > this.scrollableRowsPerPageThreshold)
    }

    setDataView() {
        if (!this.dataView) {
            let data = this.currentData()
            this.currentRowCount = data.length
            if (this.paginator && this.rowsPerPage != this.ALL_ROWS) {
                let start = this.page * this.rowsPerPage
                let end = (this.page + 1) * this.rowsPerPage
                this.dataView = data.slice(start, end)
            } else {
                this.dataView = data
            }
        }
    }

    constructor(public renderer: Renderer) { }

    ngOnInit() {
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

    rowsPerPageChanged() {
        this.dataViewChange()
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.data) {
            this.page = 0
            this.dataViewChange()
            this.afterDataChange.emit("dataChange")
        }
    }
}
