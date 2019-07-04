<?php

namespace CodeShopping\Http\Controllers\Api;

use Illuminate\Http\Request;
use CodeShopping\Http\Controllers\Controller;
use CodeShopping\Models\ChatGroup;
use CodeShopping\Http\Requests\ChatMessageFbRequest;
use CodeShopping\Firebase\ChatMessage;

class ChatMessageFbController extends Controller
{
    public function store(ChatMessageFbRequest $request, ChatGroup $chat_group)
    {
        $firebaseUid =\Auth::guard('api')->user()->profile->firebase_uid;
        $chatMessage = new ChatMessage();
        $chatMessage->create([
            'firebase_uid' => $firebaseUid,
            'chat_group' => $chat_group
        ] + $request->all());

        return response()->json([], 204);
    }
}
