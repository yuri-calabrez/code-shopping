<?php

namespace CodeShopping\Common;

use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Builder;


trait OnlyTrashedTrait
{
    protected function onlyTrashedIfRequested(Request $request, Builder $query)
    {
        if ($request->get('trashed') == 1) {
            $query = $query->onlyTrashed();
        }
        return $query;
    }
}