# Preview on your phone (local Wi‑Fi)

## Start the server

From this folder:

```bash
./serve.sh
```

That serves the **multi-page website** (`animedi-multipage-preview/`). For the single-page prototype:

```bash
./serve.sh single
```

Optional custom port:

```bash
PORT=8082 ./serve.sh
```

## Connect from your phone

1. Put your phone on the **same Wi‑Fi** as this Mac.
2. Open the URL printed by the script, e.g. `http://192.168.1.53:8081`.
3. Type **`http://`** explicitly. Do not use `https://`.

If the page does not load, check that the Mac firewall allows incoming connections for Python, and that phone and Mac are on the same network (not guest Wi‑Fi / VPN).
