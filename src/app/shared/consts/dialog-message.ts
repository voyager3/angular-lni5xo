export const DialogMessage = {
    PleaseConfirm: `Please confirm`,
    NotImplemented: `Not Implemented yet.`,
    FunctionalityToBeDevelopedLater: `Functionality to be developed later.`,
    AreYouSure: `Are you sure?`,
    Success: `Success!`,
    Error: `Error!`,
    OperationNotAllowed: `This operation is not allowed!`,
    UploadingError: `Uploading error.`,

    ConfirmDelete: (entityName: string) => `Are you sure you want to delete this ${entityName}?`,
    ConfirmRetirement: (entityName: string) => `Are you sure you want to retire this ${entityName}?`,
    ConfirmActivation: (entityName: string) => `Are you sure you want to activate this ${entityName}?`,
    ConfirmDraft: (entityName: string) => `Are you sure you want to make this ${entityName} a draft?`,
    ConfirmStatus: (entityName: string, action: string) => `Are you sure you want to ${action} this ${entityName}?`,
    ConfirmReset: (entityName: string) => `Are you sure you want to reset this ${entityName}?`,

    ConfirmChanges: `Please confirm you want to make these changes.`,
    
    ConfirmSessionContinuation: 'Your session will expire in 30 seconds. Do you wish to continue this session?',

    EntityIsMandatory: (entityName: string, entityValue: string) => `The ${entityName} "${entityValue}" is mandatory.`,
    ConfirmDeleteEntity: (entityName: string, entityValue: string) => `Are you sure you want to delete the ${entityName} "${entityValue}"?`,

    NewCompetencyCriteria: (name: string) => `You have entered a new ${name} criteria. Please complete criteria details and save to the library`,
    NewCompetencySubgroup: (healthcareOrganizationName: string) => `You are about to create a new subgroup in ${healthcareOrganizationName}`,
    ConfirmPSTChange: `Adding, deleting, or changing a PST will affect all past, present, and future learning plans and classes that include this competency. Are you sure you want to proceed?`,
    ConfirmCPTRetirement: `Retiring this competency profile template will retire all competency profiles created from this version. Do you wish to proceed?`,
    PGARequired: `PGA required`,
    PGARequiredBeforeSystemUse: `You are required to take a PGA assessment before you can use the system. Are you ready to take it now?`,
    ConfirmExhibitAccessTermination: `Once applied, this termination will prevent access to the related IP by support users!`,
    AddNewUser: `Add New User`,
    SelectNewUserType: `What type of user do you wish to create?`,
    SuspendVoyagerAccess: `SUSPEND VOYAGER ACCESS`,
    DeleteUser: `DELETE USER`,
    ConfirmVoyagerAccessSuspending: `Are you sure you want to suspend this user's access to Voyager?`,
    ConfirmUserDeletion: `Are you sure you want to delete this user?`,
    RestoreVoyagerAccess: `RESTORE VOYAGER ACCESS`,
    ConfirmVoyagerAccessRestoring: `Are you sure you want to restore this user's access to Voyager?`,
    ConfirmVignettePollSizeChange: `Are you sure you want to change the competency vignette pool size?`,
    ConfirmProductLocationChange: `Changing this product will cause the user's location also to be changed.`,

    TermsAndConditins: `Terms and conditions`,
    ChangePassword: `Change Your Password`,
    ForgottenPassword: `Forgotten Password`,
    Message: `Message`,
    ResetLink: (email: string) => `If this is a valid account, a link to reset your password will be sent to 
        ${email} shortly. If you do not receive the email, please ask your organization\'s 
        point of contact for Versant programs to verify the username for your account.`,

    ProductIsNotValid: `The product is not valid!`,
    MissingRequiredConnections: `Some of the element ports do not have the minimum required connections.`,
    ProductHasBeenSaved: `The product has been saved.`,
    OverlappingOfAssociations: `The selected period of association is overlapping with another one!`,
    ChangingUserAccessNotAllowed: `The user access cannot be changed if the user has no current associations`,
    PendingPga: `You have a pending Performance Gap Assessment (PGA).`,
    PendingPgaDetails: (productName: string) => `You have a pending Performance Gap Assessment (PGA) for product ${productName} that has not yet been completed. Would you like to complete the PGA now?`,
    HasNoAssociationOrMoreThanOneAssociations: `The current user has no association or has more than one active current associations.`,
    CopyCompetencyProfileWhenInactivate:  `Within this competency profile, Versant has included additional 
        competencies as requested for your organization. Inactivation of this profile may remove access to 
        these competencies from all support users and program participants. 
        To maintain access to these competencies, copy this profile to create a new active competency profile.`,
    MakeActive: 'Make active',
    MakeInactive: 'Make Inactive'
}