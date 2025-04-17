import { Directive, HostListener, ElementRef, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appFocusNavigation]'
})
export class FocusNavigationDirective implements AfterViewInit {
  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    this.setFocusToFirstInputInRow();
  }
  @HostListener('keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    const allRows = Array.from(document.querySelectorAll('tr'));
    const currentRow = this.el.nativeElement.closest('tr');
    const rowIndex = allRows.indexOf(currentRow);
    if (!currentRow || rowIndex === -1) return;

    const allInputs = Array.from(document.querySelectorAll('.form-control:not([disabled])')) as HTMLInputElement[];
    const rowInputs = Array.from(currentRow.querySelectorAll('.form-control:not([disabled])')) as HTMLInputElement[];

    const currentIndex = allInputs.indexOf(this.el.nativeElement);
    if (currentIndex === -1) return;

    let targetIndex = -1;

    switch (event.key) {
      case 'ArrowRight':
        targetIndex = currentIndex + 1;
        break;
      case 'ArrowLeft':
        targetIndex = currentIndex - 1;
        break;
      case 'ArrowDown':
        if (rowIndex + 1 < allRows.length) {
          const nextRowInputs = Array.from(allRows[rowIndex + 1].querySelectorAll('.form-control:not([disabled])')) as HTMLInputElement[];
          const colIndex = rowInputs.indexOf(this.el.nativeElement);
          if (nextRowInputs[colIndex]) {
            nextRowInputs[colIndex].focus();
            event.preventDefault();
          }
        }
        return;

      case 'ArrowUp':
        if (rowIndex > 0) {
          const prevRowInputs = Array.from(allRows[rowIndex - 1].querySelectorAll('.form-control:not([disabled])')) as HTMLInputElement[];
          const colIndex = rowInputs.indexOf(this.el.nativeElement);
          if (prevRowInputs[colIndex]) {
            prevRowInputs[colIndex].focus();
            event.preventDefault();
          }
        }
        return;

      default:
        return;
    }
    while (targetIndex >= 0 && targetIndex < allInputs.length) {
      if (!allInputs[targetIndex].disabled) {
        allInputs[targetIndex].focus();
        event.preventDefault(); 
        break;
      }
      targetIndex += event.key === 'ArrowRight' ? 1 : -1;
    }
  }

  private setFocusToFirstInputInRow() {
    const firstInput = this.el.nativeElement.closest('tr')?.querySelector('.form-control:not([disabled])') as HTMLInputElement;
    if (firstInput) {
      setTimeout(() => firstInput.focus(), 100);
    }
  }
}
