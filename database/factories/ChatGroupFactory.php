<?php

use Faker\Generator as Faker;

$factory->define(CodeShopping\Models\ChatGroup::class, function (Faker $faker) {
    return [
        'name' => $faker->country
    ];
});
