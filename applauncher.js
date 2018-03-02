/**
 * Application launcher.
 */

// start app function
function startApp() {
    // translate page
    dwv.i18nPage();

    // main application
    var myapp = new dwv.App();

    // display loading time
    var listener = function (event) {
        if (event.type === "load-start") {
            console.time("load-data");
        }
        else {
            console.timeEnd("load-data");
        }
    };

    // before myapp.init since it does the url load
    myapp.addEventListener("load-start", listener);
    myapp.addEventListener("load-end", listener);

    // also available:
    //myapp.addEventListener("load-progress", listener);
    //myapp.addEventListener("draw-create", listener);
    //myapp.addEventListener("draw-move", listener);
    //myapp.addEventListener("draw-change", listener);
    //myapp.addEventListener("draw-delete", listener);
    //myapp.addEventListener("wl-width-change", listener);
    //myapp.addEventListener("wl-center-change", listener);
    //myapp.addEventListener("colour-change", listener);
    //myapp.addEventListener("position-change", listener);
    //myapp.addEventListener("slice-change", listener);
    //myapp.addEventListener("frame-change", listener);
    //myapp.addEventListener("zoom-change", listener);
    //myapp.addEventListener("offset-change", listener);
    //myapp.addEventListener("filter-run", listener);
    //myapp.addEventListener("filter-undo", listener);

    // initialise the application
    var options = {
        "containerDivId": "dwv",
        "fitToWindow": true,
        "gui": ["tool", "load", "help", "undo", "version", "tags", "drawList"],
        "loaders": ["File", "Url", "GoogleDrive", "Dropbox"],
        "tools": ["Scroll", "WindowLevel", "ZoomAndPan", "Draw", "Livewire", "Filter", "Floodfill"],
        "filters": ["Threshold", "Sharpen", "Sobel"],
        "shapes": ["Arrow", "Ruler", "Protractor", "Rectangle", "Roi", "Ellipse", "FreeHand"],
        "isMobile": true
        //"defaultCharacterSet": "chinese"
    };
    if ( dwv.browser.hasInputDirectory() ) {
        options.loaders.splice(1, 0, "Folder");
    }
    myapp.init(options);

    var size = dwv.gui.getWindowSize();
    $(".layerContainer").height(size.height);
}

// Image decoders (for web workers)
dwv.image.decoderScripts = {
    "jpeg2000": "../../decoders/pdfjs/decode-jpeg2000.js",
    "jpeg-lossless": "../../decoders/rii-mango/decode-jpegloss.js",
    "jpeg-baseline": "../../decoders/pdfjs/decode-jpegbaseline.js"
};

// status flags
var domContentLoaded = false;
var i18nInitialised = false;
// launch when both DOM and i18n are ready
function launchApp() {
    if ( domContentLoaded && i18nInitialised ) {
        startApp();
    }
}
// i18n ready?
dwv.i18nOnInitialised( function () {
    // call next once the overlays are loaded
    var onLoaded = function (data) {
        dwv.gui.info.overlayMaps = data;
        i18nInitialised = true;
        launchApp();
    };
    // // load overlay map info
    // $.getJSON( dwv.i18nGetLocalePath("overlays.json"), onLoaded )
    // .fail( function () {
    //     console.log("Using fallback overlays.");
    //     $.getJSON( dwv.i18nGetFallbackLocalePath("overlays.json"), onLoaded );
    // });
    var data = {
        "US": [
            {"tags": ["x00100020"], "pos": "tl"},
            {"tags": ["x00100010", "x00100040"], "pos": "tl", "format": "{v0} [{v1}]"},
            {"tags": ["x00100030"], "pos": "tl"},

            {"tags": ["x00200011", "x00200012", "x00200013"], "pos": "bl", "format": "{v0}:{v1}:{v2}"},
            {"tags": ["x00280010", "x00280011"], "pos": "bl", "format": "RES: {v0}x{v1}"},
            {"tags": ["x00181100"], "pos": "bl", "format": "FOV: {v0}"},

            {"tags": ["x00080080"], "pos": "tr"},
            {"tags": ["x00080020", "x00080030"], "pos": "tr", "format": "{v0} {v1}"},
            {"tags": ["x00080060"], "pos": "tr"},

            {"value": "window-center", "pos": "br", "format": "窗位: {v0}"},
            {"value": "window-width", "pos": "br", "format": "窗宽: {v0}"},
            {"value": "zoom", "pos": "br", "format": "Z: {v0}"},
            {"value": "offset", "pos": "br", "format": "Off: {v0},{v1}"},
            {"value": "position", "pos": "br", "format": "位置: {v0},{v1},{v2}"},
            {"value": "frame", "pos": "br", "format": "频谱: {v0}"},
            {"value": "value", "pos": "br", "format": "值: {v0}"}
        ],
        "DOM": [
            {"tags": ["fileName"], "pos": "tl"},

            {"tags": ["fileType"], "pos": "tr"},

            {"tags": ["imageWidth", "imageHeight"], "pos": "bl", "format": "RES: {v0}x{v1}"},

            {"value": "window-center", "pos": "br", "format": "窗位: {v0}"},
            {"value": "window-width", "pos": "br", "format": "窗宽: {v0}"},
            {"value": "zoom", "pos": "br", "format": "Z: {v0}"},
            {"value": "offset", "pos": "br", "format": "Off: {v0},{v1}"},
            {"value": "position", "pos": "br", "format": "位置: {v0},{v1},{v2}"},
            {"value": "frame", "pos": "br", "format": "频谱: {v0}"},
            {"value": "value", "pos": "br", "format": "值: {v0}"}
        ],
        "*": [
            {"tags": ["x00100020"], "pos": "tl"},
            {"tags": ["x00100010", "x00100040"], "pos": "tl", "format": "{v0} [{v1}]"},
            {"tags": ["x00100030"], "pos": "tl"},

            {"tags": ["x00200011", "x00200012", "x00200013"], "pos": "bl", "format": "{v0}:{v1}:{v2}"},
            {"tags": ["x00185100"], "pos": "bl"},
            {"tags": ["x00201041"], "pos": "bl", "format": "SL: {v0}"},
            {"tags": ["x00180050"], "pos": "bl", "format": "ST: {v0}"},
            {"tags": ["x00280010", "x00280011"], "pos": "bl", "format": "RES: {v0}x{v1}"},
            {"tags": ["x00181100"], "pos": "bl", "format": "FOV: {v0}"},

            {"tags": ["x00080080"], "pos": "tr"},
            {"tags": ["x00080020", "x00080030"], "pos": "tr", "format": "{v0} {v1}"},
            {"tags": ["x00080060"], "pos": "tr"},

            {"value": "window-center", "pos": "br", "format": "窗位: {v0}"},
            {"value": "window-width", "pos": "br", "format": "窗宽: {v0}"},
            {"value": "zoom", "pos": "br", "format": "Z: {v0}"},
            {"value": "offset", "pos": "br", "format": "Off: {v0},{v1}"},
            {"value": "position", "pos": "br", "format": "位置: {v0},{v1},{v2}"},
            {"value": "frame", "pos": "br", "format": "频谱: {v0}"},
            {"value": "value", "pos": "br", "format": "值: {v0}"}
        ]
    }
    onLoaded(data);
});

function i18nInitialise(language, localesPath) {
    var lng = (typeof language === "undefined") ? "auto" : language;
    var lpath = (typeof localesPath === "undefined") ? "../.." : localesPath;
    // store as global
    dwv.i18nLocalesPath = lpath;
    // i18n options: default 'en' language and
    //  only load language, not specialised (for ex en-GB)
    var options = {
        fallbackLng: "en",
        load: "languageOnly",
        backend: { loadPath: lpath + "/locales/{{lng}}/{{ns}}.json" }
    };
    // use the XHR backend to get translation files
    var i18n = i18next.use(i18nextXHRBackend);
    // use browser language or the specified one
    if (lng === "auto") {
        i18n.use(i18nextBrowserLanguageDetector);
    }
    else {
        options.lng = lng;
    }
    // init i18n: will be ready when the 'loaded' event is fired
    i18n.init({
        lng: 'zh',
        resources: {
            zh: {
                translation: {
                    "basics": {
                        "open": "打开",
                        "close": "关闭",
                        "help": "帮助",
                        "back": "返回",
                        "reset": "重置",
                        "apply": "应用",
                        "name": "姓名",
                        "value": "值",
                        "dicomTags": "DICOM 标签",
                        "columns": "列",
                        "group": "组",
                        "element": "元素",
                        "vr": "VR",
                        "vl": "VL",
                        "presets": "预设",
                        "toolbox": "工具箱",
                        "history": "历史记录",
                        "image": "图像",
                        "info": "信息",
                        "downloadState": "下载状态",
                        "drawList": "Annotations",
                        "search": "Search",
                        "id": "ID",
                        "slice": "Slice",
                        "frame": "Frame",
                        "type": "Type",
                        "color": "Color",
                        "label": "Label",
                        "description": "Description",
                        "editMode": "Edit Mode",
                        "deleteDraws": "Delete All",
                        "visible": "Visible"
                    },
                    "colour": {
                        "Yellow": {
                            "name": "黄色"
                        },
                        "Red": {
                            "name": "红色"
                        },
                        "White": {
                            "name": "白色"
                        },
                        "Green": {
                            "name": "绿色"
                        },
                        "Blue": {
                            "name": "蓝色"
                        },
                        "Lime": {
                            "name": "绿黄色"
                        },
                        "Fuchsia": {
                            "name": "紫红色"
                        },
                        "Black": {
                            "name": "黑色"
                        }
                    },
                    "unit": {
                        "mm": "mm",
                        "cm2": "cm2",
                        "degree": "\u00B0"
                    },
                    "help": {
                        "intro": {
                            "p0": "DWV (DICOM Web Viewer) 是一个开源的医学影像浏览器。 它只使用了Javascript与html5的编程代码, 意味着它能在任何提供了浏览器的平台上都能运行 (笔记本电脑, 平板, 手机以及某些TV)。 它能加载当地的或者远程Dicom格式的文件 (the standard for medical imaging data such as MR, CT, Echo, Mammo, NM...) 并提供标准工具对其进行操作如对比、缩放、拖动,可能吸引区域的阈值、锐化图像和影像过滤器.",
                            "p1": "所有的DICOM标签都能在这个表格中搜索到, 点击'tags'或者网格上的按钮。 你可以选择展示图像信息在一个小弹框中通过点击'info'按钮。"
                        },
                        "tool_intro": "每一个工具都定义了与用户交互的可能性。 以下是一些可用的工具:"
                    },
                    "tool": {
                        "WindowLevel": {
                            "name": "窗位/窗宽。",
                            "brief": "改变图像的窗位和窗宽。",
                            "mouse_drag": "单鼠标按住拖动图像，沿水平方向改变窗宽，沿竖直方向改变窗位。",
                            "double_click": "双击影像，可将该点作为窗位窗宽中心值。",
                            "touch_drag": "触摸拖动，沿水平方向改变窗宽，沿竖直方向改变窗位。"
                        },
                        "ZoomAndPan": {
                            "name": "缩放/移动",
                            "brief": "缩放/移动 工具用于放大缩小和移动图像。",
                            "mouse_wheel": "鼠标滚轮用于缩放图像。",
                            "mouse_drag": "单鼠标按住拖动图像到想要的位置。",
                            "twotouch_pinch": "通过按压滑动对图像进行缩放。",
                            "touch_drag": "单触拖动图像到想要的位置。"
                        },
                        "Scroll": {
                            "name": "滚动条",
                            "brief": "The scroll tool allows to scroll through slices/frames. ",
                            "double_click": "A double click launches a slice or frame play. A single click stops it.",
                            "tap_and_hold": "A tap and hold launches a slice or frame play. A single tap stops it.",
                            "mouse_drag": "Drag the mouse vertically to change the slice, horizontally to change the frame. Keyboard shortcuts: CTRL + up or down arrow to change slices, CTRL + left or right arrow to change frames.",
                            "touch_drag": "Drag your finger vertically to change the slice, horizontally to change the frame."
                        },
                        "Draw": {
                            "name": "测量",
                            "brief": "在图像上画不同的形状。可从下拉菜单中选择形状和颜色。创建测量后，通过选中可以进行编辑。会出现角度，允许特定形状编辑。拖动顶端红色十字可将对象删除，所有操作可撤销。",
                            "mouse_drag": "A single mouse drag draws the desired shape. For the protractor, click to start, draw the first ray to the vertex, wait half a second and draw the second ray.",
                            "touch_drag": "A single touch drag draws the desired shape. For the protractor, tap to start, draw the first ray to the vertex, wait half a second and draw the second ray."
                        },
                        "Filter": {
                            "name": "滤波器",
                            "brief": "一些简单的图像过滤器是可用的: 阈值滤波器限制图像强度之间的最大值和最小值, 锐化滤波器旋转图像锐化矩阵, Sobel滤波器得到的梯度图像在两个方向上。"
                        },
                        "Livewire": {
                            "name": "分割",
                            "brief": "Livewire工具是一个半自动分割工具, 在用户选择的路径之间， 根据图像强度做出分割。 点击第一次初始化然后移开鼠标看所点击的路径。 再一次点击确定您的图像轮廓, 如果您再次点击重复的点, 这个过程会停止。 注意: 这个过程可能会花费一些时间!"
                        },
                        "Floodfill": {
                            "name": "等值线",
                            "brief": "Floodfill工具是一个半自动化的分割工具，他能用来分割等值像素成类似的值",
                            "click": "点击像素根据其强度来创建等值线。",
                            "tap": "触摸像素根据其强度来创建等值线。"
                        },
                        "info": {
                            "position": "位置 = {{value}}",
                            "value": "值 = {{value}}",
                            "frame": "频谱 = {{value}}",
                            "window_center": "窗位/窗宽= {{value}}",
                            "window_width": "窗宽 = {{value}}"
                        }
                    },
                    "shape": {
                        "Line": {
                            "name": "直线"
                        },
                        "Ruler": {
                            "name": "Ruler"
                        },
                        "Protractor": {
                            "name": "量角器"
                        },
                        "Rectangle": {
                            "name": "矩形"
                        },
                        "Roi": {
                            "name": "感兴趣的区域"
                        },
                        "Ellipse": {
                            "name": "椭圆"
                        },
                        "Arrow": {
                            "name": "Arrow"
                        },
                        "FreeHand": {
                            "name": "Free hand"
                        }
                    },
                    "io": {
                        "File": {
                            "name": "文件"
                        },
                        "Url": {
                            "name": "链接"
                        },
                        "GoogleDrive": {
                            "name": "GoogleDrive",
                            "auth": {
                                "title": "Google Drive Authorization",
                                "body": "请授权DWV访问Google Drive。 \n这仅仅是在您首次连接时需要。",
                                "button": "授权"
                            }
                        },
                        "Dropbox": {
                            "name": "dropbox云服务"
                        },
                        "Folder": {
                            "name": "文件夹"
                        }
                    },
                    "filter": {
                        "Threshold": {
                            "name": "阈值"
                        },
                        "Sharpen": {
                            "name": "锐化"
                        },
                        "Sobel": {
                            "name": "sobel算子"
                        }
                    },
                    "colourmap": {
                        "plain": {
                            "name": "正常面"
                        },
                        "invplain": {
                            "name": "反转"
                        },
                        "rainbow": {
                            "name": "彩虹色"
                        },
                        "hot": {
                            "name": "火红"
                        },
                        "hotiron": {
                            "name": "金属红"
                        },
                        "pet": {
                            "name": "混合色"
                        },
                        "hotmetalblue": {
                            "name": "热金属蓝"
                        },
                        "pet20step": {
                            "name": "步幅20混合色"
                        }
                    },
                    "wl": {
                        "presets": {
                            "mediastinum": {
                                "name": "（胸腔）纵隔膜"
                            },
                            "lung": {
                                "name": "肺"
                            },
                            "bone": {
                                "name": "骨头"
                            },
                            "brain": {
                                "name": "脑"
                            },
                            "head": {
                                "name": "头"
                            },
                            "manual": {
                                "name": "指南"
                            },
                            "minmax": {
                                "name": "最小/最大"
                            }
                        }
                    }
                }
            }
        }
    });
}

// check browser support
dwv.browser.check();
// initialise i18n
i18nInitialise();

// DOM ready?
$(document).ready( function() {
    domContentLoaded = true;
    launchApp();
});
