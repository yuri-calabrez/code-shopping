<?php

namespace CodeShopping\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use CodeShopping\Rules\FirebaseTokenVerification;
use CodeShopping\Rules\PhoneNumberUnique;

class UserProfileUpdateRequest extends FormRequest
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
        $userId = \Auth::guard('api')->user()->id;
        return [
            'name' => 'max:255',
            'email' => "email|unique:users,email,{$userId}",
            'password' => 'min:4|max:16',
            'photo' => 'image|max:'.(3 * 1024),
            'token' => [
                new FirebaseTokenVerification(),
                new PhoneNumberUnique($userId)
            ]
        ];
    }
}
