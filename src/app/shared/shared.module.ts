import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

// Components
import { DashboardCardComponent } from './components/dashboard-card/dashboard-card.component';
import { ProgressBarCategoryComponent } from './components/progress-bar-category/progress-bar-category.component';
import { TransactionItemComponent } from './components/transaction-item/transaction-item.component';
import { TransactionDetailComponent } from './components/transaction-detail/transaction-detail.component';
import { TransactionFormComponent } from './components/transaction-form/transaction-form.component';
import { FilterBarComponent } from './components/filter-bar/filter-bar.component';
import { PhotoSelectorComponent } from './components/photo-selector/photo-selector.component';
import { PhotoPreviewComponent } from './components/photo-preview/photo-preview.component';
import { PhotoGalleryModalComponent } from './components/photo-gallery-modal/photo-gallery-modal.component';
import { CategoryBadgeComponent } from './components/category-badge/category-badge.component';
import { CategoryIconComponent } from './components/category-icon/category-icon.component';
import { AmountDisplayComponent } from './components/amount-display/amount-display.component';
import { EmptyStateComponent } from './components/empty-state/empty-state.component';
import { InputFieldComponent } from './components/input-field/input-field.component';
import { SelectFieldComponent } from './components/select-field/select-field.component';
import { DateFieldComponent } from './components/date-field/date-field.component';
import { FormularioTransaccionModalComponent } from '../pages/transacciones/components/formulario-transaccion-modal/formulario-transaccion-modal.component';

// Pipes
import { CurrencyFormatPipe } from './pipes/currency-format.pipe';
import { DateFormatPipe } from './pipes/date-format.pipe';
import { FilterByTypePipe } from './pipes/filter-by-type.pipe';
import { FilterByCategoryPipe } from './pipes/filter-by-category.pipe';
import { SearchByTextPipe } from './pipes/search-by-text.pipe';
import { MonthNamePipe } from './pipes/month-name.pipe';
import { CategoryIconPipe } from './pipes/category-icon.pipe';
import { CategoryColorPipe } from './pipes/category-color.pipe';

const COMPONENTS = [
  DashboardCardComponent,
  ProgressBarCategoryComponent,
  TransactionItemComponent,
  TransactionDetailComponent,
  TransactionFormComponent,
  FilterBarComponent,
  PhotoSelectorComponent,
  PhotoPreviewComponent,
  PhotoGalleryModalComponent,
  CategoryBadgeComponent,
  CategoryIconComponent,
  AmountDisplayComponent,
  EmptyStateComponent,
  InputFieldComponent,
  SelectFieldComponent,
  DateFieldComponent,
  FormularioTransaccionModalComponent
];

const PIPES = [
  CurrencyFormatPipe,
  DateFormatPipe,
  FilterByTypePipe,
  FilterByCategoryPipe,
  SearchByTextPipe,
  MonthNamePipe,
  CategoryIconPipe,
  CategoryColorPipe
];

@NgModule({
  declarations: [...COMPONENTS, ...PIPES],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule
  ],
  exports: [
    ...COMPONENTS,
    ...PIPES,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule
  ]
})
export class SharedModule { }
