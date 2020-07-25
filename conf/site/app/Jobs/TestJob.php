<?php

namespace App\Jobs;

use App\Helpers\PingHelper;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Cache;

class TestJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        PingHelper::ping();

        $opts = [
            'all',
            7,
            30
        ];


        foreach($opts as $opt) {
            Cache::forget('total-' . $opt);
            PingHelper::totalUptime($opt);
        }
    }
}
