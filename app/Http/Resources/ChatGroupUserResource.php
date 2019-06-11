<?php

namespace CodeShopping\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Pagination\AbstractPaginator;
use CodeShopping\Http\Resources\UserResource;
use Illuminate\Http\JsonResponse;

class ChatGroupUserResource extends JsonResource
{
    private $users;

    public function __construct($resource, $users = null)
    {
        parent::__construct($resource);
        $this->users = $users;
    }
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        //self::withoutWrapping();
        return $this->makeArray($request);
    }

    protected function makeArray($request)
    {
        $chatGroup = $this->getChatGroup();
        $array = [
            'data' => [
                'chat_group' => new ChatGroupResource($chatGroup)        
            ]
        ];

        $usersResponse = $this->getUsersResponse($request);

        if ($usersResponse instanceof JsonResponse) {
            /**@var \stdClass $data */
            $data = $usersResponse->getData();
            $array['data']['users'] = $data->data;
            $array['links'] = $data->links;
            $array['meta'] = $data->meta;
        } else {
            $array['data']['users'] = $usersResponse;
        }

        return $array;
    }

    protected function getChatGroup()
    {
        $chat_group = $this->resource;
        $chat_group->users_count = $this->resource->users()->count();
        return $chat_group;
    }

    protected function getUsersResponse($request)
    {
        $users = $this->users ? $this->users : $this->resource->users()->paginate();

        return $users instanceof AbstractPaginator ? 
            UserResource::collection($users)->toResponse($request) :
            UserResource::collection($users);
    }
}
