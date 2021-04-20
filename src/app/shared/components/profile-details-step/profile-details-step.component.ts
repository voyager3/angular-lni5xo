import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FileUploadInfo } from '../../models';

@Component({
  selector: 'profile-details-step',
  templateUrl: './profile-details-step.component.html'
})
export class ProfileDetailsStepComponent implements OnInit {

  @Input() pictureFile: FileUploadInfo;
  @Input() userProfileModel: UserProfileStepModel = new UserProfileStepModel('Name');

  @Output() onFormChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  @ViewChild('userProfileForm', { static: true }) userProfileForm: NgForm;

  constructor() { }

  ngOnInit(): void {
    this.userProfileForm.valueChanges.subscribe(_ => {
      this.onFormChanged.emit(this.userProfileForm.valid);
    });
  }

}

export class UserProfileStepModel {
  constructor(public name: string) { }
}
