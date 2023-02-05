// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"main.js":[function(require,module,exports) {
var innerHead = document.querySelector(".inner_head");
var innerHeadHeight = innerHead.getBoundingClientRect().height;
var navLink = document.querySelectorAll(".nav-link");
var logo = document.querySelector(".logo");
window.addEventListener("scroll", function () {
  if (window.scrollY > 114) {
    innerHead.classList.add("show");
    showBlackNavLink();
  } else {
    innerHead.classList.remove("show");
    showWhiteNavLink();
  }
});
function showBlackNavLink() {
  navLink.forEach(function (item) {
    item.classList.add("show");
  });
}
function showWhiteNavLink() {
  navLink.forEach(function (item) {
    item.classList.remove("show");
  });
}

// 랜덤이미지
var albArr = [{
  img: "https://t1.daumcdn.net/cfile/tistory/99D38E335A1F7D1020",
  title: "Hearts don't break around here",
  text: "Love the way you conquer your fear. You know hearts don't break around here"
}, {
  img: "https://i1.sndcdn.com/artworks-000391930665-04n234-t500x500.jpg",
  title: "Photograph",
  text: "If you hurt me, that's okay, baby, only words bleed"
}, {
  img: "https://upload.wikimedia.org/wikipedia/en/8/8f/Ed_Sheeran_-_Overpass_Graffiti.png",
  title: "Overpass Graffiti",
  text: "I will always love you for what it's worth. We'll never fade like graffiti on the overpass"
}, {
  img: "https://i.pinimg.com/originals/7a/ed/c4/7aedc445f56ddca66b1bfe48fffdad2c.jpg",
  title: "Best Part of me",
  text: "Baby, the best part of me is you. I'm so in love with you"
}];
var album = document.querySelector(".album");
var title = document.querySelector(".title");
var text = document.querySelector(".text");
var randomBtn = document.querySelector(".btn--random");
randomBtn.addEventListener("click", showRandomSong);
function showRandomSong() {
  var randomNum = Math.floor(Math.random() * albArr.length);
  album.src = albArr[randomNum].img;
  title.textContent = albArr[randomNum].title;
  text.textContent = albArr[randomNum].text;
}
// todo
var todoList = document.querySelector("ul.todo-list");
var input = document.querySelector("input");
var todoBtn = document.querySelector(".btn--todo");
var tasks = [];
todoBtn.addEventListener("click", function (e) {
  e.preventDefault();
  var newTask = input.value;
  input.value = "";
  var newTaskObj = {
    task: newTask,
    id: Date.now()
  };
  showTodo(newTaskObj);
  tasks.push(newTaskObj);
  // saveTask(tasks);
});

function showTodo(newTask) {
  var li = document.createElement("li");
  li.id = newTask.id;
  var span = document.createElement("span");
  var deleteBtn = document.createElement("button");
  deleteBtn.textContent = "X";
  li.append(span);
  li.append(deleteBtn);
  span.innerText = newTask.task;
  todoList.append(li);
  deleteBtn.addEventListener("click", deleteTask);
}
function saveTask(tasks) {
  localStorage.setItem("task", JSON.stringify(tasks));
}
function deleteTask(e) {
  var li = e.target.parentElement;
  li.remove();
  tasks = tasks.filter(function (task) {
    task.id !== parseInt(li.id);
  });
  saveTask(tasks);
}
var savedTodos = JSON.parse(localStorage.getItem("task"));
if (savedTodos !== null) {
  savedTodos.forEach(function (item) {
    showTodo(item);
  });
}

// log-in
var loginInput = document.querySelector(".login-input");
var loginBtn = document.querySelector(".login-btn ");
var greetings = document.querySelector(".greetings");
var nameEl = document.querySelector(".name");
loginBtn.addEventListener("click", function (e) {
  e.preventDefault();
  nameEl.textContent = loginInput.value;
  loginInput.value = "";
  loginInput.classList.add("hide");
  loginBtn.classList.add("hide");
  greetings.classList.add("show");
});
//시계
var clock = document.querySelector(".clock");
function getTime() {
  var hour = document.querySelector(".hour");
  var minute = document.querySelector(".minute");
  var seconds = document.querySelector(".seconds");
  var time = new Date();
  hour.textContent = String(time.getHours()).padStart(2, 0);
  minute.textContent = String(time.getMinutes()).padStart(2, 0);
  seconds.textContent = String(time.getSeconds()).padStart(2, 0);
}
setInterval(getTime, 1000);

//위치,날씨

function onGeoOk(pos) {
  var lat = pos.coords.latitude;
  var lon = pos.coords.longitude;
  var API_key = "89c2cbfb04f98a8bf08654da22a1dd96";
  console.log(lat);
  console.log(lon);
  var url = "https://api.openweathermap.org/data/2.5/weather?lat=".concat(lat, "&lon=").concat(lon, "&appid=").concat(API_key, "&units=metric");
  fetch(url).then(function (response) {
    return response.json();
  }).then(function (data) {
    var weatherContainer = document.querySelector(".weather-container");
    var cityName = data.name;
    var weather = data.weather[0].main;
    var temp = data.main.temp;
    weatherContainer.textContent = "".concat(cityName, ", ").concat(weather, ",").concat(temp, "\xB0C");
  });
}
function onGeoError() {
  alert("해당 위치를 찾을 수 없습니다.");
}
navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);

//footer 연도
var year = document.querySelector(".year");
year.textContent = new Date().getFullYear();
},{}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "57025" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","main.js"], null)
//# sourceMappingURL=/main.1f19ae8e.js.map