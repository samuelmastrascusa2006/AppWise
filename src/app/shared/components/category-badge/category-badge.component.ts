import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-category-badge',
  template: `
    <ion-badge [style.--background]="categoria | categoryColor">
      <ion-icon *ngIf="mostrarIcono" [name]="categoria | categoryIcon" class="ion-margin-end"></ion-icon>
      {{ categoria }}
    </ion-badge>
  `,
  styles: [`
    ion-badge { 
      padding: 6px 10px; 
      border-radius: 12px;
      display: flex;
      align-items: center;
      width: fit-content;
    }
  `],
  standalone: false
})
export class CategoryBadgeComponent {
  @Input() categoria: string = '';
  @Input() mostrarIcono: boolean = true;
}
