import { FieldsOptions } from "src/app/common/fields-options";

const productInputFieldsOptions: FieldsOptions = {
  product_id: {
    id: 'product_id',
    label: 'Produto'
    },
  amount: {
    id: 'amount',
    label: 'Quantidade',
    validationMessage: {
      min: 1
    }
  }
}

export default productInputFieldsOptions