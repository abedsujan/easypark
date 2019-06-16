const fs = require('fs');
class Zone {
    constructor() {
        const fileData = fs.readFileSync('./data/zone.json').toString();
        this._zoneData = JSON.parse(fileData);

    }

    getAll() {
        return this._zoneData;
    }
    getZoneByName(name) {
        return this._zoneData.find((zone => {
            return zone.area.toLowerCase() == name.toLowerCase()
        }));
    }
}

module.exports = Zone;