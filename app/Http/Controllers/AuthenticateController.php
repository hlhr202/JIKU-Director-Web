<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;
use JWTAuth;
use JWTFactory;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use App\User;
use Barryvdh\Debugbar\Facade as Debugbar;
use Illuminate\Support\Facades\Hash;

class AuthenticateController extends Controller
{
    public function index()
    {
        // TODO: show users
        print(234);
        $user_test = User::find(1);
        Debugbar::info($user_test);
    }

    public function login(Request $request)
    {
        $payload = json_decode($request->getContent(), true);

        $credentials = ['email'=>$payload['email'], 'password'=>$payload['password']];

        try {
            // verify the credentials and create a token for the user
            if (!$token = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'invalid_credentials'], 401);
            }
        } catch (JWTException $e) {
            // something went wrong
            return response()->json(['error' => 'could_not_create_token'], 500);
        }

        // if no errors are encountered we can return a JWT
        return response()->json(compact('token'));
    }

    
    public function auth(Request $request)
        //after middleware JWTEnsureAuth
    {

        $userInfo = $request->attributes->get('user');

        if (is_array($userInfo) && $userInfo['user']){
            return response()->json($userInfo);
        } else {
            return response()->json(['user_not_found'], 404);
        }
    }

    public function registry(Request $request)
    {
        $payload = json_decode($request->getContent(), true);

        $validator = Validator::make($payload,[
            'name'=>'required|max:255',
            'password'=>'required|max:255|min:8',
            'email'=>'required|email|max:255'
        ]);

        if ($validator->fails()){
            return response()->json(['error'=>'input_not_acceptable']);
        } else {

            $users = User::where('email', $payload['email'])->get();

            if (!$users->isEmpty()){
                return response()->json(['error'=>'email_existed']);
            } else {
                $newUser = User::create(['name'=>$payload['name'],'email'=>$payload['email'],'password'=>Hash::make($payload['password'])]);
                error_log($newUser->getAttribute('id'));

                try {
                    // attempt to verify the credentials and create a token for the user
                    if (! $token = JWTAuth::fromUser($newUser)) {
                        return response()->json(['error' => 'invalid_credentials']);
                    }
                } catch (JWTException $e) {
                    // something went wrong whilst attempting to encode the token
                    return response()->json(['error' => 'could_not_create_token']);
                }

                // all good so return the token
                return response()->json(compact('token'));
            }
        }

    }

}
