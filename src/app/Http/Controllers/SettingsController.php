<?php

namespace App\Http\Controllers;

use App\Helpers\SettingsHelper;
use App\Rules\Cron;
use App\Setting;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class SettingsController extends Controller
{

    /**
     * Return all settings
     *
     * @return  array
     */
    public function index()
    {
        return Setting::get()->keyBy('name');
    }

    /**
     * Get setting by id
     *
     * @param   Setting $setting
     * @return  Setting
     */
    public function get(Setting $setting)
    {
        return $setting;
    }

    /**
     * Store/update a setting
     *
     * @param   Request $request
     * @return  Response
     */
    public function store(Request $request)
    {
        $rule = [
            'name' => [ 'required', 'string', 'min:1' ],
        ];
        if($request->name == 'ping_schedule') {
            $rule['value'] = [ 'required', new Cron ];
        }

        $validator = Validator::make($request->all(), $rule);
        if($validator->fails()) {
            return response()->json([
                'method' => 'Store a setting',
                'error' => $validator->errors()
            ], 422);
        }

        if(!isset($request->value)) {
            $request->value = '';
        }

        $setting = SettingsHelper::set($request->name, $request->value);

        return response()->json([
            'method' => 'Store a setting',
            'data' => $setting
        ], 200);
    }

    /**
     * Bulk store/update a setting
     *
     * @param   Request $request
     * @return  Response
     */
    public function bulkStore(Request $request)
    {
        $rule = [
            'data' => [ 'array', 'required' ],
            'data.*.name' => [ 'string', 'required' ],
        ];

        $validator = Validator::make($request->all(), $rule);
        if($validator->fails()) {
            return response()->json([
                'method' => 'Bulk store a setting',
                'error' => $validator->errors()
            ], 422);
        }

        $settings = [];
        foreach($request->data as $d) {
            if(!isset($d['value']) || $d['value'] == null) {
                    $d['value'] = '';
            }

            $setting = SettingsHelper::get($d['name']);

            if($setting == false) {
                $setting = SettingsHelper::set($d['name'], $d['value']);
            } else if(SettingsHelper::settingIsEditable($setting->name)) {
                $setting = SettingsHelper::set($d['name'], $d['value']);
            } else {
                continue;
            }

            array_push($settings, $setting);
        }

        return response()->json([
            'method' => 'Bulk store a setting',
            'data' => $settings,
        ], 200);
    }

    /**
     * Returns instance config
     *
     * @return  array
     */
    public function config()
    {
        return SettingsHelper::getConfig();
    }

    /**
     * Get the current changelog
     *
     * @return array
     */
    public function changelog()
    {
        $url = base_path() . '/changelog.json';

        try {
            $changelog = json_decode(file_get_contents($url), true);
        } catch(Exception $e) {
            $changelog = [];
        }

        return response()->json([
            'method' => 'get changelog',
            'data' => $changelog
        ], 200);
    }
}
