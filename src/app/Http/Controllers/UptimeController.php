<?php

namespace App\Http\Controllers;

use App\Helpers\PingHelper;
use App\Ping;
use Illuminate\Http\Request;

class UptimeController extends Controller
{
    /**
     * Get the current uptime status
     *
     * @return array
     */
    public function status()
    {
        $latest = PingHelper::latest();
        $uptime = PingHelper::uptime();

        return response()->json([
            'method' => 'get uptime status',
            'latest' => $latest,
            'uptime' => $uptime,
        ], 200);
    }
}
