<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\User;
use App\Collection;

class CollectionController extends Controller
{
    public function getCollections(Request $request){
        $userInfo = $request->attributes->get('user');

        $collection = Collection::where('creator_id',$userInfo['user']['id'])->get();

        if (is_array($userInfo) && $userInfo['user']){
            return response()->json($collection);
        } else {
            return response()->json(['user_not_found'], 404);
        }
    }

    public function createCollection(Request $request){
        $userInfo = $request->attributes->get('user');
        $payload = json_decode($request->getContent(), true);

        $collections = Collection::create(['name'=>$payload['name'],'status'=>'ready']);

        $user = User::where('id',$userInfo['user']['id'])->first();

        $collections->creator()->associate($user);

        $collections->save();
        return response()->json($collections);
    }
}
