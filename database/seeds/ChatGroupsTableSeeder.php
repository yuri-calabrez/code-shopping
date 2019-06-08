<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Collection;
use Illuminate\Http\UploadedFile;
use CodeShopping\Models\{ChatGroup, User};

class ChatGroupsTableSeeder extends Seeder
{
     /**
     * @var Collection $allFakerPhotos
     */
    private $allFakerPhotos;

    private $fakerPhotosPath = 'app/faker/chat_groups';

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->allFakerPhotos = $this->getFakerPhotos();
        $self = $this;
        $defaultCustomer = User::whereEmail('customer@user.com')->first();
        $otherCustomers = User::whereRole(User::ROLE_CUSTOMER)->whereNotIn('id', [$defaultCustomer->id])->get();

        $this->deleteAllPhotosInChatGroupsPath();
        factory(ChatGroup::class, 5)
            ->make()
            ->each(function($chatGroup) use ($self, $otherCustomers){
           $group = ChatGroup::createWithPhoto([
               'name' => $chatGroup->name,
               'photo' => $self->getUploadedFile()
           ]);

           $customerIds = $otherCustomers
                            ->random(10)
                            ->pluck('id')
                            ->toArray();

            $group->users()->attach($customerIds);
        });
    }

    private function getUploadedFile()
    {
        $photo = $this->allFakerPhotos->random();
        $uploadedFile = new UploadedFile($photo->getRealPath(), str_random(16).".".$photo->getExtension());
        return $uploadedFile;
    }

    private function getFakerPhotos(): Collection
    {
        $path = storage_path($this->fakerPhotosPath);
        return collect(\File::allFiles($path));
    }

    private function deleteAllPhotosInChatGroupsPath()
    {
        $path = ChatGroup::CHAT_GROUP_PHOTO_PATH;
        \File::deleteDirectory(storage_path($path), true);
    }
}
