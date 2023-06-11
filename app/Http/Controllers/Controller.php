<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function done($data = [], $message = "success", $status = 200)
    {
        return response()->json([
            'message' => $message,
            'server_time' => date('Y-m-d H:i:s'),
            'data' => $data
        ], $status);
    }

    public function failed($message = "failed", $status = 400, $data = [])
    {
        return response()->json([
            'message' => $message,
            'data' => $data
        ], $status);
    }
}
