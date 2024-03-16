"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserRequest = void 0;
const common_1 = require("@nestjs/common");
exports.GetUserRequest = (0, common_1.createParamDecorator)((propertyPath, ctx) => {
    const req = ctx.switchToHttp().getRequest();
    const user = req['user'];
    if (!user)
        throw new common_1.InternalServerErrorException('User not found in request');
    return !propertyPath ? user : user[propertyPath];
});
//# sourceMappingURL=get-user.decorator.js.map