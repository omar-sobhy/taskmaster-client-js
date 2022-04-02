"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const axios_cookiejar_support_1 = require("axios-cookiejar-support");
const tough_cookie_1 = require("tough-cookie");
function handleError(error) {
    var _a, _b, _c;
    console.log('error', error);
    if (!axios_1.default.isAxiosError(error)) {
        return {
            type: 'error',
            error: {
                message: 'An unknown error occurred.',
            },
        };
    }
    return {
        type: 'error',
        error: {
            message: (_c = (_b = (_a = error.response) === null || _a === void 0 ? void 0 : _a.data.error) === null || _b === void 0 ? void 0 : _b.message) !== null && _c !== void 0 ? _c : 'An unknown error occurred.',
        },
    };
}
class Client {
    constructor(basePath, options = {}) {
        this.basePath = basePath;
        this.options = options;
        const jar = new tough_cookie_1.CookieJar();
        console.log('Options', options);
        if (this.options.authorizationCookie) {
            jar.setCookieSync(`Authorization=${this.options.authorizationCookie}`, `${this.basePath}/`);
        }
        this.axios = (0, axios_cookiejar_support_1.wrapper)(axios_1.default.create({
            jar,
            withCredentials: true,
        }));
    }
    signup(username, password, email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.axios.post(`${this.basePath}/users/signup`, {
                    username,
                    password,
                    email,
                });
                return {
                    type: 'success',
                    data: response.data.user,
                };
            }
            catch (error) {
                return handleError(error);
            }
        });
    }
    login(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.axios.post(`${this.basePath}/users/login`, {
                    username,
                    password,
                });
                console.log('hello', response.headers);
                return {
                    type: 'success',
                    data: Object.assign({}, response.data.user),
                };
            }
            catch (error) {
                return handleError(error);
            }
        });
    }
    getProjects() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.axios.get(`${this.basePath}/projects`);
                return {
                    type: 'success',
                    data: response.data.projects,
                };
            }
            catch (error) {
                return handleError(error);
            }
        });
    }
    getProject(projectId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.axios.get(`${this.basePath}/projects/${projectId}`);
                return {
                    type: 'success',
                    data: response.data.project,
                };
            }
            catch (error) {
                return handleError(error);
            }
        });
    }
    getUserData(userIds) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.axios.post(`${this.basePath}/users`, {
                    userIds,
                });
                return {
                    type: 'success',
                    data: response.data.users,
                };
            }
            catch (error) {
                return handleError(error);
            }
        });
    }
    getProjectSections(projectId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.axios.get(`${this.basePath}/projects/${projectId}/sections`);
                return {
                    type: 'success',
                    data: response.data.sections,
                };
            }
            catch (error) {
                return handleError(error);
            }
        });
    }
    createSections(projectId, sections) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.axios.post(`${this.basePath}/projects/${projectId}/sections`, {
                    sections,
                });
                return {
                    type: 'success',
                    data: response.data.sections,
                };
            }
            catch (error) {
                return handleError(error);
            }
        });
    }
    updateSection(sectionId, { name, colour, icon }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.axios.patch(`${this.basePath}/sections/${sectionId}`, {
                    name,
                    colour,
                    icon,
                });
                return {
                    type: 'success',
                    data: response.data.section,
                };
            }
            catch (error) {
                return handleError(error);
            }
        });
    }
    createProject(name, background) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.axios.post(`${this.basePath}/projects/`, {
                    name,
                    background,
                });
                return {
                    type: 'success',
                    data: response.data.project,
                };
            }
            catch (error) {
                return handleError(error);
            }
        });
    }
    createTask(sectionId, name, dueDate, assignee) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = { name };
                if (dueDate)
                    data.dueDate = dueDate;
                if (assignee)
                    data.assigne = assignee;
                const response = yield this.axios.post(`${this.basePath}/sections/${sectionId}/tasks`, data);
                return {
                    type: 'success',
                    data: response.data.task,
                };
            }
            catch (error) {
                return handleError(error);
            }
        });
    }
    getTasks(sectionId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.axios.get(`${this.basePath}/sections/${sectionId}/tasks`);
                return {
                    type: 'success',
                    data: response.data.tasks,
                };
            }
            catch (error) {
                return handleError(error);
            }
        });
    }
    getTaskData(taskId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.axios.get(`${this.basePath}/tasks/${taskId}`);
                return {
                    type: 'success',
                    data: response.data.task,
                };
            }
            catch (error) {
                return handleError(error);
            }
        });
    }
    updateTask(taskId, { assignee, dueDate, name, description, }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = {};
                if (assignee || assignee === null)
                    data.assignee = assignee;
                if (dueDate || dueDate === null)
                    data.dueDate = dueDate;
                if (name || name === null)
                    data.name = name;
                if (description || description === null)
                    data.description = description;
                const response = yield this.axios.patch(`${this.basePath}/tasks/${taskId}`, data);
                return {
                    type: 'success',
                    data: response.data.task,
                };
            }
            catch (error) {
                return handleError(error);
            }
        });
    }
    addComment(taskId, comment) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.axios.post(`${this.basePath}/tasks/${taskId}/comments`, {
                    text: comment,
                });
                return {
                    type: 'success',
                    data: response.data.comment,
                };
            }
            catch (error) {
                return handleError(error);
            }
        });
    }
    getComments(commentIds) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.axios.get(`${this.basePath}/comments`, {
                    params: {
                        commentId: commentIds,
                    },
                });
                return {
                    type: 'success',
                    data: response.data.comments,
                };
            }
            catch (error) {
                return handleError(error);
            }
        });
    }
    getTagsData(tagIds) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.axios.get(`${this.basePath}/tags`, {
                    params: {
                        tagId: tagIds,
                    },
                });
                return {
                    type: 'success',
                    data: response.data.tags,
                };
            }
            catch (error) {
                return handleError(error);
            }
        });
    }
}
exports.default = Client;
//# sourceMappingURL=index.js.map