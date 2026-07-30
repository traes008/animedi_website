#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")" && pwd)"
PORT="${PORT:-8080}"

echo ""
echo "Serving: Animedi website"
echo "Folder:  $ROOT"
echo ""

IP=""
for iface in en0 en1; do
  IP="$(ipconfig getifaddr "$iface" 2>/dev/null || true)"
  [[ -n "$IP" ]] && break
done
IP="${IP:-127.0.0.1}"

echo "On this Mac:   http://127.0.0.1:$PORT"
echo "On your phone (same Wi-Fi):  http://$IP:$PORT"
echo ""
echo "Use http:// (not https://)."
echo "Press Ctrl+C to stop."
echo ""

cd "$ROOT"
exec python3 -m http.server "$PORT" --bind 0.0.0.0
