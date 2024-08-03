import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  constructor(private datePipe: DatePipe) {}

  public static getAge(dateString: string): number {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  public static formatDate(dateObject: { date: { year: number; month: number; day: number } }): Date {
    return new Date(dateObject.date.year, dateObject.date.month - 1, dateObject.date.day);
  }

  public static getMonth(value: number): number | undefined {
    return value > 0 && value < 13 ? value - 1 : undefined;
  }

  public static getFileFormat(ext: string): string | undefined {
    switch (ext.toUpperCase()) {
      case 'PDF':
        return 'PDF';
      case 'DOC':
      case 'DOCX':
        return 'WORD_DOCUMENT';
      case 'JPEG':
      case 'JPG':
      case 'PNG':
        return 'IMAGE';
      default:
        return undefined;
    }
  }

  public static toDateString(date: Date): string {
    const pad = (n: number) => (n > 9 ? '' + n : '0' + n);
    const day = pad(date.getDate());
    const month = pad(date.getMonth() + 1);
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  public static transformDate(date: Date): string {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${year}-${month <= 9 ? '0' + month : month}-${day <= 9 ? '0' + day : day}`;
  }

  public formatDate(c: { date: { year: number; month: number; day: number } }): Date {
    return new Date(c.date.year, c.date.month - 1, c.date.day);
  }

  public transformDate(date: string | Date, format: string = 'ddMMMyyyy'): string | null {
    return this.datePipe.transform(date, format);
  }

  /**
   * This method converts date from mydatepicker {year: 2020, month: 6, day: 15} to dd-mm-yyyy
   */
  public mydatepickerDateToString(date: { day: number; month: number; year: number }): string {
    return `${date.day}-${date.month}-${date.year}`;
  }

  public dateToTimestamp(date: Date, seconds: number): Date {
    return new Date(date.getTime() + seconds * 1000);
  }
}
