<?php

use Illuminate\Database\Seeder;
use CodeShopping\Models\Product;
use CodeShopping\Models\ProductInput;

class ProductInputsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $products = Product::all();
        factory(ProductInput::class, 100)
            ->make()
            ->each(function($productInput) use ($products){
                $product = $products->random();
                $productInput->product_id = $product->id;
                $productInput->save();
                $product->stock += $productInput->amount;
                $product->save();
            });
    }
}
