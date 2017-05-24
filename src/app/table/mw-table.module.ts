import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TableComponent } from './table.component';
import { RowComponent } from './row.component'
import { Column, ColumnBodyTemplateRenderer, MWTemplate } from './column.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [
        TableComponent,
        Column,
        MWTemplate
    ],
    declarations: [
        TableComponent,
        RowComponent,
        Column,
        ColumnBodyTemplateRenderer,
        MWTemplate
    ]
})
export class MwTableModule { }
