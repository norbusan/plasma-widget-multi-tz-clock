/*
 * Display helpers for IANA time-zone ids. The list of selectable zones comes
 * from the Plasma "time" engine (see configTimezones.qml).
 * SPDX-License-Identifier: GPL-3.0-or-later
 */
.pragma library

// Short, recognizable city/airport-style code shown in each row.
var codes = {
    "Local": "LOC", "UTC": "UTC",
    "Africa/Abidjan": "ABJ", "Africa/Accra": "ACC", "Africa/Addis_Ababa": "ADD",
    "Africa/Algiers": "ALG", "Africa/Cairo": "CAI", "Africa/Casablanca": "CAS",
    "Africa/Johannesburg": "JNB", "Africa/Lagos": "LOS", "Africa/Nairobi": "NBO",
    "Africa/Tunis": "TUN",
    "America/Anchorage": "ANC", "America/Argentina/Buenos_Aires": "BUE",
    "America/Bogota": "BOG", "America/Caracas": "CCS", "America/Chicago": "CHI",
    "America/Denver": "DEN", "America/Halifax": "YHZ", "America/Havana": "HAV",
    "America/Lima": "LIM", "America/Los_Angeles": "LAX", "America/Mexico_City": "MEX",
    "America/New_York": "NYC", "America/Phoenix": "PHX", "America/Santiago": "SCL",
    "America/Sao_Paulo": "SAO", "America/St_Johns": "YYT", "America/Toronto": "YYZ",
    "America/Vancouver": "YVR",
    "Asia/Almaty": "ALA", "Asia/Baghdad": "BGW", "Asia/Bangkok": "BKK",
    "Asia/Beirut": "BEY", "Asia/Colombo": "CMB", "Asia/Dhaka": "DAC",
    "Asia/Dubai": "DXB", "Asia/Hong_Kong": "HKG", "Asia/Jakarta": "JKT",
    "Asia/Jerusalem": "JRS", "Asia/Kabul": "KBL", "Asia/Karachi": "KHI",
    "Asia/Kathmandu": "KTM", "Asia/Kolkata": "CCU", "Asia/Kuala_Lumpur": "KUL",
    "Asia/Manila": "MNL", "Asia/Riyadh": "RUH", "Asia/Seoul": "SEL",
    "Asia/Shanghai": "SHA", "Asia/Singapore": "SIN", "Asia/Taipei": "TPE",
    "Asia/Tehran": "THR", "Asia/Tokyo": "TYO", "Asia/Yangon": "RGN",
    "Asia/Yekaterinburg": "SVX",
    "Atlantic/Azores": "PDL", "Atlantic/Cape_Verde": "RAI", "Atlantic/Reykjavik": "REK",
    "Australia/Adelaide": "ADL", "Australia/Brisbane": "BNE", "Australia/Darwin": "DRW",
    "Australia/Perth": "PER", "Australia/Sydney": "SYD", "Pacific/Auckland": "AKL",
    "Pacific/Fiji": "SUV", "Pacific/Guam": "GUM", "Pacific/Honolulu": "HNL",
    "Pacific/Pago_Pago": "PPG", "Pacific/Port_Moresby": "POM",
    "Europe/Amsterdam": "AMS", "Europe/Athens": "ATH", "Europe/Belgrade": "BEG",
    "Europe/Berlin": "BER", "Europe/Brussels": "BRU", "Europe/Bucharest": "BUH",
    "Europe/Budapest": "BUD", "Europe/Copenhagen": "CPH", "Europe/Dublin": "DUB",
    "Europe/Helsinki": "HEL", "Europe/Istanbul": "IST", "Europe/Kyiv": "IEV",
    "Europe/Lisbon": "LIS", "Europe/London": "LON", "Europe/Madrid": "MAD",
    "Europe/Moscow": "MOW", "Europe/Oslo": "OSL", "Europe/Paris": "PAR",
    "Europe/Prague": "PRG", "Europe/Rome": "ROM", "Europe/Stockholm": "STO",
    "Europe/Vienna": "VIE", "Europe/Warsaw": "WAW", "Europe/Zurich": "ZRH"
};

function code(id) {
    if (codes[id])
        return codes[id];
    // Fall back to the first letters of the trailing city component.
    var parts = String(id).split("/");
    var city = parts[parts.length - 1].replace(/[^A-Za-z]/g, "");
    return city.substring(0, 3).toUpperCase();
}

// Human-readable label for an id, e.g. "America/New_York" -> "New York (America)".
function label(id) {
    if (id === "Local")
        return "Local (system time zone)";
    if (id === "UTC")
        return "UTC";
    var parts = id.split("/");
    var city = parts[parts.length - 1].replace(/_/g, " ");
    var region = parts[0].replace(/_/g, " ");
    return city + " (" + region + ")";
}
