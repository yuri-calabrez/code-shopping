<?php

namespace CodeShopping\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ChatGroupResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'photo_url' => $this->photo_url,
            'count_users' => $this->users_count,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at
        ];
    }
}
