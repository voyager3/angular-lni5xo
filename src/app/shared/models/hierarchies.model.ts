import { BasicActiveModel, BasicModel } from '../../core/models';
import { ShiftModel } from '../shift-model';

export class HealthSystemHierarchyModel extends BasicActiveModel{
    facilities: FacilityHierarchyModel[] = []
}

export class FacilityHierarchyModel extends BasicActiveModel{
    healthSystemId: number;
    departments: DepartmentHierarchyModel[] = []
}

export class DepartmentHierarchyModel extends BasicActiveModel{
    facilityId: number;
    departmentType: BasicModel;
    departmentShifts: ShiftModel[] = [];
}