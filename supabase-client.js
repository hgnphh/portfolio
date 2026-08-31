// supabase-client.js
// ============================================================
// HƯỚNG DẪN: Điền Project URL và anon key của bạn vào đây
// Lấy từ: Supabase Dashboard → Project Settings → API
// ============================================================

const SUPABASE_URL = 'https://ptgypwcpwrigqhrddiff.supabase.co'; // ← Thay bằng Project URL của bạn
const SUPABASE_ANON_KEY = 'sb_publishable_D-R5wPzcHCfQxhKYbHjgYw_16g4gHx7';       // ← Thay bằng anon public key

// Khởi tạo Supabase client (dùng chung cho portfolio + admin)
const { createClient } = supabase;
window.supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

