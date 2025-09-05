"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const cors_1 = tslib_1.__importDefault(require("cors"));
const data_1 = require("./data");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});
app.get('/api/resources', (req, res) => {
    const { location, category } = req.query;
    let items = data_1.data;
    if (location) {
        items = data_1.data.filter((item) => item.location === location);
    }
    if (category) {
        items = data_1.data.filter((item) => item.category === category);
    }
    res.status(200).json({
        items,
    });
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
//# sourceMappingURL=server.js.map