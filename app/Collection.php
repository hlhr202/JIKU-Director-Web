<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Collection extends Model
{
    //
    protected $table='collections';
    protected $fillable=['creator_id','name','status'];

    public function creator(){
        return $this->belongsTo('App\User');
    }
}
