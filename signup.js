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
Object.defineProperty(exports, "__esModule", { value: true });
const validators_1 = require("./validators");
const mockBackend_1 = require("./mockBackend");
const form = document.getElementById('signup-form');
const errorDiv = document.getElementById('signup-errors');
form.addEventListener('submit', (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    errorDiv.innerHTML = '';
    const data = {
        fullName: form.fullName.value,
        email: form.email.value,
        password: form.password.value,
        confirmPassword: form.confirmPassword.value,
    };
    const errors = (0, validators_1.validateSignUp)(data);
    if (Object.keys(errors).length) {
        for (const key in errors) {
            const p = document.createElement('p');
            p.className = 'error';
            p.innerText = errors[key];
            errorDiv.appendChild(p);
        }
        return;
    }
    try {
        yield (0, mockBackend_1.mockSignUp)(data.email, data.password);
        alert('Sign Up Successful!');
        form.reset();
    }
    catch (err) {
        const p = document.createElement('p');
        p.className = 'error';
        p.innerText = err;
        errorDiv.appendChild(p);
    }
}));
console.log("Signup script loaded");
