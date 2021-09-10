import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClipboardService {
  public copyToClipboard(text: string): void {
    navigator.clipboard.writeText(text);
  }
}
