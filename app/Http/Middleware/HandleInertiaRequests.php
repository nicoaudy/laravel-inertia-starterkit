<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use Tightenco\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return array_merge(parent::share($request), [
            'app_name' => config('app.name'),
            'auth' => function () use ($request) {
                return [
                    'user' => $request->user() ? $request->user() : null,
                    'can' => $request->user() ? $request->user()->getPermissionArray() : [],
                ];
            },
            'flash' => function () use ($request) {
                return [
                    'success' => $request->session()->get('success'),
                    'info' => $request->session()->get('info'),
                    'warning' => $request->session()->get('warning'),
                    'error' => $request->session()->get('error'),
                ];
            },
            'ziggy' => function () use ($request) {
                return array_merge((new Ziggy())->toArray(), [
                    'location' => $request->url(),
                ]);
            },
        ]);
    }
}
