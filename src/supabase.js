import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://tbgycnczfxgscjarzoys.supabase.co";
const supabaseKey = "sb_publishable__09frvjN35gHpOk6RUiNDw_fLaO3qBK";

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);