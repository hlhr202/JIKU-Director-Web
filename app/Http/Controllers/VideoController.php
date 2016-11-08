<?php

namespace App\Http\Controllers;

use App\Video;
use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\Process\Process;

class VideoController extends Controller
{
    public function getVideos(Request $request){
        $userInfo = $request->attributes->get('user');

        $videos = Video::where('creator_id',$userInfo['user']['id'])->where('collection_id',$request->get('collectionid'))->get();

        if (is_array($userInfo) && $userInfo['user']){
            return response()->json($videos);
        } else {
            return response()->json(['user_not_found'], 404);
        }
    }

    private function rrmdir($dir) {
        if (is_dir($dir)) {
            $objects = scandir($dir);
            foreach ($objects as $object) {
                if ($object != "." && $object != "..") {
                    if (filetype($dir."/".$object) == "dir") rrmdir($dir."/".$object); else unlink($dir."/".$object);
                }
            }
            reset($objects);
            rmdir($dir);
        }
    }

    public function processBrightness(Request $request){
        $userInfo = $request->attributes->get('user');

        $videos = Video::where('creator_id',$userInfo['user']['id'])->where('collection_id',$request->get('collectionid'))->get();

        $filelist_string = '';

        if (!empty($videos)){
            foreach ($videos as $video){
                $creator_id = $video['creator_id'];
                $collection_id = $video['collection_id'];
                $video_id = $video['id'];
                $filelist_string = $filelist_string.' '.public_path().'/uploads/'.$creator_id.'/'.$collection_id.'/'.$video_id.'.mp4';
            }

            $programPath = public_path().'/BrightnessAdjusment/';
            $outputPath = public_path().'/uploads/'.$userInfo['user']['id'].'/'.$request->get('collectionid').'/brightness';

            //$processString = $programPath.' '.$outputPath.$filelist_string;
            chdir(base_path().'/public/BrightnessAdjustment/');
            //$outputPath = base_path().'/public/uploads/'.$userInfo['user']['id'].'/'.$request->get('collectionid').'/brightness';
            exec('rm -rf '.$outputPath);
            mkdir(base_path().'/public/uploads/'.$userInfo['user']['id'].'/'.$request->get('collectionid').'/brightness',0775);

            //$processString = 'cd '.$programPath;
            $processString = './Main '.$outputPath.$filelist_string;
            var_dump($processString);

            $process = new Process($processString);

            $process->setTimeout(0);

            $process->start();

            $process->wait();

        }

    }
}
