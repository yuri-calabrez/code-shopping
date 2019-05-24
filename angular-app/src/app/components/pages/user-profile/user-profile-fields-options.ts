import { FieldsOptions } from "src/app/common/fields-options";

const fieldsOptions: FieldsOptions = {
    name: {
        id: 'name',
        label: 'Nome',
        validationMessage: {
            maxlength: 255
        }
    },
    email: {
        id: 'email',
        label: 'E-mail',
        validationMessage: {
            maxlength: 255
        }
    },
    password: {
        id: 'password',
        label: 'Senha',
        validationMessage: {
            maxlength: 16,
            minlength: 4
        }
    },
}

export default fieldsOptions