'''
Convert the data from story.json into something that can be used by the shopping cart version of the
snap sim.
'''
import json

if __name__=='__main__':
    # Some constants.
    IN_FILENAME = "story.json"
    OUT_FILENAME = "story_cart.json"

    # Load the data.
    data = json.load(open(IN_FILENAME))

    # Initialize the resultant JSON.
    result_json = {}
    result_json["bio"] = data["bio"]
    result_json["items"] = []

    # Iterate through each section of the story:
    for section in data["story"]:
        # Iterate through each item in the section.
        for item in section["items"]:
            # Add the item to the result set.
            result_json["items"].append({
                "name": item["name"],
                "quantity": item["quantity"],
                "description": item["description"],
                "price": item["price"],
                "notes": item["notes"]
            })

    # Write the JSON to the output file.
    json.dump(result_json, open(OUT_FILENAME, "w"))
