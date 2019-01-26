export interface FieldsOptions {
    [field: string]: {
        id: string,
        label: string,
        validationMessage?: {
            [error: string]: any
        }
    }
}