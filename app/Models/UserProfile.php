<?php

namespace CodeShopping\Models;

use Illuminate\Database\Eloquent\Model;

class UserProfile extends Model
{
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
