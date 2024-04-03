subjects = [
    ["CCPRGG2L", "INTERMEDIATE PROGRAMMING", 4.00, 3.0, "true"],
    ["CTHASOPL", "HARDWARE, SOFTWARE AND PERIPHERAL INSTALLATION", 4.00, 1.0, "true"],
    ["GECTW01X", "THE CONTEMPORARY WORLD", 4.00, 3.0, "true"],
    ["GEMMW01X", "MATHEMATICS IN THE MODERN WORLD", 3.50, 3.0, "true"],
    ["GESTS01X", "SCIENCE, TECHNOLOGY AND SOCIETY", 4.00, 3.0, "true"],
    ["PHYSED12", "RHYTHMIC ACTIVITIES", 4.00, 2.0, "false"],
    ["CCDISTR1", "DISCRETE STRUCTURES 1", 3.50, 3, "true"],
    ["CCOBJPGL", "OBJECT-ORIENTED PROGRAMMING", 4, 3, "true"],
    ["GEART01X", "ART APPRECIATION", 4, 3, "true"],
    ["GEENT01X", "THE ENTREPRENEURIAL MIND", 3.5, 3, "true"],
    ["GEETH01X", "ETHICS", 4.00, 3.0, "true"],
    ["MCWTS01X", "NATIONAL SERVICE TRAINING PROGRAM 1", 3.50, 3, "false"],
    ["PHYSED13", "INDIVIDUAL AND DUAL SPORTS", 4.00, 2.0, "false"],
    ["CCDATRCL", "DATA STRUCTURES AND ALGORITHMS", 4.00, 3.0, "true"],
    ["CCPLTFRL", "PLATFORM TECHNOLOGIES", 3.00, 3.0, "true"],
    [
        "GEFID01X",
        "WIKA AT PANITIKAN SA PAGPAPATIBAY NG PIILIPINONG IDENTIDAD",
        3.50,
        3.0,
        "true",
    ],
    ["GERIZ01X", "LIFE AND WORKS OF RIZAL", 3.50, 3.0, "true"],
    ["MCWTS02X", "NATIONAL SERVICE TRAINING PROGRAM 2", 4.00, 3.0, "false"],
    ["PHYSED14", "TEAM SPORTS", 4.00, 2.0, "false"],
    ["CCOMPORG", "COMPUTER ORGANIZATION AND ARCHITECTURE", 3.50, 3.0, "true"],
    ["CTAPDEVL", "APPLICATIONS DEVELOPMENT AND EMERGING TECHNOLOGIES", 4.00, 3.0, "true"],
    ["CTINFMGL", "INFORMATION MANAGEMENT", 3.50, 3.0, "true"],
    ["GEACM01X", "ADVANCED COMMUNICATION", 4.00, 3.0, "true"],
    ["GEITE01X", "LIVING IN THE I.T. ERA", 4.00, 3.0, "true"],
    ["MCNAT01R", "NATIONALIAN COURSE", 4.00, 3.0, "true"],
]
def subs():
    jsonText=""
    for sub in subjects:
        jsonText += f"\"{sub[0]}\":{{\"name\":\"{sub[1]}\",\"unit\":{sub[3]},\"include\":{sub[4]}}},"
    print(jsonText)    

def grade():
    jsonText = ""
    for sub in subjects:
        jsonText += (
            f'"{sub[0]}":{{"name":"{sub[1]}","unit":{sub[3]},"include":{sub[4]}}},'
        )
    print(jsonText)
