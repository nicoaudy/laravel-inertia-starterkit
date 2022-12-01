<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;

class PermissionCollection extends ResourceCollection
{
    public function toArray($request)
    {
        return $this->collection->map->only(
            'id',
            'name',
            'guard_name'
        );
    }
}
