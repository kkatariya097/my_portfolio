from PIL import Image, ImageDraw
import os

FINAL_DIR = r"C:\Users\kavya\my_journey_till_date\portfolio\public\oxcy\sprites\final"
OUT = r"C:\Users\kavya\my_journey_till_date\portfolio\public\oxcy\sprites\final\_check.png"

names = ["wave", "sit", "yarn-pounce", "yarn-hold", "box", "laptop", "walk-a", "walk-b"]
CELL = 140
COLS = 4
ROWS = 2
PAD = 6

sheet = Image.new("RGBA", (COLS * (CELL + PAD) + PAD, ROWS * (CELL + PAD + 16) + PAD), (35, 35, 40, 255))
draw = ImageDraw.Draw(sheet)

for i, name in enumerate(names):
    row, col = divmod(i, COLS)
    im = Image.open(os.path.join(FINAL_DIR, f"oxcy-{name}.png")).convert("RGBA").resize((CELL, CELL))
    x = PAD + col * (CELL + PAD)
    y = PAD + row * (CELL + PAD + 16)
    draw.rectangle([x, y, x + CELL, y + CELL], fill=(55, 55, 60, 255))
    # baseline guide line
    baseline_frac = 275 / 300
    draw.line([x, y + int(CELL * baseline_frac), x + CELL, y + int(CELL * baseline_frac)], fill=(250, 100, 100, 255))
    sheet.paste(im, (x, y), im)
    draw.text((x + 2, y + CELL + 2), name, fill=(255, 255, 255, 255))

sheet.convert("RGB").save(OUT)
print("saved", OUT)
