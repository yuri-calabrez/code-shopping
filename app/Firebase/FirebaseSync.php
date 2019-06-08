<?php

namespace CodeShopping\Firebase;

use Kreait\Firebase;
use Kreait\Firebase\Database\Reference;
use Kreait\Firebase\Database;

trait FirebaseSync
{
    public static function bootFirebaseSync()
    {
        static::created(function($model){
            $model->syncFirebaseCreate();
        });

        static::updated(function($model){
            $model->syncFirebaseUpdate();
        });

        static::deleted(function($model){
            $model->syncFirebaseRemove();
        });
    }

    protected function syncFirebaseCreate()
    {   
        $this->syncFirebaseSet();
    }

    protected function syncFirebaseUpdate()
    {
        $this->syncFirebaseSet();
    }

    protected function syncFirebaseSet()
    {
        $this->getModelReference()->update($this->toArray());
    }

    protected function syncFirebaseRemove()
    {
        $this->getModelReference()->remove();
    }

    protected function getModelReference(): Reference
    {
        $path = $this->getTable()."/".$this->getKey();
        return $this->getFirebaseDatabase()->getReference($path);
    }

    protected function getFirebaseDatabase(): Database
    {
        $firebase = app(Firebase::class);
        return $firebase->getDatabase();
    }
    
}