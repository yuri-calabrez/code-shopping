<?php

namespace CodeShopping\Rules;

use Illuminate\Contracts\Validation\Rule;
use CodeShopping\Firebase\Auth as FirebaseAuth;

class PhoneNumberUnique implements Rule
{
    private $ignoreUserId;
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct($ignoreUserId = null)
    {
        $this->ignoreUserId = $ignoreUserId;
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        $firebaseAuth = app(FirebaseAuth::class);
        try {
            $phoneNumber = $firebaseAuth->phoneNumber($value);
            $userProfile = UserProfile::where('phone_number', $phoneNumber)->first();
            return $userProfile == null || $this->ignoreUserId != null && $this->ignoreUserId == $userProfile->user->id;
        } catch(\Exception $e) {
            return false;
        }
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'The phone number has already been taken';
    }
}
