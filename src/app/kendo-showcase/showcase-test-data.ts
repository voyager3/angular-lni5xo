import { HealthSystemHierarchyModel } from '../shared/models/hierarchies.model';

export const hsHierarchy: HealthSystemHierarchyModel[] = [
    {
      id: 1, 
      name: 'HealthSystem 1', 
      isActive: true, 
      facilities:[
        {
          id: 1, 
          name: 'Facility 1-1', 
          isActive: true, 
          healthSystemId: 1,  
          departments: [
            {
              id: 1, 
              name: 'Department 1-1-1', 
              isActive: true, 
              facilityId: 1, 
              departmentType: null, 
              departmentShifts: []
            },
            {
              id: 2, 
              name: 'Department 1-1-2', 
              isActive: true, 
              facilityId: 1, 
              departmentType: null, 
              departmentShifts: []
            },
            {
              id: 3, 
              name: 'Department 1-1-3', 
              isActive: true, 
              facilityId: 1, 
              departmentType: null, 
              departmentShifts: []
            }
          ]
        },
        {
          id: 2, 
          name: 'Facility 1-2', 
          isActive: true, 
          healthSystemId: 1,  
          departments: [
            {
              id: 4, 
              name: 'Department 1-2-1', 
              isActive: true, 
              facilityId: 2, 
              departmentType: null, 
              departmentShifts: []
            },
            {
              id: 5, 
              name: 'Department 1-2-2', 
              isActive: true, 
              facilityId: 2, 
              departmentType: null, 
              departmentShifts: []
            },
            {
              id: 6, 
              name: 'Department 1-2-3', 
              isActive: true, 
              facilityId: 2, 
              departmentType: null, 
              departmentShifts: []
            }
          ]
        },
        {
          id: 3, 
          name: 'Facility 1-3', 
          isActive: true, 
          healthSystemId: 1,  
          departments: [
            {
              id: 7, 
              name: 'Department 1-3-1', 
              isActive: true, 
              facilityId: 3, 
              departmentType: null, 
              departmentShifts: []
            },
            {
              id: 8, 
              name: 'Department 1-3-2', 
              isActive: true, 
              facilityId: 3, 
              departmentType: null, 
              departmentShifts: []
            }
          ]
        }
      ]
    },
    {
      id: 2, 
      name: 'HealthSystem 2', 
      isActive: true, 
      facilities:[
        {
          id: 4, 
          name: 'Facility 2-1', 
          isActive: true, 
          healthSystemId: 2,  
          departments: [
            {
              id: 9, 
              name: 'Department 2-1-1', 
              isActive: true, 
              facilityId: 1, 
              departmentType: null, 
              departmentShifts: []
            },
            {
              id: 10, 
              name: 'Department 2-1-2', 
              isActive: true, 
              facilityId: 1, 
              departmentType: null, 
              departmentShifts: []
            },
            {
              id: 11, 
              name: 'Department 2-1-3', 
              isActive: true, 
              facilityId: 1, 
              departmentType: null, 
              departmentShifts: []
            }
          ]
        },
        {
          id: 5, 
          name: 'Facility 2-2', 
          isActive: true, 
          healthSystemId: 2,  
          departments: [
            {
              id: 12, 
              name: 'Department 2-2-1', 
              isActive: true, 
              facilityId: 2, 
              departmentType: null, 
              departmentShifts: []
            },
            {
              id: 13, 
              name: 'Department 2-2-2', 
              isActive: true, 
              facilityId: 2, 
              departmentType: null, 
              departmentShifts: []
            },
            {
              id: 14, 
              name: 'Department 2-2-3', 
              isActive: true, 
              facilityId: 2, 
              departmentType: null, 
              departmentShifts: []
            }
          ]
        },
        {
          id: 6, 
          name: 'Facility 2-3', 
          isActive: true, 
          healthSystemId: 2,  
          departments: [
            {
              id: 15, 
              name: 'Department 2-3-1', 
              isActive: true, 
              facilityId: 3, 
              departmentType: null, 
              departmentShifts: []
            },
            {
              id: 16, 
              name: 'Department 2-3-2', 
              isActive: true, 
              facilityId: 3, 
              departmentType: null, 
              departmentShifts: []
            },
            {
              id: 17, 
              name: 'Department 2-3-3', 
              isActive: true, 
              facilityId: 3, 
              departmentType: null, 
              departmentShifts: []
            }
          ]
        }
      ]
    },
    {
      id: 3, 
      name: 'HealthSystem 3', 
      isActive: true, 
      facilities:[
        {
          id: 7, 
          name: 'Facility 3-1', 
          isActive: true, 
          healthSystemId: 3,  
          departments: [
            {
              id: 18, 
              name: 'Department 3-1-1', 
              isActive: true, 
              facilityId: 1, 
              departmentType: null, 
              departmentShifts: []
            },
            {
              id: 19, 
              name: 'Department 3-1-2', 
              isActive: true, 
              facilityId: 1, 
              departmentType: null, 
              departmentShifts: []
            },
            {
              id: 20, 
              name: 'Department 3-1-3', 
              isActive: true, 
              facilityId: 1, 
              departmentType: null, 
              departmentShifts: []
            }
          ]
        },
        {
          id: 8, 
          name: 'Facility 3-2', 
          isActive: true, 
          healthSystemId: 3,  
          departments: [
            {
              id: 21, 
              name: 'Department 3-2-1', 
              isActive: true, 
              facilityId: 2, 
              departmentType: null, 
              departmentShifts: []
            },
            {
              id: 22, 
              name: 'Department 3-2-2', 
              isActive: true, 
              facilityId: 2, 
              departmentType: null, 
              departmentShifts: []
            },
            {
              id: 23, 
              name: 'Department 3-2-3', 
              isActive: true, 
              facilityId: 2, 
              departmentType: null, 
              departmentShifts: []
            }
          ]
        }
      ]
    }
  ];

  export const users: any[] = [
    {id: 65017, name: "Trish Wackler", healthSystemId: 1, facilityId: 1, departmentId: 1},
    {id: 65025, name: "Kim Barton", healthSystemId: 1, facilityId: 1, departmentId: 2},
    {id: 65026, name: "Maria Cosler", healthSystemId: 1, facilityId: 2, departmentId: 4},
    {id: 65065, name: "Cindy Burke", healthSystemId: 1, facilityId: 2, departmentId: 5},
    {id: 65066, name: "Dino Bueno", healthSystemId: 1, facilityId: 3, departmentId: 8},
    {id: 65068, name: "Jayne Gmeiner", healthSystemId: 1, facilityId: 3, departmentId: 7},
    {id: 65070, name: "Annette Drake", healthSystemId: 2, facilityId: 4, departmentId: 9},
    {id: 65133, name: "Dorothy Perry", healthSystemId: 2, facilityId: 4, departmentId: 9},
    {id: 65134, name: "Shelley Franz", healthSystemId: 2, facilityId: 5, departmentId: 12},
    {id: 65135, name: "Cynthia Mapp", healthSystemId: 2, facilityId: 5, departmentId: 13},
    {id: 65146, name: "Faith Weinert", healthSystemId: 2, facilityId: 5, departmentId: 13},
    {id: 65147, name: "Tiffany Castelitz", healthSystemId: 2, facilityId: 6, departmentId: 16},
    {id: 65148, name: "Megan Sortman", healthSystemId: 3, facilityId: 7, departmentId: 18},
    {id: 65149, name: "Christina Womack", healthSystemId: 3, facilityId: 7, departmentId: 18},
    {id: 65150, name: "Patricia Davis", healthSystemId: 3, facilityId: 7, departmentId: 19},
    {id: 65151, name: "Tammy Lewis-Nolasco", healthSystemId: 3, facilityId: 7, departmentId: 19},
    {id: 65152, name: "Andrew Bryant", healthSystemId: 3, facilityId: 7, departmentId: 20},
    {id: 65174, name: "Tracy Knox", healthSystemId: 3, facilityId: 8, departmentId: 21},
    {id: 65175, name: "Amanda K. Hagner", healthSystemId: 3, facilityId: 7, departmentId: 20},
    {id: 65176, name: "Lee A. Waterfall", healthSystemId: 3, facilityId: 7, departmentId: 20},
    {id: 65177, name: "Rena-Marie Herzer", healthSystemId: 3, facilityId: 8, departmentId: 21}
  ]