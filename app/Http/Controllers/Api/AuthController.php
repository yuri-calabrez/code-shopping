<?php

namespace CodeShopping\Http\Controllers\Api;

use Illuminate\Http\Request;
use CodeShopping\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use CodeShopping\Http\Resources\UserResource;
use CodeShopping\Firebase\Auth as FirebaseAuth;
use CodeShopping\Models\UserProfile;

class AuthController extends Controller
{
    use AuthenticatesUsers;

    public function login(Request $request)
    {
        $this->validateLogin($request);

        $credentials = $this->credentials($request);

        $token = \JWTAuth::attempt($credentials);

        return $this->responseToken($token);
    }

    public function loginFirebase(Request $request)
    {
        $firebaseAuth = app(FirebaseAuth::class);
        $user = $firebaseAuth->user($request->token);
        $profile = UserProfile::where('phone_number', $user->phoneNumber)->first();
        $token = null;
        if ($profile) {
            $token = \Auth::guard('api')->login($profile->user);
        }
        return $this->responseToken($token);

    }

    public function logout()
    {
        \Auth::guard('api')->logout();
        return response()->json([], 204);
    }

    public function refresh()
    {
        $token = \Auth::guard('api')->refresh();
        return ['token' => $token];
    }

    public function me()
    {
        $user = \Auth::guard('api')->user();
        return new UserResource($user);
    }

    private function responseToken($token)
    {
        return $token ? 
        ['token' => $token] : 
        response()->json([
            'error' => \Lang::get('auth.failed')
        ], 400);
    }
}
