import { Component, OnInit } from '@angular/core';

import { range, randomInt, randomString } from './shared/data'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'app works!';

    randomArr() {
        return Array.apply(null, Array(3)).map(() => randomString(3))
    }

    rows: any[] = range(1, 1000).map(i => ({
        id: i,
        nval: randomInt(1, 100),
        sval: randomString(5),
        aval: this.randomArr()
    }))

    ngOnInit(): void {
    }
}
