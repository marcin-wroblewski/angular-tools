import {
    EmbeddedViewRef, ViewContainerRef, Component, ContentChild, ContentChildren,
    QueryList, Directive, Input, OnInit, OnDestroy, AfterContentInit, TemplateRef
} from '@angular/core';

@Component({
    selector: 'mw-colBodyTemplateRenderer',
    template: ''
})
export class ColumnBodyTemplateRenderer implements OnInit, OnDestroy {
    @Input()
    rowData

    @Input()
    column: Column

    // @Input() rowIndex: number;

    view: EmbeddedViewRef<any>;

    constructor(public viewContainer: ViewContainerRef) { }

    ngOnInit() {
        this.view = this.viewContainer.createEmbeddedView(this.column.template, {
            '\$implicit': this.column,
            'rowData': this.rowData,
            // 'rowIndex': this.rowIndex
        });
    }

    ngOnDestroy() {
        this.view.destroy();
    }
}

@Directive({
    selector: '[mwTemplate]'
})
export class MWTemplate {
    @Input('mwTemplate')
    name: string

    constructor(public template: TemplateRef<any>) { }

}

@Component({
    selector: 'mw-col',
    templateUrl: './column.component.html'
})
export class Column implements OnInit, AfterContentInit {
    @ContentChild(TemplateRef) template

    @ContentChildren(MWTemplate) templates: QueryList<MWTemplate>

    bodyTemplate: TemplateRef<any>


    @Input()
    field: string

    @Input()
    sortable: boolean = false

    @Input()
    header: string

    @Input()
    style: string = ''

    sortOrder: string

    toggleSort() {
        this.sortOrder = (this.sortOrder === 'desc' ? 'asc' : 'desc')
    }

    constructor(public viewContainer: ViewContainerRef) { }
    ngAfterContentInit(): void {
        this.templates.forEach(mwTemplate => {
            if(mwTemplate.name === 'body') {
                this.bodyTemplate = mwTemplate.template
            }
        })
    }

    ngOnInit(): void {
        // console.log("template = ", this.template)
        // console.log("vc = ", this.viewContainer)
        console.log("templates = ", this.templates)
        // if (this.template)
        // this.viewContainer.createEmbeddedView(this.template)
    }

}