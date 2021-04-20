import { LifecycleStatusEnum } from "../../shared/enums";
import { GrouppedButtonModel } from "../../shared/models";

const Make: any = (value: LifecycleStatusEnum, selected: boolean) => new GrouppedButtonModel(selected, value, undefined, LifecycleStatusEnum[value])

export const SliderButtons = {
    InactiveActive: () => [
        new GrouppedButtonModel(true, 1, undefined, 'Inactive'),
        new GrouppedButtonModel(false, 2, undefined, 'Active')
    ],
    ActiveInactive: () => [
        new GrouppedButtonModel(true, 1, undefined, 'Active'),
        new GrouppedButtonModel(false, 2, undefined, 'Inactive')
    ],
    ActiveAll: () => [
        new GrouppedButtonModel(true, 1, undefined, 'Active'),
        new GrouppedButtonModel(false, 2, undefined, 'All')
    ],
    CurrentAllVersion: () => [
        new GrouppedButtonModel(true, 1, undefined, 'Current Version'),
        new GrouppedButtonModel(false, 2, undefined, 'All Versions')
    ],
    DraftActiveRetired: () => [
        Make(LifecycleStatusEnum.Draft, false),
        Make(LifecycleStatusEnum.Active, true),
        Make(LifecycleStatusEnum.Retired, false)
    ],
    DraftActive: () => [
        Make(LifecycleStatusEnum.Draft, true),
        Make(LifecycleStatusEnum.Active, false)
    ],
    ActiveDraft: () => [
        Make(LifecycleStatusEnum.Draft, false),
        Make(LifecycleStatusEnum.Active, true)
    ],
    ActiveRetiredOrDraft: () => [
        Make(LifecycleStatusEnum.Draft, false),
        Make(LifecycleStatusEnum.Active, true),
        Make(LifecycleStatusEnum.Retired, false)
    ],
    RetiredActive: () => [
        Make(LifecycleStatusEnum.Active, false),
        Make(LifecycleStatusEnum.Retired, true)
    ],
    ActiveRetired: () => [
        Make(LifecycleStatusEnum.Active, true),
        Make(LifecycleStatusEnum.Retired, false)
    ],
    IncludeExclude: () => [
        new GrouppedButtonModel(true, 1, undefined, 'Include Signed'),
        new GrouppedButtonModel(false, 2, undefined, 'Exclude Signed')
    ]
}