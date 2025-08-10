import { Directive, HostListener, ElementRef, AfterViewInit, Input } from '@angular/core';

@Directive({
  selector: '[appFocusNavigation]'
})
export class FocusNavigationDirective implements AfterViewInit {
  /**
   * Pass a function from your component that takes the new row index
   * and handles tdChange logic there.
   */
  @Input() onRowChange!: (rowIndex: number) => void;

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    this.setFocusToFirstInputInRow();
  }

  @HostListener('keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    const currentInput = this.el.nativeElement as HTMLElement;
    const currentRow = currentInput.closest('tr');
    const parentTableWrapper = currentInput.closest('.p-datatable');

    if (!currentRow || !parentTableWrapper) return;

    const allRows = Array.from(parentTableWrapper.querySelectorAll('tr'));
    const rowIndex = allRows.indexOf(currentRow);
    const rowInputs = Array.from(currentRow.querySelectorAll('.form-control:not([disabled])')) as HTMLInputElement[];

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        if (rowIndex + 1 < allRows.length) {
          const nextRowIndex = rowIndex + 1;
          this.focusCell(allRows[nextRowIndex], rowInputs.indexOf(currentInput as HTMLInputElement));
          if (this.onRowChange) this.onRowChange(nextRowIndex);
        }
        break;

      case 'ArrowUp':
        event.preventDefault();
        if (rowIndex > 0) {
          const prevRowIndex = rowIndex - 1;
          this.focusCell(allRows[prevRowIndex], rowInputs.indexOf(currentInput as HTMLInputElement));
          if (this.onRowChange) this.onRowChange(prevRowIndex);
        }
        break;
    }
  }

  private focusCell(row: Element, colIndex: number) {
    const inputs = Array.from(row.querySelectorAll('.form-control:not([disabled])')) as HTMLInputElement[];
    if (colIndex >= 0 && inputs[colIndex]) {
      inputs[colIndex].focus();
      inputs[colIndex].select();
    } else if (inputs.length > 0) {
      inputs[0].focus();
      inputs[0].select();
    }
  }

  private setFocusToFirstInputInRow() {
    const row = this.el.nativeElement.closest('tr');
    const firstInput = row?.querySelector('.form-control:not([disabled])') as HTMLInputElement;
    if (firstInput) {
      setTimeout(() => {
        firstInput.focus();
        firstInput.select();
      }, 100);
    }
  }
}
