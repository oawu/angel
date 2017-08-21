define({ "api": [  {    "type": "get",    "url": "/send/image",    "title": "傳圖片",    "group": "Send",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "ori",            "description": "<p>原始圖片網址，需要 Https，網址長度最長 1000</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "prev",            "description": "<p>預覽圖片網址，需要 Https，網址長度最長 1000</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "user_id",            "description": "<p>接收者 User ID</p>"          }        ]      }    },    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "Boolean",            "optional": false,            "field": "status",            "description": "<p>執行狀態</p>"          }        ]      },      "examples": [        {          "title": "Success Response:",          "content": "HTTP/1.1 200 OK\n{\n    \"status\": true\n}",          "type": "json"        }      ]    },    "error": {      "fields": {        "Error 4xx": [          {            "group": "Error 4xx",            "type": "String",            "optional": false,            "field": "message",            "description": "<p>錯誤原因</p>"          }        ]      },      "examples": [        {          "title": "Error-Response:",          "content": "HTTP/1.1 405 Error\n{\n    \"message\": \"參數錯誤\"\n}",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "root/application/controllers/api/send.php",    "groupTitle": "Send",    "name": "GetSendImage"  },  {    "type": "get",    "url": "/send/location",    "title": "傳定位",    "group": "Send",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "title",            "description": "<p>標題，最多 48 個字</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "address",            "description": "<p>地址，最多 48 個字</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "latitude",            "description": "<p>緯度</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "longitude",            "description": "<p>經度</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "user_id",            "description": "<p>接收者 User ID</p>"          }        ]      }    },    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "Boolean",            "optional": false,            "field": "status",            "description": "<p>執行狀態</p>"          }        ]      },      "examples": [        {          "title": "Success Response:",          "content": "HTTP/1.1 200 OK\n{\n    \"status\": true\n}",          "type": "json"        }      ]    },    "error": {      "fields": {        "Error 4xx": [          {            "group": "Error 4xx",            "type": "String",            "optional": false,            "field": "message",            "description": "<p>錯誤原因</p>"          }        ]      },      "examples": [        {          "title": "Error-Response:",          "content": "HTTP/1.1 405 Error\n{\n    \"message\": \"參數錯誤\"\n}",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "root/application/controllers/api/send.php",    "groupTitle": "Send",    "name": "GetSendLocation"  },  {    "type": "get",    "url": "/send/message",    "title": "傳文字",    "group": "Send",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "text",            "description": "<p>文字訊息，長度最長 2000</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "user_id",            "description": "<p>接收者 User ID</p>"          }        ]      }    },    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "Boolean",            "optional": false,            "field": "status",            "description": "<p>執行狀態</p>"          }        ]      },      "examples": [        {          "title": "Success Response:",          "content": "HTTP/1.1 200 OK\n{\n    \"status\": true\n}",          "type": "json"        }      ]    },    "error": {      "fields": {        "Error 4xx": [          {            "group": "Error 4xx",            "type": "String",            "optional": false,            "field": "message",            "description": "<p>錯誤原因</p>"          }        ]      },      "examples": [        {          "title": "Error-Response:",          "content": "HTTP/1.1 405 Error\n{\n    \"message\": \"參數錯誤\"\n}",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "root/application/controllers/api/send.php",    "groupTitle": "Send",    "name": "GetSendMessage"  },  {    "type": "get",    "url": "/send/sticker/:packageId/:stickerId",    "title": "傳貼圖",    "group": "Send",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "packageId",            "description": "<p>package ID</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "stickerId",            "description": "<p>sticker ID</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "user_id",            "description": "<p>接收者 User ID</p>"          }        ]      }    },    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "Boolean",            "optional": false,            "field": "status",            "description": "<p>執行狀態</p>"          }        ]      },      "examples": [        {          "title": "Success Response:",          "content": "HTTP/1.1 200 OK\n{\n    \"status\": true\n}",          "type": "json"        }      ]    },    "error": {      "fields": {        "Error 4xx": [          {            "group": "Error 4xx",            "type": "String",            "optional": false,            "field": "message",            "description": "<p>錯誤原因</p>"          }        ]      },      "examples": [        {          "title": "Error-Response:",          "content": "HTTP/1.1 405 Error\n{\n    \"message\": \"參數錯誤\"\n}",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "root/application/controllers/api/send.php",    "groupTitle": "Send",    "name": "GetSendStickerPackageidStickerid"  }] });
