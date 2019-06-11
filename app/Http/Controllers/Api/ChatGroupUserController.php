<?php

namespace CodeShopping\Http\Controllers\Api;

use Illuminate\Http\Request;
use CodeShopping\Http\Controllers\Controller;
use CodeShopping\Models\{ChatGroup, User};
use CodeShopping\Http\Resources\ChatGroupUserResource;
use CodeShopping\Http\Requests\ChatGroupUserRequest;

class ChatGroupUserController extends Controller
{
    public function index(ChatGroup $chat_group)
    {
        return new ChatGroupUserResource($chat_group);
    }

    public function store(ChatGroupUserRequest $request, ChatGroup $chat_group)
    {
        $chat_group->users()->attach($request->users);
        $users = User::whereIn('id', $request->users)->get();
        return response()->json(new ChatGroupUserResource($chat_group, $users), 201);
    }

    public function destroy(ChatGroup $chat_group, User $user)
    {
        $chat_group->users()->detach($user->id);
        return response()->json([], 204);
    }
}
