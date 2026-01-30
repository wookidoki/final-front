const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8081";

const params = new URLSearchParams({
  client_id:
    "1040048978001-6hoo6fhu562kbuf6vp1drbpgkgf90u9p.apps.googleusercontent.com",
  redirect_uri: `${API_URL}/login/oauth2/code/google`,
  response_type: "code",
  scope:
    "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile",
  access_type: "offline",
  prompt: "consent",
});

window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
