import os
import glob

replacements = {
    "text-[#ff4fa3]": "text-siri-gradient",
    "text-pink-gradient": "text-siri-gradient",
    "bg-[#ff4fa3]": "bg-siri-gradient",
    "hover:text-[#ff4fa3]": "hover:opacity-80 transition-opacity", 
    "glass-pink": "bg-siri-gradient",
    "from-[#ff4fa3]": "from-[#FF2E93]",
    "to-[#ff4fa3]": "to-[#00F0FF]",
    "focus:border-[#ff4fa3]": "focus:border-[#FF2E93]",
    "focus:ring-[#ff4fa3]/10": "focus:ring-[#FF2E93]/10",
    "accent-[#ff4fa3]": "accent-[#FF2E93]",
    "hover:shadow-[0_0_20px_rgba(255,79,163,0.4)]": "hover:shadow-[0_0_20px_rgba(255,46,147,0.4)]",
    "hover:shadow-[0_0_20px_rgba(255,79,163,0.5)]": "hover:shadow-[0_0_20px_rgba(255,46,147,0.5)]",
    "hover:bg-[#ff4fa3]": "hover:bg-siri-gradient",
}

# Recursively find all JS/JSX files in src directory
search_pattern = os.path.join('/Users/dsnaidu/Tvibe.ca/website/src', '**', '*.[jt]s*')
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

print("Done replacing Siri gradients.")
