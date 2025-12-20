// supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://oxeimupoqololovnvznt.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im94ZWltdXBvcW9sb2xvdm52em50Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIyOTUwMDgsImV4cCI6MjA2Nzg3MTAwOH0.4ehAdlew7hwpdWG0-WdCbaaGI4C8ctjMVV1eRoOQKxs';

export const supabase = createClient(supabaseUrl, supabaseKey);
