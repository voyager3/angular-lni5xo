import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SliderButtons } from '../../../core/consts/slider-buttons';
import { DialogMessage } from '../../consts';
import { LifecycleStatusEnum, LifecycleTransitionEnum } from '../../enums';
import { GrouppedButtonModel, DialogSettingsModel } from '../../models';
import { DialogService } from '../../services';

@Component({
  selector: 'lifecycle-transition',
  templateUrl: './lifecycle-transition.component.html'
})
export class LifecycleTransitionComponent {
  @Input() allowTransitions: LifecycleTransitionEnum;
  @Input() disabled: boolean;
  @Input() enableDialog: boolean;
  @Input() dialogTitle: string = DialogMessage.PleaseConfirm;
  @Input() dialogContent: Map<LifecycleTransitionEnum, string>;
  @Input() entityName: string = 'entity';
  @Output() onTransitionChange: EventEmitter<GrouppedButtonModel[]> = new EventEmitter();
  @Output() buttonsChange: EventEmitter<GrouppedButtonModel[]> = new EventEmitter<GrouppedButtonModel[]>();

  lifecycleBtnModel: GrouppedButtonModel[] = [];
  
  constructor(private dialogService: DialogService) { }

  ngOnChanges() {
    switch (this.allowTransitions) {
      case LifecycleTransitionEnum.DraftToActive:
        this.lifecycleBtnModel = SliderButtons.DraftActive();
        break;
      case LifecycleTransitionEnum.ActiveToDraft:
        this.lifecycleBtnModel = SliderButtons.ActiveDraft();
        break;
      case LifecycleTransitionEnum.ActiveToRetiredOrDraft:
        this.lifecycleBtnModel = SliderButtons.ActiveRetiredOrDraft();
        break;
      case LifecycleTransitionEnum.RetiredToActive:
        this.lifecycleBtnModel = SliderButtons.RetiredActive();
        break;
      case LifecycleTransitionEnum.ActiveToRetired:
        this.lifecycleBtnModel = SliderButtons.ActiveRetired();
        break;
      default:
        this.lifecycleBtnModel = [];
    }
  }

  applyChange() {
    this.onTransitionChange.emit(this.lifecycleBtnModel);
  }

  onClick(button: GrouppedButtonModel) {
    if (button.selected)
      return;
    if (this.enableDialog) {
      this.dialogService.confirm(new DialogSettingsModel(this.dialogTitle, this.getDialogContent(this.getTransition(button))))
        .subscribe(res => {
          if (res.isConfirmed) {
            this.selectBtn(button)
          }
        })
    } else {
      this.selectBtn(button);
    }
  }

  selectBtn(button: GrouppedButtonModel) {
    button.selected = true;
    this.deselectOtherButtons(button.valueId)
    this.applyChange();
  }

  deselectOtherButtons(buttonValueId: number) {
    this.lifecycleBtnModel.filter(b => b.valueId !== buttonValueId).forEach(b => b.selected = false)
  }

  private getTransition(newStatusButton: GrouppedButtonModel): LifecycleTransitionEnum {
    let oldStatusButton: GrouppedButtonModel = this.lifecycleBtnModel.find(b => b.selected);

    switch (oldStatusButton.valueId, newStatusButton.valueId) {
      case (LifecycleStatusEnum.Draft, LifecycleStatusEnum.Active):
        return LifecycleTransitionEnum.DraftToActive;
      case (LifecycleStatusEnum.Active, LifecycleStatusEnum.Draft):
        return LifecycleTransitionEnum.ActiveToDraft;
      case (LifecycleStatusEnum.Active, LifecycleStatusEnum.Retired):
        return LifecycleTransitionEnum.ActiveToRetired;
      case (LifecycleStatusEnum.Retired, LifecycleStatusEnum.Active):
        return LifecycleTransitionEnum.RetiredToActive;
      default:
        return LifecycleTransitionEnum.None;
    }
  }

  private getDialogContent(transition: LifecycleTransitionEnum): string {
    if (this.dialogContent?.has(transition)) {
      return this.dialogContent.get(transition);
    } 
    else {
      switch (transition) {
        case LifecycleTransitionEnum.DraftToActive:
          return DialogMessage.ConfirmActivation(this.entityName);
        case LifecycleTransitionEnum.ActiveToDraft:
          return DialogMessage.ConfirmDraft(this.entityName);
        case LifecycleTransitionEnum.ActiveToRetired:
          return DialogMessage.ConfirmRetirement(this.entityName);
        case LifecycleTransitionEnum.RetiredToActive:
          return DialogMessage.ConfirmActivation(this.entityName);
        default: return DialogMessage.AreYouSure;
      }
    }
  }
}
