<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class UptimeVersionCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'uptime:version';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Displays the version number of this instance';

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
     * @return mixed
     */
    public function handle()
    {
        $this->info('Uptime Tracker v' . config('uptime.version'));
    }
}
