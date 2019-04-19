<?php

namespace CodeShopping\Firebase;

use Kreait\Firebase\Auth\UserRecord;
use Kreait\Firebase;

class Auth
{
    protected $firebase;

    public function __construct(Firebase $firebase)
    {
        $this->firebase = $firebase;
    }

    public function phoneNumber(string $token): string
    {
        $user = $this->user($token);
        return $user->phoneNumber;
    }

    public function user(string $token): UserRecord
    {
        $verifiedIdToken = $this->firebase->getAuth()->verifyIdToken($token);
        $uid = $verifiedIdToken->getClaim('sub');
        return $this->firebase->getAuth()->getUser($uid);
    }
}