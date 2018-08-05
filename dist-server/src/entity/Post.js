"use strict";

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if ((typeof Reflect === "undefined" ? "undefined" : (0, _typeof3.default)(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = undefined && undefined.__metadata || function (k, v) {
    if ((typeof Reflect === "undefined" ? "undefined" : (0, _typeof3.default)(Reflect)) === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var Category_1 = require("./Category");
var Post = function Post() {
    (0, _classCallCheck3.default)(this, Post);
};
__decorate([typeorm_1.PrimaryGeneratedColumn(), __metadata("design:type", Number)], Post.prototype, "id", void 0);
__decorate([typeorm_1.Column(), __metadata("design:type", String)], Post.prototype, "title", void 0);
__decorate([typeorm_1.Column("text"), __metadata("design:type", String)], Post.prototype, "text", void 0);
__decorate([typeorm_1.ManyToMany(function (type) {
    return Category_1.Category;
}, {
    cascade: true
}), typeorm_1.JoinTable(), __metadata("design:type", Array)], Post.prototype, "categories", void 0);
Post = __decorate([typeorm_1.Entity()], Post);
exports.Post = Post;
//# sourceMappingURL=Post.js.map
//# sourceMappingURL=Post.js.map