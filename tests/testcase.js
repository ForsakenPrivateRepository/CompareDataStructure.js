(function () {
    var basicDataProvide = [
        [1, "number"],
        ["Alex", "string"],
        [3, "number|string"],
        [{}, "object"],
        [
            {
                "id": 1
            },
            {
                "object": {
                    "id": "number"
                }
            }
        ],
        [
            [1, 2, 3],
            {
                "array": "number"
            }
        ],
        [
            "GitHub",
            {
                "set": ["GitHub", "LinkedIn"]
            }
        ],
        [
            {
                "id": 1,
                "name": "Alex"
            },
            "ShortUserInfo",
            {
                "ShortUserInfo": {
                    "object": {
                        "id": "number",
                        "name": "string"
                    }
                }
            }
        ]
    ];

    QUnit.test( "basic", function( assert ) {

        for (var index in basicDataProvide) {
            var diff = CDS.check.apply(null, basicDataProvide[index]);

            assert.ok( diff.isEqual(), diff.getMessage() );
        }

    });

    var diffDataProvider = [
        {
            data: 1,
            structure: "string",
            message: "given: 'number' instead of: 'string'"
        }, {
            data: "Facebook",
            structure: {
                "set": ["GitHub", "LinkedIn"]
            },
            message: "value: 'Facebook' out of set: 'GitHub,LinkedIn'"
        }, {
            data: true,
            structure: false,
            message: CDS.errors.config
        }
    ];

    QUnit.test("diff", function( assert ) {

        for (var index in diffDataProvider) {
            var provider = diffDataProvider[index];

            var diff = CDS.check(provider.data, provider.structure);

            assert.equal(diff.isEqual(), false);
            assert.equal(diff.getMessage(), provider.message);
        }

    });

})();