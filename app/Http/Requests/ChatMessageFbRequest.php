<?php

namespace CodeShopping\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use CodeShopping\Models\{ChatGroup, User};

class ChatMessageFbRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return $this->groupHasUser() || $this->hasSeller();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'type' => 'required|in:text,image,audio',
            'content' =>'required'
        ];
    }

    private function groupHasUser(): bool
    {
        /** @var ChatGroup $chatGroup */
        $chatGroup = $this->route('chat_group');
        $user = \Auth::guard('api')->user();

        return $chatGroup->users()->where('user_id', $user->id)->exists();
    }

    private function hasSeller(): bool
    {
        $user = \Auth::guard('api')->user();
        return $user->role == User::ROLE_SELLER;
    }

    protected function getValidatorInstance()
    {
        $validator = parent::getValidatorInstance();

        $validator->sometimes('content', 'required|string', function($input){
            return $input->type === 'text';
        });

        $validator->sometimes('content', 'required|image|max:'.(3 * 1024), function($input){
            return $input->type === 'image';
        });

        return $validator;
    }
}
