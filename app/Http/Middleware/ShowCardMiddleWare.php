<?php

namespace App\Http\Middleware;

use App\Models\InvitationCard;
use Closure;
use Illuminate\Http\Request;

class ShowCardMiddleWare
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next )
    {
        if (!session('user')){
            session(['url' => $request->route('url')]);
            return redirect()->route('user.register.create');
        }
        $card = InvitationCard::where('url',$request->route('url'))->first();
        if (!$card)
            abort(404);

        if ($card->status != InvitationCard::CONFIRMED_STATUS)
            abort(404);

        return $next($request);
    }
}
