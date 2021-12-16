# mock_server
A simple mock service  can specifies path and return values



Our mock data is stored in the mock folder as a JSON file.

**example：**

src/mockdata/test/getData.json

this url is localhost:8080/test/getData



```javascript
{
    "method": "GET",
    "note": "getTestData",
    "mockdata": {
        "info": [
            "272779",
            {
                "firstname": "Gui",
                "lastname": "tenbay",
                "middlename": "M"
            }
        ]
    }
}
```





list：

1、模拟请求url 返回对应的mock数据 ✅

2、根据填写的mock数据，自动生成markdown接口文档 ✅

3、在网页端可以修改。生成mockdata数据
