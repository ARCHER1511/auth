"use strict";
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __async = (__this, __arguments, generator) => {
    return new Promise((resolve, reject) => {
      var fulfilled = (value) => {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      };
      var rejected = (value) => {
        try {
          step(generator.throw(value));
        } catch (e) {
          reject(e);
        }
      };
      var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
      step((generator = generator.apply(__this, __arguments)).next());
    });
  };

  // validators.ts
  function validateSignUp(data) {
    const errors = {};
    if (!data.fullName.trim()) errors.fullName = "Type Your Full Name.";
    if (!data.email.match(/^\S+@\S+\.\S+$/)) errors.email = "Bad Email - Type it correct.";
    if (data.password.length < 8) errors.password = "Password must be at least 8 characters.";
    if (data.password.length >= 32) errors.password = "Password cannot be more over than 32 characters.";
    if (data.confirmPassword !== data.password) errors.confirmPassword = "Passwords do not match.";
    return errors;
  }
  function validateSignIn(data) {
    const errors = {};
    if (!data.email.match(/^\S+@\S+\.\S+$/)) errors.email = "Invalid email format.";
    if (!data.password) errors.password = "Password is required.";
    return errors;
  }
  var init_validators = __esm({
    "validators.ts"() {
      "use strict";
    }
  });

  // mockBackend.ts
  function mockSignUp(email, password) {
    return __async(this, null, function* () {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (users[email]) return reject("Email already exists.");
          users[email] = password;
          resolve();
        }, 500);
      });
    });
  }
  function mockSignIn(email, password) {
    return __async(this, null, function* () {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (!users[email] || users[email] !== password) return reject("Invalid email or password.");
          resolve();
        }, 500);
      });
    });
  }
  var users;
  var init_mockBackend = __esm({
    "mockBackend.ts"() {
      "use strict";
      users = {};
    }
  });

  // signin.ts
  var require_signin = __commonJS({
    "signin.ts"(exports) {
      "use strict";
      init_validators();
      init_mockBackend();
      var form = document.getElementById("signin-form");
      var errorDiv = document.getElementById("signin-errors");
      form.addEventListener("submit", (e) => __async(null, null, function* () {
        e.preventDefault();
        errorDiv.innerHTML = "";
        const data = {
          email: form.email.value,
          password: form.password.value
        };
        const errors = validateSignIn(data);
        if (Object.keys(errors).length) {
          for (const key in errors) {
            const p = document.createElement("p");
            p.className = "error";
            p.innerText = errors[key];
            errorDiv.appendChild(p);
          }
          return;
        }
        try {
          yield mockSignIn(data.email, data.password);
          alert("Sign In Successful! Redirecting...");
          form.reset();
        } catch (err) {
          const p = document.createElement("p");
          p.className = "error";
          p.innerText = err;
          errorDiv.appendChild(p);
        }
      }));
    }
  });

  // signup.ts
  var require_signup = __commonJS({
    "signup.ts"(exports) {
      "use strict";
      init_validators();
      init_mockBackend();
      var form = document.getElementById("signup-form");
      var errorDiv = document.getElementById("signup-errors");
      form.addEventListener("submit", (e) => __async(null, null, function* () {
        e.preventDefault();
        errorDiv.innerHTML = "";
        const data = {
          fullName: form.fullName.value,
          email: form.email.value,
          password: form.password.value,
          confirmPassword: form.confirmPassword.value
        };
        const errors = validateSignUp(data);
        if (Object.keys(errors).length) {
          for (const key in errors) {
            const p = document.createElement("p");
            p.className = "error";
            p.innerText = errors[key];
            errorDiv.appendChild(p);
          }
          return;
        }
        try {
          yield mockSignUp(data.email, data.password);
          alert("Sign Up Successful!");
          form.reset();
        } catch (err) {
          const p = document.createElement("p");
          p.className = "error";
          p.innerText = err;
          errorDiv.appendChild(p);
        }
      }));
      console.log("Signup script loaded");
    }
  });

  // bundle.ts
  var import_signin = __toESM(require_signin());
  var import_signup = __toESM(require_signup());
})();
