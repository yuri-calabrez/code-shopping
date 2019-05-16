<?php

namespace CodeShopping\Http\Controllers\Api;

use Illuminate\Http\Request;
use CodeShopping\Http\Controllers\Controller;
use CodeShopping\Http\Resources\UserResource;
use CodeShopping\Firebase\Auth as FirebaseAuth;
use CodeShopping\Http\Requests\UserProfileUpdateRequest;

class UserProfileController extends Controller
{
    public function update(UserProfileUpdateRequest $request)
    {
        $data = $request->all();
        if ($request->has('token')) {
            $token = $request->token;
            $data['phone_number'] = $this->getPhoneNumber($token);
        }

        if ($request->has('remove_photo')) {
            $data['photo'] = null;
        }
        $user = \Auth::guard('api')->user();
        $user->updateWithProfile($data);
        return new UserResource($user);
    }

    private function getPhoneNumber(string $token): string
    {
        $firebaseAuth = app(FirebaseAuth::class);
        return $firebaseAuth->phoneNumber($token);
    }
}
