define([], function () {
    var COUNTRY_MAPPINGS = {
        3: "AF",
        247: "AX",
        6: "AL",
        62: "DZ",
        12: "AS",
        1: "AD",
        9: "AO",
        5: "AI",
        10: "AQ",
        4: "AG",
        11: "AR",
        7: "AM",
        15: "AW",
        14: "AU",
        13: "AT",
        16: "AZ",
        31: "BS",
        23: "BH",
        19: "BD",
        18: "BB",
        35: "BY",
        20: "BE",
        36: "BZ",
        25: "BJ",
        27: "BM",
        32: "BT",
        29: "BO",
        250: "BQ",
        17: "BA",
        34: "BW",
        33: "BV",
        30: "BR",
        106: "IO",
        28: "BN",
        22: "BG",
        21: "BF",
        24: "BI",
        117: "KH",
        46: "CM",
        37: "CA",
        249: "IC",
        53: "CV",
        124: "KY",
        40: "CF",
        248: "EA",
        212: "TD",
        45: "CL",
        47: "CN",
        54: "CX",
        38: "CC",
        48: "CO",
        119: "KM",
        39: "CD",
        41: "CG",
        44: "CK",
        49: "CR",
        43: "CI",
        98: "HR",
        52: "CU",
        251: "CW",
        55: "CY",
        56: "CZ",
        59: "DK",
        58: "DJ",
        60: "DM",
        61: "DO",
        221: "TL",
        63: "EC",
        65: "EG",
        208: "SV",
        88: "GQ",
        67: "ER",
        64: "EE",
        69: "ET",
        72: "FK",
        74: "FO",
        71: "FJ",
        70: "FI",
        75: "FR",
        80: "GF",
        175: "PF",
        213: "TF",
        76: "GA",
        85: "GM",
        79: "GE",
        57: "DE",
        82: "GH",
        83: "GI",
        89: "GR",
        84: "GL",
        78: "GD",
        87: "GP",
        92: "GU",
        91: "GT",
        81: "GG",
        86: "GN",
        93: "GW",
        94: "GY",
        99: "HT",
        96: "HM",
        233: "VA",
        97: "HN",
        95: "HK",
        100: "HU",
        109: "IS",
        105: "IN",
        101: "ID",
        108: "IR",
        107: "IQ",
        102: "IE",
        104: "IM",
        103: "IL",
        110: "IT",
        112: "JM",
        114: "JP",
        111: "JE",
        113: "JO",
        125: "KZ",
        115: "KE",
        118: "KI",
        121: "KP",
        122: "KR",
        254: "XK",
        123: "KW",
        116: "KG",
        126: "LA",
        135: "LV",
        127: "LB",
        132: "LS",
        131: "LR",
        136: "LY",
        129: "LI",
        133: "LT",
        134: "LU",
        148: "MO",
        144: "MK",
        142: "MG",
        156: "MW",
        158: "MY",
        155: "MV",
        145: "ML",
        153: "MT",
        143: "MH",
        150: "MQ",
        151: "MR",
        154: "MU",
        243: "YT",
        157: "MX",
        73: "FM",
        139: "MD",
        138: "MC",
        147: "MN",
        140: "ME",
        152: "MS",
        137: "MA",
        159: "MZ",
        146: "MM",
        160: "NA",
        169: "NR",
        168: "NP",
        166: "NL",
        161: "NC",
        171: "NZ",
        165: "NI",
        162: "NE",
        164: "NG",
        170: "NU",
        163: "NF",
        149: "MP",
        167: "NO",
        172: "OM",
        178: "PK",
        185: "PW",
        173: "PA",
        176: "PG",
        186: "PY",
        174: "PE",
        177: "PH",
        181: "PN",
        179: "PL",
        184: "PT",
        182: "PR",
        187: "QA",
        188: "RE",
        189: "RO",
        190: "RU",
        191: "RW",
        26: "BL",
        198: "SH",
        120: "KN",
        128: "LC",
        141: "MF",
        234: "VC",
        241: "WS",
        203: "SM",
        207: "ST",
        192: "SA",
        204: "SN",
        50: "RS",
        194: "SC",
        202: "SL",
        197: "SG",
        252: "SX",
        201: "SK",
        199: "SI",
        193: "SB",
        205: "SO",
        244: "ZA",
        90: "GS",
        253: "SS",
        68: "ES",
        130: "LK",
        183: "PS",
        180: "PM",
        195: "SD",
        206: "SR",
        200: "SJ",
        210: "SZ",
        196: "SE",
        42: "CH",
        209: "SY",
        225: "TW",
        216: "TJ",
        226: "TZ",
        215: "TH",
        214: "TG",
        217: "TK",
        220: "TO",
        223: "TT",
        219: "TN",
        222: "TR",
        218: "TM",
        211: "TC",
        224: "TV",
        228: "UG",
        227: "UA",
        2: "AE",
        77: "GB",
        230: "US",
        231: "UY",
        229: "UM",
        232: "UZ",
        239: "VU",
        235: "VE",
        238: "VN",
        236: "VG",
        237: "VI",
        240: "WF",
        66: "EH",
        242: "YE",
        245: "ZM",
        246: "ZW",
    };
    /* To get the ISO Codes of the country this function is made which will take as parameter the name
        of the country */
    function getFreeCountryISOCode(country) {
        var result = "";
        result = COUNTRY_MAPPINGS[country];
        return result;
    }
    function getFreeCountryInternalId(code) {
        for (var key in COUNTRY_MAPPINGS) {
            if (COUNTRY_MAPPINGS.hasOwnProperty(key)) {
                if (COUNTRY_MAPPINGS[key] === code) return key;
            }
        }
    }
    return {
        getFreeCountryISOCode: getFreeCountryISOCode,
        getFreeCountryInternalId: getFreeCountryInternalId,
    }
});