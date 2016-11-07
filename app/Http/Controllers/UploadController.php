<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Request;

use App\Http\Requests;

class UploadController extends Controller
{
    public function post(Request $request){
        $files = $request->allFiles();
        var_dump($files);
    }
}
