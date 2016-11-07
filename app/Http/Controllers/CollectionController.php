<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Collection;

class CollectionController extends Controller
{
    public function getCollections(Request $request){
        $userInfo = $request->attributes->get('user');

        $collection = Collection::where('creator',$userInfo['user']['id'])->get();

        if (is_array($userInfo) && $userInfo['user']){
            return response()->json($collection);
        } else {
            return response()->json(['user_not_found'], 404);
        }
    }
}
