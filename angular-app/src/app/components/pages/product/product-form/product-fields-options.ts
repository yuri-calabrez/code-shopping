import { FieldsOptions } from "src/app/common/fields-options";

const fieldsOptions: FieldsOptions = {
    name: {
        id: 'name',
        label: 'Nome',
        validationMessage: {
          maxlength: 255
        }
      },
      description: {
        id: 'description',
        label: 'Descrição',
        validationMessage: {
            maxlength: 255
          }
      },
      price: {
        id: 'price',
        label: 'Preço'
      },
      active: {
        id: 'active',
        label: 'Ativo'
      }
}

export default fieldsOptions