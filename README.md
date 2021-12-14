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

