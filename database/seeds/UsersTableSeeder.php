<?php

use Illuminate\Database\Seeder;
use CodeShopping\Models\User;
use CodeShopping\Models\UserProfile;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \File::deleteDirectory(UserProfile::photoPath(), true);
        factory(User::class, 1)->create([
            'email' => 'admin@user.com'
        ])->each(function($user){
            \Illuminate\Database\Eloquent\Model::reguard();
            $user->updateWithProfile([
                'phone_number' => '+16505551234',
                'photo' => $this->getAdminPhoto()
            ]);
            \Illuminate\Database\Eloquent\Model::unguard();
        });

        factory(User::class, 1)->create([
            'email' => 'customer@user.com',
            'role' => User::ROLE_CUSTOMER
        ])->each(function($user){
            \Illuminate\Database\Eloquent\Model::reguard();
            $user->updateWithProfile([
                'phone_number' => '+16505551231'
            ]);
            \Illuminate\Database\Eloquent\Model::unguard();
        });
        
        factory(User::class, 20)->create(['role' => User::ROLE_CUSTOMER]);
    }

    public function getAdminPhoto()
    {
        return new \Illuminate\Http\UploadedFile(storage_path('app/faker/users/admin-photo.jpg'), str_random(16)."jpg");
    }
}
