#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")" && pwd)"
PORT="${PORT:-8081}"
SITE="${1:-multipage}"

case "$SITE" in
  multipage|multi)
    DIR="$ROOT/animedi-multipage-preview"
    LABEL="Animedi multi-page website"
    ;;
  single|preview)
    DIR="$ROOT/animedi-preview"
    LABEL="Animedi single-page preview"
    ;;
  *)
    echo "Usage: ./serve.sh [multipage|single]"
    echo "  multipage  (default)  → animedi-multipage-preview/"
    echo "  single               → animedi-preview/"
    exit 1
    ;;
esac

if [[ ! -d "$DIR" ]]; then
  echo "Site folder not found: $DIR"
  exit 1
fi

IP=""
for iface in en0 en1; do
  IP="$(ipconfig getifaddr "$iface" 2>/dev/null || true)"
  [[ -n "$IP" ]] && break
done
IP="${IP:-127.0.0.1}"

echo ""
echo "Serving: $LABEL"
echo "Folder:  $DIR"
echo ""
echo "On this Mac:   http://127.0.0.1:$PORT"
echo "On your phone (same Wi-Fi):  http://$IP:$PORT"
echo ""
echo "Use http:// (not https://)."
echo "Press Ctrl+C to stop."
echo ""

cd "$DIR"
exec python3 -m http.server "$PORT" --bind 0.0.0.0
