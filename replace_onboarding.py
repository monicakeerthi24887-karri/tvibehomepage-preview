import os
import glob
import re

replacements = {
    # Backgrounds
    "bg-black": "bg-[#f0f2f5]",
    "bg-zinc-950": "neu-flat",
    "bg-zinc-900": "bg-[#e6e9ef]",
    
    # Borders
    "border-zinc-900": "border-[#d1d9e6]",
    "border-zinc-800": "border-[#d1d9e6]",
    "border-zinc-850": "border-[#d1d9e6]",
    "hover:border-gold": "hover:border-[#FF2E93]",
    "border-gold": "border-[#FF2E93]",
    
    # Text
    "text-white": "text-[#1a1a1a]",
    "text-zinc-400": "text-[#666666]",
    "text-zinc-500": "text-[#666666]",
    "text-zinc-550": "text-[#666666]",
    "text-gold": "text-siri-gradient",
    
    # Buttons/Hovers
    "bg-gold": "bg-siri-gradient text-white",
    "hover:bg-gold-hover": "hover:scale-105 active:scale-95 transition-all shadow-md",
    "hover:text-white": "hover:text-[#1a1a1a]",
    
    # Form elements specific
    "w-full bg-[#f0f2f5] border border-[#d1d9e6]": "w-full bg-white border border-[#d1d9e6]", # Fix input backgrounds after bg-black -> bg-[#f0f2f5]
    "bg-[#f0f2f5] border border-[#d1d9e6] text-xs text-[#1a1a1a] p-3": "bg-white border border-[#d1d9e6] text-xs text-[#1a1a1a] p-3 shadow-sm rounded-xl focus:ring-4 focus:ring-[#FF2E93]/10",
    "focus:border-gold": "focus:border-[#FF2E93]",
}

search_pattern = os.path.join('/Users/dsnaidu/Tvibe.ca/website/src/app/onboarding', '**', '*.[jt]s*')
files = glob.glob(search_pattern, recursive=True)

for file_path in files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_content = content
    for old, new in replacements.items():
        content = content.replace(old, new)
        
    if content != original_content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {file_path}")

print("Done replacing onboarding.")
