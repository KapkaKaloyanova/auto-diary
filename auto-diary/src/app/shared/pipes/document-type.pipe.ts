import { Pipe, PipeTransform } from "@angular/core";
import { DocumentRecord } from "../interfaces/document-record";

@Pipe({name: 'documentType'})
export class DocumentTypePipe implements PipeTransform{

    transform(documentType: DocumentRecord['type']): string {
        switch (documentType) {
            case 'insurance':
                return 'Застраховка';
            case 'civil_liability':
                return 'Гражданска отговорност';
            case 'tax':
                return 'Данък';
            case 'vignette':
                return 'Винетка';
            case 'other':
                return 'Друго';
            default:
                return '---';
        }
    }
}