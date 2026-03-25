# remotion-railway-server

Remotion render server — runs on Railway, called by Vercel.  
Renders videos with `@remotion/renderer`, uploads to Supabase Storage, returns a public URL.

## Architecture

```
Vercel (Next.js)
  POST /api/skeleton/export
    → POST https://<railway-url>/render  (x-render-secret header)
        → renderMedia()  (Remotion + Chrome + ffmpeg)
        → upload to Supabase Storage
        ← { ok, exportId, url, durationMs }
    ← { ok, exportId, status: "done", videoUrl }
```

## Local development

```bash
cp .env.example .env
# fill in your values

npm install
npm run dev
```

Test with curl:
```bash
curl -X POST http://localhost:3000/render \
  -H "Content-Type: application/json" \
  -H "x-render-secret: your-secret" \
  -d '{
    "exportId": "test-001",
    "userId": "user-abc",
    "scenes": [
      { "durationInFrames": 90, "text": "Hello World", "imageUrl": "" }
    ],
    "voiceoverUrl": "",
    "musicUrl": "",
    "musicVolume": 0.3,
    "captions": [],
    "defaultCaptionStyle": {}
  }'
```

## Deploy to Railway

### 1. Push to GitHub
```bash
git init
git add .
git commit -m "init: remotion railway server"
git remote add origin https://github.com/YOUR_USERNAME/remotion-railway-server.git
git push -u origin main
```

### 2. Create Railway service
1. Go to [railway.app](https://railway.app) → New Project → Deploy from GitHub repo
2. Select this repository
3. Railway will auto-detect the `Dockerfile`

### 3. Set environment variables in Railway
| Variable | Value |
|---|---|
| `SUPABASE_URL` | `https://your-project.supabase.co` |
| `SUPABASE_SERVICE_ROLE_KEY` | your service role key (from Supabase dashboard) |
| `SUPABASE_STORAGE_BUCKET` | `exports` (or your bucket name) |
| `RENDER_SECRET` | any long random string |
| `PORT` | `3000` |

### 4. Set environment variables in Vercel
| Variable | Value |
|---|---|
| `RENDER_SECRET` | same value as Railway |

### 5. Update your Vercel fetch call
Apply the patch in `vercel-route-patch.ts` — add the `x-render-secret` header.

### 6. Supabase Storage setup
1. Go to Supabase dashboard → Storage
2. Create a bucket named `exports` (or match `SUPABASE_STORAGE_BUCKET`)
3. Set the bucket to **Public** so video URLs work without signed URLs
4. (Optional) Add RLS policies to restrict reads to authenticated users

## Customising the composition

`src/remotion/compositions/SkeletonExport.tsx` is the main composition.  
Edit it to match your actual scene/caption rendering logic.

The composition receives these props (matching what your Vercel route sends):
- `scenes[]` — array of scene objects with `imageUrl`, `videoUrl`, `text`, `durationInFrames`, `style`
- `voiceoverUrl` — audio file URL
- `musicUrl` — background music URL
- `musicVolume` — 0–1
- `captions[]` — caption objects with `text`, `startFrame`, `endFrame`, `style`
- `defaultCaptionStyle` — fallback caption style

## Video settings

Edit `src/renderer.ts` to change:
- `COMPOSITION_ID` — must match the `id` in `Root.tsx`
- `FPS` — default 30
- `WIDTH` / `HEIGHT` — default 1080×1920 (vertical). Use 1920×1080 for landscape.

## Troubleshooting

**Bundle fails on startup**  
→ Check that `src/remotion/index.ts` exists and `registerRoot` is called.

**Chrome not found**  
→ Ensure you're using `FROM ghcr.io/remotion-dev/base` in your Dockerfile.

**Supabase upload fails**  
→ Verify `SUPABASE_SERVICE_ROLE_KEY` (not the anon key) and bucket name.

**401 Unauthorized from Railway**  
→ `RENDER_SECRET` must match exactly in both Vercel and Railway env vars.
