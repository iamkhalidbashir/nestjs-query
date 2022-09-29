"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SortBuilder = void 0;
const interfaces_1 = require("../interfaces");
function isNullish(a) {
    return a === null || a === undefined;
}
function nullComparator(a, b) {
    if (a === b) {
        return 0;
    }
    return a === null ? 1 : -1;
}
function nullsFirstSort(a, b) {
    if (!(isNullish(a) || isNullish(b))) {
        return 0;
    }
    if (isNullish(a) && isNullish(b)) {
        return nullComparator(a, b);
    }
    return isNullish(a) ? -1 : 1;
}
function nullsLastSort(a, b) {
    return (nullsFirstSort(a, b) * -1);
}
function ascSort(a, b) {
    if (a === b) {
        return 0;
    }
    return a < b ? -1 : 1;
}
function descSort(a, b) {
    return (ascSort(a, b) * -1);
}
class SortBuilder {
    static build(sorts) {
        const comparators = sorts.map(({ field, direction, nulls }) => this.buildComparator(field, direction, nulls));
        const comparator = (a, b) => comparators.reduce((result, cmp) => {
            if (result === 0) {
                return cmp(a, b);
            }
            return result;
        }, 0);
        return (dtos) => [...dtos].sort(comparator);
    }
    static buildComparator(field, direction, nulls) {
        const nullSort = this.nullsComparator(direction, nulls);
        const fieldValueComparator = this.fieldValueComparator(field, direction);
        return (a, b) => {
            const aField = a[field];
            const bField = b[field];
            const nullResult = nullSort(aField, bField);
            if (nullResult !== 0) {
                return nullResult;
            }
            return fieldValueComparator(aField, bField);
        };
    }
    static fieldValueComparator(field, direction) {
        if (direction === interfaces_1.SortDirection.ASC) {
            return (a, b) => ascSort(a, b);
        }
        return (a, b) => descSort(a, b);
    }
    static nullsComparator(direction, nulls) {
        switch (nulls) {
            case interfaces_1.SortNulls.NULLS_FIRST:
                return nullsFirstSort;
            case interfaces_1.SortNulls.NULLS_LAST:
                return nullsLastSort;
            default:
                switch (direction) {
                    case interfaces_1.SortDirection.DESC:
                        return nullsFirstSort;
                    default:
                        return nullsLastSort;
                }
        }
    }
}
exports.SortBuilder = SortBuilder;
//# sourceMappingURL=sort.builder.js.map