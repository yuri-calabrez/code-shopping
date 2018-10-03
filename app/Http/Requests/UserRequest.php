<?php

namespace CodeShopping\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $id = $this->route('user') ? json_decode($this->route('user'))->id : null;
        $rules = [
            'name' => 'required|max:255',
            'email' => 'required|max:255|email|unique:users,email,'.$id
        ];
        if (!$id) {
            $rules = array_merge($rules, ['password' => 'required|min:16']);
        }

        return $rules;
    }
}
