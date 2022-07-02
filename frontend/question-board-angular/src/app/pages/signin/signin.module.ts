import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SigninComponent } from './signin/signin.component';
import { SigninRoutingModule } from './signin-routing.module';

@NgModule({
  declarations: [SigninComponent],
  imports: [CommonModule, SigninRoutingModule],
})
export class SigninModule {}
