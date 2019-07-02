<?php

namespace CodeShopping\Firebase;

use CodeShopping\Models\ChatGroup;

class ChatMessage
{
    use FirebaseSync;

    private $chatGroup;

    public function create(array $data)
    {
        $this->chatGroup = $data['chat_group'];

        $type = $data['type'];

        switch ($type) {
            case 'image':

                break;

            case 'audio':

                break;
        }

        $reference = $this->getMessagesReference();
        $reference->push([
            'type' => $data['type'],
            'content' => $data['content'],
            'created_at' => ['.sv' => 'timestamp'],
            'user_id' => $data['firebase_uid']
        ]);
    }

    public function deleteMessages(ChatGroup $chatGroup)
    {
        $this->chatGroup = $chatGroup;
        $this->getMessagesReference()->remove();
    }

    private function getMessagesReference()
    {
        $path = "/chat_groups/{$this->chatGroup->id}/messages";
        return $this->getFirebaseDatabase()->getReference($path);
    }
}