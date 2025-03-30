import json
from collections import OrderedDict

def parse_diff_json(file_path):
    with open(file_path, 'r') as f:
        diff_data = json.load(f)
    
    organized = OrderedDict()
    
    for filename, changes in diff_data.items():
        file_changes = {
            'added': [],
            'deleted': [],
            'unchanged': []
        }
        
        for change_type in ['Added Lines', 'Deleted Lines', 'Unchanged Lines']:
            lines = changes.get(change_type, [])
            
            for line in lines:
                parts = line.split(':', 1)
                if len(parts) == 2:
                    line_num = parts[0].strip()
                    code = parts[1].strip()
                    entry = (int(line_num), code)
                    
                    if change_type == 'Added Lines':
                        file_changes['added'].append(entry)
                    elif change_type == 'Deleted Lines':
                        file_changes['deleted'].append(entry)
                    else:
                        file_changes['unchanged'].append(entry)
        
        for key in file_changes:
            file_changes[key].sort(key=lambda x: x[0])
        
        organized[filename] = file_changes
    
    output = []
    
    for filename, changes in organized.items():
        output.append(f"### {filename}")
        output.append("")
        for change_type in ['added', 'deleted']: # add 'unchanged' if needed
            if changes[change_type]:
                if change_type == 'added':
                    output.append(f"Here are the lines {change_type} to the code")
                else:
                    output.append(f"Here are the lines {change_type} from the code")
                for line_num, code in changes[change_type]:
                    output.append(f"{line_num}: {code}")
                output.append("")    
        
        output.append("")
    
    return "\n".join(output)

    

# Example usage
if __name__ == "__main__":
    diff_data = parse_diff_json('test.json')
    
    print(diff_data)
    
    # Optionally, save to a file
    with open('organized_diff.txt', 'w') as f:
        f.write(diff_data)
