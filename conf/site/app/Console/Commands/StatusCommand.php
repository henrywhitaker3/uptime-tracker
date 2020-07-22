<?php

namespace App\Console\Commands;

use App\Helpers\PingHelper;
use Illuminate\Console\Command;

class StatusCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'uptime:status';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Get the current status of the system';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $latest = PingHelper::latest();
        $uptime = PingHelper::uptime();

        if($latest === false) {
            $this->info('No tests have been run on the system yet.');
            return 0;
        }

        if($latest->success) {
            $this->info('Status: Online');
            $this->info('Uptime: ' . $uptime['readable']);
        } else {
            $this->warn('Status: Offline');
            $this->warn('Downtime: ' . $uptime['readable']);
        }

        $this->info('');

        $this->info('Latest test: ' . $latest->created_at);
        $this->info('Type: ' . $latest->type);
        $this->info('Target: ' . $latest->target);
    }
}
