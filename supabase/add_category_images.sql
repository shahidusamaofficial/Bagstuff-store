-- Run this once in the Supabase SQL editor (or add to schema.sql for fresh installs)

alter table categories add column if not exists image_url text;

-- Then set the image URL for each category, e.g. after uploading to a public Storage bucket:
-- update categories set image_url = 'https://YOUR_PROJECT.supabase.co/storage/v1/object/public/BUCKET_NAME/handbags.jpg' where id = 'handbags';
-- update categories set image_url = 'https://YOUR_PROJECT.supabase.co/storage/v1/object/public/BUCKET_NAME/totes.jpg' where id = 'totes';
-- update categories set image_url = 'https://YOUR_PROJECT.supabase.co/storage/v1/object/public/BUCKET_NAME/crossbody.jpg' where id = 'crossbody';
-- update categories set image_url = 'https://YOUR_PROJECT.supabase.co/storage/v1/object/public/BUCKET_NAME/clutches.jpg' where id = 'clutches';
