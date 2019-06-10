<?php

namespace CodeShopping\Http\Controllers\Api;

use Illuminate\Http\Request;
use CodeShopping\Http\Controllers\Controller;
use CodeShopping\Models\ChatGroup;
use CodeShopping\Http\Resources\ChatGroupUserResource;

class ChatGroupUserController extends Controller
{
    public function index(ChatGroup $chat_group)
    {
        return new ChatGroupUserResource($chat_group);
    }

    public function store()
    {

    }

    public function destroy()
    {
        
    }
}
