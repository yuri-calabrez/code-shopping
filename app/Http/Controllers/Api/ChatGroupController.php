<?php

namespace CodeShopping\Http\Controllers\Api;

use Illuminate\Http\Request;
use CodeShopping\Http\Controllers\Controller;
use CodeShopping\Models\ChatGroup;
use CodeShopping\Http\Resources\ChatGroupResource;
use CodeShopping\Http\Requests\{ChatGroupCreateRequest, ChatGroupUpdateRequest};

class ChatGroupController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $chatGroups = ChatGroup::paginate();
        return ChatGroupResource::collection($chatGroups);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ChatGroupCreateRequest $request)
    {
        $chatGroup = ChatGroup::createWithPhoto($request->all());
        return new ChatGroupResource($chatGroup);
    }

    /**
     * Display the specified resource.
     *
     * @param ChatGroup $chat_group
     * @return ChatGroupResource
     */
    public function show(ChatGroup $chat_group)
    {
        return new ChatGroupResource($chat_group);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(ChatGroupUpdateRequest $request, ChatGroup $chat_group)
    {
        $chat_group->updateWithPhoto($request->all());
        return new ChatGroupResource($chat_group);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(ChatGroup $chat_group)
    {
        $chat_group->delete();
        
        return response()->json([], 204);
    }
}
