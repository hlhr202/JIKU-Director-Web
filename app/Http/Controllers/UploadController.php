<?php

namespace App\Http\Controllers;

use App\Video;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Collection;
use App\User;

class UploadController extends Controller
{
    public function post(Request $request){
        $collection_id = $request->query('collection');
        $userInfo = $request->attributes->get('user');
        $queryCollection = Collection::where('creator_id',$userInfo['user']['id'])->where('id',$collection_id);
        $user = User::where('id',$userInfo['user']['id'])->first();
        if ($queryCollection->count()==1){
            $file = $request->file('video');



            $videoInfo = array(
                'name'=>$file->getClientOriginalName(),
                'ext'=>$file->extension(),
                'mimeType'=>$file->getMimeType(),
                'size'=>$file->getClientSize(),
                'error'=>$file->getError(),
            );

            $video = Video::create(['name'=>$file->getClientOriginalName(),'raw'=>json_encode($videoInfo)]);

            $video->collection()->associate($queryCollection->first());
            $video->creator()->associate($user);


            $video->save();

            $name = (string)($video->id).'.'.$videoInfo['ext'];

            error_log(public_path().'/uploads');

            //move file to path: /uploads/{creator_id}/{collection_id}/{video_id}.{video_ext}
            $file->move(public_path().'/uploads/'.((string)($userInfo['user']['id'])).'/'.((string)($queryCollection->first()['id'])),$name);
            return response()->json($video);
        };

    }
}
