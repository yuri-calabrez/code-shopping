<?php

use Illuminate\Database\Seeder;
use CodeShopping\Models\Product;
use CodeShopping\Models\ProductPhoto;
use Illuminate\Support\Collection;
use Illuminate\Http\UploadedFile;

class ProductPhotosTableSeeder extends Seeder
{
    /**
     * @var Collection $allFakerPhotos
     */
    private $allFakerPhotos;

    private $fakerPhotosPath = 'app/faker/product_photos';

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->allFakerPhotos = $this->getFakerPhotos();
        $products = Product::all();
        $self = $this;
        $this->deleteAllPhotosInProductsPath();
        $products->each(function($product) use ($self){
            $self->createPhotoDir($product);
            $self->createPhotosModels($product);
        });
    }

    private function getFakerPhotos(): Collection
    {
        $path = storage_path($this->fakerPhotosPath);
        return collect(\File::allFiles($path));
    }

    private function deleteAllPhotosInProductsPath()
    {
        $path = ProductPhoto::PRODUCTS_PATH;
        \File::deleteDirectory(storage_path($path), true);
    }

    private function createPhotoDir(Product $product)
    {
        \File::makeDirectory(ProductPhoto::photosPath($product->id), 775, true);
    }

    private function createPhotosModels(Product $product)
    {
        foreach (range(1, 5) as $v) {
            $this->createPhotoModel($product);
        }
    }

    private function createPhotoModel(Product $product)
    {
        $photo = ProductPhoto::create([
            'product_id' => $product->id,
            'file_name' => 'image.jpg'
        ]);
        $this->generatePhoto($photo);
    }

    private function generatePhoto(ProductPhoto $productPhoto)
    {
        $productPhoto->file_name = $this->uploadPhoto($productPhoto->product_id);
        $productPhoto->save();
    }

    private function uploadPhoto(int $productId): string
    {
        /**@var SplFileInfo $photoFile */
        $photoFile = $this->allFakerPhotos->random();
        $uploadedFile = new UploadedFile($photoFile->getRealPath(), str_random(16).'.'.$photoFile->getExtension());
        //TODO: upload da foto
        return $uploadedFile->hashName();
    }
}
