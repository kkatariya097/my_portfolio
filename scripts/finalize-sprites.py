"""
Builds the final Oxcy pose sprites directly from the master sheet in one
pass (public/oxcy/oxcy sprit sheet.png, 6x4 grid, 256px cells).

Background removal: flood-fills from the sheet's outer border through
connected near-white pixels only. This is deliberately NOT a global
"any near-white pixel -> fade it" threshold — that approach faded out
Oxcy's own white belly/face fur too (it's legitimately near-white),
producing the grainy/washed-out look. Flood-filling from the border means
only pixels actually connected to the background get removed; white fur
enclosed by the character's black outline is never touched.

Two more problems with a naive "crop exactly one 256px cell" approach,
both because the source art isn't strictly confined to its grid cell:
  1. BLEED IN: a neighbouring pose's limb pokes into this cell.
  2. CLIPPING: this pose's OWN limb/prop (tail, box edge, yarn ball) pokes
     OUT into the neighbouring cell and gets cut off.
Fix: crop a PADDED region around each cell (reaching into neighbours),
then use connected-component analysis to keep only the blob(s) whose
bounding-box center is close to the pose's own home-cell center.
"""
from PIL import Image
from collections import deque
import os
import time

SRC = r"C:\Users\kavya\my_journey_till_date\portfolio\public\oxcy\oxcy sprit sheet.png"
OUT_DIR = r"C:\Users\kavya\my_journey_till_date\portfolio\public\oxcy\sprites\final"
os.makedirs(OUT_DIR, exist_ok=True)

CELL = 256
PAD = 110
ALPHA_THRESHOLD = 40
DILATE_PX = 3
CANVAS = 300
BASELINE_Y = 275
RADIUS_FRAC = 0.72  # * (CELL/2) — how far from home-cell-center a component may be and still count
BG_THRESHOLD = 235  # min(r,g,b) at/above this counts as "white enough" to flood through

SELECTION = {
    "wave": (0, 3),
    "sit": (0, 4),
    "yarn-pounce": (2, 0),
    "yarn-hold": (2, 1),
    "box": (3, 4),
    "laptop": (3, 5),
    "walk-a": (1, 0),
    "walk-b": (1, 1),
}


def remove_background_flood_fill(im, threshold=BG_THRESHOLD):
    """In place: makes transparent only the near-white pixels that are
    reachable from the image border without crossing a non-near-white
    pixel (i.e. the actual background, not enclosed white fur)."""
    w, h = im.size
    px = im.load()

    def is_near_white(x, y):
        r, g, b, _a = px[x, y]
        return min(r, g, b) >= threshold

    visited = bytearray(w * h)
    dq = deque()

    def seed(x, y):
        idx = y * w + x
        if not visited[idx] and is_near_white(x, y):
            visited[idx] = 1
            dq.append((x, y))

    for x in range(w):
        seed(x, 0)
        seed(x, h - 1)
    for y in range(h):
        seed(0, y)
        seed(w - 1, y)

    while dq:
        x, y = dq.popleft()
        for nx, ny in ((x - 1, y), (x + 1, y), (x, y - 1), (x, y + 1)):
            if 0 <= nx < w and 0 <= ny < h:
                nidx = ny * w + nx
                if not visited[nidx] and is_near_white(nx, ny):
                    visited[nidx] = 1
                    dq.append((nx, ny))

    for y in range(h):
        row_off = y * w
        for x in range(w):
            if visited[row_off + x]:
                r, g, b, _a = px[x, y]
                px[x, y] = (r, g, b, 0)


def center_component_mask(mask, w, h, home_x, home_y, radius):
    visited = bytearray(w * h)
    components = []

    for start in range(w * h):
        if mask[start] == 0 or visited[start]:
            continue
        component = [start]
        visited[start] = 1
        q = deque([start])
        min_x = max_x = start % w
        min_y = max_y = start // w
        while q:
            idx = q.popleft()
            x, y = idx % w, idx // w
            for nx, ny in ((x - 1, y), (x + 1, y), (x, y - 1), (x, y + 1)):
                if 0 <= nx < w and 0 <= ny < h:
                    nidx = ny * w + nx
                    if mask[nidx] and not visited[nidx]:
                        visited[nidx] = 1
                        component.append(nidx)
                        q.append(nidx)
                        min_x, max_x = min(min_x, nx), max(max_x, nx)
                        min_y, max_y = min(min_y, ny), max(max_y, ny)
        cx, cy = (min_x + max_x) / 2, (min_y + max_y) / 2
        dist = ((cx - home_x) ** 2 + (cy - home_y) ** 2) ** 0.5
        components.append((dist, len(component), component))

    kept = [c for c in components if c[0] <= radius]
    if not kept and components:
        kept = [min(components, key=lambda c: c[0])]

    out = bytearray(w * h)
    for _, _, component in kept:
        for idx in component:
            out[idx] = 1
    return out


def dilate(mask, w, h, px_amount):
    for _ in range(px_amount):
        new_mask = bytearray(mask)
        for y in range(h):
            for x in range(w):
                idx = y * w + x
                if mask[idx]:
                    continue
                for nx, ny in ((x - 1, y), (x + 1, y), (x, y - 1), (x, y + 1)):
                    if 0 <= nx < w and 0 <= ny < h and mask[ny * w + nx]:
                        new_mask[idx] = 1
                        break
        mask = new_mask
    return mask


t0 = time.time()
sheet = Image.open(SRC).convert("RGBA")
remove_background_flood_fill(sheet)
print(f"background removal took {time.time() - t0:.1f}s")
W, H = sheet.size

for name, (row, col) in SELECTION.items():
    cell_x0, cell_y0 = col * CELL, row * CELL
    crop_x0 = max(0, cell_x0 - PAD)
    crop_y0 = max(0, cell_y0 - PAD)
    crop_x1 = min(W, cell_x0 + CELL + PAD)
    crop_y1 = min(H, cell_y0 + CELL + PAD)

    region = sheet.crop((crop_x0, crop_y0, crop_x1, crop_y1))
    w, h = region.size
    home_x = (cell_x0 + CELL / 2) - crop_x0
    home_y = (cell_y0 + CELL / 2) - crop_y0

    alpha_bytes = region.getchannel("A").tobytes()
    binary = bytearray(1 if a > ALPHA_THRESHOLD else 0 for a in alpha_bytes)
    radius = RADIUS_FRAC * (CELL / 2)
    kept = center_component_mask(binary, w, h, home_x, home_y, radius)
    kept = dilate(kept, w, h, DILATE_PX)

    px = region.load()
    for y in range(h):
        row_off = y * w
        for x in range(w):
            if not kept[row_off + x]:
                r, g, b, a = px[x, y]
                if a:
                    px[x, y] = (r, g, b, 0)

    kept_img = Image.frombytes("L", (w, h), bytes(255 if v else 0 for v in kept))
    bbox = kept_img.getbbox()
    if not bbox:
        print(f"WARNING: {name} empty, skipping")
        continue

    cropped = region.crop(bbox)
    cw, ch = cropped.size
    canvas = Image.new("RGBA", (CANVAS, CANVAS), (0, 0, 0, 0))
    x = (CANVAS - cw) // 2
    y = BASELINE_Y - ch
    canvas.paste(cropped, (x, y), cropped)

    canvas.save(os.path.join(OUT_DIR, f"oxcy-{name}.png"))
    touched_edge = bbox[0] == 0 or bbox[1] == 0 or bbox[2] == w or bbox[3] == h
    flag = "  <-- still touching crop edge, may need more PAD" if touched_edge else ""
    print(f"{name}: region {region.size} bbox {bbox} cropped {cropped.size}{flag}")

print(f"total: {time.time() - t0:.1f}s")
