<?php

use App\Helpers\SettingsHelper;
use App\Setting;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSettingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('settings', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->string('description')->nullable();
            $table->string('value');
            $table->timestamps();
        });

        $settings = [
            [
                'name' => 'ip',
                'value' => '1.1.1.1',
                'description' => 'The IP address that is pinged during connection tests.'
            ],
            [
                'name' => 'healthchecks_uuid',
                'value' => '',
                'description' => 'The healthchecks UUID to ping.'
            ],
            [
                'name' => 'healthchecks_url',
                'value' => 'https://hc-ping.com/',
                'description' => 'The healthchecks url to ping.'
            ],
            [
                'name' => 'test_schedule',
                'value' => '* * * * *',
                'description' => 'The CRON schedule for running connection tests.'
            ],
            [
                'name' => 'test_type',
                'value' => 'ping',
                'description' => 'The type of connection test to run.'
            ]
        ];

        foreach($settings as $s) {
            Setting::create([
                'name' => $s['name'],
                'value' => $s['value'],
                'description' => $s['description']
            ]);
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('settings');
    }
}
