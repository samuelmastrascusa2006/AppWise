import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-category-icon',
  template: `
    <div class="icon-container" 
         [style.background-color]="categoria | categoryColor"
         [class.small]="size === 'small'"
         [class.medium]="size === 'medium'">
      <ion-icon [name]="categoria | categoryIcon"></ion-icon>
    </div>
  `,
  styles: [`
    .icon-container {
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      color: white;
    }
    .medium { width: 48px; height: 48px; font-size: 24px; }
    .small { width: 32px; height: 32px; font-size: 16px; }
  `],
  standalone: false
})
export class CategoryIconComponent {
  @Input() categoria: string = '';
  @Input() size: 'small' | 'medium' = 'medium';
}
