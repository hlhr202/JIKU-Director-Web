<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Video extends Model
{
    protected $table='videos';
    protected $fillable=['collection_id','creator_id','name','raw'];

    public function creator(){
        return $this->belongsTo('App\User');
    }

    public function collection(){
        return $this->belongsTo('App\Collection');
    }
}
