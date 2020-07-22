<?php

namespace App\Helpers;

use App\Exceptions\HealthchecksPingFailureException;
use App\Exceptions\HealthchecksUuidNotFoundException;
use App\Healthchecks;
use App\Ping as Ping;
use Carbon\Carbon;
use Illuminate\Http\Client\ConnectionException;
use JJG\Ping as JJPing;
use Ramsey\Uuid\Exception\InvalidUuidStringException;

class PingHelper {

    /**
     * Ping an IP address
     *
     * @return Ping
     */
    public static function standardPing($ip = null)
    {
        if($ip === null) {
            $ip = SettingsHelper::get('ip')->value;
        }

        $ping = new JJPing($ip);

        $latency = $ping->ping();

        $store = [
            'type' => 'ping',
            'target' => $ip
        ];

        if($latency === false) {
            $store['success'] = false;
            $store['error'] = 'The host could not be pinged';

            $model = Ping::create($store);
        } else {
            $store['success'] = true;

            $model = Ping::create($store);
        }


        return $model;
    }

    /**
     * Curl a healthchecks endpoint
     *
     * @param string $uuid
     * @return Ping
     */
    public static function healthchecksPing($uuid = null)
    {
        if($uuid === null) {
            $uuid = SettingsHelper::get('healthchecks_uuid')->value;
        }

        $ping = [
            'target' => $uuid,
            'type' => 'healthchecks',
            'success' => true
        ];

        try {
            $hc = new Healthchecks($uuid);
            $hc->ping();
        } catch(InvalidUuidStringException $e) {
            $error = 'invalid UUID';
        } catch(HealthchecksUuidNotFoundException $e) {
            $error = 'UUID not found';
        } catch(HealthchecksPingFailureException $e) {
            $error = 'something went wrong';
        } catch(ConnectionException $e) {
            $error = $e->getMessage();
        } finally {
            if(isset($error)) {
                $ping['success'] = false;
                $ping['error'] = $error;

                return Ping::create($ping);
            }
        }

        return Ping::create($ping);
    }

    /**
     * Get the latest ping
     *
     * @return Ping
     */
    public static function latest()
    {
        $latest = Ping::latest()->get();

        if(sizeof($latest) == 0) {
            return false;
        }

        return $latest[0];
    }

    /**
     * Get the first ping
     *
     * @return Ping
     */
    public static function first()
    {
        $latest = Ping::orderBy('id', 'asc')->first();

        if($latest === null) {
            return false;
        }

        return $latest;
    }

    /**
     * Get the most recent successful test
     *
     * @return Ping
     */
    public static function mostRecentSuccess()
    {
        return Ping::where('success', true)->orderBy('id', 'desc')->first();
    }

    /**
     * Get the most recent failed test
     *
     * @return Ping
     */
    public static function mostRecentFailure()
    {
        $fail = Ping::where('success', false)->orderBy('id', 'desc')->first();

        if($fail == null) {
            return PingHelper::first();
        }

        return $fail;
    }

    /**
     * Get a value for the length of internet uptime
     *
     * @param Ping $latest
     * @return array
     */
    public static function uptime(Ping $latest = null)
    {
        if($latest == null) {
            $latest = PingHelper::latest();
        }

        if($latest === false) {
            return [
                'readable' => 'N/A',
                'diff' => 'N/A',
            ];
        }

        if($latest->success) {
            $recentOpp = PingHelper::mostRecentFailure();
        } else {
            $recentOpp = PingHelper::mostRecentSuccess();
        }

        $now = Carbon::now();

        $readable = $now->diffForHumans($recentOpp->created_at, true);
        $diff = $now->diff($recentOpp->created_at);

        return [
            'diff' => $diff,
            'readable' => $readable
        ];
    }

    /**
     * Run a connection test
     *
     * @param string $type
     * @return Ping
     */
    public static function ping($type = null)
    {
        if($type === null) {
            $type = SettingsHelper::get('test_type')->value;
        }

        if($type == 'ping') {
            return PingHelper::standardPing();
        }

        if($type == 'healthchecks') {
            return PingHelper::healthchecksPing();
        }
    }
}
