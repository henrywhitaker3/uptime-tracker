<?php

namespace App;

use App\Exceptions\HealthchecksPingFailureException;
use App\Exceptions\HealthchecksUuidNotFoundException;
use Illuminate\Support\Facades\Http;
use Ramsey\Uuid\Exception\InvalidUuidStringException;
use Ramsey\Uuid\Uuid;

class Healthchecks
{
    /**
     * UUID for healthcheks
     *
     * @var string
     */
    public $uuid;

    /**
     * URL for healthcheks instance
     *
     * @var string
     */
    public $url;

    /**
     * Constructor for healthchecks class
     *
     * @param String $uuid
     * @param String $url
     */
    public function __construct(String $uuid, String $url = 'https://hc-ping.com/')
    {
        $this->uuid = $uuid;
        $this->url = $url;

        $this->validate();
    }

    /**
     * Validate the args supplied in the constructor
     *
     * @return void
     */
    public function validate()
    {
        if(substr($this->url, -1) != '/') {
            $this->url = $this->url . '/';
        }

        if(Uuid::isValid($this->uuid) !== true) {
            throw new InvalidUuidStringException();
        }
    }

    /**
     * Ping the specified healthchecks endpoint
     *
     * @return boolean
     */
    public function ping($fail = false)
    {
        $url = $this->url . $this->uuid;
        if($fail === true) {
            $url = $url . '/fail';
        }

        $response = Http::withHeaders([ 'user-agent' => 'UptimeTracker/' . config('uptime.version') ])
                        ->get($url);

        if($response->status() !== 200) {
            if($response->status() == 404) {
                throw new HealthchecksUuidNotFoundException();
            }

            throw new HealthchecksPingFailureException();
        }

        return true;
    }

    /**
     * Explicitly send a failed ping to healthchecks
     *
     * @return boolean
     */
    public function fail()
    {
        return $this->ping(true);
    }
}
