<?php

namespace App\Traits;

use Illuminate\Support\Facades\File;

trait FileUploadTrait
{
    public function upload($file, $folder = 'uploads', $newFilename = null)
    {
        $filename = $newFilename ?? $file->getClientOriginalName();

        $raw_path = $folder;
        $path = public_path($raw_path);
        if (! File::isDirectory($path)) {
            File::makeDirectory($path, 0777, true, true);
        }

        $file->move($path, $filename);

        return $raw_path.'/'.$filename;
    }

   public function remove($file)
   {
       $file_path = public_path($file);
       if (File::exists($file_path)) {
           File::delete($file_path);
       }
   }
}
