import { Injectable, ElementRef } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { environment } from "src/environments/environment";

declare const $

@Injectable({
    providedIn: 'root'
})
export class ProductIdFieldService {

    data
    options: Select2Options
    select2Element: ElementRef

    constructor(private authService: AuthService) { }

    get divModal() {
        const modalElement = this.select2Native.closest('app-modal')
        return modalElement.firstChild
    }

    get select2Native(): HTMLElement {
        return this.select2Element.nativeElement
    }

    make(select2Element: ElementRef) {
        this.select2Element = select2Element
        this.options = {
            minimumInputLength: 3,
            dropdownParent: $(this.divModal),
            theme: 'bootstrap4',
            ajax: {
                headers: {
                    'Authorization': this.authService.authorizationHeader
                },
                url: `${environment.api.url}/products`,
                data(params) {
                    return {
                        search: params.term
                    }
                },
                processResults(result) {
                    return {
                        results: result.data.map(product => {
                            return {id: product.id, text: product.name}
                        })
                    }
                }
            }
        }
        this.data = []
    }
}