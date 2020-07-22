<?php

namespace App\Http\Controllers;

use App\Jobs\TestJob;
use App\Ping;
use Illuminate\Http\Request;

class PingController extends Controller
{
    /**
     * Get paginated results of pings
     *
     * @return array
     */
    public function index()
    {
        $data = Ping::orderBy('id', 'desc')->paginate();

        return response()->json([
            'method' => 'get list of pings',
            'data' => $data,
        ], 200);
    }

    /**
     * Run a new test
     *
     * @return void
     */
    public function run()
    {
        if(dispatch(new TestJob)) {
            return response()->json([
                'method' => 'queue a new connection test',
            ], 200);
        }

        return response()->json([
            'method' => 'queue a new connection test',
        ], 500);
    }
}
