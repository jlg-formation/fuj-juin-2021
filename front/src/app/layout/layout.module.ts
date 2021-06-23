import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BodyComponent } from './body/body.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [BodyComponent, FooterComponent, HeaderComponent],
  imports: [CommonModule, RouterModule],
  exports: [BodyComponent, FooterComponent, HeaderComponent],
})
export class LayoutModule {}
