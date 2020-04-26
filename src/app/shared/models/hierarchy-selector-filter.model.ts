export class HierarchySelectorFilter {
    constructor(
        public healthSystemIds: number[] = [],
        public facilityIds: number[] = [],
        public departmentIds: number[] = []) {}
}