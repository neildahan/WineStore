import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import { FilterPipe } from './filter.pipe';
import {RouterModule} from '@angular/router';
import {MatIcon, MatIconModule} from '@angular/material/icon';
import { HighlightPipe } from './highLight.pipe';


@NgModule({
  declarations: [
    HeaderComponent,
    FilterPipe,
    HighlightPipe
  ],

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatTabsModule,
    RouterModule,
    MatIconModule,
  
  ],

  exports: [
    FormsModule,
    ReactiveFormsModule,
    HeaderComponent,
    MatInputModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatTabsModule,
    FilterPipe,
    HighlightPipe
  ]
})
export class SharedModule { }
