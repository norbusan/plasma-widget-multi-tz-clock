/*
 * A curated list of IANA time-zone identifiers offered in the picker.
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * This is intentionally a static, dependency-free list: Plasma's QML engine
 * does not expose Intl.supportedValuesOf(), so we ship the common zones here.
 */
.pragma library

var zones = [
    "Local",
    "UTC",
    // Africa
    "Africa/Abidjan", "Africa/Accra", "Africa/Addis_Ababa", "Africa/Algiers",
    "Africa/Cairo", "Africa/Casablanca", "Africa/Johannesburg", "Africa/Lagos",
    "Africa/Nairobi", "Africa/Tunis",
    // America
    "America/Anchorage", "America/Argentina/Buenos_Aires", "America/Bogota",
    "America/Caracas", "America/Chicago", "America/Denver", "America/Halifax",
    "America/Havana", "America/Lima", "America/Los_Angeles", "America/Mexico_City",
    "America/New_York", "America/Phoenix", "America/Santiago", "America/Sao_Paulo",
    "America/St_Johns", "America/Toronto", "America/Vancouver",
    // Asia
    "Asia/Almaty", "Asia/Baghdad", "Asia/Bangkok", "Asia/Beirut", "Asia/Colombo",
    "Asia/Dhaka", "Asia/Dubai", "Asia/Hong_Kong", "Asia/Jakarta", "Asia/Jerusalem",
    "Asia/Kabul", "Asia/Karachi", "Asia/Kathmandu", "Asia/Kolkata",
    "Asia/Kuala_Lumpur", "Asia/Manila", "Asia/Riyadh", "Asia/Seoul",
    "Asia/Shanghai", "Asia/Singapore", "Asia/Taipei", "Asia/Tehran",
    "Asia/Tokyo", "Asia/Yangon", "Asia/Yekaterinburg",
    // Atlantic
    "Atlantic/Azores", "Atlantic/Cape_Verde", "Atlantic/Reykjavik",
    // Australia / Pacific
    "Australia/Adelaide", "Australia/Brisbane", "Australia/Darwin",
    "Australia/Perth", "Australia/Sydney", "Pacific/Auckland", "Pacific/Fiji",
    "Pacific/Guam", "Pacific/Honolulu", "Pacific/Pago_Pago", "Pacific/Port_Moresby",
    // Europe
    "Europe/Amsterdam", "Europe/Athens", "Europe/Belgrade", "Europe/Berlin",
    "Europe/Brussels", "Europe/Bucharest", "Europe/Budapest", "Europe/Copenhagen",
    "Europe/Dublin", "Europe/Helsinki", "Europe/Istanbul", "Europe/Kyiv",
    "Europe/Lisbon", "Europe/London", "Europe/Madrid", "Europe/Moscow",
    "Europe/Oslo", "Europe/Paris", "Europe/Prague", "Europe/Rome",
    "Europe/Stockholm", "Europe/Vienna", "Europe/Warsaw", "Europe/Zurich"
];

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
