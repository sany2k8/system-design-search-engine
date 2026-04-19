import json
import re
import math
from collections import Counter

def get_cosine(vec1, vec2):
    intersection = set(vec1.keys()) & set(vec2.keys())
    numerator = sum([vec1[x] * vec2[x] for x in intersection])
    sum1 = sum([vec1[x]**2 for x in vec1.keys()])
    sum2 = sum([vec2[x]**2 for x in vec2.keys()])
    denominator = math.sqrt(sum1) * math.sqrt(sum2)
    if not denominator: return 0.0
    return float(numerator) / denominator

def text_to_vector(text):
    words = re.compile(r'\w+').findall(text.lower())
    return Counter(words)

# Read the data file
with open('/Users/sany/projects/system-design-search-engine/src/data.ts', 'r') as f:
    content = f.read()

# Very basic extraction: looking for { id: X, title: "...", cat: "...", stack: "...", prompt: "..." }
# We'll use a regex to capture them.
pattern = re.compile(r'\{\s*id:\s*(\d+),\s*title:\s*"([^"]+)",\s*cat:\s*"([^"]+)",\s*stack:\s*"([^"]+)",\s*prompt:\s*"([^"]+)"\s*', re.DOTALL)

projects = []
for match in pattern.finditer(content):
    projects.append({
        'id': int(match.group(1)),
        'title': match.group(2),
        'cat': match.group(3),
        'stack': match.group(4),
        'prompt': match.group(5),
        'match_string': match.group(0),
        'vector': text_to_vector(f"{match.group(2)} {match.group(5)}")
    })

print(f"Extracted {len(projects)} projects.")

duplicates_to_remove = set()
for i in range(len(projects)):
    if i in duplicates_to_remove: continue
    for j in range(i + 1, len(projects)):
        if j in duplicates_to_remove: continue
        sim = get_cosine(projects[i]['vector'], projects[j]['vector'])
        if sim > 0.85: # Threshold for similarity
            print(f"Match found ({sim:.2f}): ID {projects[i]['id']} ({projects[i]['title']}) and ID {projects[j]['id']} ({projects[j]['title']})")
            duplicates_to_remove.add(j)

print(f"Found {len(duplicates_to_remove)} duplicate candidates to remove.")

# Rebuild TS file without the duplicates
new_content = content
for i in sorted(list(duplicates_to_remove), reverse=True):
    proj = projects[i]
    # Remove the exact matched string + any trailing comma
    new_content = new_content.replace(proj['match_string'] + '},', '')
    new_content = new_content.replace(proj['match_string'] + '}', '')

with open('/Users/sany/projects/system-design-search-engine/src/data.ts', 'w') as f:
    f.write(new_content)

print("Duplicates removed from data.ts.")
