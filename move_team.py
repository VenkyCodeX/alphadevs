lines = open('c:/Users/Asus/OneDrive/Desktop/portfolio/index.html', encoding='utf-8').readlines()

# Find team section start and end
team_start = next(i for i,l in enumerate(lines) if '<section id="team">' in l) - 1  # include comment line
team_end = next(i for i,l in enumerate(lines) if '</section>' in l and i > team_start and i < team_start + 50) + 2  # include blank line after

print(f'Team: lines {team_start+1} to {team_end}')
print('First:', lines[team_start].rstrip())
print('Last:', lines[team_end-1].rstrip())

team_block = lines[team_start:team_end]

# Remove team from original position
remaining = lines[:team_start] + lines[team_end:]

# Find testimonials in remaining
testi_idx = next(i for i,l in enumerate(remaining) if '<section id="testimonials">' in l) - 1  # include comment
print(f'Testimonials at index: {testi_idx+1}')

# Insert team block before testimonials
result = remaining[:testi_idx] + team_block + remaining[testi_idx:]

open('c:/Users/Asus/OneDrive/Desktop/portfolio/index.html', 'w', encoding='utf-8').writelines(result)
print('Done!')
