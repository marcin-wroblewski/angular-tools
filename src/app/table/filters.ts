export interface ColumnFilter {
    condition: string,
    filterValue: string
}
export interface FilterConditions {
    [name: string]: (value: any, filter: any) => boolean
}
export const filterConditions: FilterConditions = {
    startsWith(value, filter): boolean {
        if (filter === undefined || filter === null || filter.trim() === '') {
            return true;
        }

        if (value === undefined || value === null) {
            return false;
        }

        let filterValue = filter.toLowerCase();
        return value.toString().toLowerCase().slice(0, filterValue.length) === filterValue;
    },

    contains(value, filter): boolean {
        if (filter === undefined || filter === null || (typeof filter === 'string' && filter.trim() === '')) {
            return true;
        }

        if (value === undefined || value === null) {
            return false;
        }

        return value.toString().toLowerCase().indexOf(filter.toLowerCase()) !== -1;
    },

    endsWith(value, filter): boolean {
        if (filter === undefined || filter === null || filter.trim() === '') {
            return true;
        }

        if (value === undefined || value === null) {
            return false;
        }

        let filterValue = filter.toString().toLowerCase();
        return value.toString().toLowerCase().indexOf(filterValue, value.toString().length - filterValue.length) !== -1;
    },

    equals(value, filter): boolean {
        if (filter === undefined || filter === null || (typeof filter === 'string' && filter.trim() === '')) {
            return true;
        }

        if (value === undefined || value === null) {
            return false;
        }

        return value.toString().toLowerCase() == filter.toString().toLowerCase();
    },

    in(value, filter: any[]): boolean {
        if (filter === undefined || filter === null || filter.length === 0) {
            return true;
        }

        if (value === undefined || value === null) {
            return false;
        }

        for (let i = 0; i < filter.length; i++) {
            if (filter[i] === value)
                return true;
        }

        return false;
    }
}

export interface ColumnFilters {
    [field: string]: ColumnFilter
}

export class Filters {
    columnFilters: ColumnFilters = {}
    filterConditions: FilterConditions = Object.assign({}, filterConditions)
    globalFilter: string

    setGlobalFilter(value: string) {
        this.globalFilter = value
    }

    setFilter(value: any, field: string, condition: string) {
        if (!value) {
            delete this.columnFilters[field]
        } else {
            this.columnFilters[field] = { condition: condition, filterValue: value }
        }
    }


    match(row: any): boolean {
        let fields = Object.keys(row)

        let columnFiltersMatch = fields.every(field => {
            let columnFilter: ColumnFilter = this.columnFilters[field]
            if (!columnFilter) {
                return true
            }

            let conditionFunction = this.filterConditions[columnFilter.condition]
            let filterValue = columnFilter.filterValue
            let columnValue = row[field]

            return conditionFunction(columnValue, filterValue)
        })

        return columnFiltersMatch && (!this.globalFilter || fields.find(field => filterConditions.contains(row[field], this.globalFilter)) !== undefined)

    }

}