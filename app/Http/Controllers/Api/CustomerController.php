<?php

namespace CodeShopping\Http\Controllers\Api;

use Illuminate\Http\Request;
use CodeShopping\Http\Controllers\Controller;
use CodeShopping\Http\Requests\CustomerRequest;
use CodeShopping\Firebase\Auth as FirebaseAuth;
use CodeShopping\Models\User;
use CodeShopping\Http\Requests\PhoneNumberToUpdateRequest;
use CodeShopping\Models\UserProfile;

class CustomerController extends Controller
{
    public function store(CustomerRequest $request)
    {
        $data = $request->all();
        $token = $request->token;
        $data['phone_number'] = $this->getPhoneNumber($token);
        $data['photo'] = $data['photo'] ?? null;
        $user = User::createCustomer($data);
        return [
            'token' => \Auth::guard('api')->login($user)
        ];
    }

    public function requestPhoneNumberToUpdate(PhoneNumberToUpdateRequest $request)
    {
        $user = User::whereEmail($request->email)->first();
        $phoneNumber = $this->getPhoneNumber($request->token);
        $token = UserProfile::createTokenToChangePhoneNumber($user->profile, $phoneNumber);
        //enviar email
        return response()->json([], 204);
    }

    private function getPhoneNumber(string $token): string
    {
        $firebaseAuth = app(FirebaseAuth::class);
        return $firebaseAuth->phoneNumber($token);
    }
}
