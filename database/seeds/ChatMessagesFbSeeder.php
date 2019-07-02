<?php

use Illuminate\Database\Seeder;
use CodeShopping\Models\{ChatGroup, User};
use CodeShopping\Firebase\ChatMessage;
use Illuminate\Database\Eloquent\Collection;
use Faker\Factory as FakerFactory;

class ChatMessagesFbSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        /* @var Collection chatGroups */
        $chatGroups = ChatGroup::all();
        $users = User::all();
        $chatMessages = new ChatMessage();

        $chatGroups->each(function($group) use ($users, $chatMessages){
            $chatMessages->deleteMessages($group);
            
            foreach (range(1, 10) as $value) {
                $content = FakerFactory::create()->sentence(10);
                $type = 'text';

                $chatMessages->create([
                    'chat_group' => $group,
                    'content' => $content,
                    'type' => $type,
                    'firebase_uid' => $users->random()->profile->firebase_uid
                ]);
            }
        });
    }
}
