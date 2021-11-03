import csv

cf_list = []

#get all materials ever
with open('all_carbon_factors.csv', 'r') as csv_file:
    csv_reader = csv.DictReader(csv_file, delimiter = ',')
    cf_list = list(csv_reader)

cf_parsed = []

#find only the relevant stuff
for row in cf_list:
    row_keys = row.keys()

    #replace blanks in any field
    for item in row_keys:
        if row[item] == '':
            row[item] = 'None'

    #keep only latest materials
    if row['Latest'] == 'TRUE':
        cf_parsed.append(row)

headers = ['Database', 'Material', 'Subtype', 'kgCO2e/kg', 'Comments','density', 'wastage', 'densityAssumption', 'wasteReference','Latest']

#write new csv for latest materials
with open('parsed_carbon_factors.csv', 'w', newline = '') as csv_out:
    writer = csv.DictWriter(csv_out, fieldnames = headers)
    writer.writeheader()
    for row in cf_parsed:
        writer.writerow(row)

print('complete!')
