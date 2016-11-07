<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use App\Collection;

class CollectionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        Model::unguard();
        $collections = factory(App\Collection::class, 10)->make()->each(function($u){
            $u->save();
        });

        error_log($collections);
        Model::reguard();
    }
}
