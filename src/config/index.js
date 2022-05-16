import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.REACT_APP_URL,
  process.env.REACT_APP_PUBLIC
);

export const nutristatsURLGenerator = (
  ingr
) => `https://api.edamam.com/api/nutrition-data?app_id=${process.env.REACT_APP_NU_ID}&app_key=${process.env.REACT_APP_NU_KEY}&nutrition-type=cooking&ingr=${ingr}
`;

export default supabase;
