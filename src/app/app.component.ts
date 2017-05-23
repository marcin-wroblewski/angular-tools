import { Component, OnInit, ViewChild } from '@angular/core';

import { range, randomInt, randomString } from './shared/data'
import { TableComponent } from './table/table.component'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    @ViewChild('myTable')
    table: TableComponent


    title = 'app works!';
    selected: any

    options = [{ code: 'my', txt: 'my table' }, { code: 'primeng', txt: 'primeng table' }]
    option = 'my'

    toSelect: any[] = []

    randomArr() {
        return Array.apply(null, Array(3)).map(() => randomString(3))
    }

    private generate(n: number): any[] {
        return range(n).map(i => ({
            id: i + 1,
            nval: randomInt(1, 100),
            sval: randomString(5),
            aval: this.randomArr()
        }))
    }

    add() {
        let row = ({ id: 2000, nval: 999, sval: "to ja", aval: [1, 2] })
        this.toSelect.push(row)
        this.rows = [...this.rows, row]
    }

    afterTableChanged(event: any) {
        console.log("event = ", event)
        let row = this.toSelect.pop()
        if (row) {
            this.table.findAndSelect(row, "id")
        }
    }

    rows: any[] = this.generate(1000)

    ngOnInit(): void {
    }

    reload() {
        this.rows = this.generate(50)
    }
    clean() {
        this.rows = []
    }
}
