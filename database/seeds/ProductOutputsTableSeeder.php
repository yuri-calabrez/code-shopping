<?php

use Illuminate\Database\Seeder;
use CodeShopping\Models\ProductOutput;
use CodeShopping\Models\Product;

class ProductOutputsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $products = Product::all();
        factory(ProductOutput::class, 100)
            ->make()
            ->each(function($productOutput) use ($products){
                $product = $products->random();
                $productOutput->product_id = $product->id;
                $productOutput->save();
            });
    }
}
